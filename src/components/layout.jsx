import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import HomePage from '../pages/home_page'
import LightbulbPage from '../pages/lightbulb_page'

import NavBar from '../components/nav_bar'
import Header from '../components/header'
import Footer from './footer'

const Layout = () => {
  return (
    <BrowserRouter>
      <div className='layout'>
        <Header />
        <NavBar />
        <div className='layout__page'>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/lightbulb' element={<LightbulbPage />} />
          </Routes>
        </div>
        
      </div>
      <Footer />
    </BrowserRouter>
  )
}

export default Layout
