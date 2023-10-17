import style from 'styles/components/container.module.css';
import { AppBar } from '@material-ui/core/index';
import * as Icons from '@mui/icons-material';
import { useRouter } from 'next/router';
import { useDeviceDetect } from 'hooks';
import { useState } from 'react';
import { Box, Button, Divider, Menu, MenuItem } from '@mui/material';

interface PropType {
  children: React.ReactNode;
}

export const LandingContainer = ({
  children,
}: PropType) => {
  const { isMobile } = useDeviceDetect();
  const router = useRouter();
  // Menu drop down
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  // Icon component
  const MenuIconComponent = Icons['Menu'];

  if (isMobile) {
    return (
        <div>
          <AppBar className={style.headerContainer} position="static">
            <h1 className={style.header}>Collabify</h1>
            <MenuIconComponent
                id='menu'
                onClick={(e) => {
                setAnchorEl(e.currentTarget);
                setIsOpen(true);
                }}
                style={{
                color: 'white',
                position: 'absolute',
                marginTop: '0.2em',
                }}
            />
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
            <div>
                <Divider light />
                <MenuItem onClick={()=> router.push('/create')}>
                <h4>CREATE</h4>
                </MenuItem>
            </div>
            <div>
                <Divider light />
                <MenuItem onClick={()=> router.push('/tools/recentGroups')}>
                <h4>RECENT</h4>
                </MenuItem>
            </div>
            <div>
                <Divider light />
                <MenuItem onClick={()=> router.push('/tools/findGroup')}>
                <h4>FIND</h4>
                </MenuItem>
            </div>
            <div>
                <Divider light />
                <MenuItem onClick={()=> router.push('/blog')}>
                <h4>BLOG</h4>
                </MenuItem>
            </div>
            <div>
                <Divider light />
                <MenuItem onClick={()=> router.push('/account')}>
                <h4>ACCOUNT</h4>
                </MenuItem>
            </div>
          </Menu>
          <div className={style.child}>
            {/* styling for children node is NOT handled by this component */}
            <div>{children}</div>
          </div>
        </div>
      );
  } else {
    return (
        <div>
          <AppBar className={style.headerContainer} position="static">
            <ul style={{listStyleType: 'none'}}>
              <li style={{float: 'left'}}>
                <h1 style={{textTransform: 'uppercase'}}>Collabify</h1>
              </li>
              <li className={style.navItems}>
                <Button variant="contained" color="secondary" style={{ color: '#fff', fontWeight: 'bold' }} onClick={()=> router.push('/account')}>
                  Account
                </Button>
              </li>
              <li className={style.navItems}>
                <Button style={{ color: '#fff', fontWeight: 'bold' }} onClick={()=> router.push('/blog')}>
                  Blog
                </Button>
              </li>
              <li className={style.navItems}>
                <Button style={{ color: '#fff', fontWeight: 'bold' }} onClick={()=> router.push('/tools/find')}>
                  Find
                </Button>
              </li>
              <li className={style.navItems}>
                <Button style={{ color: '#fff', fontWeight: 'bold' }} onClick={()=> router.push('/tools/recent')}>
                  Recent
                </Button>
              </li>
              <li className={style.navItems}>
                <Button style={{ color: '#fff', fontWeight: 'bold' }} onClick={()=> router.push('/create')}>
                  Create
                </Button>
              </li>
            </ul>
          </AppBar>
          <div className={style.child}>
            {/* styling for children node is NOT handled by this component */}
            <div>{children}</div>
          </div>
        </div>
      );
  }
};
