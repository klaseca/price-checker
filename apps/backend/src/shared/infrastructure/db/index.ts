import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { config } from '#config.js';
import { Sqlite } from './Sqlite.js';

const dbPath = resolve(
  fileURLToPath(new URL('../../../..', import.meta.url)),
  config.DB_PATH,
);

export const db = new Sqlite(dbPath);
