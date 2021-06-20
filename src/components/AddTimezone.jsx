import { useState } from 'react';
import { useLocalStorage } from '@wojtekmaj/react-hooks';

import TimezoneSelect from './TimezoneSelect';

import { uniq } from '../utils';

export default function AddTimezone() {
  const [currentNicknames, setCurrentNicknames] = useLocalStorage('nicknames', {});
  const [currentTimezones, setCurrentTimezones] = useLocalStorage('timezones', []);
  const [selectedTimezone, setSelectedTimezone] = useState('');
  const [nickname, setNickname] = useState('');

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
    setCurrentTimezones(nextTimezones);
    if (nickname) {
      setCurrentNicknames({ ...currentNicknames, [selectedTimezone]: nickname });
    }
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
