import { setCookie } from 'cookies-next';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    // Dummy credentials (no hashing, per your request)
    if (username === 'admin' && password === 'admin123') {
      // Set cookie (expires in 1 day)
      setCookie('authToken', 'secure-token-value', {
        req,
        res,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24,
        path: '/',
      });

      return res.status(200).json({ message: 'Login successful' });
    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
