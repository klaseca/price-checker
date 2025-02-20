import type { ProductHistoryDao } from '#modules/productHistory/dao/ProductHistoryDaoTypes.js';
import { defineControllerSchema } from '#shared/infrastructure/core/defineControllerSchema.js';
import type { ControllerOptions } from '#shared/infrastructure/core/types.js';
import { Type } from '@sinclair/typebox';

interface GetProductHistoryControllerOptions {
  productHistoryDao: ProductHistoryDao;
}

const schema = defineControllerSchema({
  params: Type.Object({ id: Type.Number() }),
});

interface Controller extends ControllerOptions<typeof schema> {}

export class GetProductHistoryListController implements Controller {
  readonly method = 'GET';

  readonly url = '/product/:id/history';

  readonly schema = schema;

  private readonly productHistoryDao: GetProductHistoryControllerOptions['productHistoryDao'];

  constructor({ productHistoryDao }: GetProductHistoryControllerOptions) {
    this.productHistoryDao = productHistoryDao;
  }

  handler: Controller['handler'] = async (request, reply) => {
    return reply.send(await this.productHistoryDao.getList(request.params.id));
  };
}
