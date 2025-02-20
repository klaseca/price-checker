import { Type } from '@sinclair/typebox';

const productIdSchema = Type.Object({
  id: Type.Number(),
});

export const productHistoryResponseDtoSchema = Type.Object({
  name: Type.String(),
  url: Type.String(),
  productId: Type.Number(),
  price: Type.Number(),
  checkedAt: Type.String(),
});

export const productParamsSchema = productIdSchema;
