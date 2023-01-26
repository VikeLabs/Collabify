import { useState } from 'react';
import { useLocalStorage } from 'hooks';

import * as Icons from '@mui/icons-material';
import { IntroTooltip } from 'components/IntroTooltip';

import style from 'styles/components/container.module.css';

import { Divider, Menu, MenuItem } from '@mui/material';
import { CLOSE_ALL_TOOLTIPS } from 'constants';

// interface Menu {
//   icon: string;
//   text: string;
//   onClick: () => void;
// }

// interface PropType {
//   menuItems: Menu[];
// }

/** @deprecated
 * import from 'components/page_index' instead
 * */
export const DropdownMenu = ({ menuItems }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [showTooltip, setShowToolTip] = useLocalStorage(CLOSE_ALL_TOOLTIPS);
  const MenuIconComponent = Icons['Menu'];

  const handleIconClick = (e) => {
    setAnchorEl(() => e.currentTarget);
    setShowToolTip(() => false);
    setIsOpen(() => true);
  };

  return (
    <>
      <IntroTooltip
        text='extend for more options'
        visible={showTooltip === undefined ?? true}
        close={() => setShowToolTip(false)}
        closeAll={() => {
          setShowToolTip(() => false);
          localStorage.setItem(CLOSE_ALL_TOOLTIPS, true);
        }}
      >
        <MenuIconComponent
          onClick={handleIconClick}
          style={{
            color: 'white',
            position: 'absolute',
            marginTop: '0.2em',
            cursor: 'pointer',
          }}
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
        {menuItems.map((e, index) => {
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
