import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Stack, Button } from '@mui/material';
import { FiMail } from 'react-icons/fi';
import { IoStatsChartSharp } from 'react-icons/io5';
import { IoMdSettings } from 'react-icons/io';
import { MdEditLocation } from 'react-icons/md';

const AdminSidebar = () => {
  let navigate = useNavigate();

  return (
    <div style={{ width: "300px", height: '100%', position: 'relative' }}>
      <Stack alignItems="flex-start" sx={{ position: 'fixed', top: '64px', left: '0' }}>
        <Button onClick={() => navigate('/secretadminpanel/suvestine')} sx={{ padding: '16px 25px 16px 15px', justifyContent: 'left' }} fullWidth variant="text" color="success" startIcon={<IoStatsChartSharp />}>
          <Typography variant="h4" color="rgba(56,184,111,1)">Suvestinė</Typography>
        </Button>
        <Button onClick={() => navigate('/secretadminpanel/prasymai')} sx={{ padding: '16px 25px 16px 15px', justifyContent: 'left' }} fullWidth variant="text" color="success" startIcon={<FiMail />}>
          <Typography variant="h4" color="rgba(56,184,111,1)">Prašymai</Typography>
        </Button>
        <Button onClick={() => navigate('/secretadminpanel/vietos')} sx={{ padding: '16px 25px 16px 15px', justifyContent: 'left' }} fullWidth variant="text" color="success" startIcon={<MdEditLocation />}>
          <Typography variant="h4" color="rgba(56,184,111,1)">Vietų valdymas</Typography>
        </Button>
        <Button onClick={() => navigate('/secretadminpanel/nustatymai')} sx={{ padding: '16px 25px 16px 15px', justifyContent: 'left' }} fullWidth variant="text" color="success" startIcon={<IoMdSettings />}>
          <Typography variant="h4" color="rgba(56,184,111,1)">Nustatymai</Typography>
        </Button>
      </Stack>
    </div>
  )
}

export default AdminSidebar;