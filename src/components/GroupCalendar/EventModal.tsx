import React from 'react';
import moment from 'moment';
import { Box, Modal, Divider } from '@mui/material';
import { AddToCalendar } from './AddToCalendar';
import { Close } from '@mui/icons-material';
import style from 'styles/components/groupCalendar.module.css';

interface PropType {
  modalIsOpen: boolean;
  setIsOpen(param: boolean): void;
  modalInfo: any;
}

export default function EventModal({ modalIsOpen, setIsOpen, modalInfo }: PropType) {
  const event = {
    start: modalInfo.start,
    end: modalInfo.end,
    title: modalInfo.title,
    details: modalInfo.extendedProps.description,
  };

  return (
    <Modal
      className={style.modalContainer}
      open={modalIsOpen}
      onClose={() => setIsOpen(false)}
    >
      <Box
        component='section'
        className={style.container}
      >
        <Box className={style.title}>
          <h3>{moment(modalInfo.startStr).format('ddd MM/DD')}</h3>
          <h3>
            {moment(modalInfo.startStr).format('hh:mm A')} -&nbsp;
            {moment(modalInfo.endStr).format('hh:mm A')}
          </h3>
        </Box>

        <h1 className={style.title}>{modalInfo.title}</h1>
        <Divider />

        <Box className={style.descriptionContainer}>
          <p className={style.description}>
            {modalInfo.extendedProps.description}
          </p>
        </Box>

        <AddToCalendar event={event} />

        <button
          onClick={() => setIsOpen(false)}
          className={style.closeModal}
          aria-label='close button'
        >
          <Close fontSize='small' />
        </button>
      </Box>
    </Modal>
  );
}