/* TODO: Icons placeholder, will need to change this to display the actual icons*/
import PropTypes from 'prop-types';

import style from 'styles/pages/home.module.css';

export const Icons = ({ setActiveIcon, activeIcon }) => {
  const icons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
  const allIcons = () => {
    return icons.map((icon) => {
      return (
        <li
          key={icon}
          className={activeIcon === icon ? style.iconSelected : style.icon}
          onClick={() => setActiveIcon(() => icon)}
        >
          {icon}
        </li>
      );
    });
  };

  return (
    <>
      <h2 className={style.header}>icon:</h2>
      <ul className={style.allIcons}>{allIcons()}</ul>
    </>
  );
};

Icons.propTypes = {
  setActiveIcon: PropTypes.func.isRequired,
  activeIcon: PropTypes.number.isRequired, // this will most likely be changed.
};
