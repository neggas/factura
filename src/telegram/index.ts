const token = process.env.TELEGRAM_BOT_TOKEN!;
const chatId = process.env.TELEGRAM_CHAT_ID!;

export const sendTelegramMessage = async (message: string) => {
  const telegramApiUrl = `https://api.telegram.org/bot${token}/sendMessage`;

  const response = await fetch(telegramApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
      parse_mode: "html",
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      `Failed to send Telegram message: ${
        errorData.description || response.statusText
      }`
    );
  }

  return await response.json();
};
