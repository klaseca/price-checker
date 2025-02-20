import type { Static, TSchema } from '@sinclair/typebox';
import type {
  ContextConfigDefault,
  FastifyBaseLogger,
  FastifySchema,
  FastifyTypeProvider,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
  RouteGenericInterface,
  RouteOptions as FastifyRouteOptions,
} from 'fastify';

interface TypeBoxTypeProvider extends FastifyTypeProvider {
  output: this['input'] extends TSchema ? Static<this['input']> : unknown;
}

export interface ControllerOptions<
  SchemaCompiler extends FastifySchema = FastifySchema,
> extends FastifyRouteOptions<
    RawServerDefault,
    RawRequestDefaultExpression<RawServerDefault>,
    RawReplyDefaultExpression<RawServerDefault>,
    RouteGenericInterface,
    ContextConfigDefault,
    SchemaCompiler,
    TypeBoxTypeProvider,
    FastifyBaseLogger
  > {}

export type ControllerSchema = {
  [Key in keyof FastifySchema]: TSchema;
};
