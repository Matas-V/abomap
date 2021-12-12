import React from 'react';
import { Modal, Button, Box, Typography } from '@mui/material';
import sendEmail from '../../app/email-service.js';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 440,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const ModalAction = ({ openModal, setOpenModal, action, currentId, text, email }) => {
  const handleAction = () => {
    setOpenModal(false);
    action(currentId);
    if (email) {
      const content = { to_name: email.split('@')[0], to_email: email, }
      sendEmail(content);
    }
  }

  return (
    <Modal open={openModal} onClose={() => setOpenModal(false)}>
      <Box sx={style}>
        <Typography gutterBottom variant="h5" component="h2">Ar tikrai norite <b>{text}</b> šį prašymą?</Typography>
        <Box display="flex" flexDirection="row">
          <Button onClick={handleAction} variant="contained" size="small" color="success">
            <Typography variant="h6">Patvirtinti</Typography>
          </Button>
          <Button style={{ marginLeft: '8px' }} onClick={() => setOpenModal(false)} variant="contained" size="small" color="error">
            <Typography variant="h6">Atšaukti</Typography>
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default ModalAction;