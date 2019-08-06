import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import mergeClassNames from 'merge-class-names';
import { utcToZonedTime } from 'date-fns-tz';

import './Timezone.less';

import { LocalStorageContext } from '../LocalStorageProvider';

import useTick from '../hooks/useTick';

export default function Timezone({
  index,
  isCurrent,
  label,
  tzCode,
}) {
  useTick(1000);
  const [localStorage] = useContext(LocalStorageContext);
  const { nicknames = {} } = localStorage;

  const displayLabel = (
    nicknames[tzCode]
    || (label.split(')')[1] || label).trim()
  );
  const date = new Date();
  const localDate = utcToZonedTime(date, tzCode);
  const timeDifference = Math.round((localDate - date) / 3600000);

  const timeStart = 9 - timeDifference;
  const timeEnd = 17 - timeDifference;

  return (
    <div className={mergeClassNames('Timezone', isCurrent && 'Timezone--current')}>
      <h3
        className="Timezone__label"
        style={{
          gridRowStart: (index * 2),
          gridRowEnd: (index * 2),
        }}
      >
        {displayLabel}
        {' '}
        <span className="Timezone__label__time">{localDate.toLocaleTimeString(undefined, { hour: 'numeric', minute: 'numeric' })}</span>
      </h3>
      <div
        className="Timezone__bar"
        style={{
          gridRowStart: (index * 2) + 1,
          gridRowEnd: (index * 2) + 1,
          gridColumnStart: timeStart + 1,
          gridColumnEnd: timeEnd + 1,
        }}
      />
    </div>
  );
}

Timezone.propTypes = {
  index: PropTypes.number.isRequired,
  isCurrent: PropTypes.bool,
  label: PropTypes.string.isRequired,
  tzCode: PropTypes.string,
};
