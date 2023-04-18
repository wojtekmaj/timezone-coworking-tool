import PropTypes from 'prop-types';

import { options, edit, remove } from './Timezone.module.css';

import useLocalStorage from '../hooks/useLocalStorage';

type TimezoneOptionsProps = {
  displayLabel: string;
  tzCode: string;
};

export default function TimezoneOptions({ displayLabel, tzCode }: TimezoneOptionsProps) {
  const [localStorage, setLocalStorage] = useLocalStorage();
  const { nicknames: currentNicknames = {}, timezones: currentTimezones = [] } = localStorage;

  function onClickEdit() {
    // eslint-disable-next-line no-alert
    const nickname = prompt('Enter new nickname', displayLabel);

    // User clicked "Cancel"
    if (nickname === null) {
      return;
    }

    const nextNicknames = { ...currentNicknames };
    nextNicknames[tzCode] = nickname;

    const nextLocalStorage = {
      nicknames: nextNicknames,
    };

    setLocalStorage(nextLocalStorage);
  }

  function onClickRemove() {
    const nextTimezones = [...currentTimezones];
    nextTimezones.splice(nextTimezones.indexOf(tzCode), 1);

    const nextNicknames = { ...currentNicknames };
    delete nextNicknames[tzCode];

    const nextLocalStorage = {
      nicknames: nextNicknames,
      timezones: nextTimezones,
    };

    setLocalStorage(nextLocalStorage);
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
