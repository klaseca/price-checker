import { HttpParser } from './HttpParser.js';
import type { ProductParsedInfo } from './parserTypes.js';
import { validator } from './validation/validator.js';

const PRICE_PROPERTIES = ['cardPrice', 'price', 'originalPrice'] as const;

export class OzonParser extends HttpParser {
  constructor(url: string) {
    super({
      url,
      requestOptions: {
        headers: {
          Host: 'www.ozon.ru',
          'User-Agent': 'FFFF',
          Accept:
            'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
          'Accept-Language': 'ru-RU,ru;q=0.8,en-US;q=0.5,en;q=0.3',
          'Accept-Encoding': 'gzip, deflate, br',
          Connection: 'keep-alive',
        },
      },
    });
  }

  protected override parseProductInfo = async (
    response: Response,
  ): Promise<ProductParsedInfo> => {
    const htmlString = await response.text();

    const document = HttpParser.htmlStringToDocument(htmlString);

    return {
      price: OzonParser.getPrice(document),
      checkedAt: new Date().toISOString(),
    };
  };

  private static getPrice = (document: Document): number => {
    let price: unknown;

    const stateData = document.querySelector<HTMLElement>(
      '[id^=state-webPrice-]',
    )?.dataset['state'];

    const state: unknown = stateData != null ? JSON.parse(stateData) : null;

    if (typeof state === 'object' && state !== null) {
      for (const priceProperty of PRICE_PROPERTIES) {
        if (priceProperty in state) {
          price = (
            state as Partial<Record<(typeof PRICE_PROPERTIES)[number], unknown>>
          )[priceProperty];

          break;
        }
      }
    }

    return validator.price(price);
  };
}
