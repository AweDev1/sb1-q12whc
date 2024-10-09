import { NextApiRequest, NextApiResponse } from 'next';
import { generateToken } from '@/lib/auth';

// Mock user database (replace with actual database in production)
const users = [
  { id: '1', email: 'user@example.com', password: 'password', role: 'user' },
  { id: '2', email: 'admin@example.com', password: 'adminpass', role: 'admin' },
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password } = req.body;

  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = generateToken(user);

  res.status(200).json({ token, user: { id: user.id, email: user.email, role: user.role } });
}