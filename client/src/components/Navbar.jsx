import React from 'react';
import { AppBar, Typography, Toolbar, Link } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  appbar: {
    backgroundColor: '#fbffff',
  },
  title: {
    color: 'black',
    paddingLeft: '40px',
  },
  toolbar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fbffff'
  },
  nav: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  navText: {
    color: 'black',
    padding: '0 15px',
    transition: 'color 0.3s',
    '&:hover': {
      color: 'rgba(56,184,111,1)',
    }
  }
}));

const Navbar = () => {
  const classes = useStyles();
  let navigate = useNavigate();

  return (
    <>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
            <div>
              <Typography sx={{ fontWeight: '700', }} className={classes.title} variant="h5">Abomap</Typography>
            </div>
            <div className={classes.nav}>
              <Link underline="none" component="button" onClick={() => navigate('/')}>
                <Typography className={classes.navText} variant="h6">Pradžia</Typography>
              </Link>
              <Link underline="none" component="button" onClick={() => navigate('/zemelapiai')}>
                <Typography className={classes.navText} variant="h6">Žemėlapiai</Typography>
              </Link>
              <Link underline="none" component="button" onClick={() => navigate('/paraiska')}>
                <Typography className={classes.navText} variant="h6">Paraiška</Typography>
              </Link>
            </div>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Navbar;
