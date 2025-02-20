import type { FastifyPluginAsync } from 'fastify';
import { productRoutes } from '#modules/product/infrastructure/http/productRoutes.js';
import { productHistoryRoutes } from '#modules/productHistory/infrastructure/http/productHistoryRoutes.js';
import { identityRoutes } from '#modules/identity/infrastructure/http/identityRoutes.js';

export const apiV1: FastifyPluginAsync = async (app) => {
  app.register(identityRoutes);
  app.register(productRoutes);
  app.register(productHistoryRoutes);
};
