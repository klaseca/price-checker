import { bulk, empty, join, raw, Sql, type RawValue } from 'sql-template-tag';

export const sql = Object.assign(
  (sqlFragments: TemplateStringsArray, ...parameters: RawValue[]) => {
    return new Sql(sqlFragments, parameters);
  },
  {
    empty,
    join,
    raw,
    bulk,
    if(
      condition: boolean,
      then: () => Sql,
      otherwise: () => Sql = () => empty,
    ): Sql {
      return condition ? then() : otherwise();
    },
  },
);
