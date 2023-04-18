import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export type LocalStorageObject = Record<string, any>;

export const LocalStorageContext = createContext<
  [LocalStorageObject, (obj: LocalStorageObject) => void]
>([
  {},
  () => {
    // Intentionally empty
  },
]);

type LocalStorageProviderProps = {
  children?: React.ReactNode;
  localStorageKey: string;
};

export default function LocalStorageProvider({
  children,
  localStorageKey,
}: LocalStorageProviderProps) {
  const [localStorageObj, setLocalStorageObj] = useState(
    JSON.parse(localStorage[localStorageKey] || '{}'),
  );

  function saveLocalStorage() {
    localStorage[localStorageKey] = JSON.stringify(localStorageObj);
  }

  useEffect(saveLocalStorage, [localStorageKey, localStorageObj]);

  function set(amend: LocalStorageObject) {
    const nextLocalStorageObj = {
      ...localStorageObj,
      ...amend,
    };
    setLocalStorageObj(nextLocalStorageObj);
  }

  return (
    <LocalStorageContext.Provider value={[localStorageObj, set]}>
      {children}
    </LocalStorageContext.Provider>
  );
}

LocalStorageProvider.propTypes = {
  children: PropTypes.node,
  localStorageKey: PropTypes.string.isRequired,
};
