import type { ProductResponseDto } from '#frontendTypes/product.js';
import type { ProductHistoryResponseDto } from '#modules/productHistory/dto/productHistory.js';

interface PriceDownDto extends ProductHistoryResponseDto {
  name: ProductResponseDto['name'];
  url: ProductResponseDto['url'];
}

export interface NotificationService {
  priceDown: (priceDownDto: PriceDownDto) => Promise<void>;
}
