import type { HttpClient } from './httpClientTypes';

interface RequestOptions extends RequestInit {
  path: RequestInfo | URL;
}

export class HttpClientImpl implements HttpClient {
  private readonly url: string;

  apiKey?: string | null;

  onUnauthorized?: () => void;

  constructor(url: string) {
    this.url = url;
  }

  get: HttpClient['get'] = (path) => {
    return this.request({ method: 'GET', path });
  };

  post: HttpClient['post'] = (path, options = {}) => {
    return this.request({
      method: 'POST',
      path,
      ...options,
    });
  };

  put: HttpClient['put'] = (path, options = {}) => {
    return this.request({
      method: 'PUT',
      path,
      ...options,
    });
  };

  delete: HttpClient['delete'] = (path) => {
    return this.request({ method: 'DELETE', path });
  };

  private request = async ({ path, method, body, headers }: RequestOptions) => {
    const response = await fetch(`${this.url}${path}`, {
      method,
      headers: this.getHeaders(headers, body),
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      if (response.status === 401 && this.onUnauthorized) {
        this.onUnauthorized();
      }

      throw new Error(response.statusText);
    }

    const data = await response.json();

    return data;
  };

  private getHeaders = (initHeaders: HeadersInit | undefined, body: any) => {
    const headers = new Headers(initHeaders);

    if (this.apiKey != null) {
      headers.set('x-api-key', this.apiKey);
    }

    if (body !== undefined) {
      headers.set('Content-Type', 'application/json');
    }

    return headers;
  };
}

export const httpClient = new HttpClientImpl(import.meta.env.VITE_BACKEND_URL ?? '');
