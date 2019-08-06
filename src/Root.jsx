import React from 'react';

import AddTimezone from './components/AddTimezone';
import TimezoneList from './components/TimezoneList';

import LocalStorageProvider from './LocalStorageProvider';
import Settings from './components/Settings';

export default function Root() {
  return (
    <div>
      <LocalStorageProvider localStorageKey="timezone-coworking-tool">
        <Settings />
        <TimezoneList />
        <AddTimezone />
      </LocalStorageProvider>
    </div>
  );
}
