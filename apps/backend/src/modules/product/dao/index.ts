import { db } from '#shared/infrastructure/db/index.js';
import { ProductDaoImpl } from './ProductDao.js';

export const productDao = new ProductDaoImpl(db);
