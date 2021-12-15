import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from '../features/placesApi';

import { Container, Box, Button, TextField, Avatar, CssBaseline, Alert, Typography } from '@mui/material';
import { FaLock } from 'react-icons/fa';

const AdminLogin = () => {
  const [nameInput, setNameInput] = useState('');
  const [passInput, setPassInput] = useState('');
  const [error, setError] = useState(false);
  let navigate = useNavigate();
  const [login] = useLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userToken = await login({ name: nameInput, password: passInput });
    if (userToken?.data?.token) {
      localStorage.setItem("token", userToken.data.token);
      navigate('/secretadminpanel/prasymai');
      document.location.reload();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  }

  return (
    <Container maxWidth="xs" style={{ height: 'calc(100vh - 30px)', display: 'flex', alignItems: 'center', }}>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Alert style={{ width: '100%', opacity: `${error ? 1 : 0 }` }} variant="filled" severity="error">
          <Typography variant="h5">Blogas slaptažodis!</Typography>
        </Alert>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <FaLock />
        </Avatar>
        <Box component="form" onSubmit={(e) => handleSubmit(e)} noValidate sx={{ mt: 1 }}>
            <TextField
              variant="standard"
              margin="normal"
              InputLabelProps={{ sx: { fontSize: '1.25rem' } }}
              required
              fullWidth
              name="name"
              label="Name"
              type="password"
              id="name"
              autoComplete="current-name"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
            />
            <TextField
              variant="standard"
              margin="normal"
              required
              fullWidth
              InputLabelProps={{ sx: { fontSize: '1.25rem' } }}
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={passInput}
              onChange={(e) => setPassInput(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              <Typography variant="h6">Prisijungti</Typography>
            </Button>
          </Box>
      </Box>
    </Container>
  )
}

export default AdminLogin;
