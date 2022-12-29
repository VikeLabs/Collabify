import { useState } from 'react';

/**
 * setIsAuth: setState<boolean>
 *            -- call `setIsAuth(() => true)` on success
 */
export const LogInForm = ({ setIAuth }) => {
  //
};

const mockFetch = (fetchStatus) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      switch (fetchStatus) {
        case 'failed':
          return reject({ status: 401 });
        case 'ok':
          return resolve({ status: 200 });
        default:
          return reject({ status: 500 });
      }
    }, 500);
  });
};
