import React from 'react';
import { Box } from '@mui/material';

import PlaceInfo from './PlaceInfo';
import MapLayer from './Map';

const MapPage = () => {
  return (
    <Box display="flex" flexDirection="row" style={{ marginTop: '64px', height: 'calc(100vh - 64px - 30px)' }}>
      <PlaceInfo />
      <MapLayer />
    </Box>
  )
}

export default MapPage;