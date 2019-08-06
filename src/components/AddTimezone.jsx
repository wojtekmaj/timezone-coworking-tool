import React, { useContext, useState } from 'react';

import { LocalStorageContext } from '../LocalStorageProvider';
import TimezoneSelect from './TimezoneSelect';

export default function AddTimezone() {
  const [localStorage, setLocalStorage] = useContext(LocalStorageContext);
  const [selectedTimezone, setSelectedTimezone] = useState('');
  const [nickname, setNickname] = useState('');
  const {
    nicknames: currentNicknames = {},
    timezones: currentTimezones = [],
  } = localStorage;

  function onChange(event) {
    const { value } = event.target;
    setSelectedTimezone(value);
  }

  function onChangeNickname(event) {
    const { value } = event.target;
    setNickname(value);
  }

  function onClick(event) {
    event.preventDefault();
    const nextTimezones = Array.from(new Set([...currentTimezones, selectedTimezone]));
    setLocalStorage('timezones', nextTimezones);
    setSelectedTimezone('');
    if (nickname) {
      setLocalStorage('nicknames', { ...currentNicknames, [selectedTimezone]: nickname });
      setNickname('');
    }
  }

  return (
    <div>
      <h2>Add new timezone</h2>
      <form>
        <label htmlFor="timezone">Select timezone</label>
        <TimezoneSelect
          onChange={onChange}
          value={selectedTimezone}
          id="timezone"
          placeholder="Select timezone"
          required
        />
        <label htmlFor="nickname">Add nickname (optional)</label>
        <input
          type="text"
          id="nickname"
          onChange={onChangeNickname}
          value={nickname}
        />
        <div>
          <button type="submit" onClick={onClick}>
            Add timezone
          </button>
        </div>
      </form>
    </div>
  );
}
