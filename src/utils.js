import { minimalTimezoneSet as timezones } from 'compact-timezone-list';
import { utcToZonedTime } from 'date-fns-tz';

/* eslint-disable import/prefer-default-export */

export function detectTimezone() {
  return timezones.find(({ tzCode }) => {
    const date = new Date();
    const localDate = utcToZonedTime(date, tzCode);
    const timeDifference = Math.round((localDate - date) / 3600000);
    return timeDifference === 0;
  }).tzCode;
}
