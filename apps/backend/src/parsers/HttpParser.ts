import makeFetchCookie from 'fetch-cookie';
import makeDeepmerge from '@fastify/deepmerge';
import { parseHTML } from 'linkedom';
import type { Parser, ProductParsedInfo } from './parserTypes.js';

export interface ParserOptions {
  url: string;
  requestOptions?: RequestInit;
}

const fetchCookie = makeFetchCookie(fetch);

const deepmerge = makeDeepmerge();

const DEFAULT_REQUEST_OPTIONS: RequestInit = {
  method: 'GET',
  credentials: 'include',
  mode: 'cors',
};

export abstract class HttpParser implements Parser {
  private readonly url: string;

  private readonly requestOptions: RequestInit;

  constructor({ url, requestOptions }: ParserOptions) {
    this.url = url;
    this.requestOptions = deepmerge(
      DEFAULT_REQUEST_OPTIONS,
      requestOptions,
    ) as RequestInit;
  }

  protected abstract parseProductInfo: (
    response: Response,
  ) => Promise<ProductParsedInfo>;

  private fetchProductInfo = async () => {
    const response = await fetchCookie(this.url, this.requestOptions);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response;
  };

  execute: Parser['execute'] = async () => {
    const productInfoResponse = await this.fetchProductInfo();

    return this.parseProductInfo(productInfoResponse);
  };

  static htmlStringToDocument = (htmlString: string): Document => {
    const { document } = parseHTML(htmlString);

    return document;
  };
}
