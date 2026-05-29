import { NextResponse } from 'next/server';
import { findUserByEmail } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

export async function GET(request: Request) {
  const auth = request.headers.get('authorization')?.replace('Bearer ', '');
  const payload = auth ? verifyToken(auth) : null;
  if (!payload) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const user = await findUserByEmail(payload.email);
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }
  return NextResponse.json({ id: user.id, name: user.name, email: user.email, saved: user.saved });
}
