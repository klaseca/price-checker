import type { ParserService } from '../../services/parser/parserTypes.js';
import type { ProductDao } from '../../dao/ProductDaoTypes.js';
import type { ControllerOptions } from '#shared/infrastructure/core/types.js';
import { defineControllerSchema } from '#shared/infrastructure/core/defineControllerSchema.js';
import { productRequestDtoSchema } from '#modules/product/infrastructure/productSchemas.js';

interface UpdateProductControllerOptions {
  parserService: ParserService;
  productDao: ProductDao;
}

const schema = defineControllerSchema({
  body: productRequestDtoSchema,
});

interface Controller extends ControllerOptions<typeof schema> {}

export class UpdateProductController implements Controller {
  readonly method = 'PUT';

  readonly url = '/product';

  private readonly parserService: UpdateProductControllerOptions['parserService'];

  private readonly productDao: UpdateProductControllerOptions['productDao'];

  constructor({ parserService, productDao }: UpdateProductControllerOptions) {
    this.parserService = parserService;
    this.productDao = productDao;
  }

  handler: Controller['handler'] = async (request, reply) => {
    const { body } = request;

    if (!this.parserService.hasParser(body.url)) {
      throw new Error(`No parser with name '${body.url}'`);
    }

    const updatedProduct = await this.productDao.update(body);

    if (body.jobStatus === 'run') {
      this.parserService.startJob(updatedProduct);
    } else {
      this.parserService.stopJob(updatedProduct.id);
    }

    return reply.send(updatedProduct);
  };
}
