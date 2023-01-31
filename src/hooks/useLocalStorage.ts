import React, { useState } from 'react';

/**
 * @param {string} key - localStorage item key
 * @returns {[string, React.Dispatch<React.SetStateAction<any>>]}
 *
 * Whenever the `setState` function is called, the new value will be
 * set to localStorage
 */
function getStorageValue(key: string) {
  // getting stored value
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(key);
    const initial = JSON.parse(saved);
    return initial;
  }
}
// Gets whats in the local storage key
export const useLocalStorage = (key: string) => {
    const [value, setValue] = useState(() => {
      return getStorageValue(key);
    });
  
    return [value, setValue];
};
