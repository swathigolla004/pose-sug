import { NextResponse } from 'next/server';
import { getUserFavorites, toggleFavorite } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

async function resolveUser(request: Request) {
  const auth = request.headers.get('authorization')?.replace('Bearer ', '');
  if (!auth) return null;
  return verifyToken(auth);
}

export async function GET(request: Request) {
  const user = await resolveUser(request);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return NextResponse.json(await getUserFavorites(user.id));
}

export async function POST(request: Request) {
  const user = await resolveUser(request);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const body = await request.json();
  const updated = await toggleFavorite(user.id, body.poseId);
  if (!updated) {
    return NextResponse.json({ error: 'Unable to update favorites' }, { status: 400 });
  }
  return NextResponse.json({ saved: updated });
}
