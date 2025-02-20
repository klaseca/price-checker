import type { CronJob } from 'cron';

type MaybePromise<T> = Promise<T> | T;

export type JobId = number;

interface AddJob {
  id: JobId;
  cronTime: string;
  runOnInit: boolean;
  cronAction: () => MaybePromise<void>;
}

export interface JobManagerService {
  get: (id: JobId) => CronJob | undefined;
  getAll: () => CronJob[];
  add: (job: AddJob) => void;
  delete: (id: JobId) => void;
}
