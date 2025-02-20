import type { ProductDao } from './ProductDaoTypes.js';
import { Sqlite } from '#shared/infrastructure/db/Sqlite.js';
import { sql } from '#shared/infrastructure/db/sqlTag.js';
import decamelize from 'decamelize';

export class ProductDaoImpl implements ProductDao {
  private readonly db: Sqlite;

  private readonly productQuery = sql`select id, name, url, cron, job_status, updated_at, created_at from product`;

  constructor(db: Sqlite) {
    this.db = db;
  }

  get: ProductDao['get'] = async (id) => {
    return this.db.get(sql`${this.productQuery} where id=${id}`) as any;
  };

  create: ProductDao['create'] = async ({ name, url, cron, jobStatus }) => {
    return this.db.get(
      sql`insert into product (name, url, cron, job_status) values (${sql.join([name, url, cron, jobStatus])}) returning *`,
    ) as any;
  };

  update: ProductDao['update'] = async ({ id, name, url, cron, jobStatus }) => {
    return this.db.get(
      sql`update product set name=${name}, url=${url}, cron=${cron}, job_status=${jobStatus} where id=${id} returning *`,
    ) as any;
  };

  delete: ProductDao['delete'] = (id) => {
    this.db.run(sql`delete from product where id=${id}`);
    return {} as any;
  };

  getList: ProductDao['getList'] = async (params) => {
    const maybyParamList =
      params != null
        ? Object.entries(params).map(
            ([column, value]) => sql`${sql.raw(decamelize(column))}=${value}`,
          )
        : null;

    if (maybyParamList != null) {
      return this.db.all(
        sql`${this.productQuery} where ${sql.join(maybyParamList, ' and ')}`,
      );
    }

    return this.db.all(this.productQuery) as any;
  };
}
