import React from 'react';
import { Modal, Button, Box, Typography } from '@mui/material';
import { useDeleteAdminPlaceMutation } from '../../features/placesApi';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const DeleteModal = ({ openDeleteModal, setOpenDeleteModal, itemId, setOpenViewModal }) => {
  const [deletePlace] = useDeleteAdminPlaceMutation();

  const handleConfirmDelete = () => {
    deletePlace(itemId);
    setOpenDeleteModal(false);
    setOpenViewModal(false);
  }

  return (
    <Modal open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
      <Box sx={style}>
        <Typography gutterBottom variant="h6" component="h2">Ar tikrai norite <b>panaikinti</b> šį prašymą?</Typography>
        <Box display="flex" flexDirection="row">
          <Button onClick={handleConfirmDelete} variant="contained" size="small" color="success">Patvirtinti</Button>
          <Button style={{ marginLeft: '8px' }} onClick={() => setOpenDeleteModal(false)} variant="contained" size="small" color="error">Atšaukti</Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default DeleteModal;