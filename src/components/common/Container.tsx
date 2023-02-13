import style from 'styles/components/container.module.css';
import { AppBar } from '../../../node_modules/@material-ui/core/index';
import * as Icons from '@mui/icons-material';
import { useDeviceDetect, useLocalStorage } from 'hooks';
import { useState } from 'react';
import { CLOSE_ALL_TOOLTIPS } from 'constants/index';
import { IntroTooltip } from './IntroToolTip';
import { Divider, Menu, MenuItem } from '@mui/material';

interface PropType {
  header?: string;
  children: React.ReactNode;
  // left components
  leftIcon?: string;
  leftIconClick?: () => void;
  // right components
  rightIcon?: string;
  rightIconClick?: () => void;
  menu?: any;
}

export const Container = ({
  header = '',
  leftIcon = null,
  leftIconClick,
  rightIcon = null,
  rightIconClick,
  children,
  menu = null,
}: PropType) => {
  const { isMobile } = useDeviceDetect();
  // Menu drop down
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  // showing tooltip
  const [showTooltip, setShowToolTip] = useLocalStorage(CLOSE_ALL_TOOLTIPS);
  // Icon init
  const LeftIconComponent = Icons[leftIcon];
  const RightIconComponent = Icons[rightIcon];
  const MenuIconComponent = Icons['Menu'];

  return (
    <div>
      <AppBar className={style.headerContainer} position="static">
        {menu && (
          <IntroTooltip
            text='extend for more options'
            visible={showTooltip === null ?? true}
            close={() => setShowToolTip(false)}
            closeAll={() => {
              setShowToolTip(false);
              localStorage.setItem(CLOSE_ALL_TOOLTIPS, 'true');
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
          <IntroTooltip
          text='add availability manually'
          visible={(showTooltip === null ?? true) && (rightIcon === "Add" ?? true)}
          close={() => setShowToolTip(false)}
          closeAll={() => {
            setShowToolTip(false);
            localStorage.setItem(CLOSE_ALL_TOOLTIPS, 'true');
          }}
          >
            <RightIconComponent
              onClick={()=> {
                rightIconClick(); 
                setShowToolTip(false);
              }}
              style={{
                color: 'white',
                position: 'absolute',
                marginTop: '0.2em',
                right: isMobile ? '3vw' : '2.5vw',
              }}
            />
          </IntroTooltip>
        )}
        <h1 className={style.header}>{header}</h1>
      </AppBar>
      {/* Drop down menu */}
      <Menu
        anchorEl={anchorEl}
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
