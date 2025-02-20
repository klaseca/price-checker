import { CronJob } from 'cron';
import type { JobId, JobManagerService } from './jobManagerTypes.js';

export class JobManagerServiceImpl implements JobManagerService {
  private readonly tasks = new Map<JobId, CronJob>();

  get: JobManagerService['get'] = (id) => {
    return this.tasks.get(id);
  };

  getAll: JobManagerService['getAll'] = () => {
    return [...this.tasks.values()];
  };

  add: JobManagerService['add'] = ({ id, cronTime, runOnInit, cronAction }) => {
    this.delete(id);

    this.tasks.set(
      id,
      CronJob.from({
        cronTime,
        onTick: cronAction,
        runOnInit,
        start: true,
      }),
    );
  };

  delete: JobManagerService['delete'] = (id) => {
    this.tasks.get(id)?.stop();

    this.tasks.delete(id);
  };
}
