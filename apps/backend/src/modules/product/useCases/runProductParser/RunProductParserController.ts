import type { ProductDao } from '#modules/product/dao/ProductDaoTypes.js';
import { productParamsSchema } from '#modules/product/infrastructure/productSchemas.js';
import type { ParserService } from '#modules/product/services/parser/parserTypes.js';
import { defineControllerSchema } from '#shared/infrastructure/core/defineControllerSchema.js';
import type { ControllerOptions } from '#shared/infrastructure/core/types.js';

interface RunProductParserControllerOptions {
  parserService: ParserService;
  productDao: ProductDao;
}

const schema = defineControllerSchema({
  params: productParamsSchema,
});

interface Controller extends ControllerOptions<typeof schema> {}

export class RunProductParserController implements Controller {
  readonly method = 'POST';

  readonly url = '/product/:id/run-parser';

  readonly schema = schema;

  private readonly parserService: RunProductParserControllerOptions['parserService'];

  private readonly productDao: RunProductParserControllerOptions['productDao'];

  constructor({
    parserService,
    productDao,
  }: RunProductParserControllerOptions) {
    this.parserService = parserService;
    this.productDao = productDao;
  }

  handler: Controller['handler'] = async (request, reply) => {
    const { id } = request.params;

    const product = await this.productDao.get(id);

    const parseProductInfo = await this.parserService.runParser({
      id: product.id,
      url: product.url,
    });

    return reply.send(parseProductInfo);
  };
}
