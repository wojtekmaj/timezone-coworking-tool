import React from 'react';
import PropTypes from 'prop-types';
import mergeClassNames from 'merge-class-names';
import { utcToZonedTime } from 'date-fns-tz';

import './Timezone.less';

import TimezoneOptions from './TimezoneOptions';
import TimezoneBar from './TimezoneBar';

import useTick from '../hooks/useTick';
import useLocalStorage from '../hooks/useLocalStorage';

export default function Timezone({
  index,
  isCurrent,
  label,
  tzCode,
}) {
  useTick(1000);
  const [localStorage] = useLocalStorage();
  const {
    nicknames = {},
    workStart = 9,
    workEnd = 17,
  } = localStorage;

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

  return (
    <div className={mergeClassNames('Timezone', isCurrent && 'Timezone--current')}>
      <div
        className="Timezone__header"
        style={{
          gridRowStart: (index * 2),
          gridRowEnd: (index * 2),
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
