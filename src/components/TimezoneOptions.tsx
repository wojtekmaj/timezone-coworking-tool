import PropTypes from 'prop-types';
import { useLocalStorage } from '@wojtekmaj/react-hooks';

import { options, edit, remove } from './Timezone.module.css';
import { triggerStorageEvent } from '../utils';

type TimezoneOptionsProps = {
  displayLabel: string;
  tzCode: string;
};

export default function TimezoneOptions({ displayLabel, tzCode }: TimezoneOptionsProps) {
  const [currentNicknames, setCurrentNicknames] = useLocalStorage<Record<string, string>>(
    'nicknames',
    {},
  );
  const [currentTimezones, setCurrentTimezones] = useLocalStorage<string[]>('timezones', []);

  function onClickEdit() {
    // eslint-disable-next-line no-alert
    const nickname = prompt('Enter new nickname', displayLabel);

    // User clicked "Cancel"
    if (nickname === null) {
      return;
    }

    const nextNicknames = { ...currentNicknames };
    nextNicknames[tzCode] = nickname;

    setCurrentNicknames(nextNicknames);
    triggerStorageEvent('nicknames', nextNicknames);
  }

  function onClickRemove() {
    const nextTimezones = [...currentTimezones];
    nextTimezones.splice(nextTimezones.indexOf(tzCode), 1);

    const nextNicknames = { ...currentNicknames };
    delete nextNicknames[tzCode];

    setCurrentNicknames(nextNicknames);
    triggerStorageEvent('nicknames', nextNicknames);

    setCurrentTimezones(nextTimezones);
    triggerStorageEvent('timezones', nextTimezones);
  }

  return (
    <div className={options}>
      <button className={edit} type="button" title="Edit" onClick={onClickEdit}>
        <span role="img" aria-label="Edit">
          🖊️
        </span>
      </button>
      <button className={remove} type="button" title="Remove" onClick={onClickRemove}>
        <span role="img" aria-label="Remove">
          🗑️️
        </span>
      </button>
    </div>
  );
}

TimezoneOptions.propTypes = {
  displayLabel: PropTypes.string.isRequired,
  tzCode: PropTypes.string.isRequired,
};
