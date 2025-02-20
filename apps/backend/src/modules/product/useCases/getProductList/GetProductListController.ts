import type { ControllerOptions } from '#shared/infrastructure/core/types.js';
import type { ProductDao } from '../../dao/ProductDaoTypes.js';

interface GetProductListControllerOptions {
  productDao: ProductDao;
}

interface Controller extends ControllerOptions {}

export class GetProductListController implements Controller {
  readonly method = 'GET';

  readonly url = '/product/list';

  private readonly productDao: GetProductListControllerOptions['productDao'];

  constructor({ productDao }: GetProductListControllerOptions) {
    this.productDao = productDao;
  }

  handler: Controller['handler'] = async (_request, reply) => {
    return reply.send(await this.productDao.getList());
  };
}
