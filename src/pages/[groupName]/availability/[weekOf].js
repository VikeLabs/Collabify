import { Alert, Skeleton, Typography, Button, TextField} from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';

import {AvailabilityCalendar} from '../../../components/AvailabilityCalendar';
import { AVAILABILITY } from '../../../constants';
import { Container } from 'components/Container';
import style from 'styles/pages/availability.module.css'
import utilities from 'styles/components/utilities.module.css'

export default function Availability() {
  const router = useRouter();
  // Get group name and week form the URL
  const { groupName, weekOf } = router.query;
  
  // User information
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  // API validator
  const [hasError, setHasError] = useState(false);

  const [times, updateTimes] = useState([])

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
    })
    .then(async (res) => {
      const json = await res.json()
      if (res.ok) alert('Availability has been saved, Thank you!')
      else setHasError(json)
    })
  }

  return (
    <div className={utilities.paddingBottom3}>
      <Container header={groupName}>
        {hasError && (
          <Alert severity='error'>{hasError.message}</Alert>
        )}
        <Typography sx={{ fontWeight: 600}} variant='h5' className={[style.availabilityHeading, utilities.marginBottom1]}>AVAILABILITY: 
        <span className={style.availabilityText}>Only select when you are available</span>
        </Typography>

        <AvailabilityCalendar weekOf={weekOf} times={times} updateTimes={updateTimes}/>
        <div>
          <div>
            <Typography sx={{ fontWeight: 600}} variant='h5' className={[style.availabilityHeading, utilities.marginTop1, utilities.marginBottom1]}>INFORMATION:</Typography>
            <div className={utilities.textCenter}>
              <TextField
                required
                id="outlined-required"
                label="Name"
                placeholder='Your name'
                onChange={(e) => setName(e.target.value)}
                className={[style.infoTextField]}
                error={name===""}
              />
              <TextField
                required
                id="outlined-required"
                label="Phone number (10 digits)"
                placeholder='Your phone number'
                onChange={(e) => setNumber(e.target.value)}
                className={[style.infoTextField]}
                error={number.length != 10 || !number.match(/^\d+$/)}
              />
            </div>
          </div>
          <div className={utilities.textCenter}>
            <Button variant="contained" onClick={saveAvailability} className={style.saveButton} disabled={name==="" || number.length != 10 || !number.match(/^\d+$/) }>Save availability</Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
