import dayjs from 'dayjs';

export class DateUtils {

  static getDateRange(difference: number): any {
    let now = dayjs();

    const startDate = now.subtract(difference, 'day').startOf('day');
    const endDate = now.subtract(difference, 'day').endOf('day');

    return {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    };
  }
}
