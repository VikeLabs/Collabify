import { MuiIcon } from 'components/MuiIcon';
import { useDeviceDetect } from 'hooks';
import * as Icons from '@mui/icons-material';
import style from 'styles/components/container.module.css';

export const Container = ({
  header = '',
  leftIcon = null,
  leftIconClick,
  rightIcon = null,
  rightIconClick,
  children,
}) => {
  const { isMobile } = useDeviceDetect();
  const LeftIconComponent = Icons[leftIcon];
  const RightIconComponent = Icons[rightIcon];
  return (
    <section className={style.container}>
      <header className={style.headerContainer}>
        {leftIcon && (
          <div aria-label='back button'>
            <LeftIconComponent
              onClick={leftIconClick}
              icon={leftIcon}
              style={{
                color: 'white',
                position: 'absolute',
                marginTop: '0.2em',
                cursor: 'pointer',
              }}
            />
          </div>
        )}
        {rightIcon && (
          <div aria-label='create availability'>
            <RightIconComponent
              onClick={rightIconClick}
              icon={rightIcon}
              style={{
                color: 'white',
                position: 'absolute',
                marginTop: '0.2em',
                right: isMobile ? '3vw' : '2.5vw',
                cursor: 'pointer',
              }}
            />
          </div>
        )}
        <h1 className={style.header}>{header}</h1>
      </header>
      <div className={style.child}>
        {/* styling for children node is NOT handled by this component */}
        <div className={style.content}>{children}</div>
      </div>
    </section>
  );
};
