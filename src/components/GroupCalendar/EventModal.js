import React from 'react'
import PropTypes from 'prop-types';
import { Box, Modal, Typography, Button } from '@mui/material';
import style from 'styles/components/groupCalendar.module.css';

export default function EventModal({
    modalIsOpen, 
    setIsOpen, 
    modalInfo,
    modalTitle,
    modalDesc
}) {
  return (
    <Modal
        className={style.modalContainer}
        open={modalIsOpen}
        onClose={()=> setIsOpen(false)}
    >
        <Box className={style.container}>
            <Typography className={style.title} variant="h6">
                ({modalInfo.date}) - {modalInfo.start}
            </Typography>
            <Typography className={style.title} variant="h4">
                {modalTitle}
            </Typography>
            <Box className={style.descriptionContainer}>
            <Typography className={style.description} variant="p">
                {modalDesc}
            </Typography>
            </Box>
            <Box className={style.buttonContainer}>
            <Button 
                variant="contained" 
                className={style.addButton}>
                ADD TO CALENDAR
            </Button>
            </Box>
            <a onClick={()=> setIsOpen(false)} className={style.closeModal}>X</a>
        </Box>
    </Modal>
  )
}

EventModal.propTypes = {
    modalIsOpen: PropTypes.node.isRequired,
    setIsOpen: PropTypes.node.isRequired,
    modalTitle: PropTypes.string.isRequired,
    modalDesc: PropTypes.string.isRequired,
  };
  