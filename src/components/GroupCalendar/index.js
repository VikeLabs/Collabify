import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useState, useEffect, useRef } from 'react';
import EventModal from './EventModal';
import CreateEventModal from './CreateEventModal';
import useDeviceDetect from 'hooks/useDeviceDetect';
import style from 'styles/components/groupCalendar.module.css';

export const GroupCalendar = ({
  calendarEvents,
  createEvent,
  slotMinTime,
  slotMaxTime,
}) => {
  const { isMobile } = useDeviceDetect();
  //Event Modal State
  const [eventModal, setEventModal] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    startStr: '',
    title: '',
    extendedProps: {
      description: '',
    },
  });
  // Create Event Modal State
  const [createEventModal, setCreateEventModal] = useState(false);
  const [modalSelectInfo, setModalSelectInfo] = useState({
    startStr: '',
    endStr: '',
    names: [],
    numbers: []
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
    if (document.getElementsByClassName(style.helperContainer).length === 0) {
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
    // Temp solution for getting names and numbers.
    // In the future we need to get names and numbers
    // who that marked availability under event
    let greatestNameIndex = 0
    calendarEvents.forEach((event, index) => {
      if (event.names?.length > calendarEvents[greatestNameIndex].names?.length) {
        greatestNameIndex = index
      }
    })
    selectInfo.names = calendarEvents[greatestNameIndex].names
    selectInfo.numbers = calendarEvents[greatestNameIndex].numbers
    setModalSelectInfo(selectInfo);
    setCreateEventModal(true);
  };

  return (
    <>
      <EventModal
        modalIsOpen={eventModal}
        setIsOpen={setEventModal}
        modalInfo={modalInfo}
      />
      <CreateEventModal
        createEvent={createEvent}
        modalIsOpen={createEventModal}
        setIsOpen={setCreateEventModal}
        modalInfo={modalSelectInfo}
      />
      <FullCalendar
        plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
        initialView='timeGridWeek'
        events={calendarEvents}
        eventClick={(info) => {
          setModalInfo(info.event);
          setEventModal(true);
        }}
        weekends={true}
        headerToolbar={{
          start: 'prev',
          center: 'title',
          end: 'next',
        }}
        scrollTime={'09:00:00'}
        slotMinTime={slotMinTime}
        slotMaxTime={slotMaxTime}
        select={handleSelect}
        longPressDelay={5}
        eventLongPressDelay={500}
        selectLongPressDelay={500}
        selectable={true}
        dayMaxEvents={true}
        allDaySlot={false}
        editable={false}
        height={isMobile ? 'auto' : '60vh'}
      />
    </>
  );
};
