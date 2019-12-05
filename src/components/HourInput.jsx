import React from 'react';
import PropTypes from 'prop-types';

import './HourInput.less';

export default function HourInput({
  id,
  onChange,
  placeholder,
  value,
  ...otherProps
}) {
  return (
    <input
      className="HourInput"
      id={id}
      max={24}
      min={0}
      onChange={onChange}
      type="number"
      value={value}
      {...otherProps}
    />
  );
}

HourInput.propTypes = {
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};
