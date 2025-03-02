import { NextResponse } from 'next/server';
import pool from '@/app/lib/db';
import { sendTelegramMessage } from '@/app/lib/telegram';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { masterId } = await request.json();
    
    if (!masterId) {
      return NextResponse.json(
        { error: 'Master ID is required' },
        { status: 400 }
      );
    }

    // Получаем информацию о мастере
    const masterInfo = await pool.query(
      'SELECT name, specialization FROM masters WHERE id = $1 AND is_active = true',
      [masterId]
    );

    if (masterInfo.rows.length === 0) {
      return NextResponse.json(
        { error: 'Master not found or inactive' },
        { status: 404 }
      );
    }

    const master = masterInfo.rows[0];

    // Назначаем мастера на заявку и получаем информацию о заявке
    const result = await pool.query(
      `UPDATE applications 
       SET master_id = $1, assigned_at = NOW()
       WHERE id = $2
       RETURNING *`,
      [masterId, params.id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Application not found' },
        { status: 404 }
      );
    }

    const application = result.rows[0];

    // Формируем и отправляем уведомление в Telegram
    const telegramMessage = `
🔄 <b>Обновление заявки #${application.id}</b>

👤 Клиент: ${application.name}
📱 Телефон: ${application.phone}
✉️ Email: ${application.email || 'Не указан'}
🔧 Услуга: ${application.service}
📝 Сообщение: ${application.message}

👨‍🔧 <b>Назначенный мастер:</b>
👤 ${master.name}
🛠️ ${master.specialization}

#обновление_заявки
    `.trim();

    try {
      await sendTelegramMessage(telegramMessage);
      console.log('Telegram notification sent about master assignment');
    } catch (telegramError) {
      console.error('Failed to send Telegram notification:', telegramError);
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to assign master' },
      { status: 500 }
    );
  }
} 