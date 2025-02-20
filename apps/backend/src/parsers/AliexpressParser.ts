import { HttpParser } from './HttpParser.js';
import type { ProductParsedInfo } from './parserTypes.js';

class ValidationError extends Error {
  override name = this.constructor.name;
}

const validators = {
  number: (value: unknown, errorMessage?: string) => {
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
      errorMessage ?? `Значение "${JSON.stringify(value)}" не является числом`,
    );
  },
};

export class AliexpressParser extends HttpParser {
  constructor(url: string) {
    super({
      url,
      requestOptions: {
        headers: {
          Host: 'aliexpress.ru',
          'User-Agent': 'FFF',
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

    const price = validators.number(
      document.querySelector<HTMLElement>(
        '[class*="MainLayout__root"] [class*="HazeProductPrice_SnowPrice__mainS"]',
      )?.innerText,
    );

    return {
      price,
      checkedAt: new Date().toISOString(),
    };
  };
}
