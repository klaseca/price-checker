import type { ProductResponseDto } from '#frontendTypes/product.js';
import type { ProductHistoryRequestDto } from '#modules/productHistory/dto/productHistory.js';

interface PushToProductHistoryDto extends ProductHistoryRequestDto {
  name: ProductResponseDto['name'];
  url: ProductResponseDto['url'];
}

export interface PushToProductHistoryUseCase {
  execute: (productInfo: PushToProductHistoryDto) => Promise<void>;
}
