import React from 'react';
import { useNavigate } from "react-router-dom";
import { Container, Typography, Box, IconButton, Skeleton, Stack, Collapse } from '@mui/material';
import { FaLocationArrow, FaArrowLeft } from 'react-icons/fa';
import useStyles from './styles';

import { useGetPlaceQuery } from '../../features/placesApi';

const PlaceInfo = ({ displayId, infoOpen, setInfoOpen }) => {
  const { data, isFetching } = useGetPlaceQuery(displayId);
  const navigate = useNavigate();
  const classes = useStyles();

  return (
    <Box sx={{ backgroundColor: `${infoOpen ? 'white' : 'rgba(56,184,111,1)' }`, transition: 'background-color, 1s', height: '100%' }} maxWidth="400px" component="div" display="flex" flexDirection="column">
      <Collapse in={infoOpen} orientation="horizontal" collapsedSize={60} timeout={1000}>
        <div>
          <div id="placeImgCon" style={{ maxWidth: '400px' }}>
            {!displayId || isFetching ? <Skeleton animation="wave" variant="rectangular" width={400} height={270} /> : (
              <img className={classes.imgPlace} alt={data?.title} src={data?.photos[0]} />
            )}
          </div>
          <Container sx={{ display: 'flex', width: '100%' }} className={classes.infoButton}>
            <IconButton sx={{ fontSize: '2rem', transform: `${!infoOpen && 'rotate(180deg)'}`, transition: 'transform, 1s' }} color="inherit" onClick={() => setInfoOpen(!infoOpen)}><FaArrowLeft /></IconButton>
            <IconButton disabled={displayId ? false : true} sx={{ fontSize: '2rem' }} color="inherit" onClick={() => navigate(`/vieta/${displayId}`)}><FaLocationArrow /></IconButton>
          </Container>
          <Container className={classes.textCon} sx={{ height: `calc(100vh - 64px - 30px - 36px - ${document.getElementById('placeImgCon')?.offsetHeight}px)` }}>
            {!displayId || isFetching ? (
              <Stack spacing={3}>
                <Skeleton sx={{ borderRadius: '10px' }} animation="wave" variant="rectangular" width={'100%'} height={40} />
                <Skeleton sx={{ borderRadius: '10px' }} animation="wave" variant="rectangular" width={'100%'} height={270} />
              </Stack>
            ) : (
              <>
                <Typography variant="h4" gutterBottom>{data?.title}</Typography>
                <Typography variant="h6">{data?.description}</Typography>
              </>
            )}
          </Container>
        </div>
      </Collapse>
    </Box>
  )
}

export default PlaceInfo;