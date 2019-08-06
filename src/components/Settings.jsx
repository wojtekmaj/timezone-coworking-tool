import React, { useContext } from 'react';

import TimezoneSelect from './TimezoneSelect';

import { LocalStorageContext } from '../LocalStorageProvider';
import { detectTimezone } from '../utils';

export default function Settings() {
  const [localStorage, setLocalStorage] = useContext(LocalStorageContext);
  const { myTimezone = detectTimezone() } = localStorage;

  function onChange(event) {
    const { value } = event.target;
    setLocalStorage({ myTimezone: value });
  }

  return (
    <div>
      <h2>Settings</h2>
      <label htmlFor="myTimezone">Select your timezone</label>
      <TimezoneSelect
        onChange={onChange}
        value={myTimezone}
        id="myTimezone"
        placeholder="Select your timezone"
      />
    </div>
  );
}
