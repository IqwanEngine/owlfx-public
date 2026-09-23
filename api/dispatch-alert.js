import { createClient } from '@supabase/supabase-js';

// Vercel Serverless Function format (Node.js)
export default async function handler(req, res) {
  // Hanya benarkan kaedah POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { title, impact, source, message } = req.body;

    if (!title || !message) {
      return res.status(400).json({ error: 'Field title dan message wajib diisi.' });
    }

    // Inisialisasi Supabase menggunakan Service Role Key
    // (Selamat di Vercel API, kerana ia tidak diekspos ke frontend)
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      return res.status(500).json({ error: 'Supabase credentials missing.' });
    }

    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

    const { data, error } = await supabaseAdmin
      .from('vip_alerts')
      .insert([
        {
          title: title,
          impact: impact || 'HIGH IMPACT',
          source: source || 'OWL-FX News',
          message: message
        }
      ])
      .select();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    // Hantar ke Telegram mengikut request pengguna menggunakan TELEGRAM_BOT_TOKEN dan TELEGRAM_VIP_ALERT_ID
    const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
    const telegramChatId = process.env.TELEGRAM_VIP_ALERT_ID;

    if (telegramBotToken && telegramChatId) {
      const telegramText = `🚨 <b>OWL-FX VIP ALERT</b> 🚨\n\n<b>Title:</b> ${title}\n<b>Impact:</b> ${impact || 'HIGH IMPACT'}\n<b>Source:</b> ${source || 'OWL-FX News'}\n\n<b>Message:</b>\n${message}`;
      
      try {
        const response = await fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: telegramChatId,
            text: telegramText,
            parse_mode: 'HTML'
          })
        });

        if (!response.ok) {
          const tgError = await response.json();
          console.error('Telegram dispatch error:', tgError);
        }
      } catch (tgErr) {
        console.error('Failed to send to Telegram:', tgErr);
      }
    } else {
      console.warn('Telegram credentials (TELEGRAM_BOT_TOKEN or TELEGRAM_VIP_ALERT_ID) are missing. Skipping Telegram alert.');
    }

    return res.status(200).json({
      success: true,
      message: 'Alert berhasil disimpan.',
      data
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
