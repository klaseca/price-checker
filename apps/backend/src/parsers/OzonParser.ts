import { HttpParser } from './HttpParser.js';
import type { ProductParsedInfo } from './parserTypes.js';

class ValidationError extends Error {
  override name = this.constructor.name;
}

const validators = {
  price: (value: unknown) => {
    if (typeof value === 'number') {
      return value;
    }

    if (typeof value === 'string') {
      const replacedValue = value.replace(/^\D+|\s/g, '').replaceAll(',', '.');

      const maybeNumber = Number.parseFloat(replacedValue);

      if (!Number.isNaN(maybeNumber)) {
        return maybeNumber;
      }
    }

    throw new ValidationError(
      `Не удалось распарсить цену товара. Значение "${JSON.stringify(
        value,
      )}" не является числом`,
    );
  },
};

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

    const price = OzonParser.getPrice(document);

    return {
      price,
      checkedAt: new Date().toISOString(),
    };
  };

  private static getPrice = (document: Document): number => {
    let price: unknown;

    const stateData = document.querySelector<HTMLElement>(
      '[id^=state-webPrice-]',
    )?.dataset['state'];

    const state: unknown = stateData ? JSON.parse(stateData) : undefined;

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

    return validators.price(price);
  };
}
