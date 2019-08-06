import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export const LocalStorageContext = createContext({});

export default function LocalStorageProvider({ children, localStorageKey }) {
  const [localStorageObj, setLocalStorageObj] = useState(JSON.parse(localStorage[localStorageKey] || '{}'));

  function saveLocalStorage() {
    localStorage[localStorageKey] = JSON.stringify(localStorageObj);
  }

  useEffect(saveLocalStorage, [localStorageObj]);

  function set(key, value) {
    const nextLocalStorageObj = {
      ...localStorageObj,
      [key]: value,
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
