// pages/api/students/appointments.js
import pool from '@/lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const {
        userId,
        name,
        gradeSection,
        date, // This should be in YYYY-MM-DD format
        time,
        purpose,
        nature,
        referredBy,
        personalConcerns,
        educationConcerns,
        otherPersonalConcern,
        otherEducationConcern,
        remarks
      } = req.body;

      // Validate required fields
      if (!userId || !name || !date || !purpose || !nature) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const client = await pool.connect();
      
      // Get current time in Philippine time (UTC+8)
      let appointmentTime = time;
      if (!time) {
        const now = new Date();
        // Convert to Philippine time (UTC+8)
        const phTime = new Date(now.getTime() + (8 * 60 * 60 * 1000));
        const hours = phTime.getUTCHours().toString().padStart(2, '0');
        const minutes = phTime.getUTCMinutes().toString().padStart(2, '0');
        const seconds = phTime.getUTCSeconds().toString().padStart(2, '0');
        appointmentTime = `${hours}:${minutes}:${seconds}`;
      }

      const query = `
        INSERT INTO appointments (
          user_id, name, grade_section, appointment_date, appointment_time,
          purpose, nature, referred_by, personal_concerns, education_concerns,
          other_personal_concern, other_education_concern, remarks, counselor, status
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, 'To be assigned', 'pending')
        RETURNING *
      `;
      
      const result = await client.query(query, [
        parseInt(userId),
        name,
        gradeSection,
        date, // Use the date as-is (YYYY-MM-DD)
        appointmentTime,
        purpose,
        nature,
        referredBy,
        personalConcerns,
        educationConcerns,
        otherPersonalConcern,
        otherEducationConcern,
        remarks
      ]);
      
      client.release();
      
      // Return the created appointment
      const createdAppointment = result.rows[0];
      
      // Format time for display (HH:MM AM/PM)
      const timeParts = createdAppointment.appointment_time.split(':');
      let hours = parseInt(timeParts[0]);
      const minutes = timeParts[1];
      const period = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12;
      
      const formattedAppointment = {
        ...createdAppointment,
        date: createdAppointment.appointment_date,
        time: `${hours}:${minutes} ${period}`,
        type: createdAppointment.purpose
      };
      
      res.status(201).json(formattedAppointment);
    } catch (error) {
      console.error('Error creating appointment:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}