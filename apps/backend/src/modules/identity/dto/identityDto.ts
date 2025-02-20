import type { Static } from '@sinclair/typebox';
import type { identityApiKeyRequestDtoSchema } from '../infrastructure/identitySchemas.js';

export type IdentityApiKeyRequest = Static<
  typeof identityApiKeyRequestDtoSchema
>;

export type IdentityApiKeyResponse = {};
