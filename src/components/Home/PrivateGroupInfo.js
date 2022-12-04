
// MUI

import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { TextField } from '@mui/material';

import style from 'styles/pages/home.module.css';
import utilities from 'styles/utilities.module.css';



export const PrivateGroupInfo =({isPrivate,password,handlePasswordChange,handleChangePrivateSwitch})=> {
  return (
    <>
          {/*Private Group*/}
          <div className={style.privateHeading}>
             
            <p>PRIVATE:
              <FormControlLabel
              control={<Switch checked={isPrivate} onChange={handleChangePrivateSwitch}/>}
              inputProps={{ 'aria-label': 'controlled' }}
              />
            </p>
          
          {/*password*/}
          { isPrivate &&
             <div className={utilities.inputFields}>
              {
                <TextField
                  label='Password'
                  variant='filled'
                  type="password"
                  value={password}
                  className={utilities.input}
                  onChange={handlePasswordChange}
                />
              }
              </div>
            }
    
          </div>

       
    </>
  );
}