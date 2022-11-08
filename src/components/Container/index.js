import { MuiIcon } from 'components/MuiIcon';
import useDeviceDetect from 'hooks/useDeviceDetect';
import style from 'styles/components/container.module.css';

export const Container = ({ 
  header = '', 
  leftIcon = null, 
  leftIconClick,
  rightIcon = null, 
  rightIconClick,
  children 
}) => {
  const { isMobile } = useDeviceDetect();
  return (
    <section className={style.container}>
      <header className={style.headerContainer}>
        {leftIcon && <MuiIcon 
        onClick={leftIconClick}
        icon={leftIcon} 
        propStyle={{
          color: 'white', 
          position: 'absolute', 
          marginTop: '0.2em'
        }}/>}
        {rightIcon && <MuiIcon 
        onClick={rightIconClick}
        icon={rightIcon} 
        propStyle={{
          color: 'white', 
          position: 'absolute', 
          marginTop: '0.2em',
          right: isMobile ? '3vw' : '2.5vw'
        }}/>}
        <h1 className={style.header}>{header}</h1>
      </header>
      <div className={style.child}>
        {/* styling for children node is NOT handled by this component */}
        <div className={style.content}>{children}</div>
      </div>
    </section>
  );
};
