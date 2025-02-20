import type { FastifyPluginAsync } from 'fastify';
import { webhookCallback } from 'grammy';
import { telegramBot } from '../../telegram/telegramBot.js';

export const telegramApiPathname = '/api/telegram';

export const telegramApi: FastifyPluginAsync = async (app) => {
  app.post(telegramApiPathname, webhookCallback(telegramBot, 'fastify'));
};
