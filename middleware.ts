// import { NextRequest, NextResponse } from 'next/server';
// import { getSessionCookie } from "better-auth/cookies";

// const protectedRoutes = ['/profile', '/admin/dashboard'];

// export async function middleware(req: NextRequest) {
//       const { nextUrl } = req;
//       const sessionCookie = getSessionCookie(req);

//       const res = NextResponse.next();

//       const isLoggedIn = !!sessionCookie;
//       const isOnProtectedRoute = protectedRoutes.includes(nextUrl.pathname);
//       const isOnAuthRoute = nextUrl.pathname.startsWith('/login') || nextUrl.pathname.startsWith('/register');

//       if (isOnProtectedRoute && !isLoggedIn) {
//             return NextResponse.redirect(new URL('/login', req.url));
//       }

//       if (isOnAuthRoute && isLoggedIn) {
//             return NextResponse.redirect(new URL('/profile', req.url));
//       }

//       return res;
// }

// export const config = {
//       matcher: [
//             '/((?!api|_next/static|_next/image|favicon.ico).*)'
//       ]
// }

// import { NextRequest, NextResponse } from "next/server";
// import { getSessionCookie } from "better-auth/cookies";

// const protectedPrefixes = ["/profile", "/admin/dashboard", "/checkout"];

// function isProtected(pathname: string) {
//   return protectedPrefixes.some((p) => pathname === p || pathname.startsWith(p + "/"));
// }

// function isAuthRoute(pathname: string) {
//   return pathname === "/login" || pathname.startsWith("/login/")
//       || pathname === "/register" || pathname.startsWith("/register/");
// }

// export async function middleware(req: NextRequest) {
//   const { nextUrl } = req;
//   const pathname = nextUrl.pathname;

//   const sessionCookie = getSessionCookie(req);
//   const isLoggedIn = !!sessionCookie;

//   // ✅ If route is protected and user is not logged in => redirect to login with callbackURL
//   if (isProtected(pathname) && !isLoggedIn) {
//     const loginUrl = new URL("/login", req.url);
//     loginUrl.searchParams.set("callbackURL", pathname + nextUrl.search); // keep query too
//     return NextResponse.redirect(loginUrl);
//   }

//   // ✅ If user is logged in and goes to /login or /register => redirect away
//   if (isAuthRoute(pathname) && isLoggedIn) {
//     // if ?callbackURL exists, honor it, otherwise /profile
//     const cb = nextUrl.searchParams.get("callbackURL");
//     const safeCb = cb && cb.startsWith("/") ? cb : "/profile";
//     return NextResponse.redirect(new URL(safeCb, req.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
// };

import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const protectedPrefixes = ["/profile", "/checkout", "/admin/dashboard"];

function isProtected(pathname: string) {
  return protectedPrefixes.some((p) => pathname === p || pathname.startsWith(p + "/"));
}

function isAuthRoute(pathname: string) {
  return pathname === "/login" || pathname.startsWith("/login/")
    || pathname === "/register" || pathname.startsWith("/register/");
}

export function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const pathname = nextUrl.pathname;

  const sessionCookie = getSessionCookie(req);
  const isLoggedIn = !!sessionCookie;

  if (isProtected(pathname) && !isLoggedIn) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackURL", pathname + nextUrl.search);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthRoute(pathname) && isLoggedIn) {
    const cb = nextUrl.searchParams.get("callbackURL");
    const safeCb = cb && cb.startsWith("/") ? cb : "/profile";
    return NextResponse.redirect(new URL(safeCb, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
