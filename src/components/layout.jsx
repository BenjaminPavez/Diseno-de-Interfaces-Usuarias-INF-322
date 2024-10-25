import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import HomePage from '../pages/home_page';
import LightbulbPage from '../pages/lightbulb_page';
import Login from '../pages/login';

import NavBar from '../components/nav_bar';
import Header from '../components/header';
import Footer from '../components/footer';

import { Toaster } from 'react-hot-toast';

const Layout = () => {
  const location = useLocation();

  // Esto es para saber si estamos en login o no y ocultar header y footer
  const hideHeaderFooter = location.pathname === '/login';

  return (
    <div className='layout'>
      <Toaster />
      {!hideHeaderFooter && <Header />}
      {!hideHeaderFooter && <NavBar />}

      <div className='layout__page'>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/lightbulb' element={<LightbulbPage />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </div>
      {!hideHeaderFooter && <Footer />}
    </div>
  );
};

const App = () => (
  <BrowserRouter>
    <Layout />
  </BrowserRouter>
);

export default App;
