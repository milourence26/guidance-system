import pool from '@/lib/db';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Get recent PDS views/updates
    const recentPdsQuery = `
      SELECT 
        ps.first_name,
        ps.last_name,
        ps.updated_at,
        'PDS Updated' as action
      FROM pds_students ps
      WHERE ps.updated_at >= CURRENT_DATE - INTERVAL '7 days'
      ORDER BY ps.updated_at DESC
      LIMIT 5
    `;

    // Get recent appointments
    const recentAppointmentsQuery = `
      SELECT 
        a.name,
        a.purpose as action,
        a.created_at,
        'Appointment' as type
      FROM appointments a
      WHERE a.created_at >= CURRENT_DATE - INTERVAL '7 days'
      ORDER BY a.created_at DESC
      LIMIT 5
    `;

    const [pdsResult, appointmentsResult] = await Promise.all([
      pool.query(recentPdsQuery),
      pool.query(recentAppointmentsQuery)
    ]);

    const activities = [
      ...pdsResult.rows.map(row => ({
        action: 'Student PDS updated',
        user: `${row.first_name} ${row.last_name}`,
        time: new Date(row.updated_at).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        type: 'info'
      })),
      ...appointmentsResult.rows.map(row => ({
        action: `Appointment ${row.action.toLowerCase()}`,
        user: row.name,
        time: new Date(row.created_at).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        type: 'success'
      }))
    ];

    // Sort by time and take top 5
    activities.sort((a, b) => new Date(b.time) - new Date(a.time));
    const recentActivities = activities.slice(0, 5);

    res.status(200).json(recentActivities);
  } catch (error) {
    console.error('Error fetching recent activity:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}