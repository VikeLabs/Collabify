import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Box, Modal, Button } from '@mui/material';
import style from 'styles/components/groupCalendar.module.css';
import utilities from 'styles/utilities.module.css';

export default function EventModal({ modalIsOpen, setIsOpen, modalInfo }) {
  return (
    <Modal
      className={style.modalContainer}
      open={modalIsOpen}
      onClose={() => setIsOpen(false)}
    >
      <Box className={style.container}>
        <h2 className={style.title}>
          ({moment(modalInfo.startStr).format('ddd MM/DD')}) -{' '}
          {moment(modalInfo.startStr).format('hh:mm A')}
        </h2>
        <h1 className={style.title}>{modalInfo.title}</h1>
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
            ADD TO CALENDAR
          </Button>
        </Box>
        <a
          onClick={() => setIsOpen(false)}
          className={style.closeModal}
        >
          X
        </a>
      </Box>
    </Modal>
  );
}

EventModal.propTypes = {
  modalIsOpen: PropTypes.node.isRequired,
  setIsOpen: PropTypes.node.isRequired,
  modalTitle: PropTypes.string.isRequired,
  modalDesc: PropTypes.string.isRequired,
};
