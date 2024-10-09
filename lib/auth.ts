import { NextApiRequest, NextApiResponse } from 'next';
import { sign, verify } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export interface User {
  id: string;
  email: string;
  role: 'user' | 'admin';
}

export function generateToken(user: User): string {
  return sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
}

export function verifyToken(token: string): User | null {
  try {
    return verify(token, JWT_SECRET) as User;
  } catch (error) {
    return null;
  }
}

export function withAuth(handler: (req: NextApiRequest, res: NextApiResponse, user: User) => Promise<void>) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const user = verifyToken(token);
    if (!user) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    return handler(req, res, user);
  };
}

export function withRole(role: 'user' | 'admin') {
  return (handler: (req: NextApiRequest, res: NextApiResponse, user: User) => Promise<void>) => {
    return withAuth(async (req: NextApiRequest, res: NextApiResponse, user: User) => {
      if (user.role !== role) {
        return res.status(403).json({ message: 'Insufficient permissions' });
      }

      return handler(req, res, user);
    });
  };
}