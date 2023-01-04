import { wrapper, hour as hourClassName, hand, time } from './Timeline.module.css';

export default function Timeline() {
  const hours = new Array(24).fill().map((el, idx) => idx);

  return (
    <div className={wrapper}>
      {hours.map((hour) => {
        const date = new Date();
        date.setHours(hour, 0, 0, 0);

        return (
          <div
            key={hour}
            className={hourClassName}
            style={{
              gridColumnStart: hour + 1,
              gridColumnEnd: hour + 1,
            }}
          >
            <div
              className={hand}
              style={{
                gridColumnStart: 1,
                gridColumnEnd: 1,
              }}
            >
              <div className={time}>
                {date.toLocaleTimeString(undefined, { hour: 'numeric', minute: 'numeric' })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
