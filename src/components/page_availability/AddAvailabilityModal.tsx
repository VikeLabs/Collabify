import React, { useState } from 'react';
import { Box, Modal, Button, TextField, FormControl } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import style from 'styles/components/availability.module.css';
import utilities from 'styles/utilities.module.css';
import moment from 'moment';

interface PropType {
    updateTimes(param: object): void;
    modalIsOpen: boolean;
    setIsOpen(param: boolean): void;
}

export default function AddAvailabilityModal({
    updateTimes,
    modalIsOpen,
    setIsOpen,
}: PropType) {
  const [start, setStart] = useState(moment().format('YYYY-MM-DD kk'));
  const [end, setEnd] = useState(moment().format('YYYY-MM-DD kk'));

  const handleSubmit = () => {
    updateTimes((arr) => [...arr, {
        id: arr.length + 1,
        start: moment(start.toString()).utc().format(), 
        end: moment(end.toString()).utc().format(),
        startStr: moment(start.toString()).utc().format(),
        endStr: moment(end.toString()).utc().format()
    }]);
    setIsOpen(false)
  };

  return (
    <>
      <Modal
        className={style.modalContainer}
        open={modalIsOpen}
        onClose={() => setIsOpen(false)}
      >
        <Box className={style.container}>
          <h1 className={style.title}>
            New Availability
          </h1>
          <Box className={style.textFieldContainer}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <h3 className={utilities.heading}>START:</h3>
                <FormControl sx={{ width: '100%' }}>
                    <DateTimePicker
                        className={style.textField}
                        minutesStep={30}
                        value={start}
                        onChange={e => setStart(e)}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </FormControl>
                <h3 className={utilities.heading}>END:</h3>
                <FormControl sx={{ width: '100%' }}>
                    <DateTimePicker
                        className={style.textField}
                        minutesStep={30}
                        value={end}
                        onChange={e => setEnd(e)}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </FormControl>
            </LocalizationProvider>
          </Box>
          <Box className={utilities.buttonContainer}>
            <Button
              variant='contained'
              disabled={start === '' || end === ''}
              className={utilities.button}
              onClick={handleSubmit}
            >
              ADD
            </Button>
          </Box>
          <a
            onClick={() => setIsOpen(false)}
            className={style.closeModal}
          >
            X
          </a>
        </Box>
      </Modal>
    </>
  );
}