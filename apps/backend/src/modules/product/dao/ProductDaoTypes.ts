import type {
  ProductRequestDto,
  ProductResponseDto,
} from '#modules/product/dto/productDto.js';

type ProductSqlParams = Partial<Pick<ProductRequestDto, 'jobStatus'>>;

export interface ProductDao {
  create: (product: ProductRequestDto) => Promise<ProductResponseDto>;
  update: (product: ProductRequestDto) => Promise<ProductResponseDto>;
  delete: (id: ProductResponseDto['id']) => Promise<void>;
  get: (id: ProductResponseDto['id']) => Promise<ProductResponseDto>;
  getList: (params?: ProductSqlParams) => Promise<ProductResponseDto[]>;
}
