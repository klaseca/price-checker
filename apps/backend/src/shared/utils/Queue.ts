export class Queue {
  private queue = Promise.resolve<unknown>(undefined);

  add = <T>(run: () => Promise<T>): Promise<T> => {
    return new Promise((resolve, reject) => {
      this.queue = this.queue.then(run).then(resolve).catch(reject);
    });
  };
}
