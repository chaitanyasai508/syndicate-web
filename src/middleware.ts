import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Add paths that require authentication
const protectedPaths = ["/dashboard", "/projects", "/test"]
const authPaths = ["/signin", "/signup", "/forgot-password"]

export function middleware(request: NextRequest) {
  const authStorage = request.cookies.get("auth-storage")
  const isLoggedIn = authStorage && JSON.parse(authStorage.value).state.isAuthenticated

  const { pathname } = request.nextUrl

  // Prevent authenticated users from accessing auth pages
  // if (authPaths.some(path => pathname.startsWith(path))) {
  //   if (isLoggedIn) {
  //     return NextResponse.redirect(new URL('/dashboard', request.url))
  //   }
  //   return NextResponse.next()
  // }

  // // Protect routes that require authentication
  // if (protectedPaths.some(path => pathname.startsWith(path))) {
  //   if (!isLoggedIn) {
  //     // Block access before any client code runs
  //     return NextResponse.redirect(new URL('/signin', request.url))
  //   }
  // }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/signin',
    '/signup',
    '/forgot-password',
    '/dashboard/:path*',
    '/projects/:path*',
    '/test/:path*'
  ]
}