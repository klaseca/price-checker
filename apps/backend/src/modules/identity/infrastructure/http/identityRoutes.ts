import type { FastifyPluginAsync } from 'fastify';
import { checkApiKeyContoller } from '#modules/identity/index.js';

export const identityRoutes: FastifyPluginAsync = async (app) => {
  app.route(checkApiKeyContoller);
};
