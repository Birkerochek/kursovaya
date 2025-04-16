import { NextResponse } from 'next/server';
import { Client } from 'pg';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';
import { sign } from 'jsonwebtoken';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const client = new Client({
      connectionString: process.env.NEXT_PUBLIC_SUPABASE_URL,
    });

    await client.connect();

    const result = await client.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    await client.end();

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Пользователь не найден' },
        { status: 401 }
      );
    }

    const user = result.rows[0];

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return NextResponse.json(
        { error: 'Неверный пароль' },
        { status: 401 }
      );
    }

    const token = sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || '214i124g2i1u4hg14i214n1ojo',
      { expiresIn: '24h' }
    );

    (await cookies()).set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 86400 
    });

    const { password: _, ...userWithoutPassword } = user;
    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    console.error('Ошибка при входе:', error);
    return NextResponse.json(
      { error: 'Ошибка при входе в систему' },
      { status: 500 }
    );
  }
} 