import dayjs from 'dayjs';

import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export class DateUtils {
  static getDateRange(difference: number, timezone?: string): any {
    if (timezone) {
      dayjs.tz.setDefault(timezone); // America/Argentina/Buenos_Aires
    }

    let now = dayjs();

    const startDate = now.subtract(difference, 'day').startOf('day');
    const endDate = now.subtract(difference, 'day').endOf('day');

    return {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    };
  }
}
