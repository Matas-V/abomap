import React, { useState } from 'react';
import { Paper, Button, Typography, Container, Box, InputAdornment, Input, InputLabel, FilledInput , FormControl, Alert, Grid, IconButton, CircularProgress } from '@mui/material';
import MapModal from './MapModal';
import { FaBookReader, FaMapMarkerAlt } from 'react-icons/fa';
import { CgNotes } from 'react-icons/cg';
import { VscChromeClose } from 'react-icons/vsc';
import { BiMailSend } from 'react-icons/bi';
import upload from '../../images/file_upload.svg';
import woman from '../../images/woman.svg';
import useStyles from './styles';
import { inputStyles } from './styles';

import { useSubmitPlaceMutation } from '../../features/placesApi';

const IMAGES_ERROR = "images";
const FORM_ERROR = "form";

const FormPlace = () => {
  const [openMap, setOpenMap] = useState(false);
  const [form, setForm] = useState({
    name: '', description: '', email: '', coords: { lat: '', lon: '' },
  });
  const [photos, setPhotos] = useState([]);
  const [previewImg, setPreviewImg] = useState([]);
  const [formError, setFormError] = useState({
    state: false,
    type: '',
  });
  const [submitPlace, { isSuccess, isLoading }] = useSubmitPlaceMutation();
  const classes = useStyles();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.name && form.email && form.description && photos.length > 0 && form.coords.lat && form.coords.lon) {
      let formData = new FormData();
      Array.from(photos).forEach(photo => formData.append("image", photo));
      formData.append("title", form.name);
      formData.append("description", form.description);
      formData.append("email", form.email);
      formData.append("lat", form.coords.lat);
      formData.append("lon", form.coords.lon);
      await submitPlace(formData);
      console.log(formData);
      setForm({ name: '', description: '', email: '', coords: { lat: '', lon: '' } });
      setPhotos([]);
      setPreviewImg([]);
    } else {
      setFormError({
        state: true,
        type: FORM_ERROR,
      });
      setTimeout(() => setFormError({ state: false, type: ''}), 2000);
    }
  }

  const handleDeleteImage = (e, image) => {
    e.preventDefault();
    const newPhotos = previewImg.filter((item) => item.image !== image.image);
    const photosFiles = Array.from(photos).filter((item) => {
      if (item.name !== image.name) {
        return item;
      }
      return null;
    });
    setPreviewImg(newPhotos);
    setPhotos(photosFiles);
  }

  const handleImgUpload = (e) => {
    e.preventDefault();
    if (e.target.files.length > 5) {
      setFormError({
        state: true, type: IMAGES_ERROR,
      });
      setTimeout(() => setFormError({ state: false, type: ''}), 2000);
    } else {
      setPhotos(e.target.files);
      let imgUrls = [];
      for (let i=0; i<e.target.files.length; i++) {
        imgUrls.push({
          image: URL.createObjectURL(e.target.files[i]),
          name: e.target.files[i].name,
        });
      }
      setPreviewImg(imgUrls);
    }
  }

  return (
    <>
      {isLoading && (
        <div style={{ position: 'fixed', zIndex: '10', height: '100%', width: '100%', opacity: '0.3', backgroundColor: 'black', padding: '80px 60px' }}>
          <div style={{ position: 'fixed', top: '50%', left: '50%' }}>
            <CircularProgress size="80px" color="success" />
          </div>
        </div>)}

      <Box className={classes.main}>
        {openMap && <MapModal openMap={openMap} setOpenMap={setOpenMap} form={form} setForm={setForm} />}

        <Container>
          <Paper sx={{ borderRadius: '20px' }} elevation={6}>
            <Box className={classes.formDisplay}>
              <Container className={classes.formInfo}>
                <Typography align="center" variant="h4" gutterBottom style={{ padding: '45px 0 0 0' }}><b>Pasidalinti apleista vietove</b></Typography>
                <form onSubmit={(e) => handleSubmit(e)} autoComplete="off">

                  <div style={{ height: '90px' }}>
                    {formError.state && (
                    <Alert variant="filled" severity="error">
                      <Typography variant="h5">
                        {formError.type === FORM_ERROR && "Nepavyko! Pasitikrinkite, ar viską užpildėte ir bandykite dar kartą."}
                        {formError.type === IMAGES_ERROR && "Oops! Atrodo jūs bandėte įkelti daugiau nei 5 nuotraukas."}
                      </Typography>
                    </Alert>)}
                    {isSuccess && (
                    <Alert variant="filled" severity="success">
                      <Typography variant="h5">Pavyko! Jūs sėkmingai pasidalinote vietove.</Typography>
                    </Alert>)}
                    <span></span>
                  </div>
                  
                  <FormControl className={classes.textField} variant="filled">
                    <InputLabel sx={{ fontSize: '1.75rem', margin: '5px 0' }} htmlFor="filled-adornment-name">
                      Vietovės pavadinimas
                    </InputLabel>
                    <FilledInput 
                      id="filled-adornment-name"
                      type="name"
                      required
                      value={form.name}
                      onChange={(e) => setForm({...form, name: e.target.value })}
                      className={classes.filledInput}
                      startAdornment={
                        <InputAdornment position="start">
                          <FaBookReader />
                        </InputAdornment>
                      }
                      sx={inputStyles}
                    />
                  </FormControl>

                  <FormControl className={classes.textField} variant="filled">
                    <InputLabel sx={{ fontSize: '1.75rem', margin: '5px 0' }} htmlFor="filled-adornment-description">
                      Vietovės aprašymas
                    </InputLabel>
                    <FilledInput 
                      id="filled-adornment-description"
                      type="name"
                      required
                      multiline
                      maxRows={5}
                      minRows={5}
                      value={form.description}
                      onChange={(e) => setForm({...form, description: e.target.value })}
                      className={classes.filledInput}
                      startAdornment={
                        <InputAdornment sx={{ position: 'absolute', top: '16px' }} position="start">
                          <CgNotes />
                        </InputAdornment>
                      }
                      sx={inputStyles}
                    />
                  </FormControl>

                  <FormControl autoComplete="off" className={classes.textField} variant="filled">
                    <InputLabel sx={{ fontSize: '1.75rem', margin: '5px 0' }} htmlFor="filled-adornment-email">
                      El. paštas
                    </InputLabel>
                    <FilledInput 
                      id="filled-adornment-email"
                      type="email"
                      className={classes.filledInput}
                      value={form.email}
                      onChange={(e) => setForm({...form, email: e.target.value })}
                      required
                      startAdornment={
                        <InputAdornment position="start">
                          <FaBookReader />
                        </InputAdornment>
                      }
                      sx={inputStyles}
                    />
                  </FormControl>

                  <div className={classes.btnCon}>
                    <Button onClick={() => setOpenMap(true)} variant="contained" color="inherit">
                      <FaMapMarkerAlt style={{ fontSize: '3rem', color: 'green' }}/>
                    </Button>
                    <Button type="submit" variant="contained" color="success">
                      <Typography variant="h5">Patvirtinti</Typography>
                      <BiMailSend style={{ fontSize: '3rem', marginLeft: '8px' }} />
                    </Button>
                  </div>

                </form>
              </Container>
              <Container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative' }} className={classes.upload}>
                {previewImg.length > 0 ? (
                  <Grid container spacing={2} sx={{ width: '100%', margin: '20px', height: '350px', }} className={classes.imgPreviewCon}>
                    {previewImg.map((item, i) => (
                      <Grid key={i} item md={6} xl={4}>
                        <div style={{ position: 'relative', width: '100px', height: '100px' }}>
                          <img className={classes.imgDisplay} style={{ width: '100px' }} src={item.image} alt="Abo img" />
                          <IconButton onClick={(e) => handleDeleteImage(e, item)} sx={{ position: 'absolute', top: '-5px', right: '-5px', color: 'white', backgroundColor: '#D83020', '&:hover': { backgroundColor: '#ff524c' } }} size="small" className={classes.closeBtn}>
                            <VscChromeClose />
                          </IconButton>
                        </div>
                      </Grid>
                    ))}
                  </Grid>
                ) : <div style={{ width: '100%', margin: '20px', height: '350px', }}><span></span></div>}
                <img alt="upload" src={upload} style={{ maxWidth: '250px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
                <label htmlFor="files">
                  <Input onChange={(e) => handleImgUpload(e)} required name="files" accept="image/*" inputProps={{ multiple: true }} multiple id="files" type="file" style={{ display: 'none' }} />
                  <Button sx={{ fontSize: '1.35rem', marginTop: '15px' }} color="success" variant="outlined" component="span">Įkelti nuotrauką</Button>
                </label>
              </Container>
            </Box>
          </Paper>
        </Container>

        <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img alt="woman" src={woman} style={{ height: '570px' }} />
        </Container>
      </Box>
    </>
  )
}

export default FormPlace;
