import type { FastifyPluginAsync } from 'fastify';
import {
  createProductController,
  deleteProductController,
  getProductController,
  getProductListController,
  runProductParserController,
  updateProductController,
} from '#modules/product/index.js';
import { hooks } from '#shared/infrastructure/http/index.js';

export const productRoutes: FastifyPluginAsync = async (app) => {
  app.addHook('preHandler', hooks.checkApiKey);

  app.route(createProductController);

  app.route(updateProductController);

  app.route(getProductController);

  app.route(getProductListController);

  app.route(deleteProductController);

  app.route(runProductParserController);
};
