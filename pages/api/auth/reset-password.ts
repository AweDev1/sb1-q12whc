import { NextApiRequest, NextApiResponse } from 'next';
import { verify } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Mock user database (replace with actual database in production)
let users = [
  { id: '1', email: 'user@example.com', password: 'password', role: 'user' },
  { id: '2', email: 'admin@example.com', password: 'adminpass', role: 'admin' },
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { token, newPassword } = req.body;

  try {
    const decoded = verify(token, JWT_SECRET) as { id: string };
    const user = users.find(u => u.id === decoded.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user's password
    user.password = newPassword;

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    res.status(400).json({ message: 'Invalid or expired token' });
  }
}