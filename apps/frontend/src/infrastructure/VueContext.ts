import type { InjectionKey } from 'vue';
import { inject, provide } from 'vue';

export class VueContext<T> {
  private readonly key: InjectionKey<T>;

  constructor(key: Symbol) {
    this.key = key as InjectionKey<T>;
  }

  inject = (): T => {
    const value = inject(this.key);

    if (value === undefined) {
      throw new Error(`No value provided for key: ${this.key.description}`);
    }

    return value;
  };

  provide = (value: T) => provide(this.key, value);
}
