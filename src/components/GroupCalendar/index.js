/* eslint-disable react-hooks/exhaustive-deps */
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import moment from 'moment';
import { useTheme } from '@mui/material';
import { useState, useEffect } from 'react';
import EventModal from './EventModal';
import CreateEventModal from './CreateEventModal';
import useDeviceDetect from 'hooks/useDeviceDetect';
import style from 'styles/components/groupCalendar.module.css';

export const GroupCalendar = ({ times, updateTimes }) => {
  const { isMobile } = useDeviceDetect();
  const theme = useTheme();
  //Event Modal State
  const [eventModal, setEventModal] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    date: '',
    start: '',
    end: '',
  });
  const [modalTitle, setModalTitle] = useState('');
  const [modalDesc, setModalDesc] = useState('');
  // Create Event Modal State
  const [createEventModal, setCreateEventModal] = useState(false);
  const [modalSelectInfo, setModalSelectInfo] = useState({
    date: '',
    start: '',
    end: '',
  });

  // This function only runs once when the page first render
  useEffect(() => {
    // Render text under calendar title
    if (document.getElementsByClassName(style.helperText).length === 0) {
      const fcHeaderToolbar =
        document.getElementsByClassName('fc-header-toolbar')[0];
      fcHeaderToolbar.insertAdjacentHTML(
        'afterend',
        `<p class=${style.helperText}>Click and drag to create event</p>`
      );
    }

    // Render helper container that shows color legend
    if (!isMobile && document.getElementsByClassName(style.helperContainer).length === 0) {
      const helperText = document.getElementsByClassName(style.helperText)[0];
      helperText.insertAdjacentHTML(
        'afterend',
        `
      <div class=${style.helperContainer}>
        <div class=${style.helperColorContainer}></div>
        <p class=${style.helperColorText}>EVENT</p>
        <div class=${style.helperColorContainer}></div>
        <p class=${style.helperColorText}>100%</p>
        <div class=${style.helperColorContainer}></div>
        <p class=${style.helperColorText}>75%</p>
        <div class=${style.helperColorContainer}></div>
        <p class=${style.helperColorText}>50%</p>
        <div class=${style.helperColorContainer}></div>
        <p class=${style.helperColorText}>25%</p>
        <div class=${style.helperColorContainer}></div>
        <p class=${style.helperColorText}>0%</p>
      </div>
      `
      );
    }
  }, []);

  const handleSelect = (selectInfo) => {
    setModalSelectInfo({
      date: moment(selectInfo.startStr).format('ddd MM/DD'),
      start: moment(selectInfo.startStr).format('hh:mm A'),
      end: moment(selectInfo.endStr).format('hh:mm A'),
    });
    setCreateEventModal(true);
  };

  return (
    <>
      <EventModal
        modalIsOpen={eventModal}
        setIsOpen={setEventModal}
        modalInfo={modalInfo}
        modalTitle={modalTitle}
        modalDesc={modalDesc}
      />
      <CreateEventModal
        modalIsOpen={createEventModal}
        setIsOpen={setCreateEventModal}
        modalInfo={modalSelectInfo}
      />
      <FullCalendar
        plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
        initialView='timeGridWeek'
        events={[
          {
            start: '2022-10-26T08:00:00',
            end: '2022-10-26T12:00:00',
            display: 'background',
            color: theme.palette.availability.dark,
          },
          {
            start: '2022-10-24T08:00:00',
            end: '2022-10-24T12:00:00',
            display: 'background',
            color: theme.palette.availability.dark,
          },
          {
            title: 'Weekly meeting',
            description:
              'Our weekly meeting in BEC174 aiawjdoi jawidj waij doiaj oidjaiojwdoiaj diojawjididh iahdhawd ihawidhaiwhdawhdi hawdihwaihiawhdihaidhwaihd',
            start: '2022-10-28T09:00:00',
            end: '2022-10-28T13:00:00',
            display: 'block',
            borderColor: theme.palette.primary.main,
            color: theme.palette.secondary.main,
          },
        ]}
        eventClick={(info) => {
          setModalInfo({
            date: moment(info.event.startStr).format('ddd MM/DD'),
            start: moment(info.event.startStr).format('hh:mm A'),
          });
          setModalTitle(info.event.title);
          setModalDesc(info.event.extendedProps.description);
          setEventModal(true);
        }}
        weekends={true}
        headerToolbar={{
          start: 'prev',
          center: 'title',
          end: 'next',
        }}
        scrollTime={'08:00:00'}
        slotMinTime={'06:00:00'}
        slotMaxTime={'22:00:00'}
        select={handleSelect}
        eventBackgroundColor={theme.palette.availability.main}
        longPressDelay={100}
        eventLongPressDelay={500}
        selectLongPressDelay={500}
        selectable={true}
        dayMaxEvents={true}
        allDaySlot={false}
        editable={false}
        height={isMobile ? '70vh' : '60vh'}
      />
    </>
  );
};