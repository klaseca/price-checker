import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

type DateType = Date | string | number;

export class DateBuilder {
  private readonly dateInternal: Dayjs;

  constructor(dateValue: DateType) {
    this.dateInternal = dayjs(dateValue);
  }

  toFormat(format: string): string {
    return this.dateInternal.format(format);
  }
}
