import { NextURL } from 'next/dist/server/web/next-url';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const protectedRoutes = ['/dashboard'];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl as NextURL;
  const requestHeaders = new Headers(req.headers);

  // example header set
  // TODO: Review and potentially update the headers
  // requestHeaders.set('x-hello-from-middleware1', 'hello');

  // Define login URL
  const loginPath = '/auth/login';
  const loginUrl = new URL(loginPath, req.url);

  // Get the user's token from cookies
  const token = req.cookies.get('token')?.value;

  // If the user is not logged in, redirect to the login page
  if (!token) {
    return NextResponse.rewrite(loginUrl);
  }

  // If the user is already logged in and tries to access protected routes, redirect to the admin dashboard
  if (protectedRoutes.some(prefix => pathname.startsWith(prefix))) {
    return NextResponse.redirect(new URL('/admin', req.nextUrl));
  }

  // If the user is logged in and accessing other routes, continue processing the request
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
