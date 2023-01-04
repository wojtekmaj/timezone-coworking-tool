import PropTypes from 'prop-types';

import styles from './HourInput.module.css';

export default function HourInput(props) {
  return <input className={styles.input} max={24} min={0} type="number" {...props} />;
}

HourInput.propTypes = {
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
