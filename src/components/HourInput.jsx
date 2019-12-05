import React from 'react';
import PropTypes from 'prop-types';

import './HourInput.less';

export default function HourInput(props) {
  return (
    <input
      className="HourInput"
      max={24}
      min={0}
      type="number"
      {...props}
    />
  );
}

HourInput.propTypes = {
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};
