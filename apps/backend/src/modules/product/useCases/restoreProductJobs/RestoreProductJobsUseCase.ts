import type { ProductDao } from '../../dao/ProductDaoTypes.js';
import type { ParserService } from '../../services/parser/parserTypes.js';

interface RestoreProductJobsUseCaseOptions {
  productDao: ProductDao;
  parserService: ParserService;
}

export class RestoreProductJobsUseCase {
  private readonly productDao: RestoreProductJobsUseCaseOptions['productDao'];

  private readonly parserService: RestoreProductJobsUseCaseOptions['parserService'];

  constructor({ productDao, parserService }: RestoreProductJobsUseCaseOptions) {
    this.productDao = productDao;
    this.parserService = parserService;
  }

  execute = async () => {
    const products = await this.productDao.getList({ jobStatus: 'run' });

    for (const product of products) {
      this.parserService.startJob(product);
    }
  };
}
