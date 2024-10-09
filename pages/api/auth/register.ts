import { NextApiRequest, NextApiResponse } from 'next';
import { generateToken } from '@/lib/auth';

// Mock user database (replace with actual database in production)
let users = [
  { id: '1', email: 'user@example.com', password: 'password', role: 'user' },
  { id: '2', email: 'admin@example.com', password: 'adminpass', role: 'admin' },
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password } = req.body;

  if (users.some(u => u.email === email)) {
    return res.status(400).json({ message: 'Email already in use' });
  }

  const newUser = { id: String(users.length + 1), email, password, role: 'user' };
  users.push(newUser);

  const token = generateToken(newUser);

  res.status(201).json({ token, user: { id: newUser.id, email: newUser.email, role: newUser.role } });
}