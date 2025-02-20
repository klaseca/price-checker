import { register, createEsmHooks } from 'ts-node';

const tsNodeInstance = register({
  project: './tsconfig.build.json',
  logError: true,
});

export const { resolve, load, getFormat, transformSource } =
  createEsmHooks(tsNodeInstance);
