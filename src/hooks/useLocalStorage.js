import { useState } from 'react';

function getStorageValue(key, defaultValue) {
  // getting stored value
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(key);
    const initial = JSON.parse(saved);
    return initial || defaultValue;
  }
}
// Gets whats in the local storage key
const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue);
  });

  return [value, setValue];
};

export default useLocalStorage;
