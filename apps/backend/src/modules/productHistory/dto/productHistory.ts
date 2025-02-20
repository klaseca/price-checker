import type { Static } from '@sinclair/typebox';
import type { productHistoryResponseDtoSchema } from '../infrastructure/productHistorySchemas.js';
import type { ProductParsedInfo } from '#parsers/parserTypes.js';

export interface ProductHistoryRequestDto extends ProductParsedInfo {
  productId: number;
}

export type ProductHistoryResponseDto = Static<
  typeof productHistoryResponseDtoSchema
>;
