import React from 'react';
import { Typography, Box, Container } from '@mui/material';
import source from '../images/bg.png';
import user from '../images/error_man2.png';

const NotFound = () => {
  return (
    <Box sx={{ height: 'calc(100vh - 30px)', display: 'flex', flexDirection: 'row', background: `url(${source}) no-repeat` }}>
      <Container sx={{ height: '100%' }}>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: "center" }}>
          <Typography sx={{ fontSize: '6rem', fontFamily: 'Bradley Hand, cursive' }} color="white" variant="h2" gutterBottom>404</Typography>
          <Typography sx={{ fontFamily: 'Bradley Hand, cursive' }} color="white" variant="h2">Puslapis nerastas!</Typography>
        </div>
      </Container>
      <Container sx={{ display: 'flex', justifyContent: 'center', height: '100%', alignItems: 'center' }}>
        <img alt="ieškantis vartotojas" src={user} style={{ width: '600px', height: '500px' }} />
      </Container>
    </Box>
  )
}

export default NotFound;