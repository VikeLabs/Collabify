import { Alert, Skeleton, Typography, Button, TextField} from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';

import {AvailabilityCalendar} from '../../../components/AvailabilityCalendar';
import { AVAILABILITY } from '../../../constants';
import { Container } from 'components/container/Container';
import style from 'styles/components/availability.module.css'
import utilities from 'styles/components/utilities.module.css'

export default function Availability() {
  const router = useRouter();
  // Get group name and week form the URL
  const { groupName, weekOf } = router.query;
  
  // User information
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  // User information validator
  const [nameError, setNameError] = useState(false)
  const [numberError, setNumberError] = useState(false)
  const [nameErrorMsg, setNameErrorMsg] = useState("")
  const [numberErrorMsg, setNumberErrorMsg] = useState("")

  // API validator
  const [hasError, setHasError] = useState(false);

  const [times, updateTimes] = useState([])

  // Save the selected availability
  const saveAvailability = () => {
    // Validate name: Not empty
    if (name === "") {
      setNameError(true)
      setNameErrorMsg("Name cannot be empty")
      return;
    }
    setNameError(false)
    setNameErrorMsg("")

    // Validate phone number: Length of 10, contains all numbers
    if (number.length !== 10) {
      setNumberError(true)
      setNumberErrorMsg("Phone number has to be 10 digits")
      return;
    } else if (!number.match(/[0-9]+/)) {
      setNumberError(true)
      setNumberErrorMsg("Phone number has to be all numbers")
      return;
    }
    setNumberError(false)
    setNumberErrorMsg("")

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
        <Typography variant='h5' className={[style.availabilityHeading, utilities.marginBottom1]}>AVAILABILITY: 
        <span className={style.availabilityText}> Click on the start time and drag to the end time</span>
        </Typography>

        <AvailabilityCalendar weekOf={weekOf} times={times} updateTimes={updateTimes}/>
        <div>
          <div className={utilities.widthFit}>
            <Typography variant='h5' className={[style.availabilityHeading, utilities.marginTop1, utilities.marginBottom1]}>INFORMATION:</Typography>
            <div className={[utilities.displayFlex, utilities.flexRow, utilities.flexWrap]}>
              <TextField
                required
                id="outlined-required"
                label="Name"
                placeholder='Your name'
                onChange={(e) => setName(e.target.value)}
                helperText={nameError ? nameErrorMsg : "This field is required"}
                error={nameError}
              />
              <TextField
                required
                id="outlined-required"
                label="Phone number"
                placeholder='Your phone number'
                onChange={(e) => setNumber(e.target.value)}
                helperText={numberError ? numberErrorMsg : "This field is required"}
                className={utilities.marginLeft1}
                error={numberError}
              />
            </div>
          </div>
          <Button variant="contained" onClick={saveAvailability} className={[utilities.marginTop2, utilities.fontSize110]}>Save availability</Button>
        </div>
      </Container>
    </div>
  );
}
