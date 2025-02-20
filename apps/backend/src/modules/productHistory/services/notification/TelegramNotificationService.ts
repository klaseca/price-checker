import { Bot, InlineKeyboard } from 'grammy';
import { config } from '#config.js';
import type { NotificationService } from './notificationTypes.js';

export class TelegramNotificationService implements NotificationService {
  private readonly bot: Bot;

  constructor(bot: Bot) {
    this.bot = bot;
  }

  priceDown: NotificationService['priceDown'] = async ({
    name,
    checkedAt,
    price,
    url,
  }) => {
    const message = [
      `Name: ${name}`,
      `Date: ${checkedAt}`,
      `Current price: ${price}`,
    ].join('\n');

    const keyboard = new InlineKeyboard().url('Product link', url);

    await this.bot.api.sendMessage(config.TELEGRAM_BOT_OWNER_ID, message, {
      reply_markup: keyboard,
    });
  };
}
