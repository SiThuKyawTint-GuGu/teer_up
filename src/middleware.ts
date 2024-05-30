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
  //? admin || ?user
  if (!token) {
    if (pathname.includes("/admin")) {
      return NextResponse.rewrite(new URL(adminLoginPath, req.url));
    }
    if (protectedUserRoutes.includes(pathname)) {
      return NextResponse.rewrite(new URL(loginPath, req.url));
    }
  }

  // If the user is not logged in, no a token and request to private routes, redirect to the login page
  //? user
  if (!token && protectedUserRoutes.includes(pathname)) {
    return NextResponse.rewrite(new URL(loginPath, req.url));
  }

  //? user does not verified
  if (protectedUserRoutes.includes(pathname)) {
    if (token && !user?.verified) {
      return NextResponse.redirect(new URL(`${loginPath}?verified=false`, req.url));
    }
  }

  if (user?.role !== USER_ROLE.ADMIN) {
    if (user?.role === "company" && !pathname.startsWith("/company")) {
      return NextResponse.redirect(new URL("/company", req.url));
    } else if (user?.role === "school" && !pathname.startsWith("/school")) {
      return NextResponse.redirect(new URL("/school/dashboard", req.url));
    } else if (
      token &&
      (pathname.includes("/admin") || pathname === "/login" || pathname === "/auth/login" || pathname === "/")
    ) {
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

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/auth/:path*",
    "/profile/:path*",
    "/saved/:path*",
    "/articles/:path*",
    "/behaviour/:path*",
    "/home/:path*",
    "/content/:path*",
    "/home/:path*",
    "/industry/:path*",
    "/department/:path*",
    "/mentor/:path*",
    "/opportunity/:path*",
    "/blog/:path*",
    "/mentorship/:path*",
    "/pathway/:path*",
    "/events/:path*",
    "/company/:path*",
    "/school/:path*",
    "/",
    {
      source: "/((?!api|_next/static|_next/image|.*\\.png$|.*\\.jpg$).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
