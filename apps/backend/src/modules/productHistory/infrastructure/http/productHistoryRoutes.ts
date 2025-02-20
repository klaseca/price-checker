import type { FastifyPluginAsync } from 'fastify';
import { getProductHistoryListController } from '#modules/productHistory/index.js';
import { hooks } from '#shared/infrastructure/http/index.js';

export const productHistoryRoutes: FastifyPluginAsync = async (app) => {
  app.addHook('preHandler', hooks.checkApiKey);

  app.route(getProductHistoryListController);
};
