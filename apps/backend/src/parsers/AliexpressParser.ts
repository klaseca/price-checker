import { HttpParser } from './HttpParser.js';
import type { ProductParsedInfo } from './parserTypes.js';
import { validator } from './validation/validator.js';

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

    return {
      price: AliexpressParser.getPrice(document),
      checkedAt: new Date().toISOString(),
    };
  };

  private static getPrice = (document: Document): number => {
    const price = document.querySelector<HTMLElement>(
      '[class*="MainLayout__root"] [class*="HazeProductPrice_SnowPrice__mainS"]',
    )?.innerText;

    return validator.price(price);
  };
}
