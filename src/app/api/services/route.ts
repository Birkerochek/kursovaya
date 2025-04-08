// app/api/services/route.ts
import { NextResponse } from 'next/server';
import { supabase } from '@/app/components/supabaseClient';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('services')
      .select('id, img, title, description, price')
      .order('id');

    if (error) {
      console.error('Ошибка Supabase:', error);
      return NextResponse.json(
        { error: 'Ошибка при получении данных' },
        { status: 500 }
      );
    }

    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    });
  } catch (error) {
    console.error('Ошибка сервера:', error);
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
}
