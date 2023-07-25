import { bar } from './Timezone.module.css';

type TimezoneBarProps = {
  index: number;
  timeEnd: number;
  timeStart: number;
};

export default function TimezoneBar({ index, timeEnd, timeStart }: TimezoneBarProps) {
  const row = index * 2 + 1;
  return (
    <div
      className={bar}
      style={{
        gridRowStart: row,
        gridRowEnd: row,
        gridColumnStart: timeStart + 1,
        gridColumnEnd: timeEnd + 1,
      }}
    />
  );
}
