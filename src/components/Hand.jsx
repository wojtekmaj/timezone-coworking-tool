import React from 'react';
import { useTick } from '@wojtekmaj/react-hooks';

import './Hand.less';

export default function Hand() {
  useTick(1000);
  const date = new Date();
  const hourStart = date.getHours();
  const minuteStart = date.getMinutes();

  return (
    <div
      className="Hand"
      style={{
        gridColumnStart: hourStart + 1,
        gridColumnEnd: hourStart + 1,
      }}
    >
      <div
        className="Hand__hand"
        style={{
          gridColumnStart: minuteStart + 1,
          gridColumnEnd: minuteStart + 1,
        }}
      >
        <div className="Hand__hand__time">
          {date.toLocaleTimeString(undefined, { hour: 'numeric', minute: 'numeric' })}
        </div>
      </div>
    </div>
  );
}
