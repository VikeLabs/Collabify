import PropTypes from 'prop-types';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useTheme } from '@mui/material';
import useDeviceDetect from 'hooks/useDeviceDetect';

import { ContainerCalendar } from './styles';
import { useState } from 'react';

export const AvailabilityCalendar = ({ weekOf, times, updateTimes }) => {
  const { isMobile } = useDeviceDetect();
  const theme = useTheme();

  const [showWeekend, setShowWeekend] = useState(isMobile ? false : true)

  const handleSelect = (selectInfo) => {
    updateTimes((arr) => [...arr, selectInfo]);
  };

  const handleClick = (eventInfo) => {
    updateTimes((arr) =>
      arr.filter((item) => item.startStr !== eventInfo?.event.startStr)
    );
  };

  return (
    <ContainerCalendar>
      <FullCalendar
        plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
        initialView='timeGridWeek'
        initialDate={weekOf}
        events={times}
        weekends={showWeekend}
        customButtons={{
          undo: {
            text: 'Undo',
            click: function () {
              updateTimes((arr) => arr.slice(0, -1));
            },
          },
          weekend: {
            text: 'Show Weekends',
            click: function () {
              setShowWeekend(!showWeekend)
            },
          },
        }}
        headerToolbar={{
          start: '',
          center: 'title',
          end: `${isMobile ? 'undo,weekend' : 'undo'}`,
        }}
        slotMinTime={'06:00:00'} // Have group choose the time slots
        slotMaxTime={'22:00:00'}
        scrollTime={'08:00:00'}
        select={handleSelect}
        eventClick={handleClick}
        eventOverlap={false}
        eventBackgroundColor={theme.palette.availability.main}
        selectOverlap={false}
        longPressDelay={25}
        eventLongPressDelay={500}
        selectLongPressDelay={500}
        selectable={true}
        dayMaxEvents={true}
        allDaySlot={false}
        editable={true}
        height={isMobile ? 'auto' : '60vh'}
      />
    </ContainerCalendar>
  );
};

AvailabilityCalendar.propTypes = {
  weekOf: PropTypes.string.isRequired,
};
