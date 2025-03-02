import { NextResponse } from 'next/server';
import pool from '@/app/lib/db';

export async function GET() {
  try {
    // Создаем таблицу applications
    await pool.query(`
      CREATE TABLE IF NOT EXISTS applications (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        email VARCHAR(255),
        service VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        status VARCHAR(20) NOT NULL DEFAULT 'pending',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `);

    return NextResponse.json({ message: 'Database initialized successfully' });
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to initialize database' },
      { status: 500 }
    );
  }
} 