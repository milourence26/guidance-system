import pool from '@/lib/db';

export default async function handler(req, res) {
  if (req.method === 'PATCH') {
    try {
      const { appointmentId, status, counselor } = req.body;

      if (!appointmentId) {
        return res.status(400).json({ error: 'Appointment ID is required' });
      }

      if (!status || !['pending', 'confirmed', 'cancelled', 'completed'].includes(status)) {
        return res.status(400).json({ error: 'Valid status is required' });
      }

      const client = await pool.connect();
      
      let query;
      let values;

      if (counselor) {
        query = `
          UPDATE appointments 
          SET status = $1, counselor = $2, updated_at = CURRENT_TIMESTAMP 
          WHERE id = $3 
          RETURNING *
        `;
        values = [status, counselor, appointmentId];
      } else {
        query = `
          UPDATE appointments 
          SET status = $1, updated_at = CURRENT_TIMESTAMP 
          WHERE id = $2 
          RETURNING *
        `;
        values = [status, appointmentId];
      }

      const result = await client.query(query, values);
      client.release();

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Appointment not found' });
      }

      res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error('Error updating appointment:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['PATCH']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}