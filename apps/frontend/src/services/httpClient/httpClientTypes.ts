export interface HttpMethodOptions
  extends Omit<RequestInit, 'method' | 'body'> {
  body?: any;
}

export interface HttpClient {
  get: (path: string) => Promise<any>;
  post: (path: string, options?: HttpMethodOptions) => Promise<any>;
  put: (path: string, options?: HttpMethodOptions) => Promise<any>;
  delete: (path: string, options?: HttpMethodOptions) => Promise<any>;
}
