import type { ProductResponseDto } from '#modules/product/dto/productDto.js';
import type { Parser, ProductParsedInfo } from '#parsers/parserTypes.js';

export interface ParserConstructor {
  new (url: string): Parser;
}

type RunParserParams = Pick<ProductResponseDto, 'id' | 'url' | 'name'>;

type StartJobParams = Pick<ProductResponseDto, 'id' | 'cron' | 'url' | 'name'>;

export interface ParserService {
  runParser: (product: RunParserParams) => Promise<ProductParsedInfo>;
  startJob: (product: StartJobParams) => void;
  stopJob: (id: ProductResponseDto['id']) => void;
  hasParser: (url: string) => boolean;
}
