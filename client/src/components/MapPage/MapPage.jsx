import React from 'react';
import { Box } from '@mui/material';

import PlaceInfo from './PlaceInfo';

const MapPage = () => {
  return (
    <Box display="flex" flexDirection="row" style={{ marginTop: '64px', height: 'calc(100vh - 102px)' }}>
      <PlaceInfo />
    </Box>
  )
}

export default MapPage;