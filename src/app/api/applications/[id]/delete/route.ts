import { NextResponse } from 'next/server';
import pool from '@/app/lib/db';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id =  params.id;
    
    // Проверяем существование заявки перед удалением
    const checkResult = await pool.query(
      'SELECT id FROM applications WHERE id = $1',
      [id]
    );

    if (checkResult.rows.length === 0) {
      return NextResponse.json(
        { error: 'Заявка не найдена' },
        { status: 404 }
      );
    }

    // Удаляем заявку
    await pool.query(
      'DELETE FROM applications WHERE id = $1',
      [id]
    );

    return NextResponse.json(
      { message: 'Заявка успешно удалена' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Ошибка базы данных:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Не удалось удалить заявку' },
      { status: 500 }
    );
  }
} 