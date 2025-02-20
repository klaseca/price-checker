import type { Static } from '@sinclair/typebox';
import type {
  productRequestDtoSchema,
  productResponseDtoSchema,
} from '../infrastructure/productSchemas.js';

export type ProductRequestDto = Static<typeof productRequestDtoSchema>;
export type ProductResponseDto = Static<typeof productResponseDtoSchema>;
