import { useState } from 'react';

import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';
import YahooIcon from '@mui/icons-material/Email'; // the closet thing MUI got for yahoo icon :/
import WindowIcon from '@mui/icons-material/Window';
import { Button, Box, Container, Typography } from '@mui/material';

import { CalendarURI } from './calendarURI';

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
        <Typography variant='h6'>ADD TO CALENDAR</Typography>
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
              target='_blank' rel="noreferrer"
            >
              <span>
                <GoogleIcon />
              </span>
              Google
            </a>
          </li>

          <li>
            <a
              href={uri.apple()}
              target='_blank' rel="noreferrer"
            >
              <span>
                <AppleIcon />
              </span>
              Apple
            </a>
          </li>

          <li>
            <a
              href={uri.outlook()}
              target='_blank' rel="noreferrer"
            >
              <span>
                <WindowIcon />
              </span>
              Outlook
            </a>
          </li>

          <li>
            <a
              href={uri.yahoo()}
              target='_blank' rel="noreferrer"
            >
              <span>
                <YahooIcon />
              </span>
              Yahoo
            </a>
          </li>
        </ul>
      </Box>
    </Container>
  );
};
