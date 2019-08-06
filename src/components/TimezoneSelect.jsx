import React from 'react';
import PropTypes from 'prop-types';
import { minimalTimezoneSet as timezones } from 'compact-timezone-list';

export default function TimezoneSelect({
  onChange,
  placeholder,
  value,
  ...otherProps
}) {
  return (
    <select
      onChange={onChange}
      value={value}
      {...otherProps}
    >
      <option value="" hidden>{placeholder}</option>
      {timezones.map(timezone => (
        <option key={timezone.tzCode} value={timezone.tzCode}>
          {timezone.label}
        </option>
      ))}
    </select>
  );
}

TimezoneSelect.propTypes = {
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
};
