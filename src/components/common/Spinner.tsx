/* Spinner component
 * By default this will take up the entire dom
 * unless the parent component needs to have a css rule `position: relative;`
 * */
import { CircularProgress } from '@mui/material';

import style from 'styles/components/spinner.module.css';

interface PropType {
  isLoading: boolean;
}

export const Spinner = ({ isLoading }: PropType) => {
  if (isLoading === true)
    return (
      <div className={style.spinner}>
        <CircularProgress />
      </div>
    );

  return null;
};
