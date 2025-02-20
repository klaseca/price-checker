import { httpClient } from '#services/httpClient/HttpClient';
import type { HttpClient } from '#services/httpClient/httpClientTypes';
import type {
  IdentityApiKeyRequest,
  IdentityApiKeyResponse,
} from '#shared-types/identity';

export class IdentityHttpClient {
  private readonly client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  checkApiKey = (
    body: IdentityApiKeyRequest,
  ): Promise<IdentityApiKeyResponse> => {
    return this.client.post('/api/v1/identity/check-apikey', { body });
  };
}

export const identityHttpClient = new IdentityHttpClient(httpClient);
