import { NextResponse } from 'next/server';
import pool from '@/app/lib/db';

export async function GET() {
  try {
    const result = await pool.query(`
      SELECT * FROM masters
      WHERE is_active = true
      ORDER BY name
    `);
    
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch masters' },
      { status: 500 }
    );
  }
} 