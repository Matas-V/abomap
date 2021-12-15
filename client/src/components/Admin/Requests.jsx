import React, { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import AdminSidebar from '../AdminSidebar';
import { Box, Card, CardContent, Typography, Button, Stack, CircularProgress, Modal } from '@mui/material';
import { MdDeleteForever, MdLocationOn, MdEdit, MdCheck } from 'react-icons/md';
import { useGetAdminRequestsQuery, useDeleteAdminRequestMutation, useMoveAdminPlaceMutation } from '../../features/placesApi';
import { FaRegSadCry } from 'react-icons/fa';
import ActionModal from './Modal';
import MapLayer from './Map';

import useStyles from './styles.js';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
};

const NewAdmin = () => {
  const { data, isLoading, isError, isSuccess, refetch } = useGetAdminRequestsQuery();
  const [deletePlace] = useDeleteAdminRequestMutation();
  // movePlace - transfer from admin data to official data
  const [movePlace] = useMoveAdminPlaceMutation();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openSubmitModal, setOpenSubmitModal] = useState(false);
  const [currentId, setCurrentId] = useState();
  const [email, setEmail] = useState('');
  const [coords, setCoords] = useState({ lat: '', lon: '' });
  const [map, setMap] = useState(false);
  let navigate = useNavigate();
  const classes = useStyles();

  const handleDelete = (id) => {
    setCurrentId(id);
    setOpenDeleteModal(true);
  }

  const handleConfirm = (id, creator) => {
    setCurrentId(id);
    setOpenSubmitModal(true);
    setEmail(creator);
  }

  const handleImg = (item) => {
    let img = [];
    for (let i=0; i<5; i++) {
      if (item.photos[i]) img.push(<img key={i} className={classes.cardImg} alt={item.title} src={item.photos[i]} />)
      else img.push(<div key={i} style={{ backgroundColor: '#d9d9db' }} className={classes.cardImg}><span></span></div>)
    }
    return img;
  }

  // useEffect(() => {
  //   console.log(isError);

  //   if (localStorage.getItem("token")) {
  //     refetch();
  //   } else if (!isError) {
  //     navigate('/secretadminpanel/login');
  //   }
    
  // }, []);

  if (isError || !localStorage.getItem("token")) {
    return <Navigate to='/secretadminpanel/login' />
  }

  if (isLoading) {
    return (
      <div style={{ position: 'absolute', top: '50%', left: '50%' }}>
        <CircularProgress color="success" />
      </div>
    )
  }

  return (
    <Box display="flex" sx={{ marginTop: '64px', minHeight: '100vh' }}>
      <AdminSidebar />
      <Box display="flex" sx={{ border: 'lightgrey solid 2px', flexDirection: 'column', width: '100%', padding: '50px 0' }}>

      {openDeleteModal && <ActionModal openModal={openDeleteModal} setOpenModal={setOpenDeleteModal} action={deletePlace} currentId={currentId} text={"ištrinti"} />}
      {openSubmitModal && <ActionModal openModal={openSubmitModal} setOpenModal={setOpenSubmitModal} action={movePlace} currentId={currentId} text={"patvirtinti"} email={email} />}

      <Modal open={map} onClose={() => setMap(false)}>
        <Box sx={style}>
          <MapLayer coords={coords} />
        </Box>
      </Modal>

        {isSuccess && data.data.length === 0 && (
          <div style={{ position: 'absolute', top: '50%', left: '50%', textAlign: 'center', transform: 'translate(-50%, -50%)', }}>
            <Typography variant="h4" gutterBottom>Nėra naujų paraiškų</Typography>
            <FaRegSadCry style={{ fontSize: '30px' }} />
          </div>
        )}

        <Stack spacing={5} sx={{ alignItems: 'center' }}>
          {data?.data.map((item, i) => (
            <Card key={item._id} sx={{ borderRadius: '20px', minHeight: '200px', position: 'relative', width: '732px',
          boxShadow: `0px 0px 5.7px rgba(0, 0, 0, 0.18),
          0px 0px 10.2px rgba(0, 0, 0, 0.12),
          0px 0px 15.2px rgba(0, 0, 0, 0.064),
          0px 0px 26.3px rgba(0, 0, 0, 0.015),
          0px 0px 80px rgba(0, 0, 0, -0.023)`,
        }}
          >
            <div className={classes.btnCon}>
              <Button onClick={(e) => handleConfirm(item._id, item.creatorEmail)} sx={{ borderRadius: '0 0 0 20px', fontSize: '30px' }} variant="contained" color="success"><MdCheck /></Button>
              <Button onClick={() => navigate(`/prasymai/redagavimas/${item._id}`)} sx={{ borderRadius: '0', fontSize: '30px' }} variant="contained" color="info"><MdEdit /></Button>
              <Button onClick={(e) => handleDelete(item._id)} sx={{ borderRadius: '0 20px 0 0', fontSize: '30px' }} variant="contained" color="error"><MdDeleteForever /></Button>
            </div>
            <CardContent className={classes.cardContent}>
              <div className={classes.cardContent} style={{ flexDirection: 'row', alignItems: 'center', gap: '20px', width: 'calc(100% - 200px)' }}>
                <Typography variant="h4" color="rgba(56,184,111,1)" className={classes.cardTitle}>{item.title}</Typography>
                <Typography variant="h6" className={classes.cardEmail}>{item.creatorEmail}</Typography>
              </div>
              <Typography color="rgba(56,184,111,1)" variant="h6">{item.description}</Typography>
              <div style={{ flexDirection: 'row', display: 'flex', gap: '20px' }}>
                <div className={classes.cardImgCon}>
                  { handleImg(item) }
                </div>
                <Button onClick={() => {setMap(true); setCoords(item.coords);}} style={{ fontSize: '40px', color: 'white', backgroundColor: 'rgba(56,184,111,1)', padding: '0 40px', borderRadius: '10px' }}  variant="contained">
                  <MdLocationOn />
                </Button>
              </div>
            </CardContent>
          </Card>
          ))}
        </Stack>
      </Box>
    </Box>
  )
}

export default NewAdmin;