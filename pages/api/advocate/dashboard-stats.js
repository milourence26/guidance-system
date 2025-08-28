import pool from '@/lib/db';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Get total students count
    const totalStudentsQuery = `
      SELECT COUNT(*) as total_students 
      FROM pds_students 
      WHERE user_id IN (SELECT id FROM users WHERE status = 'active')
    `;

    // Get students by education level
    const studentsByLevelQuery = `
      SELECT 
        education_level,
        COUNT(*) as count
      FROM pds_students 
      WHERE user_id IN (SELECT id FROM users WHERE status = 'active')
      GROUP BY education_level
    `;

    // Get pending appointments count
    const pendingAppointmentsQuery = `
      SELECT COUNT(*) as pending_count 
      FROM appointments 
      WHERE status = 'pending'
    `;

    // Get today's appointments
    const todayAppointmentsQuery = `
      SELECT COUNT(*) as today_count 
      FROM appointments 
      WHERE appointment_date = CURRENT_DATE
    `;

    const [totalStudentsResult, studentsByLevelResult, pendingAppointmentsResult, todayAppointmentsResult] = await Promise.all([
      pool.query(totalStudentsQuery),
      pool.query(studentsByLevelQuery),
      pool.query(pendingAppointmentsQuery),
      pool.query(todayAppointmentsQuery)
    ]);

    const stats = {
      totalStudents: parseInt(totalStudentsResult.rows[0]?.total_students || 0),
      studentsByLevel: {
        'Basic Education': 0,
        'Senior High': 0,
        'Higher Education': 0
      },
      pendingAppointments: parseInt(pendingAppointmentsResult.rows[0]?.pending_count || 0),
      todayAppointments: parseInt(todayAppointmentsResult.rows[0]?.today_count || 0)
    };

    // Map education level counts
    studentsByLevelResult.rows.forEach(row => {
      if (row.education_level && stats.studentsByLevel.hasOwnProperty(row.education_level)) {
        stats.studentsByLevel[row.education_level] = parseInt(row.count);
      }
    });

    res.status(200).json(stats);
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}