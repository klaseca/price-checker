import { Type } from '@sinclair/typebox';
import { makeConfig } from '#shared/utils/makeConfig.js';

const configSchema = Type.Object({
  NODE_ENV: Type.Union([
    Type.Literal('development'),
    Type.Literal('test'),
    Type.Literal('production'),
  ]),
  HOST: Type.String({ format: 'ipv4', default: '127.0.0.1' }),
  PORT: Type.Number({ minimum: 1, default: 3000 }),
  API_KEY: Type.Optional(Type.String()),
  DB_PATH: Type.String({ default: './db/app.db' }),
  TELEGRAM_BOT_TOKEN: Type.String(),
  TELEGRAM_BOT_WEBHOOK_URL: Type.String({ format: 'url' }),
  TELEGRAM_BOT_OWNER_ID: Type.Number({ minimum: 1 }),
});

export const config = makeConfig(process.env, configSchema);
