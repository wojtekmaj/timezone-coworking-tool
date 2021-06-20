import PropTypes from 'prop-types';
import { useLocalStorage } from '@wojtekmaj/react-hooks';

import './Timezone.less';

export default function TimezoneOptions({ displayLabel, tzCode }) {
  const [currentNicknames, setCurrentNicknames] = useLocalStorage('nicknames', {});
  const [currentTimezones, setCurrentTimezones] = useLocalStorage('timezones', []);

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
  }

  function onClickRemove() {
    const nextTimezones = [...currentTimezones];
    nextTimezones.splice(nextTimezones.indexOf(tzCode), 1);
    setCurrentTimezones(nextTimezones);

    const nextNicknames = { ...currentNicknames };
    delete nextNicknames[tzCode];
    setCurrentNicknames(nextNicknames);
  }

  return (
    <div className="Timezone__options">
      <button
        className="Timezone__options__edit"
        type="button"
        title="Edit"
        onClick={onClickEdit}
      >
        <span role="img" aria-label="Edit">🖊️</span>
      </button>
      <button
        className="Timezone__options__remove"
        type="button"
        title="Remove"
        onClick={onClickRemove}
      >
        <span role="img" aria-label="Remove">🗑️️</span>
      </button>
    </div>
  );
}

TimezoneOptions.propTypes = {
  displayLabel: PropTypes.string.isRequired,
  tzCode: PropTypes.string.isRequired,
};
