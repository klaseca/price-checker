import { Bot } from 'grammy';
import { config } from '#config.js';

export const telegramBot = new Bot(config.TELEGRAM_BOT_TOKEN);

telegramBot.use((ctx, next) => {
  if (ctx.from?.id === config.TELEGRAM_BOT_OWNER_ID) {
    return next();
  }

  return;
});

telegramBot.command('start', (ctx) => ctx.reply('Welcome! Up and running.'));

telegramBot.on('message', (ctx) => ctx.reply('Got another message!'));
