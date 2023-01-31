import { AllowedIcons, getAllIcons, MuiIcon } from 'components/common/MuiIcon';
import { SetStateAction } from 'react';

import style from 'styles/pages/home.module.css';
import utilities from 'styles/utilities.module.css';

interface PropType {
  activeIcon: AllowedIcons;
  setActiveIcon(param: AllowedIcons): void;
}

export const Icons = ({ setActiveIcon, activeIcon }: PropType) => {
  const icons = getAllIcons();
  const allIcons = () => {
    return icons.map((icon: AllowedIcons) => {
      return (
        <li
          key={icon}
          className={activeIcon === icon ? style.iconSelected : style.icon}
          onClick={() => setActiveIcon(icon)}
        >
          <MuiIcon icon={icon} setActiveIcon={function (value: SetStateAction<AllowedIcons>): void {
            throw new Error('Function not implemented.');
          } } />
        </li>
      );
    });
  };

  return (
    <>
      <h2 className={utilities.heading}>ICON:</h2>
      <ul className={style.allIcons}>{allIcons()}</ul>
    </>
  );
};
