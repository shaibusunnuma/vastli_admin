import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Paths that don't require authentication
const publicPaths = ['/login', '/signup', '/forgot-password', '/reset-password'];

// Paths that should redirect to dashboard if already authenticated
const authOnlyPaths = [...publicPaths];

// Function to check if the path is public
const isPublicPath = (path: string) => {
  return publicPaths.some((publicPath) => path.startsWith(publicPath));
};

// Function to check if the path is auth-only
const isAuthOnlyPath = (path: string) => {
  return authOnlyPaths.some((authPath) => path.startsWith(authPath));
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Get auth token from cookies
  const authToken = request.cookies.get('access_token')?.value;
  const isAuthenticated = !!authToken;

  // If user is not authenticated and trying to access a protected route
  if (!isAuthenticated && !isPublicPath(pathname)) {
    const url = new URL('/login', request.url);
    url.searchParams.set('callbackUrl', encodeURI(pathname));
    return NextResponse.redirect(url);
  }

  // If user is authenticated and trying to access an auth-only route (like login)
  if (isAuthenticated && isAuthOnlyPath(pathname)) {
    const url = new URL('/dashboard', request.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (static files)
     * 4. /_vercel (Vercel internals)
     * 5. /favicon.ico, /robots.txt (common static files)
     */
    '/((?!api|_next|_static|_vercel|favicon.ico|robots.txt).*)',
  ],
};
