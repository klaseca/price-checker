import type { ProductHistoryRequestDto } from '#modules/productHistory/dto/productHistory.js';

export interface PushToProductHistoryUseCase {
  execute: (productInfo: ProductHistoryRequestDto) => Promise<void>;
}
