import { useDeviceDetect } from 'hooks';
import * as Icons from '@mui/icons-material';
import style from 'styles/components/container.module.css';
import { AppBar } from '../../../node_modules/@material-ui/core/index';
import { LeftIcon } from 'components/ContainerIcons/leftRightIcon';
import { RightIcon } from 'components/ContainerIcons/leftRightIcon';

export const Container = ({
  header = '',
  leftIcon = null,
  leftIconClick,
  rightIcon = null,
  rightIconClick,
  children,
  menu,
}) => {
  const { isMobile } = useDeviceDetect();
  // showing tooltip
  // Icon init
  const LeftIconComponent = Icons[leftIcon];
  const RightIconComponent = Icons[rightIcon];

  return (
    <div>
      <AppBar
        className={style.headerContainer}
        position='static'
      >
        {menu ? menu : null}
        {leftIcon && (
          <div>
            <LeftIcon
              LeftIconComponent={LeftIconComponent}
              leftIconClick={leftIconClick}
              leftIcon={leftIcon}
            />
          </div>
        )}
        {rightIcon && (
          <div>
            <RightIcon
              RightIconComponent={RightIconComponent}
              rightIconClick={rightIconClick}
              rightIcon={rightIcon}
              isMobile={isMobile}
            />
          </div>
        )}

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
