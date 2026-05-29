import { NextResponse } from 'next/server';
import { authenticateUser } from '@/lib/db';
import { signToken } from '@/lib/auth';

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;
  const user = await authenticateUser(email, password);
  if (!user) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }
  return NextResponse.json({ token: signToken(user), user: { id: user.id, name: user.name, email: user.email } });
}
