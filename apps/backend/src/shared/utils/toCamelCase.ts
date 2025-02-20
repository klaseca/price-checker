import camelcase from 'camelcase';

const isObject = (value: unknown): value is object =>
  typeof value === 'object' &&
  value !== null &&
  !(value instanceof RegExp || value instanceof Error || value instanceof Date);

export const toCamelCase = (value: unknown): unknown => {
  if (!isObject(value)) {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map(toCamelCase);
  }

  return Object.entries(value).reduce<Record<string, unknown>>(
    (acc, [key, value]) => {
      acc[camelcase(key)] = toCamelCase(value);

      return acc;
    },
    {},
  );
};
