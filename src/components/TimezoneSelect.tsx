import { useState } from 'react';
import PropTypes from 'prop-types';
import timezones, { minimalTimezoneSet as minimalTimezones } from 'compact-timezone-list';

import { wrapper } from './TimezoneSelect.module.css';

import type { Timezone } from 'compact-timezone-list';

type TimezoneSelectProps = {
  id: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
  value?: string;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

export default function TimezoneSelect({
  id,
  onChange,
  placeholder,
  value,
  ...otherProps
}: TimezoneSelectProps) {
  const [checked, setChecked] = useState(false);

  function onChangeChecked(event: React.ChangeEvent<HTMLInputElement>) {
    setChecked(event.target.checked);
  }

  // Force checked if value comes from full timezone list
  const isSelectedTimezone = (timezone: Timezone) => timezone.tzCode === value;
  const hasValueFromFullList = Boolean(
    !minimalTimezones.find(isSelectedTimezone) && timezones.find(isSelectedTimezone),
  );
  const shouldShowAll = checked || hasValueFromFullList;

  return (
    <div className={wrapper}>
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
        disabled={hasValueFromFullList}
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
