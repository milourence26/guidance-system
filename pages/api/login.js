// pages/api/login.js
import { Pool } from 'pg';
import { setCookie } from 'cookies-next';

const pool = new Pool({
  connectionString: process.env.NEON_DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Missing username or password' });
  }

  try {
    const query = 'SELECT * FROM users WHERE username = $1 AND password = $2';
    const values = [username, password];

    const result = await pool.query(query, values);

    if (result.rows.length === 1) {
      const user = result.rows[0];

      // Set auth cookie using cookies-next
      setCookie('auth', user.role, {
        req,
        res,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24, // 1 day
        path: '/',
      });

      return res.status(200).json({ success: true, role: user.role });
    } else {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
}
