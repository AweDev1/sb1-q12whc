import { NextApiRequest, NextApiResponse } from 'next';
import { sign } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Mock user database (replace with actual database in production)
const users = [
  { id: '1', email: 'user@example.com', password: 'password', role: 'user' },
  { id: '2', email: 'admin@example.com', password: 'adminpass', role: 'admin' },
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email } = req.body;

  const user = users.find(u => u.email === email);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const resetToken = sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });

  // In a real application, send an email with the reset link
  console.log(`Reset link: http://localhost:3000/reset-password?token=${resetToken}`);

  res.status(200).json({ message: 'Password reset link sent to your email' });
}