import { NextResponse } from 'next/server';
import pool from '@/app/lib/db';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { status } = await request.json();
    
    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status value' },
        { status: 400 }
      );
    }

    const result = await pool.query(
      'UPDATE applications SET status = $1 WHERE id = $2 RETURNING *',
      [status, params.id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Application not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update application status' },
      { status: 500 }
    );
  }
} 