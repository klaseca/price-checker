import { HttpParser } from './HttpParser.js';
import type { ProductParsedInfo } from './parserTypes.js';
import { validator } from './validation/validator.js';

export class JoomParser extends HttpParser {
  constructor(url: string) {
    super({
      url,
      requestOptions: {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36 Edg/134.0.0.0',
          Accept:
            'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
          'Accept-Language': 'ru,en;q=0.9,en-GB;q=0.8,en-US;q=0.7',
          'Accept-Encoding': 'gzip, deflate, br, zstd',
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
      price: JoomParser.getPrice(document),
      checkedAt: new Date().toISOString(),
    };
  };

  private static getPrice = (document: Document): number => {
    const price = document.querySelectorAll<HTMLElement>(
      '[class*="pricesRow"] [class*="priceWrap"] > span:nth-child(1)',
    )?.[0]?.innerText;

    return validator.price(price);
  };
}
