import PropTypes from 'prop-types';

import styles from './Timezone.module.css';

export default function TimezoneBar({ index, timeEnd, timeStart }) {
  const row = index * 2 + 1;
  return (
    <div
      className={styles.bar}
      style={{
        gridRowStart: row,
        gridRowEnd: row,
        gridColumnStart: timeStart + 1,
        gridColumnEnd: timeEnd + 1,
      }}
    />
  );
}

TimezoneBar.propTypes = {
  index: PropTypes.number.isRequired,
  timeEnd: PropTypes.number.isRequired,
  timeStart: PropTypes.number.isRequired,
};
