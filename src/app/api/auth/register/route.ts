import { NextResponse } from 'next/server';
import { Client } from 'pg';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json();

    const client = new Client({
      connectionString: process.env.NEXT_PUBLIC_SUPABASE_URL,
    });

    await client.connect();

    const existingUser = await client.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (existingUser.rows.length > 0) {
      return NextResponse.json(
        { error: 'Пользователь с таким email уже существует' },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await client.query(
      'INSERT INTO users (email, password, name, role, created_at, updated_at) VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING id, email, name, role',
      [email, hashedPassword, name, 'user']
    );

    await client.end();

    return NextResponse.json(
      { message: 'Регистрация успешна', user: result.rows[0] },
      { status: 201 }
    );
  } catch (error) {
    console.error('Ошибка при регистрации:', error);
    return NextResponse.json(
      { error: 'Ошибка при регистрации пользователя' },
      { status: 500 }
    );
  }
}