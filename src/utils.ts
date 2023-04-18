import { minimalTimezoneSet as minimalTimezones } from 'compact-timezone-list';
import { utcToZonedTime } from 'date-fns-tz';

export function detectTimezone(): string {
  const timezone = minimalTimezones.find(({ tzCode }) => {
    const date = new Date();
    const localDate = utcToZonedTime(date, tzCode);
    const timeDifference = Math.round((localDate.getTime() - date.getTime()) / 3600000);
    return timeDifference === 0;
  });

  return timezone?.tzCode || 'UTC';
}

export function uniq<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}
