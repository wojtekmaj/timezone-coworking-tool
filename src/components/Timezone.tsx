import PropTypes from 'prop-types';
import { useLocalStorage, useTick } from '@wojtekmaj/react-hooks';
import clsx from 'clsx';
import { utcToZonedTime } from 'date-fns-tz';

import { wrapper, current, header, label as labelClassName, time } from './Timezone.module.css';

import TimezoneOptions from './TimezoneOptions';
import TimezoneBar from './TimezoneBar';

type TimezoneProps = {
  index: number;
  isCurrent?: boolean;
  label: string;
  tzCode: string;
};

export default function Timezone({ index, isCurrent, label, tzCode }: TimezoneProps) {
  useTick(1000);
  const [nicknames] = useLocalStorage<Record<string, string>>('nicknames', {});
  const [workStart] = useLocalStorage('workStart', 9);
  const [workEnd] = useLocalStorage('workEnd', 17);

  const displayLabel = nicknames[tzCode] || (label.split(')')[1] || label).trim();
  const date = new Date();
  const localDate = utcToZonedTime(date, tzCode);
  const timeDifference = Math.round((localDate.getTime() - date.getTime()) / 3600000);

  const initialTimeStart = workStart - timeDifference;
  const initialTimeEnd = workEnd - timeDifference;

  const bars: [number, number][] = [[initialTimeStart, initialTimeEnd]];

  // If bar goes through midnight, we need to actually display two separate bars
  if (initialTimeStart < 0) {
    const firstBar = bars[0];
    if (!firstBar) {
      throw new Error('Expected first bar to exist');
    }
    firstBar[0] = 0;
    bars.push([24 + initialTimeStart, 24]);
  }
  if (initialTimeEnd > 24) {
    bars.push([0, initialTimeEnd - 24]);
  }

  const row = index * 2;

  return (
    <div className={clsx(wrapper, isCurrent && current)}>
      <div
        className={header}
        style={{
          gridRowStart: row,
          gridRowEnd: row,
        }}
      >
        <h3 className={labelClassName}>
          {isCurrent ? '🏠 ' : ''}
          {displayLabel}{' '}
          <span className={time}>
            {localDate.toLocaleTimeString(undefined, { hour: 'numeric', minute: 'numeric' })}
          </span>
        </h3>
        <TimezoneOptions displayLabel={displayLabel} tzCode={tzCode} />
      </div>
      {bars.map(([timeStart, timeEnd], barIndex) => (
        <TimezoneBar
          // eslint-disable-next-line react/no-array-index-key
          key={`${tzCode}_${barIndex}`}
          index={index}
          timeStart={timeStart}
          timeEnd={timeEnd}
        />
      ))}
    </div>
  );
}

Timezone.propTypes = {
  index: PropTypes.number.isRequired,
  isCurrent: PropTypes.bool,
  label: PropTypes.string.isRequired,
  tzCode: PropTypes.string,
};
