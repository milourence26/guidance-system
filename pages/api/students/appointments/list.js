// pages/api/students/appointments/list.js
import pool from '@/lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { userId } = req.query;
      if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
      }

      const client = await pool.connect();
      const query = `
        SELECT 
          id, 
          appointment_date AS date, 
          appointment_time,
          counselor, 
          status, 
          purpose AS type 
        FROM appointments 
        WHERE user_id = $1 
        ORDER BY appointment_date, appointment_time
      `;
      const result = await client.query(query, [userId]);
      client.release();

      // Format the time for display
      const formattedAppointments = result.rows.map(appointment => {
        const timeParts = appointment.appointment_time.split(':');
        let hours = parseInt(timeParts[0]);
        const minutes = timeParts[1];
        const period = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12; // Convert to 12-hour format
        
        return {
          ...appointment,
          time: `${hours}:${minutes} ${period}`
        };
      });

      res.status(200).json(formattedAppointments);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}