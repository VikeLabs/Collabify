import { useState } from 'react';

import { Container, TextField } from '@mui/material';
import { Button , Stack , Alert, Snackbar } from '@mui/material';


import utilities from 'styles/utilities.module.css';
import styles from 'styles/components/LogInForm.module.css';

/**
 * setIsAuth: setState<boolean>
 *            -- call `setIsAuth(() => true)` on success
 */
export const LogInForm = ({ setIAuth }) => {
  {/* Entering Password To Authenticate*/}

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [open, setOpen] = useState(false);

  const handlePasswordChange=(e)=>{
    setPasswordError('');
    setPassword(e.target.value);
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleFormSubmit=(e)=>{
    if(password=='') {
      setPasswordError('Password Required');
    }
    else if (password=='test'){
      //want to actually check password from database but not worrying about that rn
      //want to load group page after submitting
    }
    else {
      setPasswordError('Wrong Password');
    }
    setOpen(true)
  }
  
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
              onChange={handlePasswordChange}  
            />
      </div>
      
     
      {passwordError&&<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert variant="filled" onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {passwordError}
        </Alert>
      </Snackbar>}
      
      <div className={styles.containerButton}>
        <Button className={styles.buttonSubmitAuth} 
        size='large' 
        variant="contained"
        onClick={handleFormSubmit}>
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
