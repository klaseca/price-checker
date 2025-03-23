import { ValidationError } from './ValidationError.js';

export const validator = {
  price: (value: unknown): number => {
    if (typeof value === 'number') {
      return value;
    }

    if (typeof value === 'string') {
      const replacedValue = value.replace(/^\D+|\s/g, '').replaceAll(',', '.');

      const maybeNumber = Number.parseFloat(replacedValue);

      if (!Number.isNaN(maybeNumber)) {
        return maybeNumber;
      }
    }

    throw new ValidationError(
      `Failed to get a price. Value "${JSON.stringify(value)}" is not a number`,
    );
  },
};
