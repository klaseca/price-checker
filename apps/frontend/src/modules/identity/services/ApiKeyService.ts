type ApiKey = string | null;

type ApiKeyOnChange = (apiKey: ApiKey) => void;

export class ApiKeyService {
  apiKey?: ApiKey;

  private readonly storageKey = 'apiKey';

  private readonly storage: Storage;

  private onChange?: ApiKeyOnChange;

  get isAuthorized(): boolean {
    return this.apiKey != null;
  }

  constructor(storage: Storage, onChange?: ApiKeyOnChange) {
    this.storage = storage;
    this.onChange = onChange;
    this.setApiKey(this.storage.getItem(this.storageKey));
  }

  authorize = (apiKey: string): void => {
    this.storage.setItem(this.storageKey, apiKey);
    this.setApiKey(apiKey);
  };

  unauthorize = (): void => {
    this.storage.removeItem(this.storageKey);
    this.setApiKey(null);
  };

  private setApiKey = (apiKey: ApiKey) => {
    this.apiKey = apiKey;
    this.onChange?.(apiKey);
  };
}
