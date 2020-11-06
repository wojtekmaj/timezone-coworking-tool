import TimezoneSelect from './TimezoneSelect';
import HourInput from './HourInput';

import { detectTimezone } from '../utils';

import useLocalStorage from '../hooks/useLocalStorage';

export default function Settings() {
  const [localStorage, setLocalStorage] = useLocalStorage();
  const {
    myTimezone = detectTimezone(),
    workStart = 9,
    workEnd = 17,
  } = localStorage;

  function makeOnChange(key) {
    return function onChange(event) {
      const { value } = event.target;
      setLocalStorage({ [key]: value });
    };
  }

  return (
    <div>
      <h2>Settings</h2>
      <label htmlFor="myTimezone">Select your timezone</label>
      <TimezoneSelect
        id="myTimezone"
        onChange={makeOnChange('myTimezone')}
        placeholder="Select your timezone"
        value={myTimezone}
      />
      <label htmlFor="workStart">Work start hour</label>
      <HourInput
        id="workStart"
        onChange={makeOnChange('workStart')}
        value={workStart}
        max={Number(workEnd) - 1}
      />
      <label htmlFor="workEnd">Work end hour</label>
      <HourInput
        id="workEnd"
        onChange={makeOnChange('workEnd')}
        value={workEnd}
        min={Number(workStart) + 1}
      />
    </div>
  );
}
