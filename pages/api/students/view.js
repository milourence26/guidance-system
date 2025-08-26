import pool from '@/lib/db';

export default async function handler(req, res) {
  const client = await pool.connect();

  try {
    if (req.method === 'GET') {
      // Handle GET request - Fetch student data
      const { userId } = req.query;
      
      if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
      }

      // Get the most recent student record for this user
      const studentQuery = `
        SELECT * FROM pds_students 
        WHERE user_id = $1 
        ORDER BY created_at DESC 
        LIMIT 1
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
      
      // Log sacrament data for debugging
      console.log('Sacraments data:', sacraments.rows);
      
      // Transform parent data
      const fatherData = parents.rows.find(p => p.parent_type.toLowerCase() === 'father') || {};
      const motherData = parents.rows.find(p => p.parent_type.toLowerCase() === 'mother') || {};
      
      // Transform sacraments into individual objects with case-insensitive matching
      const baptism = sacraments.rows.find(s => s.sacrament_type.toLowerCase() === 'baptism') || {};
      const firstCommunion = sacraments.rows.find(s => s.sacrament_type.toLowerCase() === 'first communion') || {};
      const confirmation = sacraments.rows.find(s => s.sacrament_type.toLowerCase() === 'confirmation') || {};
      
      // Transform educational background into individual objects
      const preschool = educationalBackground.rows.find(e => e.level.toLowerCase() === 'preschool') || {};
      const elementary = educationalBackground.rows.find(e => e.level.toLowerCase() === 'grade school') || {};
      const highSchool = educationalBackground.rows.find(e => e.level.toLowerCase() === 'high school') || {};
      const seniorHigh = educationalBackground.rows.find(e => e.level.toLowerCase() === 'senior high school') || {};
      
      // Combine all data
      const studentData = {
        ...student,
        family_info: familyInfo.rows,
        father: fatherData,
        mother: motherData,
        baptism,
        firstCommunion,
        confirmation,
        leisure_activities: leisureActivities.rows,
        guardian: guardian.rows,
        siblings: siblings.rows,
        preschool,
        elementary,
        highSchool,
        seniorHigh,
        organizations: organizations.rows,
        health_info: healthInfo.rows,
        test_results: testResults.rows
      };
      
      res.status(200).json(studentData);
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Error in student view API:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  } finally {
    client.release();
  }
}