import type { ControllerOptions } from '#shared/infrastructure/core/types.js';
import type { ProductDao } from '../../dao/ProductDaoTypes.js';
import { productParamsSchema } from '#modules/product/infrastructure/productSchemas.js';
import { defineControllerSchema } from '#shared/infrastructure/core/defineControllerSchema.js';

interface GetProductControllerOptions {
  productDao: ProductDao;
}

const schema = defineControllerSchema({
  params: productParamsSchema,
});

interface Controller extends ControllerOptions<typeof schema> {}

export class GetProductController implements Controller {
  readonly method = 'GET';

  readonly url = '/product/:id';

  readonly schema = schema;

  private readonly productDao: GetProductControllerOptions['productDao'];

  constructor({ productDao }: GetProductControllerOptions) {
    this.productDao = productDao;
  }

  handler: Controller['handler'] = async (request, reply) => {
    const product = await this.productDao.get(request.params.id);

    if (product == null) {
      throw new Error('Not found');
    }

    return reply.send(product);
  };
}
