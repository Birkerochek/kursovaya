// app/api/services/route.ts
import { NextResponse } from 'next/server';
import { Client } from 'pg';

export async function GET() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();
    await client.query("SET client_encoding TO 'UTF8'");

    const result = await client.query('SELECT id, img, title FROM services ORDER BY id');
    return NextResponse.json(result.rows, {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    });
  } catch (error) {
    console.error('Ошибка запроса:', error);
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  } finally {
    await client.end();
  }
}
