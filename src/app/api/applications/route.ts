import { NextResponse } from 'next/server';
import pool from '@/app/lib/db';
import { sendTelegramMessage } from '@/app/lib/telegram';

export async function GET() {
  try {
    const result = await pool.query(`
      SELECT * FROM applications
      ORDER BY created_at DESC
    `);
    
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch applications' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('API received data:', body);

    const { name, phone, email, techType: service, description: message } = body;

    // Проверяем обязательные поля
    if (!name || !phone || !service || !message) {
      console.error('Missing required fields:', { name, phone, service, message });
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Формируем сообщение для Telegram
    const telegramMessage = `
🔔 <b>Новая заявка!</b>

👤 Клиент: ${name}
📱 Телефон: ${phone}
✉️ Email: ${email || 'Не указан'}
🔧 Услуга: ${service}
📝 Сообщение: ${message}

👨‍🔧 Статус мастера: Не назначен

#новая_заявка
    `.trim();

    // Отправляем сообщение в Telegram
    try {
      await sendTelegramMessage(telegramMessage);
      console.log('Telegram notification sent successfully');
    } catch (telegramError) {
      console.error('Failed to send Telegram notification:', telegramError);
    }

    // Сохраняем в базу данных
    console.log('Saving to database...');
    const result = await pool.query(
      `INSERT INTO applications (name, phone, email, service, message, status)
       VALUES ($1, $2, $3, $4, $5, 'pending')
       RETURNING *`,
      [name, phone, email || null, service, message]
    );

    console.log('Saved to database:', result.rows[0]);
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to process application' },
      { status: 500 }
    );
  }
} 