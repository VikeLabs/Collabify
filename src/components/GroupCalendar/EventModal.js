import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Box, Modal, Button, Divider } from '@mui/material';
import { Close, Google } from '@mui/icons-material';
import style from 'styles/components/groupCalendar.module.css';
import utilities from 'styles/utilities.module.css';
import { localToUTCTime, calendarQuery } from './helpers';

export default function EventModal({ modalIsOpen, setIsOpen, modalInfo }) {
  const eventUTCStart = localToUTCTime(modalInfo.startStr);
  const eventUTCEnd = localToUTCTime(modalInfo.endStr);
  const eventQueryString = calendarQuery(
    'GOOGLE',
    eventUTCStart,
    eventUTCEnd,
    modalInfo.title,
    modalInfo.extendedProps.description
  );

  return (
    <Modal
      className={style.modalContainer}
      open={modalIsOpen}
      onClose={() => setIsOpen(() => false)}
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

        <Box className={utilities.buttonContainer}>
          <Button
            variant='contained'
            className={utilities.button}
          >
            <a
              href={eventQueryString}
              target='_blank'
              className={style.btnAddToCal}
            >
              ADD TO CALENDAR&nbsp;
              <span>
                <Google />
              </span>
            </a>
          </Button>
        </Box>

        <button
          onClick={() => setIsOpen(() => false)}
          className={style.closeModal}
          aria-label='close button'
        >
          <Close fontSize='small' />
        </button>
      </Box>
    </Modal>
  );
}

EventModal.propTypes = {
  modalIsOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  modalInfo: PropTypes.object.isRequired,
};
