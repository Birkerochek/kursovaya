import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  const response = NextResponse.next();
  response.headers.set('x-middleware-cache', 'no-cache');
  
  if (!token || token.role !== 'admin' && token.role !== 'master') {
    return NextResponse.redirect(new URL('/', request.url));
  }
  if (token.role === 'master' && request.nextUrl.pathname.startsWith('/admin/users')) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*']
  
};