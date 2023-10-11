import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const protectedRoutes = ['/admin', '/dashboard'];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (protectedRoutes.some(prefix => pathname.startsWith(prefix))) {
    return NextResponse.rewrite(new URL('/admin/auth/login', req.url));
  }
}

export const config = {
  matcher: ['/admin/:path*', '/dashboard/:path*'],
};
