// pages/api/logout.js
import { deleteCookie } from 'cookies-next';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Clear the 'auth' cookie
  deleteCookie('auth', { req, res, path: '/' });

  return res.status(200).json({ success: true, message: 'Logged out successfully' });
}
