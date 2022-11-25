import { useState } from 'react';
import { Button, Box, Container} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';
import DraftsIcon from '@mui/icons-material/Drafts';
import WindowIcon from '@mui/icons-material/Window';

import { CalendarURI } from '../helpers/calendarURI';

import style from 'styles/components/AddToCalendar.module.css';

export const AddToCalendar = ({ event }) => {
  const [open, setOpen] = useState(false); // drawer state

  const uri = new CalendarURI(event);

  return (
    <Container className={style.addToCalContainer}>
      <Button
        variant={open ? 'contained' : 'outlined'}
        className={style.addToCal}
        onClick={() => setOpen((open) => !open)}
      >
        <h1> ADD TO CALENDER </h1>

      </Button>
      <Box className={style.addToCal_list}>
        <ul
          style={{
            clipPath: open
              ? 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)'
              : 'polygon(0 0, 100% 0, 100% 0, 0 0)',
          }}
        >
          <li>
            <a
              href={uri.google()}
              target='_blank'
            >
              <GoogleIcon/> Google
            </a>
          </li>

          <li>
            <a
              href={uri.apple()}
              target='_blank'
            >
              <AppleIcon/> Apple
            </a>
          </li>

          <li>
            <a
              href={uri.outlook()}
              target='_blank'
            >
               <WindowIcon/> Outlook
            </a>
          </li>

          <li>
            <a
              href={uri.yahoo()}
              target='_blank'
            >
             <DraftsIcon/> Yahoo
            </a>
          </li>
        </ul>
      </Box>
    </Container>
  );
};
