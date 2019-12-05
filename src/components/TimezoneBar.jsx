import React from 'react';
import PropTypes from 'prop-types';

export default function TimezoneBar({ index, timeStart, timeEnd }) {
  const row = (index * 2) + 1;
  return (
    <div
      className="Timezone__bar"
      style={{
        gridRowStart: row,
        gridRowEnd: row,
        gridColumnStart: timeStart + 1,
        gridColumnEnd: timeEnd + 1,
      }}
    />
  );
}

TimezoneBar.propTypes = {
  index: PropTypes.number.isRequired,
  timeStart: PropTypes.number.isRequired,
  timeEnd: PropTypes.number.isRequired,
};
