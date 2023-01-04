import PropTypes from 'prop-types';

import { input } from './HourInput.module.css';

export default function HourInput(props) {
  return <input className={input} max={24} min={0} type="number" {...props} />;
}

HourInput.propTypes = {
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
