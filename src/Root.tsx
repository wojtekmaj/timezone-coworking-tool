import AddTimezone from './components/AddTimezone.js';
import TimezoneList from './components/TimezoneList.js';

import Settings from './components/Settings.js';

export default function Root() {
  return (
    <div>
      <h1>Timezone coworking cool</h1>
      <TimezoneList />
      <AddTimezone />
      <Settings />
    </div>
  );
}
