import { useDeviceDetect } from 'hooks';
import * as Icons from '@mui/icons-material';
import style from 'styles/components/container.module.css';
import { useState } from 'react';
import { Divider, Menu, MenuItem } from '@mui/material';

export const Container = ({ 
  header = '', 
  leftIcon = null, 
  leftIconClick,
  rightIcon = null, 
  rightIconClick,
  children,
  menu = null
}) => {
  const { isMobile } = useDeviceDetect();

  const [isOpen, setIsOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)

  const LeftIconComponent = Icons[leftIcon];
  const RightIconComponent = Icons[rightIcon];
  const MenuIconComponent = Icons['ExpandMore']
  return (
    <section className={style.container}>
      <header className={style.headerContainer}>
        {menu && <MenuIconComponent 
        onClick={(e)=> {
          setAnchorEl(e.currentTarget);
          setIsOpen(true)
        }}
        style={{
          color: 'white', 
          position: 'absolute', 
          marginTop: '0.2em'
        }}/>}
        {leftIcon && <LeftIconComponent 
        onClick={leftIconClick}
        style={{
          color: 'white', 
          position: 'absolute', 
          marginTop: '0.2em'
        }}/>}
        {rightIcon && <RightIconComponent 
        onClick={rightIconClick}
        style={{
          color: 'white', 
          position: 'absolute', 
          marginTop: '0.2em',
          right: isMobile ? '3vw' : '2.5vw'
        }}/>}
        <h1 className={style.header}>{header}</h1>
      </header>
      <Menu
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        open={isOpen}
        onClose={()=> setIsOpen(false)}
        className={style.menu}
      >
        {menu?.map((e, index) => {
          const Icon = Icons[e.icon]
          return (
            <div key={index}>
              <Divider light/>
              <MenuItem onClick={e.onClick}
              >
                <Icon/>
                <h4>{e.text}</h4>
              </MenuItem>
            </div>
          )
        })}
      </Menu>
      <div className={style.child}>
        {/* styling for children node is NOT handled by this component */}
        <div className={style.content}>{children}</div>
      </div>
    </section>
  );
};
