import React, { useState } from 'react';
import { Box } from '@mui/material';

import PlaceInfo from './PlaceInfo';
import MapLayer from './Map';

const MapPage = () => {
  const [displayId, setDisplayId] = useState(undefined);
  const [infoOpen, setInfoOpen] = useState(false);

  return (
    <Box display="flex" flexDirection="row" style={{ marginTop: '64px', height: 'calc(100vh - 64px - 30px)' }}>
      <PlaceInfo displayId={displayId} infoOpen={infoOpen} setInfoOpen={setInfoOpen} />
      <MapLayer setDisplayId={setDisplayId} setInfoOpen={setInfoOpen} />
    </Box>
  )
}

export default MapPage;