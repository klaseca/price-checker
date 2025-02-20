import { checkApiKeyUseCase } from '#modules/identity/index.js';
import type { preHandlerAsyncHookHandler } from 'fastify';

export class Hooks {
  checkApiKey: preHandlerAsyncHookHandler = async (request, reply) => {
    const requestApiKey = request.headers['x-api-key'];

    if (!checkApiKeyUseCase.execute(requestApiKey)) {
      return reply.code(401).send({ error: 'Incorrect "x-api-key" header' });
    }
  };
}
