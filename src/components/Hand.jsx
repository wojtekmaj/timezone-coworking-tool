import React from 'react';

import './Hand.less';

import useTick from '../hooks/useTick';

export default function Hand() {
  useTick();
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
