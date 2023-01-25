import { useState } from 'react';
import { useLocalStorage } from 'hooks';

import * as Icons from '@mui/icons-material';
import { IntroTooltip } from 'components/IntroTooltip';
import { MenuIcon } from 'components/ContainerIcons/menuIcon';

import style from 'styles/components/container.module.css';

import { Divider, Menu, MenuItem } from '@mui/material';
import { CLOSE_ALL_TOOLTIPS } from 'constants';

export const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [showTooltip, setShowToolTip] = useLocalStorage(CLOSE_ALL_TOOLTIPS);
  const MenuIconComponent = Icons['Menu'];

  const menu = [
    {
      icon: 'Groups',
      text: 'Recent Groups',
      onClick: () => router.push('/tools/recentGroups'),
    },
    {
      icon: 'Search',
      text: 'Find Group',
      onClick: () => router.push('/tools/findGroup'),
    },
  ];

  return (
    <>
      <IntroTooltip
        text='extend for more options'
        visible={showTooltip === undefined ?? true}
        close={() => setShowToolTip(false)}
        closeAll={() => {
          setShowToolTip(false);
          localStorage.setItem(CLOSE_ALL_TOOLTIPS, true);
        }}
      >
        <MenuIcon
          MenuIconComponent={MenuIconComponent}
          setAnchorEl={setAnchorEl}
          setShowToolTip={setShowToolTip}
          setIsOpen={setIsOpen}
        />
      </IntroTooltip>

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
    </>
  );
};
