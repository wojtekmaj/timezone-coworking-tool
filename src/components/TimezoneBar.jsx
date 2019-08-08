import React from 'react';
import PropTypes from 'prop-types';

export default function TimezoneBar({ index, timeStart, timeEnd }) {
  return (
    <div
      className="Timezone__bar"
      style={{
        gridRowStart: (index * 2) + 1,
        gridRowEnd: (index * 2) + 1,
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
