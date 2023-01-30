import { Alert, Button, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { AvailabilityCalendar } from 'components/AvailabilityCalendar';
import { AVAILABILITY, GROUP, GROUP_CALENDAR } from '../../../constants';
import { Container } from 'components/Container';
import { AvailabilitySkeleton } from 'components/Availability';
import { useAsyncFetch, useDeviceDetect } from 'hooks';

import utilities from 'styles/utilities.module.css';
import { Spinner } from 'components/Loading';

import { LeftContainerIcon } from 'components/page_availability';
import { Group } from '@prisma/client';

export default function Availability() {
  const router = useRouter();
  const { isMobile } = useDeviceDetect();
  // Get group name and week form the URL
  const { groupID, weekOf } = router.query;
  // Fetching group data
  // TODO: typings for this function
  const [data, isLoading, apiError] = useAsyncFetch<any>();

  // User information
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  // API validator
  const [hasError, setHasError] = useState<string | null>(apiError);
  const [isSaving, setIsSaving] = useState(false);

  const [times, updateTimes] = useState([]);

  // Save the selected availability
  const saveAvailability = () => {
    setIsSaving(true);
    // Send request to API
    fetch(`${GROUP}/${groupID}/availability`, {
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
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((result) => {
        console.log(result);
        if (result.ok) {
          router.replace(`/${groupID}?availabilityFilled=true`);
        } else {
          setIsSaving(false);
          setHasError(result.message);
        }
      })
      .catch((e) => console.log(e));
  };

  if (isLoading) return <AvailabilitySkeleton />;

  return (
    <>
      {hasError && <Alert severity='error'>{hasError}</Alert>}
      <Container
        header={data?.group?.name}
        leftIcon={
          <LeftContainerIcon
            handleClick={() => router.replace(`/${groupID}`)}
          />
        }
      >
        <Spinner isLoading={isSaving} />
        <h2 className={utilities.heading}>
          AVAILABILITY:
          <span className={utilities.subHeading}>
            {' '}
            Only select when you are available{' '}
            {isMobile && '(Tap and HOLD to select)'}
          </span>
        </h2>

        {weekOf && (
          <AvailabilityCalendar
            weekOf={weekOf}
            times={times}
            updateTimes={updateTimes}
            slotMinTime={data?.group?.calendarMinTime}
            slotMaxTime={data?.group?.calendarMaxTime}
          />
        )}

        <div>
          <div>
            <h2 className={utilities.heading}>INFORMATION:</h2>
            <div className={utilities.inputFields}>
              <TextField
                variant='filled'
                required
                label='Name'
                placeholder='Your name'
                onChange={(e) => setName(e.target.value)}
                className={utilities.input}
              />
              <TextField
                required
                variant='filled'
                label='Phone number (10 digits)'
                placeholder='Your phone number'
                onChange={(e) => setNumber(e.target.value)}
                className={utilities.input}
              />
            </div>
          </div>
          <div className={utilities.buttonContainer}>
            <Button
              variant='contained'
              onClick={saveAvailability}
              className={utilities.button}
              disabled={
                name === '' || number.length != 10 || !number.match(/^\d+$/)
              }
            >
              Save availability
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
}
