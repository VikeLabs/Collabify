import { useState } from 'react';

/**
 * useBool(bool)
 * @params {bool} initialState
 * @returns: { bool, setBool, toggleBool }
 *
 * - returns the state, the setState function, and the toggle state function
 */
export const useBool = (initialState) => {
  if (typeof initialState !== 'boolean') {
    throw new TypeError(
      `initialState is of type boolean, got ${typeof initialState}`
    );
  }

  const [bool, setBool] = useState(initialState);
  const toggleBool = () => setBool((currentState) => !currentState);

  return { bool, setBool, toggleBool };
};
