import type { ProductHistoryDao } from './ProductHistoryDaoTypes.js';
import { Sqlite } from '#shared/infrastructure/db/Sqlite.js';
import { sql } from '#shared/infrastructure/db/sqlTag.js';

export class ProductHistoryDaoImpl implements ProductHistoryDao {
  private readonly db: Sqlite;

  constructor(db: Sqlite) {
    this.db = db;
  }

  private getProductHistoryQuery = (id: number) => sql`
    select checked_at, price from product_history where product_id = ${id}
  `;

  getList: ProductHistoryDao['getList'] = async (id) => {
    return this.db.all(this.getProductHistoryQuery(id)) as any;
  };

  pushToProductHistory: ProductHistoryDao['pushToProductHistory'] = async ({
    price,
    checkedAt,
    productId,
  }) => {
    const checkedAtQuery = sql`checked_at = (
      select
        max(checked_at)
      from
        product_history
      where
        product_id = ${productId}
    )`;

    const insertedResult = this.db.run(
      sql`insert into product_history (price, checked_at, product_id) select ${sql.join([price, checkedAt, productId])}
          where not exists (
            select 1 from product_history where ${checkedAtQuery} and price == ${price}
        )`,
    );

    if (insertedResult.changes == 0) {
      return null;
    }

    return this.db.get(
      sql`${this.getProductHistoryQuery(productId)} and ${checkedAtQuery}`,
    ) as any;
  };
}
