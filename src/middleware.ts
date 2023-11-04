import CryptoJS from "crypto-js";
import { NextURL } from "next/dist/server/web/next-url";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { USER_ROLE } from "./shared/enums";
import { User } from "./types/User";

const protectedUserRoutes = ["/profile", "/saved", "/mentorship", "/industry", "/department"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl as NextURL;
  // const requestHeaders = new Headers(req.headers);

  // example header set
  // TODO: Review and potentially update the headers
  // requestHeaders.set('x-hello-from-middleware1', 'hello');

  // Define login URL
  const loginPath = "/auth/login";
  const adminLoginPath = "/admin/auth/login";

  // Get the user's info from cookies
  const token = req.cookies.get("token")?.value;
  const getValue = req.cookies.get("userInfo")?.value;

  // decrypt user info
  let user;

  if (getValue && typeof getValue === "string") {
    const bytes = CryptoJS.AES.decrypt(getValue, "userInfo");
    const decryptedUserInfo = JSON.parse(bytes.toString(CryptoJS.enc.Utf8)) as User;
    user = decryptedUserInfo;
  }

  // If the user is not logged in, redirect to the login page
  //? admin
  if (!token) {
    if (pathname.includes("/admin")) {
      return NextResponse.rewrite(new URL(adminLoginPath, req.url));
    }
    if (protectedUserRoutes.includes(pathname)) {
      return NextResponse.rewrite(new URL(loginPath, req.url));
    }
  }

  // If the user is already logged in and has a token, redirect to the home page
  //? user
  if (!token && protectedUserRoutes.includes(pathname)) {
    return NextResponse.rewrite(new URL("/auth/login", req.url));
  }

  //? user does not verified
  if (protectedUserRoutes.includes(pathname)) {
    if (token && !user?.verified) {
      return NextResponse.redirect(new URL(`${loginPath}?verified=false`, req.url));
    }
  }

  if (user?.role !== USER_ROLE.ADMIN) {
    if (token && (pathname.includes("/admin") || pathname === "/login" || pathname === "/auth/login")) {
      if (user?.verified) {
        return NextResponse.rewrite(new URL("/home", req.url));
      }
    }
  } else {
    if (token) {
      if (!pathname.startsWith("/admin")) {
        return NextResponse.rewrite(new URL("/admin", req.url));
      }
    }
  }
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/auth/:path*",
    "/profile/:path*",
    "/saved/:path*",
    "/articles/:path*",
    "/behaviour/:path*",
    "/browse/:path*",
    "/content/:path*",
    "/home/:path*",
    "/mentor/:path*",
    "/opportunity/:path*",
    "/blog/:path*",
    "/mentorship/:path*",
    "/pathway/:path*",
    "/events/:path*",
  ],
};
