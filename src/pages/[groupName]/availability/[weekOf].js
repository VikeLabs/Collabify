import { Alert, Skeleton } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';
import {AvailabilityCalendar} from '../../../components/AvailabilityCalendar';

import { AVAILABILITY } from '../../../constants';

export default function Availability() {
  const router = useRouter();
  const { groupName, weekOf } = router.query;

  const [hasError, setHasError] = useState(false);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [times, updateTimes] = useState([])

  const saveAvailability = () => {
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
    <div>
      {hasError && (
        <Alert severity='error'>{hasError.message}</Alert>
      )}
      <h2>Mark down your availability for {groupName}</h2>

      <input placeholder='Name' onChange={(e) => setName(e.target.value)} />
      <input placeholder='Number' onChange={(e) => setNumber(e.target.value)} />

      <AvailabilityCalendar weekOf={weekOf} times={times} updateTimes={updateTimes}/>

      <button onClick={saveAvailability}>Save availability</button>
    </div>
  );
}
