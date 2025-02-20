import { setTimeout } from 'node:timers/promises';
import { Queue } from '#shared/utils/Queue.js';
import { getRandomIntFromInterval } from '#shared/utils/random.js';
import type { ParserConstructor } from './parserTypes.js';

export class ParserQueue {
  private readonly Parser: ParserConstructor;

  private readonly queue = new Queue();

  constructor(Parser: ParserConstructor) {
    this.Parser = Parser;
  }

  add = (url: string) => {
    return this.queue.add(() =>
      new this.Parser(url)
        .execute()
        .finally(() => setTimeout(getRandomIntFromInterval(10000, 30000))),
    );
  };
}
