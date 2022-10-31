import { Alert, Skeleton, Typography, Button, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { AvailabilityCalendar } from '../../../components/AvailabilityCalendar';
import { AVAILABILITY } from '../../../constants';
import { Container } from 'components/Container';
import style from 'styles/pages/availability.module.css';
import utilities from 'styles/utilities.module.css';

export default function Availability() {
  const router = useRouter();
  // Get group name and week form the URL
  const { groupName, weekOf } = router.query;

  // User information
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  // API validator
  const [hasError, setHasError] = useState(false);

  const [times, updateTimes] = useState([]);

  // Save the selected availability
  const saveAvailability = () => {
    // Send request to API
    fetch(AVAILABILITY, {
      method: 'POST',
      body: JSON.stringify({
        groupName,
        availability: {
          weekOf,
          times,
          name,
          number,
        },
      }),
    }).then(async (res) => {
      const json = await res.json();
      if (res.ok) alert('Availability has been saved, Thank you!');
      else setHasError(json);
    });
  };

  return (
    <div className={utilities.paddingBottom3}>
      <Container header={groupName}>
        {hasError && <Alert severity='error'>{hasError.message}</Alert>}
        <Typography
          variant='h5'
          className={[
            utilities.heading,
            utilities.marginBottom1,
            utilities.marginLeft1,
          ]}
        >
          AVAILABILITY:
          <span className={utilities.subHeading}>
            {' '}
            Only select when you are available
          </span>
        </Typography>

        <AvailabilityCalendar
          weekOf={weekOf}
          times={times}
          updateTimes={updateTimes}
        />
        <div>
          <div>
            <Typography
              variant='h5'
              className={[
                utilities.heading,
                utilities.marginTop1,
                utilities.marginBottom1,
                utilities.marginLeft1,
              ]}
            >
              INFORMATION:
            </Typography>
            <div className={utilities.textCenter}>
              <TextField
                variant='filled'
                required
                label='Name'
                placeholder='Your name'
                onChange={(e) => setName(e.target.value)}
                className={[style.infoTextField]}
              />
              <TextField
                required
                variant='filled'
                label='Phone number (10 digits)'
                placeholder='Your phone number'
                onChange={(e) => setNumber(e.target.value)}
                className={[style.infoTextField]}
              />
            </div>
          </div>
          <div className={utilities.textCenter}>
            <Button
              variant='contained'
              onClick={saveAvailability}
              className={style.saveButton}
              disabled={
                name === '' || number.length != 10 || !number.match(/^\d+$/)
              }
            >
              Save availability
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
