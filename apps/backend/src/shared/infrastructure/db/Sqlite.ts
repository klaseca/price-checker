import BetterSqlite3Database, {
  type RunResult,
  type Statement,
} from 'better-sqlite3';
import type { Sql } from 'sql-template-tag';
import { toCamelCase } from '#shared/utils/toCamelCase.js';

export class Sqlite extends BetterSqlite3Database {
  private readonly statements = new Map<string, Statement>();

  get = <T>({ sql, values }: Sql): T | undefined => {
    return toCamelCase(this.getStatement(sql).get(...values)) as T | undefined;
  };

  all = <T>({ sql, values }: Sql): T[] => {
    return toCamelCase(this.getStatement(sql).all(...values)) as T[];
  };

  run = ({ sql, values }: Sql): RunResult => {
    return this.getStatement(sql).run(...values);
  };

  private getStatement = (sql: string) => {
    let statement = this.statements.get(sql);

    if (statement === undefined) {
      statement = this.prepare(sql);

      this.statements.set(sql, statement);
    }

    return statement;
  };
}
