import type {
  ProductHistoryRequestDto,
  ProductHistoryResponseDto,
} from '../dto/productHistory.js';

export interface ProductHistoryDao {
  getList: (id: number) => Promise<ProductHistoryResponseDto[]>;
  pushToProductHistory: (
    productInfo: ProductHistoryRequestDto,
  ) => Promise<ProductHistoryResponseDto | null>;
}
