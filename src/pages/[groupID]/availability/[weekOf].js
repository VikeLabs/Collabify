import { Alert, Typography, Button, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { AvailabilityCalendar } from 'components/AvailabilityCalendar';
import { AVAILABILITY, GROUP_CALENDAR } from '../../../constants';
import { Container } from 'components/Container';
import { AvailabilitySkeleton } from 'components/Availability';
import { useAsyncFetch } from 'hooks';
import style from 'styles/pages/availability.module.css';
import utilities from 'styles/utilities.module.css';

export default function Availability() {
  const router = useRouter();
  // Get group name and week form the URL
  const { groupID, weekOf } = router.query;
  // Fetching group data
  const [data, isLoading, apiError] = useAsyncFetch(`${GROUP_CALENDAR}/${groupID}`);

  // User information
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  // API validator
  const [hasError, setHasError] = useState(apiError);

  const [times, updateTimes] = useState([]);

  // Save the selected availability
  const saveAvailability = () => {
    // Send request to API
    fetch(AVAILABILITY, {
      method: 'POST',
      body: JSON.stringify({
        groupID,
        availability: {
          weekOf,
          times,
          name,
          number,
        },
      }),
    })
    .then(res => res.json())
    .then(result => {
      if (result.ok) {
        alert('Availability has been saved, Thank you!')
        router.replace(`/${groupID}`);
      }
      else setHasError(result.message);
    })
  };

  if (isLoading) return <AvailabilitySkeleton />;

  return (
    <div className={utilities.paddingBottom3}>
      {hasError && <Alert severity='error'>{hasError}</Alert>}
      <Container header={data?.group?.name}>
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

        {weekOf && <AvailabilityCalendar
          weekOf={weekOf}
          times={times}
          updateTimes={updateTimes}
        />}
        
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
