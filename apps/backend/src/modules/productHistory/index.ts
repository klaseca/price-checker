import { telegramBot } from '#shared/infrastructure/telegram/telegramBot.js';
import { productHistoryDao } from './dao/index.js';
import { TelegramNotificationService } from './services/notification/TelegramNotificationService.js';
import { GetProductHistoryListController } from './useCases/getProductHistoryList/GetProductHistoryListController.js';
import { PushToProductHistoryUseCaseImpl } from './useCases/pushToProductHistory/PushToProductHistoryUseCase.js';

const notificationService = new TelegramNotificationService(telegramBot);

export const pushToProductHistoryUseCase = new PushToProductHistoryUseCaseImpl({
  productHistoryDao,
  notificationService,
});

export const getProductHistoryListController =
  new GetProductHistoryListController({ productHistoryDao });
