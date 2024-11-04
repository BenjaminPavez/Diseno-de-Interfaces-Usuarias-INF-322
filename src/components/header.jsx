import React from 'react'
import { Link } from 'react-router-dom';

import MuniLogo from '../assets/icono.png'
import user from '../assets/user.png'

export const Header = () => {
  return (
    <div className='layout_header'>
        <Link to="/">
          <img className='logo' src={MuniLogo} alt='logo' />
        </Link>
        <h1 className='layout__title'>MuniDenuncia</h1>
        <img className='perfil' src={user} alt='perfil' />
    </div>
  )
}
 
export default Header