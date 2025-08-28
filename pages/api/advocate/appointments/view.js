import pool from '@/lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const client = await pool.connect();
      
      const query = `
        SELECT 
          a.id,
          a.user_id,
          a.name,
          a.grade_section,
          a.appointment_date as date,
          TO_CHAR(a.appointment_time, 'HH12:MI AM') as time,
          a.counselor,
          a.status,
          a.purpose,
          a.nature,
          a.referred_by,
          a.personal_concerns,
          a.education_concerns,
          a.other_personal_concern,
          a.other_education_concern,
          a.remarks,
          a.created_at,
          a.updated_at,
          u.first_name,
          u.last_name,
          u.email
        FROM appointments a
        LEFT JOIN users u ON a.user_id = u.id
        ORDER BY a.appointment_date DESC, a.appointment_time DESC
      `;
      
      const result = await client.query(query);
      client.release();

      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}