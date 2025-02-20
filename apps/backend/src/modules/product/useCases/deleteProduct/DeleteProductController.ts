import type { ProductDao } from '../../dao/ProductDaoTypes.js';
import type { JobManagerService } from '../../services/jobManager/jobManagerTypes.js';
import type { ControllerOptions } from '#shared/infrastructure/core/types.js';
import { productParamsSchema } from '#modules/product/infrastructure/productSchemas.js';
import { defineControllerSchema } from '#shared/infrastructure/core/defineControllerSchema.js';

interface DeleteProductControllerOptions {
  jobManagerService: JobManagerService;
  productDao: ProductDao;
}

const schema = defineControllerSchema({
  params: productParamsSchema,
});

interface Controller extends ControllerOptions<typeof schema> {}

export class DeleteProductController implements Controller {
  readonly method = 'DELETE';

  readonly url = '/product/:id';

  readonly schema = schema;

  private readonly jobManagerService: DeleteProductControllerOptions['jobManagerService'];

  private readonly productDao: DeleteProductControllerOptions['productDao'];

  constructor({
    productDao,
    jobManagerService,
  }: DeleteProductControllerOptions) {
    this.jobManagerService = jobManagerService;
    this.productDao = productDao;
  }

  handler: Controller['handler'] = async (request, reply) => {
    const { id } = request.params;

    await this.productDao.delete(id);

    this.jobManagerService.delete(id);

    return reply.send({});
  };
}
