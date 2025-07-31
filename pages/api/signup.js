import bcrypt from 'bcryptjs';
import pool from '@/lib/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { username, email, password, usertype } = req.body;

  // Validate input
  if (!username || !email || !password || !usertype) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  if (!['admin', 'student'].includes(usertype)) {
    return res.status(400).json({ error: 'Invalid user type' });
  }

  if (!/^[a-zA-Z0-9_]{3,20}$/.test(username)) {
    return res.status(400).json({ error: 'Username must be 3-20 characters (letters, numbers, underscores)' });
  }

  if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters' });
  }

  try {
    // Check for existing username or email
    const checkQuery = 'SELECT id FROM users WHERE username = $1 OR email = $2';
    const checkValues = [username, email];
    const checkResult = await pool.query(checkQuery, checkValues);

    if (checkResult.rows.length > 0) {
      return res.status(409).json({ error: 'Username or email already exists' });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12);

    // Insert new user
    const insertQuery = `
      INSERT INTO users (username, email, password_hash, usertype)
      VALUES ($1, $2, $3, $4)
      RETURNING id, username, usertype
    `;
    const insertValues = [username, email, passwordHash, usertype];
    const result = await pool.query(insertQuery, insertValues);

    return res.status(201).json({
      success: true,
      user: {
        id: result.rows[0].id,
        username: result.rows[0].username,
        usertype: result.rows[0].usertype,
      },
    });
  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
}