import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Box, Modal, Button, TextField } from '@mui/material';
import style from 'styles/components/groupCalendar.module.css';
import utilities from 'styles/utilities.module.css';
import { Spinner } from 'components/Loading';

export default function CreateEventModal({
  createEvent,
  modalIsOpen,
  setIsOpen,
  modalInfo,
}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const createEventClick = () => {
    setIsSaving(true);
    createEvent({
      title,
      description,
      time: {
        start: modalInfo.startStr,
        end: modalInfo.endStr,
      },
      names: modalInfo.names,
      numbers: modalInfo.numbers,
    });
  };

  return (
    <>
      <Modal
        className={style.modalContainer}
        open={modalIsOpen}
        onClose={() => setIsOpen(false)}
      >
        <Box className={style.container}>
          <Spinner isLoading={isSaving} />
          <h1 className={style.title}>
            ({moment(modalInfo.startStr).format('ddd MM/DD')})
          </h1>
          <h2 className={style.title}>
            {moment(modalInfo.startStr).format('hh:mm A')} -{' '}
            {moment(modalInfo.endStr).format('hh:mm A')}
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
              onClick={createEventClick}
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
    </>
  );
}

CreateEventModal.propTypes = {
  modalIsOpen: PropTypes.node.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  modalInfo: PropTypes.object.isRequired,
  createEvent: PropTypes.func.isRequired,
};
