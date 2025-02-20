import { identityApiKeyRequestDtoSchema } from '#modules/identity/infrastructure/identitySchemas.js';
import { defineControllerSchema } from '#shared/infrastructure/core/defineControllerSchema.js';
import type { ControllerOptions } from '#shared/infrastructure/core/types.js';

const schema = defineControllerSchema({
  body: identityApiKeyRequestDtoSchema,
});

interface Controller extends ControllerOptions<typeof schema> {}

export class CheckApiKeyController implements Controller {
  readonly method = 'POST';

  readonly url = '/identity/check-apikey';

  readonly schema = schema;

  handler: Controller['handler'] = (_request, reply) => {
    return reply.send({});
  };
}
