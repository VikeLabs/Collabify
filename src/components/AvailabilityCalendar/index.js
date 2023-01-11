import PropTypes from 'prop-types';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useTheme } from '@mui/material';
import UndoIcon from '@mui/icons-material/Undo';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { useDeviceDetect } from 'hooks';

import { useState } from 'react';

export const AvailabilityCalendar = ({
  weekOf,
  times,
  updateTimes,
  slotMinTime,
  slotMaxTime,
}) => {
  const { isMobile } = useDeviceDetect();
  const theme = useTheme();

  const [showWeekend, setShowWeekend] = useState(isMobile ? false : true);

  const handleSelect = (selectInfo) => {
    updateTimes((arr) => [...arr, selectInfo]);
  };

  const handleClick = (eventInfo) => {
    updateTimes((arr) =>
      arr.filter((item) => item.startStr !== eventInfo?.event.startStr)
    );
  };

  return (
    <FullCalendar
      plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
      initialView='timeGridWeek'
      initialDate={weekOf}
      events={times}
      weekends={showWeekend}
      customButtons={{
        undo: {
          text: <UndoIcon />,
          click: function () {
            updateTimes((arr) => arr.slice(0, -1));
          },
        },
        weekend: {
          text: <DateRangeIcon />,
          click: function () {
            setShowWeekend(!showWeekend);
          },
        },
      }}
      headerToolbar={{
        start: 'weekend',
        center: 'title',
        end: 'undo',
      }}
      slotMinTime={slotMinTime}
      slotMaxTime={slotMaxTime}
      scrollTime={'09:00:00'}
      select={handleSelect}
      eventClick={handleClick}
      eventOverlap={false}
      eventBackgroundColor={theme.palette.availability.main}
      selectOverlap={false}
      longPressDelay={5}
      eventLongPressDelay={500}
      selectLongPressDelay={500}
      selectable={true}
      dayMaxEvents={true}
      allDaySlot={false}
      editable={true}
      height={isMobile ? 'auto' : '60vh'}
    />
  );
};

AvailabilityCalendar.propTypes = {
  weekOf: PropTypes.string.isRequired,
};
