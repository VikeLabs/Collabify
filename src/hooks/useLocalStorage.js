import React, { useState, useEffect } from 'react';

/**
 * @param {string} key - localStorage item key
 * @param {any} defaultValue - localStorage item default value
 * @returns {[string, React.Dispatch<React.SetStateAction<any>>]}
 *
 * Whenever the `setState` function is called, the new value will be
 * set to localStorage
 */
export const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(null);

  // NOTE:
  // Since NextJS renders things on server side, if localStorage were to be used,
  // it throws an error, thus it needs to be wrapped in a useEffect and will only
  // call `localStorage` when the component is mounted.
  useEffect(() => {
    const initialValue = localStorage.getItem(key) || defaultValue;
    setValue(() => initialValue);
  }, []);

  // set item to localStorage
  useEffect(() => {
    localStorage.setItem(key, value);
  }, [value]);

  return [value, setValue];
};
