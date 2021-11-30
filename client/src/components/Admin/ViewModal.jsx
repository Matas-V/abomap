import React from 'react';
import { useGetAdminPlaceQuery } from '../../features/placesApi';
import { Modal, Button, Box, Typography, CircularProgress } from '@mui/material';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  maxWidth: '700px',
  boxShadow: 24,
  p: 4,
};

const ViewModal = ({ setOpenViewModal, openViewModal, itemId, setOpenDeleteModal, setOpenSubmitModal }) => {
  const { data, isLoading, isSuccess } = useGetAdminPlaceQuery(itemId);
  const carouselImages = isSuccess && data?.photos.map((img) => (
    <div style={{ maxHeight: '400px', textAlign: 'center', objectFit: 'contain' }}>
      <img style={{ height: '100%' }} alt="img" src={img} />
    </div>
  ));

  if (isLoading) {
    return (
      <div style={{ position: 'absolute', top: '50%', left: '50%' }}>
        <CircularProgress color="success" />
      </div>
    )
  }

  return (
    <Modal open={openViewModal} onClose={() => setOpenViewModal(false)} style={{ overflow: 'scroll', }}>
      <Box sx={style}>
        <AliceCarousel
            mouseTracking
            autoHeight
            items={carouselImages}
        />
        <Typography variant="h5" gutterBottom><b>Pavadinimas:</b> {data.title}</Typography>
        <Typography variant="h5" gutterBottom><b>Koordinatės:</b> {`platuma: ${data.coords.lat}, ilguma: ${data.coords.lon}`}</Typography>
        <Typography variant="h5" gutterBottom><b>Aprašymas:</b> {data.description}</Typography>

        <Box display="flex" flexDirection="row">
          <Button onClick={() => {}} variant="contained" size="small" color="info">
            <Typography variant="h6">Pataisyti</Typography>
          </Button>
          <Button style={{ marginLeft: '8px' }} onClick={() => setOpenSubmitModal(true)} variant="contained" size="small" color="success">
            <Typography variant="h6">Patvirtinti</Typography>
          </Button>
          <Button style={{ marginLeft: '8px' }} onClick={() => setOpenDeleteModal(true)} variant="contained" size="small" color="error">
            <Typography variant="h6">Panaikinti</Typography>
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default ViewModal;