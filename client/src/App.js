import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './App.css';

import { Home, AdminRequests, Navbar, FormPlace, AdminLogin, Footer, NotFound, MapPage, PlacePage, AdminPlaces, PlaceEdit, RequestEdit } from './components';


const App = () => {
  const theme = createTheme();

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/secretadminpanel/*" element={<AdminRequests />} />
          <Route path="/secretadminpanel/vietos" element={<AdminPlaces />} />
          <Route path="/vietos/redagavimas/:id" element={<PlaceEdit />} />
          <Route path="/prasymai/redagavimas/:id" element={<RequestEdit />} />
          <Route path="/secretadminpanel/login" element={<AdminLogin />} />
          <Route path="/zemelapiai" element={<MapPage />} />
          <Route path="/paraiska" element={<FormPlace />} />
          <Route path="/vieta/:id" element={<PlacePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        
        <Footer />
      </ThemeProvider>
    </div>
  )
}

export default App;
