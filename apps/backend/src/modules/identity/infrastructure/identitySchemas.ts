import { Type } from '@sinclair/typebox';

export const identityApiKeyRequestDtoSchema = Type.Object({
  apiKey: Type.String(),
});
