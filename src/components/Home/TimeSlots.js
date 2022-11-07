import PropTypes from 'prop-types';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

import utilities from 'styles/utilities.module.css';

export const TimeSlots = ({ 
    calendarMinTime,
    setCalendarMinTime, 
    calendarMaxTime, 
    setCalendarMaxTime 
}) => {
    return (
    <>
        <h2
        className={utilities.heading}
        >
        TIME SLOTS:
        </h2>

        <div className={utilities.selectFields}>
            <FormControl 
            variant="filled" 
            sx={{flexGrow: '9'}}
            >
                <InputLabel>Minimum Time</InputLabel>
                <Select
                value={calendarMinTime}
                onChange={(e) => setCalendarMinTime(() => e.target.value)}
                >
                    <MenuItem value={'06:00:00'}>6am</MenuItem>
                    <MenuItem value={'07:00:00'}>7am</MenuItem>
                    <MenuItem value={'08:00:00'}>8am</MenuItem>
                    <MenuItem value={'09:00:00'}>9am</MenuItem>
                    <MenuItem value={'10:00:00'}>10am</MenuItem>
                    <MenuItem value={'11:00:00'}>11am</MenuItem>
                    <MenuItem value={'12:00:00'}>12pm</MenuItem>
                    <MenuItem value={'13:00:00'}>1pm</MenuItem>
                    <MenuItem value={'14:00:00'}>2pm</MenuItem>
                    <MenuItem value={'15:00:00'}>3pm</MenuItem>
                    <MenuItem value={'16:00:00'}>4pm</MenuItem>
                    <MenuItem value={'17:00:00'}>5pm</MenuItem>
                    <MenuItem value={'18:00:00'}>6pm</MenuItem>
                    <MenuItem value={'19:00:00'}>7pm</MenuItem>
                    <MenuItem value={'20:00:00'}>8pm</MenuItem>
                    <MenuItem value={'21:00:00'}>9pm</MenuItem>
                    <MenuItem value={'22:00:00'}>10pm</MenuItem>
                    <MenuItem value={'23:00:00'}>11pm</MenuItem>
                </Select>
            </FormControl>
            <ArrowForwardIcon sx={{flexGrow: '1'}}/>
            <FormControl 
            variant="filled" 
            sx={{flexGrow: '9'}}
            error={false}
            >
                <InputLabel>Maximum Time</InputLabel>
                <Select
                value={calendarMaxTime}
                onChange={(e) => setCalendarMaxTime(() => e.target.value)}
                >
                    <MenuItem value={'06:00:00'}>6am</MenuItem>
                    <MenuItem value={'07:00:00'}>7am</MenuItem>
                    <MenuItem value={'08:00:00'}>8am</MenuItem>
                    <MenuItem value={'09:00:00'}>9am</MenuItem>
                    <MenuItem value={'10:00:00'}>10am</MenuItem>
                    <MenuItem value={'11:00:00'}>11am</MenuItem>
                    <MenuItem value={'12:00:00'}>12pm</MenuItem>
                    <MenuItem value={'13:00:00'}>1pm</MenuItem>
                    <MenuItem value={'14:00:00'}>2pm</MenuItem>
                    <MenuItem value={'15:00:00'}>3pm</MenuItem>
                    <MenuItem value={'16:00:00'}>4pm</MenuItem>
                    <MenuItem value={'17:00:00'}>5pm</MenuItem>
                    <MenuItem value={'18:00:00'}>6pm</MenuItem>
                    <MenuItem value={'19:00:00'}>7pm</MenuItem>
                    <MenuItem value={'20:00:00'}>8pm</MenuItem>
                    <MenuItem value={'21:00:00'}>9pm</MenuItem>
                    <MenuItem value={'22:00:00'}>10pm</MenuItem>
                    <MenuItem value={'23:00:00'}>11pm</MenuItem>
                </Select>
            </FormControl>
        </div>
    </>
  );
};

TimeSlots.propTypes = {
    calendarMinTime: PropTypes.string.isRequired,
    calendarMaxTime: PropTypes.string.isRequired
};
