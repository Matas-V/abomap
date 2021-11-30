import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useGetAdminPlacesQuery } from '../../features/placesApi';

import { Container, Button, Typography, Grid, Card, CardMedia, CardContent, CardActions, CircularProgress } from '@mui/material';
import { FaRegSadCry } from 'react-icons/fa';
import DeleteModal from './DeleteModal';
import ViewModal from './ViewModal';
import SubmitModal from './SubmitModal';

const AdminPanel = () => {
  const { data, isLoading, isSuccess } = useGetAdminPlacesQuery();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openSubmitModal, setOpenSubmitModal] = useState(false);
  const [itemIdShow, setItemIdShow] = useState('');

  const handleDeleteOpen = (id) => {
    setOpenDeleteModal(true);
    setItemIdShow(id);
  }

  const handleSubmitOpen = (id) => {
    setOpenSubmitModal(true);
    setItemIdShow(id);
  }

  const handleViewOpen = (id) => {
    setOpenViewModal(true);
    setItemIdShow(id);
  }

  if (isLoading) {
    return (
      <div style={{ position: 'absolute', top: '50%', left: '50%' }}>
        <CircularProgress color="success" />
      </div>
    )
  }

  if (!localStorage.getItem('token')) {
    return <Navigate to="/secretadminpanel/login" />
  }

  if (isSuccess && data.data.length === 0) {
    return (
      <div style={{ position: 'absolute', top: '50%', left: '50%', textAlign: 'center', transform: 'translate(-50%, -50%)', }}>
        <Typography variant="h4" gutterBottom>Nėra naujų paraiškų</Typography>
        <FaRegSadCry style={{ fontSize: '30px' }} />
      </div>
    )
  }

  return (
    <Container style={{ minHeight: 'calc(100vh - 38px)', margin: '100px auto 70px auto' }}>

      {openDeleteModal && <DeleteModal itemId={itemIdShow} openDeleteModal={openDeleteModal} setOpenDeleteModal={setOpenDeleteModal} setOpenViewModal={setOpenViewModal} />}

      {openViewModal && <ViewModal itemId={itemIdShow} openViewModal={openViewModal} setOpenViewModal={setOpenViewModal} setOpenDeleteModal={setOpenDeleteModal} setOpenSubmitModal={setOpenSubmitModal} />}

      {openSubmitModal && <SubmitModal itemId={itemIdShow} openSubmitModal={openSubmitModal} setOpenSubmitModal={setOpenSubmitModal} setOpenViewModal={setOpenViewModal} />}

      <Grid container spacing={6}>
        {isSuccess && data.data.map((item) => (
          <Grid item key={item._id} xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                image={item.photos[0]}
                alt="Abo Place"
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h4" component="h2">
                  <b>Pavadinimas: </b>{item.title}
                </Typography>
                <Typography gutterBottom variant="h6" component="h2">
                  <b>Koordinatės: </b>{`platuma: ${item.coords.lat}, ilguma: ${item.coords.lon}`}
                </Typography>
                <Typography variant="h6">
                  <b>Aprašymas: </b>{item.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button variant="contained" size="small" color="info" onClick={() => handleViewOpen(item._id)}>
                  <Typography variant="h6">Peržiūrėti</Typography>
                </Button>
                <Button variant="contained" color="success" size="small" onClick={() => handleSubmitOpen(item._id)}>
                  <Typography variant="h6">Patvirtinti</Typography>
                </Button>
                <Button variant="contained" color="error" size="small" onClick={() => handleDeleteOpen(item._id)}>
                  <Typography variant="h6">Panaikinti</Typography>
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default AdminPanel;
