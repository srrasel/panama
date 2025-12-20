import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const session = request.cookies.get("session")?.value
  const userRole = request.cookies.get("user_role")?.value
  const { pathname } = request.nextUrl

  // Define paths
  const authPaths = ["/login", "/register"]
  
  // 1. Redirect logged-in users away from auth pages
  if (session && authPaths.some(path => pathname.startsWith(path))) {
    if (userRole) {
      // Redirect to specific dashboard based on role
      return NextResponse.redirect(new URL(`/${userRole}/dashboard`, request.url))
    }
    // Fallback if role is missing but session exists
    return NextResponse.redirect(new URL("/", request.url))
  }

  // 2. Protect portal pages
  // Check if the path starts with any of the role bases
  const isStudentPath = pathname.startsWith("/student")
  const isTeacherPath = pathname.startsWith("/teacher")
  const isAdminPath = pathname.startsWith("/admin")
  const isParentPath = pathname.startsWith("/parent")
  
  const isPortalPath = isStudentPath || isTeacherPath || isAdminPath || isParentPath

  if (isPortalPath) {
    if (!session) {
      // Redirect to login if not logged in
      return NextResponse.redirect(new URL("/login", request.url))
    }

    // Role-based access control (RBAC)
    if (userRole) {
       if (isStudentPath && userRole !== "student") {
         return NextResponse.redirect(new URL(`/${userRole}/dashboard`, request.url))
       }
       if (isTeacherPath && userRole !== "teacher") {
         return NextResponse.redirect(new URL(`/${userRole}/dashboard`, request.url))
       }
       if (isAdminPath && userRole !== "admin") {
         return NextResponse.redirect(new URL(`/${userRole}/dashboard`, request.url))
       }
       if (isParentPath && userRole !== "parent") {
         return NextResponse.redirect(new URL(`/${userRole}/dashboard`, request.url))
       }
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
