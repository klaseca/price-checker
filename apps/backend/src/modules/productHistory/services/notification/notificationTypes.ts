import type { ProductHistoryResponseDto } from '#modules/productHistory/dto/productHistory.js';

export interface NotificationService {
  priceDown: (priceDownDto: ProductHistoryResponseDto) => Promise<void>;
}
