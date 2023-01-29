import { useState } from 'react';

import * as Icons from '@mui/icons-material';

import style from 'styles/components/container.module.css';

import { Divider, Menu, MenuItem } from '@mui/material';

interface MenuItem {
  icon: string;
  text: string;
  onClick: () => void;
}

interface PropType {
  menu: MenuItem[];
}

export const DropdownMenu = ({ menu }: PropType) => {
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const MenuIcon = Icons['Menu'];

  return (
    <>
      <MenuIcon
        onClick={(e) => {
          setAnchorEl(() => e.currentTarget);
          setIsOpen(() => true);
        }}
        style={{
          color: 'white',
          position: 'absolute',
          marginTop: '0.2em',
        }}
      />

      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={isOpen}
        onClose={() => setIsOpen(() => false)}
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
    </>
  );
};
