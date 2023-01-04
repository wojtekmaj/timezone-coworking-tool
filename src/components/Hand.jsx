import { useTick } from '@wojtekmaj/react-hooks';

import { wrapper, hand, time } from './Hand.module.css';

export default function Hand() {
  useTick(1000);
  const date = new Date();
  const hourStart = date.getHours();
  const minuteStart = date.getMinutes();

  return (
    <div
      className={wrapper}
      style={{
        gridColumnStart: hourStart + 1,
        gridColumnEnd: hourStart + 1,
      }}
    >
      <div
        className={hand}
        style={{
          gridColumnStart: minuteStart + 1,
          gridColumnEnd: minuteStart + 1,
        }}
      >
        <div className={time}>
          {date.toLocaleTimeString(undefined, { hour: 'numeric', minute: 'numeric' })}
        </div>
      </div>
    </div>
  );
}
