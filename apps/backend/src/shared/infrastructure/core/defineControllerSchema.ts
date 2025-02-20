import type { ControllerSchema } from './types.js';

export const defineControllerSchema = <Schema extends ControllerSchema>(
  schema: Schema,
): Schema => schema;
