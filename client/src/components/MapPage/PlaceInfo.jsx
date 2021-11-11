import React from 'react';
import { Container, Typography, Skeleton, Box, IconButton } from '@mui/material';
import { FaLocationArrow, FaArrowLeft } from 'react-icons/fa';

import useStyles from './styles';

const PlaceInfo = () => {
  const classes = useStyles();

  return (
    <Box maxWidth="400px" component="div" display="flex" flexDirection="column">
      <div style={{ maxWidth: '400px', }}>
        <img className={classes.imgPlace} alt="some" src="https://www.varle.lt/static/uploads/products/143/cas/castor-puzzle-1000-dalys-rialto-w-nocy_hizgmww.jpeg" />
      </div>
      <Container sx={{ display: 'flex', width: '100%' }} className={classes.infoButton}>
        <IconButton color="inherit"><FaArrowLeft /></IconButton>
        <Typography variant="h4">Pavadinimas</Typography>
        <IconButton color="inherit"><FaLocationArrow /></IconButton>
      </Container>
      <Container className={classes.textCon}>
        <Typography variant="h4" gutterBottom>Vel pavadinimas</Typography>
        <Typography variant="h6">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</Typography>
      </Container>
    </Box>
  )
}

export default PlaceInfo;