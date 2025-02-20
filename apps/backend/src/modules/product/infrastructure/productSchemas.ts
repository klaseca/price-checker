import { Type } from '@sinclair/typebox';

const productIdSchema = Type.Object({
  id: Type.Number(),
});

const productDtoBaseSchema = Type.Object({
  name: Type.String(),
  url: Type.String(),
  cron: Type.String(),
  jobStatus: Type.Union([Type.Literal('run'), Type.Literal('stop')]),
});

export const productRequestDtoSchema = Type.Composite([
  Type.Partial(productIdSchema),
  productDtoBaseSchema,
]);

export const productResponseDtoSchema = Type.Composite([
  productIdSchema,
  productDtoBaseSchema,
  Type.Object({
    updatedAt: Type.String(),
    createdAt: Type.String(),
  }),
]);

export const productParamsSchema = productIdSchema;
