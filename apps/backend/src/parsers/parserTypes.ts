export interface ProductParsedInfo {
  price: number;
  checkedAt: string;
}

export interface Parser {
  execute: () => Promise<ProductParsedInfo>;
}
