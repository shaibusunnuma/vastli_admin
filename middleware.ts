import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  exp: number;
  userId: string;
  role: string;
  [key: string]: any;
}

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
  const accessToken = request.cookies.get('access_token')?.value;
  const refreshToken = request.cookies.get('refresh_token')?.value;
  
  // Check if access token exists and is valid
  let isAuthenticated = false;
  let tokenExpired = false;
  
  if (accessToken) {
    try {
      // Decode the JWT token to check expiration
      const decoded = jwtDecode<DecodedToken>(accessToken);
      const currentTime = Math.floor(Date.now() / 1000);
      
      if (decoded.exp > currentTime) {
        // Token is still valid
        isAuthenticated = true;
      } else {
        // Token has expired
        tokenExpired = true;
      }
    } catch (error) {
      // Invalid token format
      tokenExpired = true;
    }
  }
  
  // If token is expired but refresh token exists, let the client handle refresh
  // The auth client will handle token refresh on API calls
  if (tokenExpired && refreshToken) {
    // Allow the request to proceed - client-side auth will handle refresh
    isAuthenticated = true;
  }

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
