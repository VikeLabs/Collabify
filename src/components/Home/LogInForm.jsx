import { useState } from 'react';

/**
 * setIsAuth: setState<boolean>
 *            -- call `setIsAuth(() => true)` on success
 */
export const LogInForm = ({ setIAuth }) => {
  //
};

const mockFetch = (fetchStatus) => {
  return new Promise((resolve, _) => {
    setTimeout(() => {
      switch (fetchStatus) {
        case 'failed':
          return resolve({ status: 401 });
        case 'ok':
          return resolve({ status: 200 });
        default:
          return resolve({ status: 500 });
      }
    }, 500);
  });
};
