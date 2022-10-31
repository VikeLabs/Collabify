import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useTheme } from '@mui/material';

import { ContainerCalendar } from './styles';

export const AvailabilityCalendar = ({ weekOf, times, updateTimes }) => {
  const theme = useTheme();

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
        weekends={true}
        customButtons={{
          Undo: {
            text: 'Undo',
            click: function () {
              updateTimes((arr) => arr.slice(0, -1));
            },
          },
        }}
        headerToolbar={{
          start: '',
          center: 'title',
          end: 'Undo',
        }}
        scrollTime={'08:00:00'}
        select={handleSelect}
        eventClick={handleClick}
        eventOverlap={false}
        eventBackgroundColor={theme.palette.availability.main}
        selectOverlap={false}
        longPressDelay={1000}
        eventLongPressDelay={1000}
        selectLongPressDelay={1000}
        selectable={true}
        dayMaxEvents={true}
        allDaySlot={false}
        editable={true}
        height='60vh'
      />
    </ContainerCalendar>
  );
};
