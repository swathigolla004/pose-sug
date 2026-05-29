import jwt from 'jsonwebtoken';
import { User } from './db';

const TOKEN_SECRET = process.env.TOKEN_SECRET || 'insposwipe-secret';

export function signToken(user: User) {
  return jwt.sign({ id: user.id, email: user.email, name: user.name }, TOKEN_SECRET, {
    expiresIn: '7d',
  });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, TOKEN_SECRET) as { id: string; email: string; name: string };
  } catch {
    return null;
  }
}
