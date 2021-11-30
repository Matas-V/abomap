import React from 'react';
import { Modal, Box } from '@mui/material';
import MapLayer from './Map';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  // maxWidth: '700px',
  boxShadow: 24,
  // p: 4,
};


const MapModal = ({ openMap, setOpenMap, form, setForm }) => {
  return (
    <Modal open={openMap} onClose={() => setOpenMap(false)}>
      <Box sx={style}>
        <MapLayer form={form} setForm={setForm} />
      </Box>
    </Modal>
  )
}

export default MapModal;