import { useDeviceDetect, useLocalStorage } from 'hooks';
import * as Icons from '@mui/icons-material';
import style from 'styles/components/container.module.css';
import { useState } from 'react';
import { Divider, Menu, MenuItem } from '@mui/material';
import { IntroTooltip } from 'components/IntroTooltip';
import { CLOSE_ALL_TOOLTIPS } from 'constants';

export const Container = ({
  header = '',
  leftIcon = null,
  leftIconClick,
  rightIcon = null,
  rightIconClick,
  children,
  menu = null,
}) => {
  const { isMobile } = useDeviceDetect();
  // Menu drop down
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  // showing tooltip
  const [showTooltip, setShowToolTip] = useLocalStorage(CLOSE_ALL_TOOLTIPS);
  // Icon init
  const LeftIconComponent = Icons[leftIcon];
  const RightIconComponent = Icons[rightIcon];
  const MenuIconComponent = Icons['ExpandMore'];

  return (
    <div>
      <header className={style.headerContainer}>
        {/*TODO: Talk about having the navbar overtop of child as scroll */}
        {menu && (
          <IntroTooltip
            text='extend for more options'
            visible={showTooltip === undefined ?? true}
            close={() => setShowToolTip(false)}
            closeAll={() => {
              setShowToolTip(false);
              localStorage.setItem(CLOSE_ALL_TOOLTIPS, true);
            }}
          >
            <MenuIconComponent
              id='menu'
              onClick={(e) => {
                setAnchorEl(e.currentTarget);
                setShowToolTip(false);
                setIsOpen(true);
              }}
              style={{
                color: 'white',
                position: 'absolute',
                marginTop: '0.2em',
              }}
            />
          </IntroTooltip>
        )}
        {leftIcon && (
          <LeftIconComponent
            onClick={leftIconClick}
            style={{
              color: 'white',
              position: 'absolute',
              marginTop: '0.2em',
            }}
          />
        )}
        {rightIcon && (
          <RightIconComponent
            onClick={rightIconClick}
            style={{
              color: 'white',
              position: 'absolute',
              marginTop: '0.2em',
              right: isMobile ? '3vw' : '2.5vw',
            }}
          />
        )}
        {leftIcon && (
          <div>
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
          <div>
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
      {/* Drop down menu */}
      <Menu
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className={style.menu}
      >
        {menu?.map((e, index) => {
          const Icon = Icons[e.icon];
          return (
            <div key={index}>
              <Divider light />
              <MenuItem onClick={e.onClick}>
                <Icon />
                <h4>{e.text}</h4>
              </MenuItem>
            </div>
          );
        })}
      </Menu>
      <div className={style.child}>
        {/* styling for children node is NOT handled by this component */}
        <div className={style.content}>{children}</div>
      </div>
    </div>
  );
};
