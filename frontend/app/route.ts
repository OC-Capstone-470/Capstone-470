import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  // Optional: preserve query params or referrer
  const url = new URL('/login', request.url);
  return NextResponse.redirect(url);
}

// Support POST too (in case someone hits root with form)
export async function POST(request: NextRequest) {
  return GET(request);
}
