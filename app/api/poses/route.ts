import { NextResponse } from 'next/server';
import { filterPoses, getAllPoses } from '@/lib/db';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const query = url.searchParams.get('query') ?? undefined;
  const category = url.searchParams.get('category') ?? undefined;
  const results = filterPoses(query, category);
  return NextResponse.json(results);
}
