import { type FastifyServerOptions, fastify } from 'fastify';
import cors from '@fastify/cors';
import { config } from '#config.js';
import { restoreProductJobsUseCase } from '#modules/product/index.js';
import { telegramBot } from '#shared/infrastructure/telegram/telegramBot.js';
import { apiV1 } from '#shared/infrastructure/http/api/v1.js';
import { telegramApiPathname, telegramApi } from './api/telegram.js';

const loggerConfigFromEnv: Record<string, FastifyServerOptions['logger']> = {
  development: {
    transport: {
      target: 'pino-pretty',
    },
  },
  production: true,
  test: false,
};

const app = fastify({
  logger: loggerConfigFromEnv[config.NODE_ENV] ?? true,
});

export const logger = app.log;

app.register(cors);
app.register(apiV1, { prefix: '/api/v1' });
app.register(telegramApi);

export const runHttpServer = async () => {
  try {
    await app.listen({ host: config.HOST, port: config.PORT });
    await restoreProductJobsUseCase.execute();
    await telegramBot.api.setWebhook(
      `${config.TELEGRAM_BOT_WEBHOOK_URL}${telegramApiPathname}`,
    );
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};
