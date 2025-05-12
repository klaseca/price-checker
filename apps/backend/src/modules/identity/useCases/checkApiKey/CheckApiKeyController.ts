import { identityApiKeyRequestDtoSchema } from '#modules/identity/infrastructure/identitySchemas.js';
import { defineControllerSchema } from '#shared/infrastructure/core/defineControllerSchema.js';
import type { ControllerOptions } from '#shared/infrastructure/core/types.js';
import type { CheckApiKeyUseCase } from './CheckApiKeyUseCase.js';

interface CheckApiKeyOptions {
  checkApiKeyUseCase: CheckApiKeyUseCase;
}

const schema = defineControllerSchema({
  body: identityApiKeyRequestDtoSchema,
});

interface Controller extends ControllerOptions<typeof schema> {}

export class CheckApiKeyController implements Controller {
  readonly method = 'POST';

  readonly url = '/identity/check-apikey';

  readonly schema = schema;

  private readonly checkApiKeyUseCase: CheckApiKeyOptions['checkApiKeyUseCase'];

  constructor({ checkApiKeyUseCase }: CheckApiKeyOptions) {
    this.checkApiKeyUseCase = checkApiKeyUseCase;
  }

  handler: Controller['handler'] = (request, reply) => {
    if (!this.checkApiKeyUseCase.execute(request.body.apiKey)) {
      return reply.code(401).send({ error: 'Incorrect "x-api-key" header' });
    }

    return reply.send({});
  };
}
