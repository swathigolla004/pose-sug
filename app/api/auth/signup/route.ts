import { NextResponse } from 'next/server';
import { createUser } from '@/lib/db';
import { signToken } from '@/lib/auth';

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, password } = body;
  const user = await createUser(name, email, password);
  if (!user) {
    return NextResponse.json({ error: 'User already exists' }, { status: 409 });
  }
  return NextResponse.json({ token: signToken(user), user: { id: user.id, name: user.name, email: user.email } });
}
