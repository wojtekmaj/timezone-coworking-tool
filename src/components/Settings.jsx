import { useLocalStorage } from '@wojtekmaj/react-hooks';

import TimezoneSelect from './TimezoneSelect';
import HourInput from './HourInput';

import { detectTimezone } from '../utils';

export default function Settings() {
  const [myTimezone, setMyTimezone] = useLocalStorage('myTimezone', detectTimezone());
  const [workStart, setWorkStart] = useLocalStorage('workStart', 9);
  const [workEnd, setWorkEnd] = useLocalStorage('workEnd', 17);

  return (
    <div>
      <h2>Settings</h2>
      <label htmlFor="myTimezone">Select your timezone</label>
      <TimezoneSelect
        id="myTimezone"
        onChange={(event) => setMyTimezone(event.target.value)}
        placeholder="Select your timezone"
        value={myTimezone}
      />
      <label htmlFor="workStart">Work start hour</label>
      <HourInput
        id="workStart"
        onChange={(event) => setWorkStart(event.target.value)}
        value={workStart}
        max={Number(workEnd) - 1}
      />
      <label htmlFor="workEnd">Work end hour</label>
      <HourInput
        id="workEnd"
        onChange={(event) => setWorkEnd(event.target.value)}
        value={workEnd}
        min={Number(workStart) + 1}
      />
    </div>
  );
}
