import { NextURL } from "next/dist/server/web/next-url";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const protectedRoutes = ["/admin", "/dashboard"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl as NextURL;
  // const requestHeaders = new Headers(req.headers);
  console.log(pathname);

  // example header set
  // TODO: Review and potentially update the headers
  // requestHeaders.set('x-hello-from-middleware1', 'hello');

  // Define login URL
  const loginPath = "/auth/login";
  const adminLoginPath = "/admin/auth/login";

  // Get the user's info from cookies
  const token = req.cookies.get("token")?.value;
  const userInfo = req.cookies.get("user_info")?.value;
  console.log(userInfo);

  // If the user is not logged in, redirect to the login page
  if (!token) {
    if (pathname.includes("/admin")) {
      return NextResponse.rewrite(new URL(adminLoginPath, req.url));
    }
    return NextResponse.rewrite(new URL(loginPath, req.url));
  }

  // Redirect to home if there has token in cookie
  // if (token) {
  //   if (pathname.includes("/auth")) {
  //     return NextResponse.rewrite(new URL("/home", req.url));
  //   }
  // }

  // If the user is already logged in and tries to access protected routes, redirect to the admin dashboard
  // if (protectedRoutes.some(prefix => pathname.startsWith(prefix))) {
  //   return NextResponse.redirect(new URL("/admin", req.nextUrl));
  // }

  // If the user is logged in and accessing other routes, continue processing the request
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"],
};
