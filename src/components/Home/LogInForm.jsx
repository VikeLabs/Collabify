import { useState } from 'react';

import { Container, TextField } from '@mui/material';
import { Button } from '@mui/material';

import utilities from 'styles/utilities.module.css';
import styles from 'styles/components/LogInForm.module.css';

/**
 * setIsAuth: setState<boolean>
 *            -- call `setIsAuth(() => true)` on success
 */
export const LogInForm = ({ setIAuth }) => {
  {/* Entering Password To Authenticate*/}
  return(
    <section className={styles.authPasswordContainer}>
      <h1 className={utilities.heading} >Private Group Authentication Required:</h1>
      {/* Text field to collect password*/}

      <div>
      <TextField className={styles.inputFieldAuth}
              label='Password (enter to gain access)'
              variant='filled'
              type='password'
              size='large'      
            />
      </div>
      
      <div className={styles.containerButton}>
        <Button className={styles.buttonSubmitAuth}  size='large' variant="contained">
          Submit
        </Button>
      </div>

    </section>
  )

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
