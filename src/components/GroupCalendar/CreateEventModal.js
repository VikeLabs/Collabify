import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Modal, Button, TextField } from '@mui/material';
import style from 'styles/components/groupCalendar.module.css';
import utilities from 'styles/utilities.module.css';

export default function CreateEventModal({
  modalIsOpen,
  setIsOpen,
  modalInfo,
}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  return (
    <Modal
      className={style.modalContainer}
      open={modalIsOpen}
      onClose={() => setIsOpen(false)}
    >
      <Box className={style.container}>
        <h1
          className={style.title}
        >
          ({modalInfo.date})
        </h1>
        <h2
          className={style.title}
        >
          {modalInfo.start} - {modalInfo.end}
        </h2>
        <Box className={style.textFieldContainer}>
          <TextField
            required
            variant='filled'
            label='Title'
            placeholder='Eg; Weekly meeting'
            onChange={(e) => setTitle(e.target.value)}
            className={style.textField}
          />
          <TextField
            required
            variant='filled'
            label='Description'
            placeholder='Eg; Room 174'
            multiline
            rows={2}
            onChange={(e) => setDescription(e.target.value)}
            className={style.textField}
          />
        </Box>
        <Box className={utilities.buttonContainer}>
          <Button
            variant='contained'
            disabled={title === '' || description === ''}
            className={utilities.button}
          >
            CREATE EVENT
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

CreateEventModal.propTypes = {
  modalIsOpen: PropTypes.node.isRequired,
  setIsOpen: PropTypes.node.isRequired,
  modalInfo: PropTypes.object.isRequired,
};
