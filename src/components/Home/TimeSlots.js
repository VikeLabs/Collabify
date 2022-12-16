import PropTypes from 'prop-types';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

import utilities from 'styles/utilities.module.css';
import { useEffect } from 'react';

const formatTime = (time) => {
  let displayTime = '';
  if (time <= 12) {
    displayTime = String(time) + ' am';
  } else if (time > 12) {
    displayTime = String(time - 12) + ' pm';
  }

  let timeValue = '';
  if (time >= 0 && time <= 9) {
    timeValue = `0${time}:00:00`;
  } else {
    timeValue = `${time}:00:00`;
  }

  return { displayTime, timeValue };
};

/**
 * Hardcoding this so the app does not have to loop and generate these
 * values on mount
 */
const allTimeOptions = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23,
];

/** NOTE: this component makes sure that the `calendarMaxTime` can never be
 * less than the `calendarminTime`
 */
export const TimeSlots = ({
  calendarMinTime,
  setCalendarMinTime,
  calendarMaxTime,
  setCalendarMaxTime,
}) => {
  const minTime = parseInt(calendarMinTime);
  const maxTimeOptions = allTimeOptions.slice(minTime + 1);
  const minTimeOptions = allTimeOptions.slice(6, 23);

  const getAllTimeOptions = (timeOptions, setState) => {
    return timeOptions.map((option) => {
      const { timeValue, displayTime } = formatTime(option);
      return (
        <MenuItem
          key={option}
          value={timeValue}
          onClick={() => setState(() => timeValue)}
        >
          {displayTime}
        </MenuItem>
      );
    });
  };

  useEffect(() => {
    const selectedMaxTime = parseInt(calendarMaxTime);
    if (minTime > selectedMaxTime) {
      const { timeValue } = formatTime(minTime + 1);
      setCalendarMaxTime(() => timeValue);
    }
  }, [calendarMinTime]);

  return (
    <>
      <h2 className={utilities.heading}>TIME SLOTS:</h2>

      <div className={utilities.selectFields}>
        {/* MIN TIME */}
        <FormControl
          variant='filled'
          sx={{ flexGrow: '9' }}
        >
          <InputLabel>Minimum Time</InputLabel>
          <Select value={calendarMinTime}>
            {getAllTimeOptions(minTimeOptions, setCalendarMinTime)}
          </Select>
        </FormControl>

        <ArrowForwardIcon sx={{ flexGrow: '1' }} />

        {/* MIN TIME */}
        <FormControl
          variant='filled'
          sx={{ flexGrow: '9' }}
          error={false}
        >
          <InputLabel>Maximum Time</InputLabel>
          <Select value={calendarMaxTime}>
            {getAllTimeOptions(maxTimeOptions, setCalendarMaxTime)}
          </Select>
        </FormControl>
      </div>
    </>
  );
};

TimeSlots.propTypes = {
  calendarMinTime: PropTypes.string.isRequired,
  calendarMaxTime: PropTypes.string.isRequired,
};
