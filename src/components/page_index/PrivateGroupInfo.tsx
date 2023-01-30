// MUI
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { TextField } from '@mui/material';

import cx from 'classnames';
import styles from 'styles/pages/home.module.css';
import utilities from 'styles/utilities.module.css';

import { motion, AnimatePresence } from 'framer-motion';

interface PropType {
  isPrivate: boolean;
  password: string;
  setPassword(param: any): void;
  handleToggleSwitch(param: any): void;
}

export const PrivateGroupInfo = ({
  isPrivate,
  password,
  setPassword,
  handleToggleSwitch,
}: PropType) => {
  const handlePasswordChange = (event) => {
    setPassword(() => event.target.value);
  };

  return (
    <section id='Group-password'>
      <div className={cx(utilities.heading, styles.privateHeading)}>
        <h4>PRIVATE:</h4>
        <span>
          <FormControlLabel
            control={
              <Switch
                checked={isPrivate}
                onChange={handleToggleSwitch}
              />
            }
            inputProps={{ 'aria-label': 'controlled' }}
          />
        </span>
      </div>

      {/* PASSWORD  */}
      <AnimatePresence>
        {isPrivate && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'max-content' }}
            exit={{ height: 0 }}
            className={utilities.inputFields}
            style={{ overflow: 'hidden' }}
          >
            <TextField
              label='Password (between 8 and 16 characters)'
              variant='filled'
              type='password'
              value={password}
              className={utilities.input}
              onChange={handlePasswordChange}
              required={isPrivate}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
