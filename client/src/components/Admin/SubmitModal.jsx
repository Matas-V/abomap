import React from 'react';
import { Modal, Button, Box, Typography } from '@mui/material';
import { useMoveAdminPlaceMutation } from '../../features/placesApi';

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

const SubmitModal = ({ openSubmitModal, setOpenSubmitModal, itemId, setOpenViewModal }) => {
  const [moveAdminPlace] = useMoveAdminPlaceMutation();

  const handleConfirmSubmit = () => {
    moveAdminPlace(itemId);
    setOpenSubmitModal(false);
    setOpenViewModal(false);
  }

  return (
    <Modal open={openSubmitModal} onClose={() => setOpenSubmitModal(false)}>
      <Box sx={style}>
        <Typography gutterBottom variant="h5" component="h2">Ar tikrai norite <b>patvirtinti</b> šį prašymą?</Typography>
        <Box display="flex" flexDirection="row">
          <Button onClick={handleConfirmSubmit} variant="contained" size="small" color="success">
            <Typography variant="h6">Patvirtinti</Typography>
          </Button>
          <Button style={{ marginLeft: '8px' }} onClick={() => setOpenSubmitModal(false)} variant="contained" size="small" color="error">
            <Typography variant="h6">Atšaukti</Typography>
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default SubmitModal;