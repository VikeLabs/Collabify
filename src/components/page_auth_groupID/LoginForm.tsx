import { useEffect, useState } from 'react';

import {
  Button,
  Alert,
  Snackbar,
  TextField,
  CircularProgress,
} from '@mui/material';

import utilities from 'styles/utilities.module.css';
import styles from 'styles/components/LogInForm.module.css';

interface PropType {
  handleSubmit: (password: string, callback: (err: string) => void) => void;
}

export const LogInForm = ({ handleSubmit }: PropType) => {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [open, passwordError, setOpen, setPasswordError] = useError();

  const handlePasswordChange = (e: any) => {
    setPasswordError(() => '');
    setPassword(() => e.target.value);
  };

  const handleClose = () => {
    setOpen(() => false);
  };

  const handleFormSubmit = () => {
    setIsLoading(() => true);
    handleSubmit(password, (errorMessage) => {
      if (errorMessage) {
        setIsLoading(() => false);
        setPasswordError(() => errorMessage);
      }
    });
  };

  return (
    <section className={styles.authPasswordContainer}>
      <h1 className={utilities.heading}>
        Private Group Authentication Required:
      </h1>
      {/* Text field to collect password*/}

      <div>
        <TextField
          className={styles.inputFieldAuth}
          label='Password (8 to 16 characters)'
          variant='filled'
          type='password'
          size='medium'
          onChange={handlePasswordChange}
        />
      </div>

      {passwordError && (
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert
            variant='filled'
            onClose={handleClose}
            severity='error'
            sx={{ width: '100%' }}
          >
            {passwordError}
          </Alert>
        </Snackbar>
      )}

      <div className={styles.containerButton}>
        <Button
          className={styles.buttonSubmitAuth}
          size='large'
          variant='contained'
          onClick={handleFormSubmit}
          disabled={password.length < 8 || password.length > 16}
        >
          {isLoading ? <CircularProgress color='secondary' /> : 'Submit'}
        </Button>
      </div>
    </section>
  );
};

function useError() {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);
  // display error for 3 seconds
  useEffect(() => {
    if (error) {
      setOpen(() => true);
      const timeoutID = setTimeout(() => setOpen(() => false), 3000);
      return () => clearTimeout(timeoutID);
    }
  }, [error]);

  return [open, error, setError, setError];
}
