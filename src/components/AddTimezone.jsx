import React, { useContext, useState } from 'react';

import TimezoneSelect from './TimezoneSelect';

import { LocalStorageContext } from '../LocalStorageProvider';

import { uniq } from '../utils';

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

  function onSubmit(event) {
    event.preventDefault();
    const nextTimezones = uniq([...currentTimezones, selectedTimezone]).filter(Boolean);
    const nextLocalStorage = {
      timezones: nextTimezones,
    };
    if (nickname) {
      nextLocalStorage.nicknames = { ...currentNicknames, [selectedTimezone]: nickname };
    }
    setLocalStorage(nextLocalStorage);
    setSelectedTimezone('');
    setNickname('');
  }

  return (
    <div>
      <h2>Add new timezone</h2>
      <form onSubmit={onSubmit}>
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
          <button type="submit">
            Add timezone
          </button>
        </div>
      </form>
    </div>
  );
}
