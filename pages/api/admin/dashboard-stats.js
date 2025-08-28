import pool from '@/lib/db';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Verify admin access
    const userType = req.headers['x-usertype'];
    if (userType !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Get total students
    const studentsQuery = `
      SELECT COUNT(*) FROM users WHERE usertype = 'student' AND status = 'active'
    `;
    const studentsResult = await pool.query(studentsQuery);
    const totalStudents = parseInt(studentsResult.rows[0].count);

    // Get pending PDS forms
    const pendingFormsQuery = `
      SELECT COUNT(DISTINCT p.user_id) 
      FROM pds_students p
      WHERE p.first_name IS NULL OR p.first_name = ''
    `;
    const pendingFormsResult = await pool.query(pendingFormsQuery);
    const pendingForms = parseInt(pendingFormsResult.rows[0].count);

    // Get completed sessions (appointments with status confirmed)
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    const sessionsQuery = `
      SELECT COUNT(*) 
      FROM appointments 
      WHERE status = 'confirmed'
      AND EXTRACT(MONTH FROM appointment_date) = $1
      AND EXTRACT(YEAR FROM appointment_date) = $2
    `;
    const sessionsResult = await pool.query(sessionsQuery, [currentMonth, currentYear]);
    const completedSessions = parseInt(sessionsResult.rows[0].count);

    // Get this month's appointments
    const monthlyQuery = `
      SELECT COUNT(*) 
      FROM appointments 
      WHERE EXTRACT(MONTH FROM appointment_date) = $1
      AND EXTRACT(YEAR FROM appointment_date) = $2
    `;
    const monthlyResult = await pool.query(monthlyQuery, [currentMonth, currentYear]);
    const thisMonth = parseInt(monthlyResult.rows[0].count);

    // Calculate percentage changes (you might want to implement more sophisticated analytics)
    const stats = {
      totalStudents: {
        value: totalStudents,
        change: "+0%"
      },
      pendingForms: {
        value: pendingForms,
        change: "+0%"
      },
      completedSessions: {
        value: completedSessions,
        change: "+0%"
      },
      thisMonth: {
        value: thisMonth,
        change: "+0%"
      }
    };

    res.status(200).json(stats);
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}