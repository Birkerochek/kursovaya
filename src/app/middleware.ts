import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({ 
    req: request,
    secret: process.env.NEXTAUTH_SECRET
  });

  // Проверяем, является ли путь административным
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!token) {
      // Если пользователь не аутентифицирован, перенаправляем на страницу входа
      return NextResponse.redirect(new URL('/', request.url));
    }

    // Проверяем роль пользователя (если она есть в токене)
    if (token.role !== 'admin') {
      // Если у пользователя нет прав администратора, перенаправляем на главную
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

// Указываем, для каких путей должен срабатывать middleware
export const config = {
  matcher: ['pages/admin/:path*']
};