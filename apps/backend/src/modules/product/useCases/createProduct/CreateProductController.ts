import type { ControllerOptions } from '#shared/infrastructure/core/types.js';
import type { ParserService } from '../../services/parser/parserTypes.js';
import type { ProductDao } from '../../dao/ProductDaoTypes.js';
import { productRequestDtoSchema } from '#modules/product/infrastructure/productSchemas.js';
import { defineControllerSchema } from '#shared/infrastructure/core/defineControllerSchema.js';

interface CreateProductControllerOptions {
  parserService: ParserService;
  productDao: ProductDao;
}

const schema = defineControllerSchema({
  body: productRequestDtoSchema,
});

interface Controller extends ControllerOptions<typeof schema> {}

export class CreateProductController implements Controller {
  readonly method = 'POST';

  readonly url = '/product';

  readonly schema = schema;

  private readonly parserService: CreateProductControllerOptions['parserService'];

  private readonly productDao: CreateProductControllerOptions['productDao'];

  constructor({ parserService, productDao }: CreateProductControllerOptions) {
    this.parserService = parserService;
    this.productDao = productDao;
  }

  handler: Controller['handler'] = async (request, reply) => {
    const { body } = request;

    if (!this.parserService.hasParser(body.url)) {
      throw new Error(`No parser with name '${body.url}'`);
    }

    const product = await this.productDao.create(body);

    this.parserService.startJob(product);

    return reply.code(201).send(product);
  };
}
