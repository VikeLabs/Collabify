import PropTypes from 'prop-types';
import { getAllIcons, MuiIcon } from 'components/MuiIcon';
import { Typography } from '@mui/material';

import style from 'styles/pages/home.module.css';
import utilities from 'styles/utilities.module.css';

export const Icons = ({ setActiveIcon, activeIcon }) => {
  const icons = getAllIcons();
  const allIcons = () => {
    return icons.map((icon) => {
      return (
        <li
          key={icon}
          className={activeIcon === icon ? style.iconSelected : style.icon}
          onClick={() => setActiveIcon(() => icon)}
        >
          <MuiIcon icon={icon} />
        </li>
      );
    });
  };

  return (
    <>
      <Typography
        variant='h5'
        className={[utilities.heading, utilities.marginBottom1]}
      >
        ICON:
      </Typography>
      <ul className={style.allIcons}>{allIcons()}</ul>
    </>
  );
};

Icons.propTypes = {
  setActiveIcon: PropTypes.func.isRequired,
  activeIcon: PropTypes.number, // this will most likely be changed.
};
