import { AliexpressParser } from '#parsers/AliexpressParser.js';
import { OzonParser } from '#parsers/OzonParser.js';
import { pushToProductHistoryUseCase } from '#modules/productHistory/index.js';
import { productDao } from './dao/index.js';
import { JobManagerServiceImpl } from './services/jobManager/JobManagerService.js';
import { ParserServiceImpl } from './services/parser/ParserService.js';
import { CreateProductController } from './useCases/createProduct/CreateProductController.js';
import { DeleteProductController } from './useCases/deleteProduct/DeleteProductController.js';
import { GetProductListController } from './useCases/getProductList/GetProductListController.js';
import { RestoreProductJobsUseCase } from './useCases/restoreProductJobs/RestoreProductJobsUseCase.js';
import { UpdateProductController } from './useCases/updateProduct/UpdateProductController.js';
import { GetProductController } from './useCases/getProduct/GetProductController.js';
import { RunProductParserController } from './useCases/runProductParser/RunProductParserController.js';

const jobManagerService = new JobManagerServiceImpl();

const parserService = new ParserServiceImpl({
  parsersSetup: [
    ['www.ozon.ru', OzonParser],
    ['aliexpress.ru', AliexpressParser],
  ] as const,
  jobManagerService,
  pushToProductHistoryUseCase,
});

export const restoreProductJobsUseCase = new RestoreProductJobsUseCase({
  productDao,
  parserService,
});

export const createProductController = new CreateProductController({
  parserService,
  productDao,
});

export const updateProductController = new UpdateProductController({
  parserService,
  productDao,
});

export const getProductController = new GetProductController({
  productDao,
});

export const getProductListController = new GetProductListController({
  productDao,
});

export const deleteProductController = new DeleteProductController({
  jobManagerService,
  productDao,
});

export const runProductParserController = new RunProductParserController({
  parserService,
  productDao,
});
