/* Spinner component
 * By default this will take up the entire dom
 * unless the parent component needs to have a css rule `position: relative;`
 * */
import PropTypes from 'prop-types';
import { CircularProgress } from '@mui/material';

import style from 'styles/components/spinner.module.css';

export const Spinner = ({ isLoading }) => {
  if (isLoading === true)
    return (
      <div className={style.spinner}>
        <CircularProgress />
      </div>
    );

  return null;
};

Spinner.propType = {
  isLoading: PropTypes.bool.isRequired,
};
