import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import moment from "moment";
import { useTheme } from '@mui/material';
import { useState } from "react";
import EventModal from "./EventModal";
import CreateEventModal from "./CreateEventModal";

export const GroupCalendar = ({times, updateTimes}) => {
  const theme = useTheme()
  //Event Modal State
  const [eventModal, setEventModal] = useState(false)
  const [modalInfo, setModalInfo] = useState({
    date: '',
    start: '',
    end: ''
  })
  const [modalTitle, setModalTitle] = useState('')
  const [modalDesc, setModalDesc] = useState('')
  // Create Event Modal State
  const [createEventModal, setCreateEventModal] = useState(false)
  const [modalSelectInfo, setModalSelectInfo] = useState({
    date: '',
    start: '',
    end: ''
  })

  const handleSelect = (selectInfo) => {
    setModalSelectInfo({
      date: moment(selectInfo.startStr).format('ddd MM/DD'),
      start: moment(selectInfo.startStr).format('hh:mm A'),
      end: moment(selectInfo.endStr).format('hh:mm A')
    })
    setCreateEventModal(true)
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
        initialView="timeGridWeek"
        events={[
          {
            start: '2022-10-26T08:00:00',
            end: '2022-10-26T12:00:00',
            display: 'background',
            color: theme.palette.availability.dark
          },
          {
            start: '2022-10-24T08:00:00',
            end: '2022-10-24T12:00:00',
            display: 'background',
            color: theme.palette.availability.dark
          },
          {
            title: "Weekly meeting",
            description: "Our weekly meeting in BEC174 aiawjdoi jawidj waij doiaj oidjaiojwdoiaj diojawjididh iahdhawd ihawidhaiwhdawhdi hawdihwaihiawhdihaidhwaihd",
            start: '2022-10-28T09:00:00',
            end: '2022-10-28T13:00:00',
            display: 'block',
            borderColor: theme.palette.primary.main,
            color: theme.palette.tertiary.main
          }
        ]}
        eventClick={(info) => {
          setModalInfo({
            date: moment(info.event.startStr).format('ddd MM/DD'),
            start: moment(info.event.startStr).format('hh:mm A'),
          })
          setModalTitle(info.event.title)
          setModalDesc(info.event.extendedProps.description)
          setEventModal(true)
        }}
        weekends={true}
        headerToolbar={{
          start: 'prev',
          center: 'title',
          end: 'next'
        }}
        scrollTime={'08:00:00'}
        select={handleSelect}
        eventBackgroundColor={theme.palette.availability.main}
        longPressDelay={1000}
        eventLongPressDelay={1000}
        selectLongPressDelay={1000}
        selectable={true}
        dayMaxEvents={true}
        allDaySlot={false}
        editable={true}
        height={"60vh"}
      />
    </>
  );
};
