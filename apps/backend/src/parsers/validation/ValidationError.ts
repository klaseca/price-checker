export class ValidationError extends Error {
  override name = this.constructor.name;
}
