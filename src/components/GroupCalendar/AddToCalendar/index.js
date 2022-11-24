import { useState } from 'react';
import { Button, Box, Container } from '@mui/material';

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
        ADD TO CALENDAR
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
              Google
            </a>
          </li>

          <li>
            <a
              href={uri.apple()}
              target='_blank'
            >
              Apple
            </a>
          </li>

          <li>
            <a
              href={uri.outlook()}
              target='_blank'
            >
              Oulook
            </a>
          </li>

          <li>
            <a
              href={uri.yahoo()}
              target='_blank'
            >
              Yahoo
            </a>
          </li>
        </ul>
      </Box>
    </Container>
  );
};
