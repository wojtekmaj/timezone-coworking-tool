import { minimalTimezoneSet as minimalTimezones } from 'compact-timezone-list';
import { utcToZonedTime } from 'date-fns-tz';

export function detectTimezone() {
  return minimalTimezones.find(({ tzCode }) => {
    const date = new Date();
    const localDate = utcToZonedTime(date, tzCode);
    const timeDifference = Math.round((localDate - date) / 3600000);
    return timeDifference === 0;
  }).tzCode;
}

export function uniq(arr) {
  return Array.from(new Set(arr));
}
