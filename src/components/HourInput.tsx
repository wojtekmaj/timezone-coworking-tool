import { input } from './HourInput.module.css';

type HourInputProps = {
  id: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function HourInput(props: HourInputProps) {
  return <input className={input} max={24} min={0} type="number" {...props} />;
}
