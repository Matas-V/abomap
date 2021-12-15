import React, { useState } from 'react';
import { useNavigate, Navigate } from "react-router-dom";
import { useGetAdminPlacesQuery, useDeleteAdminPlaceMutation } from '../../features/placesApi';
import { Typography, Button, Card, CardMedia, Stack, CardContent, Box, CircularProgress } from '@mui/material';
import { IoMdHeart } from 'react-icons/io';
import { MdDeleteForever } from 'react-icons/md';
import { BiEditAlt } from 'react-icons/bi';
import Modal from './Modal';
import AdminSidebar from '../AdminSidebar';
import useStyles from './styles.js';

const PlacesControl = () => {
  const { data, isLoading, isError } = useGetAdminPlacesQuery();
  const [deletePlace] = useDeleteAdminPlaceMutation();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [currentId, setCurrentId] = useState();
  let navigate = useNavigate();
  const classes = useStyles();

  const handleDelete = (id) => {
    setCurrentId(id);
    setOpenDeleteModal(true);
  }

  if (isLoading) {
    return (
      <div style={{ position: 'absolute', top: '50%', left: '50%' }}>
        <CircularProgress color="success" />
      </div>
    )
  }

  if (!localStorage.getItem('token') || isError) {
    return <Navigate to="/secretadminpanel/login" />
  }

  return (
    <Box display="flex" sx={{ marginTop: '64px', minHeight: '100vh' }}>
      <AdminSidebar />

      {openDeleteModal && <Modal openModal={openDeleteModal} setOpenModal={setOpenDeleteModal} action={deletePlace} currentId={currentId} text={"ištrinti"} />}

      <Box display="flex" sx={{ border: 'lightgrey solid 2px', flexDirection: 'column', width: '100%', padding: '50px 0' }}>
        <Stack spacing={5} sx={{ alignItems: 'center' }}>
          {data.data.map((item) => (
            <Card key={item._id} sx={{ borderRadius: '20px', overflow: 'visible',
            boxShadow: `0px 0px 5.7px rgba(0, 0, 0, 0.18),
            0px 0px 10.2px rgba(0, 0, 0, 0.12),
            0px 0px 15.2px rgba(0, 0, 0, 0.064),
            0px 0px 26.3px rgba(0, 0, 0, 0.015),
            0px 0px 80px rgba(0, 0, 0, -0.023)`,
          }} className={ classes.card }
            >
              <div className={classes.imgCon}>
                <CardMedia
                  component="img"
                  className={classes.cardImg2}
                  image={item.photos[0]}
                  alt="Abo place picture"
                  sx={{ objectFit: 'fill', margin: `auto 0`, width: '200px', }}
                />
              </div>
              <CardContent className={classes.cardContent} sx={{ width: '70%' }}>
                <Typography variant="h4" style={{ fontFamily: 'Arial, Rounded, MT', fontWeight: 'bold' }} color="rgba(56,184,111,1)">{item.title}</Typography>
                <Typography style={{ margin: '20px 0' }} variant="h6">{item.description}</Typography>
                <div style={{ display: 'flex', gap: '25px' }}>
                  <Button onClick={() => handleDelete(item._id)} color="error" variant="contained" style={{ fontSize: '30px', height: "100%" }}><MdDeleteForever /></Button>
                  <Button startIcon={<BiEditAlt />} onClick={() => navigate(`/vietos/redagavimas/${item._id}`)} style={{ color: 'white', backgroundColor: 'rgba(56,184,111,1)', padding: '10px 20px', fontSize: '15px' }} size="small" variant="contained">Redagavimas</Button>
                </div>
              </CardContent>
              <div className={classes.likesBtn}>
                <Typography variant="h3" color="white" align="center"><IoMdHeart /></Typography>
                <Typography sx={{ wordBreak: 'normal' }} variant="h4" color="white" align="center">{item.likesCount}</Typography>
              </div>
            </Card>
          ))}
        </Stack>
      </Box>
    </Box>
  )
}

export default PlacesControl;