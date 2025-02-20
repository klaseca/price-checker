import { FormatRegistry, type Static, type TSchema } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';

FormatRegistry.Set('ipv4', (value) =>
  /^(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/.test(
    value,
  ),
);

FormatRegistry.Set('url', (value) =>
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/.test(
    value,
  ),
);

export const makeConfig = <Schema extends TSchema>(
  source: Record<string, unknown>,
  validationSchema: Schema,
): Static<Schema> => {
  const cleanSource = Value.Clean(validationSchema, { ...source });

  Value.Default(validationSchema, cleanSource);

  const config = Value.Convert(validationSchema, cleanSource);

  const errors = Array.from(Value.Errors(validationSchema, config));

  if (errors.length === 0) {
    return config;
  }

  console.error('Config validation failed', errors);

  process.exit(1);
};
