import { Type } from '@sinclair/typebox';

const productIdSchema = Type.Object({
  id: Type.Number(),
});

export const productHistoryResponseDtoSchema = Type.Object({
  price: Type.Number(),
  checkedAt: Type.String(),
});

export const productParamsSchema = productIdSchema;
