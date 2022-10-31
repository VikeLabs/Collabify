import PropTypes from 'prop-types';
import { TextField } from '@mui/material';

import style from 'styles/pages/home.module.css';

export const GroupInfo = ({ name, setName, description, setDescription }) => {
  return (
    <>
      {/* Name input */}
      <h2 className={style.header}>information:</h2>

      <div className={style.inputFields}>
        <TextField
          label='Group name'
          id='outlined-basic'
          variant='filled'
          className={style.input}
          required
          onChange={(e) => setName(() => e.target.value)}
          value={name}
        />
        {/* Description input */}
        <TextField
          label='Description'
          id='outlined-basic'
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
