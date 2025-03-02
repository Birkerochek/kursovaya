import pool from './db';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

// Функция для отправки сообщения конкретному пользователю
export async function sendTelegramMessageToUser(chatId: string | number, message: string) {
  if (!TELEGRAM_BOT_TOKEN) {
    console.error('Telegram bot token is not configured');
    return;
  }

  try {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML',
      }),
    });

    const responseData = await response.json();
    console.log('Telegram API response:', responseData);

    if (!response.ok) {
      throw new Error(`Failed to send Telegram message: ${JSON.stringify(responseData)}`);
    }

    return responseData;
  } catch (error) {
    console.error('Error sending Telegram message:', error);
    throw error;
  }
}

// Функция для отправки сообщения администратору
export async function sendTelegramMessage(message: string) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.error('Telegram credentials are not configured');
    return;
  }

  try {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'HTML',
      }),
    });

    const responseData = await response.json();
    console.log('Telegram API response:', responseData);

    if (!response.ok) {
      throw new Error(`Failed to send Telegram message: ${JSON.stringify(responseData)}`);
    }

    return responseData;
  } catch (error) {
    console.error('Error sending Telegram message:', error);
    throw error;
  }
}

// Функция для сохранения связи между номером телефона и chat_id
export async function saveTelegramUser(phone: string, chatId: number) {
  try {
    const result = await pool.query(
      `INSERT INTO telegram_users (phone, chat_id)
       VALUES ($1, $2)
       ON CONFLICT (phone) DO UPDATE
       SET chat_id = EXCLUDED.chat_id
       RETURNING *`,
      [phone, chatId]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error saving telegram user:', error);
    throw error;
  }
}

// Функция для получения chat_id по номеру телефона
export async function getTelegramChatId(phone: string): Promise<number | null> {
  try {
    const result = await pool.query(
      'SELECT chat_id FROM telegram_users WHERE phone = $1',
      [phone]
    );
    return result.rows.length > 0 ? result.rows[0].chat_id : null;
  } catch (error) {
    console.error('Error getting telegram chat_id:', error);
    return null;
  }
} 