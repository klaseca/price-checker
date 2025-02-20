import type { ProductHistoryDao } from '#modules/productHistory/dao/ProductHistoryDaoTypes.js';
import type { NotificationService } from '../../services/notification/notificationTypes.js';
import type { PushToProductHistoryUseCase } from './pushToProductHistoryTypes.js';

interface PushToProductHistoryUseCaseOptions {
  productHistoryDao: ProductHistoryDao;
  notificationService: NotificationService;
}

export class PushToProductHistoryUseCaseImpl
  implements PushToProductHistoryUseCase
{
  private readonly productHistoryDao: PushToProductHistoryUseCaseOptions['productHistoryDao'];

  private readonly notificationService: PushToProductHistoryUseCaseOptions['notificationService'];

  constructor({
    productHistoryDao,
    notificationService,
  }: PushToProductHistoryUseCaseOptions) {
    this.productHistoryDao = productHistoryDao;
    this.notificationService = notificationService;
  }

  execute: PushToProductHistoryUseCase['execute'] = async (
    productParsedInfo,
  ) => {
    const productHistoryDto =
      await this.productHistoryDao.pushToProductHistory(productParsedInfo);

    if (productHistoryDto != null) {
      await this.notificationService.priceDown(productHistoryDto);
    }
  };
}
