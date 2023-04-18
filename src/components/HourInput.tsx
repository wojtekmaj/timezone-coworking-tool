import PropTypes from 'prop-types';

import { input } from './HourInput.module.css';

type HourInputProps = {
  id: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function HourInput(props: HourInputProps) {
  return <input className={input} max={24} min={0} type="number" {...props} />;
}

HourInput.propTypes = {
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
