import { db } from '#shared/infrastructure/db/index.js';
import { ProductHistoryDaoImpl } from './ProductHistoryDao.js';

export const productHistoryDao = new ProductHistoryDaoImpl(db);
