import style from 'styles/components/container.module.css';
import { AppBar } from '../../../node_modules/@material-ui/core/index';
import * as Icon from '@mui/icons-material';
import { useDeviceDetect } from 'hooks';

interface PropType {
  header?: string;
  children: React.ReactNode;
  // left components
  leftIcon?: string;
  leftIconClick?: () => void;
  leftButton?: React.ReactNode;
  // right components
  rightIcon?: string;
  rightIconClick?: () => void;
}

export const Container = ({
  header,
  children,
  leftButton,
  rightIcon,
  rightIconClick,
  leftIcon,
  leftIconClick,
}: PropType) => {
  const LeftIcon = leftIcon ? Icon[leftIcon] : null;
  const RightIcon = rightIcon ? Icon[rightIcon] : null;
  const { isMobile } = useDeviceDetect();

  return (
    <div>
      <AppBar
        className={style.headerContainer}
        position='static'
      >
        {leftButton ? leftButton : <LeftIcon onClick={leftIconClick} />}
        {header ? <h1 className={style.header}>{header}</h1> : null}
        {rightIcon ? (
          <RightIcon
            style={{
              color: 'white',
              position: 'absolute',
              marginTop: '0.2em',
              right: isMobile ? '3vw' : '2.5vw',
              cursor: 'pointer',
            }}
            onClick={rightIconClick}
          />
        ) : null}
      </AppBar>

      <div className={style.child}>
        {/* styling for children node is NOT handled by this component */}
        <div className={style.content}>{children}</div>
      </div>
    </div>
  );
};
