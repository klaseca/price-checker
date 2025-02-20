import { httpClient } from '#services/httpClient/HttpClient';
import type { HttpClient } from '#services/httpClient/httpClientTypes';
import type {
  ProductRequestDto,
  ProductResponseDto,
} from '#shared-types/product';

export class ProductHttpClient {
  private readonly client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  get = (id: ProductResponseDto['id']): Promise<ProductResponseDto> => {
    return this.client.get(`/api/v1/product/${id}`);
  };

  getList = (): Promise<ProductResponseDto[]> => {
    return this.client.get('/api/v1/product/list');
  };

  getHistoryList = (id: ProductResponseDto['id']) => {
    return this.client.get(`/api/v1/product/${id}/history`);
  };

  create = (product: ProductRequestDto): Promise<ProductResponseDto> => {
    return this.client.post('/api/v1/product', { body: product });
  };

  update = (product: ProductRequestDto): Promise<ProductResponseDto> => {
    return this.client.put('/api/v1/product', { body: product });
  };

  delete = (id: ProductResponseDto['id']): Promise<{}> => {
    return this.client.delete(`/api/v1/product/${id}`);
  };

  runParser = (id: ProductResponseDto['id']): Promise<{}> => {
    return this.client.post(`/api/v1/product/${id}/run-parser`);
  };
}

export const productHttpClient = new ProductHttpClient(httpClient);
