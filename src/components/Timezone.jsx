import PropTypes from 'prop-types';
import { useLocalStorage, useTick } from '@wojtekmaj/react-hooks';
import mergeClassNames from 'merge-class-names';
import { utcToZonedTime } from 'date-fns-tz';

import './Timezone.less';

import TimezoneOptions from './TimezoneOptions';
import TimezoneBar from './TimezoneBar';

export default function Timezone({
  index,
  isCurrent,
  label,
  tzCode,
}) {
  useTick(1000);
  const [nicknames] = useLocalStorage('nicknames', {});
  const [workStart] = useLocalStorage('workStart', 9);
  const [workEnd] = useLocalStorage('workEnd', 17);

  const displayLabel = (
    nicknames[tzCode]
    || (label.split(')')[1] || label).trim()
  );
  const date = new Date();
  const localDate = utcToZonedTime(date, tzCode);
  const timeDifference = Math.round((localDate - date) / 3600000);

  const initialTimeStart = workStart - timeDifference;
  const initialTimeEnd = workEnd - timeDifference;

  const bars = [[initialTimeStart, initialTimeEnd]];

  // If bar goes through midnight, we need to actually display two separate bars
  if (initialTimeStart < 0) {
    bars[0][0] = 0;
    bars.push([24 + initialTimeStart, 24]);
  }
  if (initialTimeEnd > 24) {
    bars.push([0, initialTimeEnd - 24]);
  }

  const row = index * 2;

  return (
    <div className={mergeClassNames('Timezone', isCurrent && 'Timezone--current')}>
      <div
        className="Timezone__header"
        style={{
          gridRowStart: row,
          gridRowEnd: row,
        }}
      >
        <h3 className="Timezone__label">
          {isCurrent ? '🏠 ' : ''}
          {displayLabel}
          {' '}
          <span className="Timezone__label__time">{localDate.toLocaleTimeString(undefined, { hour: 'numeric', minute: 'numeric' })}</span>
        </h3>
        <TimezoneOptions
          displayLabel={displayLabel}
          tzCode={tzCode}
        />
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
