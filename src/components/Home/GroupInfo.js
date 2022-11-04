import PropTypes from 'prop-types';
import { TextField } from '@mui/material';

import utilities from 'styles/utilities.module.css';

export const GroupInfo = ({ name, setName, description, setDescription }) => {
  return (
    <>
      {/* Name input */}
      <h2
        className={utilities.heading}
      >
        INFORMATION:
      </h2>

      <div className={utilities.inputFields}>
        <TextField
          label='Group name'
          variant='filled'
          className={utilities.input}
          required
          onChange={(e) => setName(() => e.target.value)}
          value={name}
        />
        {/* Description input */}
        <TextField
          label='Description'
          variant='filled'
          className={utilities.input}
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
