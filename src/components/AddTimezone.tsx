import { useState } from 'react';

import TimezoneSelect from './TimezoneSelect';

import useLocalStorage from '../hooks/useLocalStorage';

import { uniq } from '../utils';

import type { LocalStorageObject } from '../LocalStorageProvider';

export default function AddTimezone() {
  const [localStorage, setLocalStorage] = useLocalStorage();
  const [selectedTimezone, setSelectedTimezone] = useState('');
  const [nickname, setNickname] = useState('');
  const { nicknames: currentNicknames = {}, timezones: currentTimezones = [] } = localStorage;

  function onChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const { value } = event.target;
    setSelectedTimezone(value);
  }

  function onChangeNickname(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setNickname(value);
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextTimezones = uniq([...currentTimezones, selectedTimezone]).filter(Boolean);
    const nextLocalStorage: LocalStorageObject = {
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
        <input type="text" id="nickname" onChange={onChangeNickname} value={nickname} />
        <div>
          <button type="submit">Add timezone</button>
        </div>
      </form>
    </div>
  );
}
