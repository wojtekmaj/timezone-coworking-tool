import { useLocalStorage } from '@wojtekmaj/react-hooks';

import TimezoneSelect from './TimezoneSelect.js';
import HourInput from './HourInput.js';

import { detectTimezone, triggerStorageEvent } from '../utils.js';

export default function Settings() {
  const [myTimezone, setMyTimezone] = useLocalStorage('myTimezone', detectTimezone());
  const [workStart, setWorkStart] = useLocalStorage('workStart', 9);
  const [workEnd, setWorkEnd] = useLocalStorage('workEnd', 17);

  function onChangeMyTimezone(event: React.ChangeEvent<HTMLSelectElement>) {
    const { value } = event.target;

    setMyTimezone(value);
    triggerStorageEvent('myTimezone', value);
  }

  function onChangeWorkStart(event: React.ChangeEvent<HTMLInputElement>) {
    const { value, valueAsNumber } = event.target;

    setWorkStart(valueAsNumber);
    triggerStorageEvent('workStart', value);
  }

  function onChangeWorkEnd(event: React.ChangeEvent<HTMLInputElement>) {
    const { value, valueAsNumber } = event.target;

    setWorkEnd(valueAsNumber);
    triggerStorageEvent('workEnd', value);
  }

  return (
    <div>
      <h2>Settings</h2>
      <label htmlFor="myTimezone">Select your timezone</label>
      <TimezoneSelect
        id="myTimezone"
        onChange={onChangeMyTimezone}
        placeholder="Select your timezone"
        value={myTimezone}
      />
      <label htmlFor="workStart">Work start hour</label>
      <HourInput
        id="workStart"
        onChange={onChangeWorkStart}
        value={workStart}
        max={Number(workEnd) - 1}
      />
      <label htmlFor="workEnd">Work end hour</label>
      <HourInput
        id="workEnd"
        onChange={onChangeWorkEnd}
        value={workEnd}
        min={Number(workStart) + 1}
      />
    </div>
  );
}
