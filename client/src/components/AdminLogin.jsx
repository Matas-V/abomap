import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from '../features/placesApi';

import { Container, Box, Button, TextField, Avatar, CssBaseline, Alert } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

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
      navigate('/secretadminpanel');
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  }

  return (
    <Container maxWidth="xs" style={{ height: 'calc(100vh - 38px)', display: 'flex', alignItems: 'center', }}>
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
          Blogas slaptažodis!
        </Alert>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Box component="form" onSubmit={(e) => handleSubmit(e)} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
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
              margin="normal"
              required
              fullWidth
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
              Prisijungti
            </Button>
          </Box>
      </Box>
    </Container>
  )
}

export default AdminLogin;
