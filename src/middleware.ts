import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const middleware = (request: NextRequest) => {
  // Get the pathname of the request (e.g. /, /protected)
  const path = request.nextUrl.pathname;

  // Define paths that should be publicly accessible
  const isPublicPath = path === '/login' || path === '/register' || path === '/';

  // Get the token from the cookies (Zustand persist storage)
  const authStorage = request.cookies.get('auth-storage')?.value;
  
  let isAuthenticated = false;
  
  // Check if user is authenticated from Zustand storage
  if (authStorage) {
    try {
      const authData = JSON.parse(authStorage);
      isAuthenticated = authData?.state?.isAuthenticated === true && authData?.state?.token;
    } catch (error) {
      // Invalid storage data
      isAuthenticated = false;
    }
  }

  // If the path is public and user is authenticated, redirect to dashboard
  if (isPublicPath && isAuthenticated && path !== '/') {
    return NextResponse.redirect(new URL('/dashboard', request.nextUrl));
  }

  // If the path is not public and user is not authenticated, redirect to login
//   if (!isPublicPath && !isAuthenticated) {
//     return NextResponse.redirect(new URL('/login', request.nextUrl));
//   }

  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};