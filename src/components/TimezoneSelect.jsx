import { useState } from 'react';
import PropTypes from 'prop-types';
import timezones, { minimalTimezoneSet as minimalTimezones } from 'compact-timezone-list';

import './TimezoneSelect.less';

export default function TimezoneSelect({ id, onChange, placeholder, value, ...otherProps }) {
  const [checked, setChecked] = useState(false);

  function onChangeChecked(event) {
    setChecked(event.target.checked);
  }

  // Force checked if value comes from full timezone list
  const isSelectedTimezone = (timezone) => timezone.tzCode === value;
  const valueFromFullList =
    !minimalTimezones.find(isSelectedTimezone) && timezones.find(isSelectedTimezone);
  const shouldShowAll = checked || valueFromFullList;

  return (
    <div className="TimezoneSelect">
      <select id={id} onChange={onChange} value={value} {...otherProps}>
        <option value="" hidden>
          {placeholder}
        </option>
        {(shouldShowAll ? timezones : minimalTimezones).map((timezone) => (
          <option key={timezone.tzCode} value={timezone.tzCode}>
            {timezone.label}
          </option>
        ))}
      </select>
      <input
        type="checkbox"
        id={`${id}_show_all`}
        checked={shouldShowAll}
        onChange={onChangeChecked}
        disabled={valueFromFullList}
      />
      <label htmlFor={`${id}_show_all`}>Show all</label>
    </div>
  );
}

TimezoneSelect.propTypes = {
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
};
