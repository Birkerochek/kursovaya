import { NextResponse } from 'next/server';
import { Client } from 'pg';

export async function GET() {
  try {
    const client = new Client({
      connectionString: process.env.DATABASE_URL,
    });

    await client.connect();
    const result = await client.query('SELECT id, email, name, role FROM users');
    await client.end();

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { userId, role } = await request.json();
    
    if (!userId || !role || !['user', 'admin', 'master'].includes(role)) {
      return NextResponse.json(
        { error: 'Invalid user ID or role' },
        { status: 400 }
      );
    }

    const client = new Client({
      connectionString: process.env.DATABASE_URL,
    });

    await client.connect();
    const result = await client.query(
      'UPDATE users SET role = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING id, email, name, role',
      [role, userId]
    );
    await client.end();

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating user role:', error);
    return NextResponse.json({ error: 'Failed to update user role' }, { status: 500 });
  }
}