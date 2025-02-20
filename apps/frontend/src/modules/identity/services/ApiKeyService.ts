export class ApiKeyService {
  apiKey: string | null;

  private readonly storageKey = 'apiKey';

  private readonly storage: Storage;

  get isAuthorized(): boolean {
    return this.apiKey != null;
  }

  constructor(storage: Storage) {
    this.storage = storage;
    this.apiKey = this.storage.getItem(this.storageKey);
  }

  authorize = (apiKey: string): void => {
    this.storage.setItem(this.storageKey, apiKey);
  };

  unauthorize = (): void => {
    this.storage.removeItem(this.storageKey);
  };
}

export const apiKeyService = new ApiKeyService(localStorage);
