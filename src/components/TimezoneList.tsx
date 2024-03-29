import timezones from 'compact-timezone-list';
import { useLocalStorage } from '@wojtekmaj/react-hooks';

import { wrapper, content } from './TimezoneList.module.css';

import Timeline from './Timeline.js';
import Hand from './Hand.js';
import Timezone from './Timezone.js';

import { detectTimezone, uniq } from '../utils.js';

type NonFalsy<T> = T extends false | 0 | '' | null | undefined | 0n ? never : T;

function filterBoolean<T>(value: T): value is NonFalsy<typeof value> {
  return Boolean(value);
}

export default function TimezoneList() {
  const [myTimezone] = useLocalStorage('myTimezone', detectTimezone());
  const [currentTimezones] = useLocalStorage<string[]>('timezones', []);

  console.log({ myTimezone, currentTimezones });

  const tzToDisplay = uniq([myTimezone, ...currentTimezones])
    .map((tzCode) => timezones.find((tz) => tz.tzCode === tzCode))
    .filter(filterBoolean);
  tzToDisplay.sort((a, b) => parseInt(a.offset, 10) - parseInt(b.offset, 10));

  return (
    <div className={wrapper}>
      <h2>Timezones</h2>
      <div
        className={content}
        style={{ gridTemplateRows: `30px repeat(${tzToDisplay.length * 2}, 1fr) 30px` }}
      >
        <Timeline />
        <Hand />
        {tzToDisplay.map((timezone, index) => (
          <Timezone
            key={timezone.tzCode}
            index={index + 1}
            isCurrent={myTimezone === timezone.tzCode}
            {...timezone}
          />
        ))}
      </div>
    </div>
  );
}
