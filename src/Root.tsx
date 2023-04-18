import AddTimezone from './components/AddTimezone';
import TimezoneList from './components/TimezoneList';

import Settings from './components/Settings';

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
