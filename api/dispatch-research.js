export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { fullName, email, telegramHandle, message, countryCode, phoneNumber } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Field message wajib diisi.' });
    }

    const telegramBotToken = process.env.VITE_TELEGRAM_RESEARCH_BOT_TOKEN || process.env.TELEGRAM_RESEARCH_BOT_TOKEN;
    const telegramChatId = process.env.VITE_TELEGRAM_RESEARCH_CHAT_ID || process.env.TELEGRAM_RESEARCH_CHAT_ID;

    if (!telegramBotToken || !telegramChatId) {
      console.warn('Telegram credentials for research dispatch are missing.');
      return res.status(500).json({ error: 'Telegram credentials missing.' });
    }

    const safeName = fullName || 'N/A';
    const safeEmail = email || 'N/A';
    const safeCountry = countryCode || '';
    const safePhone = phoneNumber || 'N/A';
    const safeTelegram = telegramHandle || 'N/A';
    const safeMessage = message || '';

    const textMessage = `📬 <b>NEW CLIENT INQUIRY (Research & Advisory Desk)</b>\n\n` +
      `👤 <b>User / Name:</b>\n└ ${safeName}\n\n` +
      `📋 <b>Contact Details:</b>\n└ ${safeEmail} | (${safeCountry})${safePhone}\n└ Telegram: @${safeTelegram}\n\n` +
      `💬 <b>Message / Payload:</b>\n└ ${safeMessage}\n`;

    const payload = {
      chat_id: telegramChatId,
      text: textMessage,
      parse_mode: 'HTML'
    };

    // If there is a telegram handle or email, we can add inline buttons.
    const inlineButtonsRow = [];
    const sanitizedTelegramHandle = safeTelegram.replace(/[^a-zA-Z0-9_]/g, '');

    if (sanitizedTelegramHandle && sanitizedTelegramHandle.length >= 3 && sanitizedTelegramHandle !== 'N/A') {
      inlineButtonsRow.push({
        text: "💬 Open Telegram User",
        url: `https://t.me/${sanitizedTelegramHandle}`
      });
    }

    if (email && email.includes('@')) {
      inlineButtonsRow.push({
        text: "📧 Email Contact",
        url: `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`
      });
    }

    if (inlineButtonsRow.length > 0) {
      payload.reply_markup = {
        inline_keyboard: [inlineButtonsRow]
      };
    }

    let response = await fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    let data = await response.json();

    if (!response.ok && data.description && data.description.includes('BUTTON_URL_INVALID')) {
      delete payload.reply_markup;
      response = await fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      data = await response.json();
    }

    if (!response.ok) {
      console.error('Telegram dispatch error:', data);
      return res.status(500).json({ error: data.description || 'Failed to send Telegram message' });
    }

    return res.status(200).json({
      success: true,
      message: 'Inquiry berhasil dihantar.'
    });
  } catch (err) {
    console.error('Dispatch API error:', err);
    return res.status(500).json({ error: err.message });
  }
}
