import PropTypes from 'prop-types';
import { TextField, Typography } from '@mui/material';

import style from 'styles/pages/home.module.css';
import utilities from 'styles/utilities.module.css'

export const GroupInfo = ({ name, setName, description, setDescription }) => {
  return (
    <>
      {/* Name input */}
      <Typography variant='h5' className={[utilities.heading, utilities.marginTop1, utilities.marginBottom1]}>
      INFORMATION:
      </Typography>

      <div className={style.inputFields}>
        <TextField
          label='Group name'
          variant='filled'
          className={style.input}
          required
          onChange={(e) => setName(() => e.target.value)}
          value={name}
        />
        {/* Description input */}
        <TextField
          label='Description'
          variant='filled'
          className={style.input}
          required
          onChange={(e) => setDescription(() => e.target.value)}
          value={description}
        />
      </div>
    </>
  );
};

GroupInfo.propTypes = {
  name: PropTypes.string.isRequired,
  setName: PropTypes.func.isRequired,
  description: PropTypes.string.isRequired,
  setDescription: PropTypes.func.isRequired,
};
