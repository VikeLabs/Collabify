import * as Icons from '@mui/icons-material';
import style from 'styles/components/container.module.css';
import { AppBar } from '../../../node_modules/@material-ui/core/index';
import { LeftIcon } from 'components/ContainerIcons/leftRightIcon';

export const Container = ({
  //nuking
  leftIconClick,
  rightIcon = null,
  children,
  // keeping
  header = '',
  menu,
  leftIcon,
}) => {
  // showing tooltip
  // Icon init

  return (
    <div>
      <AppBar
        className={style.headerContainer}
        position='static'
      >
        {menu ? menu : null}
        {leftIcon ? leftIcon : null}

        {rightIcon ? rightIcon : null}
        <h1 className={style.header}>{header}</h1>
      </AppBar>
      {/* Drop down menu */}
      <div className={style.child}>
        {/* styling for children node is NOT handled by this component */}
        <div className={style.content}>{children}</div>
      </div>
    </div>
  );
};

// {leftIcon && (
//   <div>
//     <LeftIcon
//       LeftIconComponent={LeftIconComponent}
//       leftIconClick={leftIconClick}
//       leftIcon={leftIcon}
//     />
//   </div>
// )}
