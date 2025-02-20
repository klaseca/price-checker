import type { ApiKey } from '#modules/identity/domain/identityTypes.js';

export class CheckApiKeyUseCase {
  private readonly apiKey: ApiKey;

  constructor(apiKey: ApiKey) {
    this.apiKey = apiKey;
  }

  execute = (apiKey: string | Array<string> | undefined) => {
    return this.apiKey === undefined || apiKey === this.apiKey;
  };
}
