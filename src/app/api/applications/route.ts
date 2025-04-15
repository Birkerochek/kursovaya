import { NextResponse } from 'next/server';
import { supabase } from '@/app/components/supabaseClient';
import { sendTelegramMessage } from '@/app/lib/telegram';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    
    return NextResponse.json(data);
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

    if (!name || !phone || !service || !message) {
      console.error('Missing required fields:', { name, phone, service, message });
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

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

    try {
      await sendTelegramMessage(telegramMessage);
      console.log('Telegram notification sent successfully');
    } catch (telegramError) {
      console.error('Failed to send Telegram notification:', telegramError);
    }

    const { data, error } = await supabase
      .from('applications')
      .insert([
        {
          name,
          phone,
          email: email || null,
          service,
          message,
          status: 'pending'
        }
      ])
      .select()
      .single();

    if (error) throw error;

    console.log('Saved to database:', data);
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to process application' },
      { status: 500 }
    );
  }
}