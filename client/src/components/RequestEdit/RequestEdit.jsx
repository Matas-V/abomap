import React, { useState, useEffect } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { useGetAdminRequestQuery, useEditAdminRequestMutation } from '../../features/placesApi';

import { MdPlace } from 'react-icons/md';
import { TextField, CircularProgress, Box, Modal, Snackbar, Alert, Typography } from '@mui/material';
import { IoMdHeart } from 'react-icons/io';
import { FiSave } from 'react-icons/fi';
import MapModal from './MapModal';
import './styles.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
};

const EditPage = () => {
  const { id } = useParams();
  const { data, isLoading, isError, isSuccess: dataSuccess } = useGetAdminRequestQuery(id);
  const [editAdminRequest, { isSuccess }] = useEditAdminRequestMutation();
  const [openSnack, setOpenSnack] = useState(false);
  const [edit, setEdit] = useState({
    title: '', wiki: '', description: '', coords: {},
  });
  const [mapOpen, setMapOpen] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    if (dataSuccess) {
      setEdit({
        title: data.title, wiki: data.wiki, description: data.description, coords: data.coords,
      });
    }
  }, [data]);

  useEffect(() => {
    setOpenSnack(isSuccess);
  }, [isSuccess]);

  const handleSnack = () => setOpenSnack(false);

  const handleEdit = async (e) => {
    e.preventDefault();
    console.log(edit);
    await editAdminRequest({ id, edit });
    setTimeout(() => navigate('/secretadminpanel/prasymai'), 1500);
  }

  if (isLoading) {
    return (
      <div style={{ position: 'absolute', top: '50%', left: '50%' }}>
        <CircularProgress color="success" />
      </div>
    )
  }

  if (isError) {
    return <Navigate to={'/secretadminpanel/login'} />
  }

  return (
  <div className="container-fluid" style={{ marginTop: '64px' }}>

    <Modal open={mapOpen} onClose={() => setMapOpen(false)}>
      <Box sx={style}>
        <MapModal edit={edit} setEdit={setEdit} />
      </Box>
    </Modal>

    <Snackbar onClose={handleSnack} open={openSnack} autoHideDuration={3000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
      <Alert severity="success" sx={{ width: '100%' }}>
        <Typography variant="h4">Vietovė sėkmingai atnaujinta!</Typography>
      </Alert>
    </Snackbar>

    {/* <!-- single row --> */}
    <div className="row" style={{ minHeight: 'calc(100vh - 94px)' }}>
      {/* <!-- col-left --> */}

      <div className="col-lg-5" style={{ paddingLeft: '45px', paddingTop: '20px' }}>
        <TextField 
          style={{ marginBottom: '60px' }}
          fullWidth
          InputProps={{
            sx: {
              color: 'white',
              fontSize: '2.5rem',
            }
          }}
          color="success" 
          variant="standard" 
          value={edit.title}
          onChange={(e) => setEdit({...edit, title: e.target.value })}
        />
        <div className="wiki">
          <p>Wiki</p>
        </div>
        <div className="text-box" style={{ overflowY: 'auto' }}>
          <TextField
            name="greenTextBox"
            fullWidth
            multiline
            InputProps={{
              sx: {
                color: 'white',
                fontSize: '1.75rem',
              }
            }}
            color="success" 
            variant="standard"
            value={edit.wiki} 
            onChange={(e) => setEdit({...edit, wiki: e.target.value })}
          />
        </div>

        <div className="wiki" style={{ width: '220px', marginTop: '50px' }}>
          <p>Privalumai</p>
        </div>
        <div className="text-box" style={{ marginBottom: '50px', overflowY: 'auto' }}>
          <TextField
            name="greenTextBox"
            multiline
            InputProps={{
              sx: {
                color: 'white',
                fontSize: '1.75rem',
              }
            }}
            fullWidth
            variant="standard"
            color="success"
            value={edit.description}
            onChange={(e) => setEdit({...edit, description: e.target.value })}
          />
        </div>
      </div>

      {/* <!-- col-middle --> */}
      <div className="col-lg-1">
        <div className="Skirtukas" style={{ left: 'auto' }}>
          <IoMdHeart className="sirdis" style={{ fontSize: '40px' }} />
          <h3>{data.likesCount}</h3>
        </div>

        <div className="Skirtukas1" style={{ top: 'auto', left: 'auto' }}>
          <button className="btn-like" onClick={(e) => handleEdit(e)}>
            <FiSave style={{ fontSize: '30px', color: 'white' }} />
          </button>
          <button className="btn-point" onClick={() => setMapOpen(true)}>
            <MdPlace style={{ fontSize: '30px', color: 'white' }} />
          </button>
        </div>
      </div>

      {/* <!-- col-right --> */}

      <div
        className="col-lg-6"
        style={{ backgroundColor: 'white', paddingTop: '45px' }}
      >
        <div id="myCarousel" className="carousel slide" data-ride="carousel">
          {/* <!-- Indicators --> */}
          <ol className="carousel-indicators">
            {data.photos.map((_, i) => (
              <li key={i} className={i === 0 ? `active` : undefined} data-target="#myCarousel" data-slide-to={i}></li>
            ))}
          </ol>

          {/* <!-- Wrapper for slides --> */}
          <div className="carousel-inner">
            <div className="item active">
              <img src={data.photos[0]} alt="Abo vieta" />
            </div>
            {data.photos.map((img, i) => i !== 0 && (
              <div className="item" key={i}>
                <img src={img} alt="Abo vieta" />
              </div>
            ))}
          </div>

          {/* <!-- Left and right controls --> */}
          <a
            className="left carousel-control"
            href="#myCarousel"
            data-slide="prev"
          >
            <span className="glyphicon glyphicon-chevron-left"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="right carousel-control"
            href="#myCarousel"
            data-slide="next"
          >
            <span className="glyphicon glyphicon-chevron-right"></span>
            <span className="sr-only">Next</span>
          </a>
        </div>

        {/* <!--Karuseles pabaiga--> */}
        <div className="nuotrauku_dez">
          <div className="row" style={{ paddingLeft: '14%', paddingTop: '20px' }}>
            {data.photos.map((img, i) => (
              <div className="col-sm-3" key={i}>
                <img src={img} alt="Abo vieta" />
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  </div>
  )
}

export default EditPage;