// pages/api/students/user/[userId].js
import pool from '@/lib/db';

export default async function handler(req, res) {
  const {
    query: { userId },
    method,
  } = req;

  if (method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const client = await pool.connect();

  try {
    // Get student data by user ID
    const studentQuery = `
      SELECT * FROM pds_students WHERE user_id = $1
    `;
    const studentResult = await client.query(studentQuery, [userId]);
    
    if (studentResult.rows.length === 0) {
      return res.status(404).json({ message: 'Student not found' });
    }
    
    const student = studentResult.rows[0];
    const studentId = student.id;
    
    // Get related data from other tables
    const [
      familyInfo,
      parents,
      sacraments,
      leisureActivities,
      guardian,
      siblings,
      educationalBackground,
      organizations,
      healthInfo,
      testResults
    ] = await Promise.all([
      client.query('SELECT * FROM family_info WHERE student_id = $1', [studentId]),
      client.query('SELECT * FROM parents WHERE student_id = $1', [studentId]),
      client.query('SELECT * FROM sacraments WHERE student_id = $1', [studentId]),
      client.query('SELECT * FROM leisure_activities WHERE student_id = $1', [studentId]),
      client.query('SELECT * FROM if_not_with_parents WHERE student_id = $1', [studentId]),
      client.query('SELECT * FROM siblings WHERE student_id = $1', [studentId]),
      client.query('SELECT * FROM educational_background WHERE student_id = $1', [studentId]),
      client.query('SELECT * FROM organizations WHERE student_id = $1', [studentId]),
      client.query('SELECT * FROM health_info WHERE student_id = $1', [studentId]),
      client.query('SELECT * FROM test_results WHERE student_id = $1', [studentId])
    ]);
    
    // Separate father and mother data
    const fatherData = parents.rows.filter(p => p.parent_type === 'father');
    const motherData = parents.rows.filter(p => p.parent_type === 'mother');
    
    // Combine all data
    const studentData = {
      ...student,
      family_info: familyInfo.rows,
      father: fatherData,
      mother: motherData,
      sacraments: sacraments.rows,
      leisure_activities: leisureActivities.rows,
      guardian: guardian.rows,
      siblings: siblings.rows,
      educational_background: educationalBackground.rows,
      organizations: organizations.rows,
      health_info: healthInfo.rows,
      test_results: testResults.rows
    };
    
    res.status(200).json(studentData);
  } catch (error) {
    console.error('Error in student API:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  } finally {
    client.release();
  }
}