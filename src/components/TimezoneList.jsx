import { useContext } from 'react';
import timezones from 'compact-timezone-list';

import { wrapper, content } from './TimezoneList.module.css';

import Timeline from './Timeline';
import Hand from './Hand';
import Timezone from './Timezone';

import { LocalStorageContext } from '../LocalStorageProvider';

import { detectTimezone, uniq } from '../utils';

export default function TimezoneList() {
  const [localStorage] = useContext(LocalStorageContext);
  const { myTimezone = detectTimezone(), timezones: currentTimezones = [] } = localStorage;

  const tzToDisplay = uniq([myTimezone, ...currentTimezones])
    .map((tzCode) => timezones.find((tz) => tz.tzCode === tzCode))
    .filter(Boolean);
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
