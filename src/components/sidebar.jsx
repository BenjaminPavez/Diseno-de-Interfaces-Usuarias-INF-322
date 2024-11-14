import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import user from '../assets/user.png';
import menu from '../assets/menu.png';
import appIcon from '../assets/icono.png';

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const sidebarRef = useRef(null);

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const SidebarLink = ({ to, onClick, label }) => (
    <li>
      <NavLink to={to} className={({ isActive }) => `nav-bar__link ${isActive ? 'nav-bar__link--active' : ''}`}
        onClick={closeSidebar}>
        <span onClick={onClick || null} className="links">{label}</span>
      </NavLink>
    </li>
  );

  const handleClickWithPopup = (e) => {
    e.preventDefault();
    toast("Próximamente en MuniDenuncia", {
      icon: '🔥',
      duration: 1500,
    });
    closeSidebar();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        closeSidebar();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      {isSidebarOpen && <div className="overlay" onClick={closeSidebar}></div>}
      <div ref={sidebarRef} className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="logo-container">
          <img src={appIcon} alt="App Icon" className="app-icon" />
          <span className="logo-name">MuniDenuncia</span>
          <img name="menu" className="sidebar__close-btn" src={menu} onClick={closeSidebar} alt="Cerrar Sidebar" />
        </div>

        <div className="user-container">
          <NavLink to="/perfil" onClick={closeSidebar}>
          <img className="perfil" src={user} alt="perfil" />
          </NavLink>
          <div className="user-details">
            <div className="name">Julius Hibbert</div>
          </div>
        </div>

        <ul className="nav-container">
          <SidebarLink to="/" label="Mapa" />
          <SidebarLink to="/listado" label="Denuncias" />

          <SidebarLink to="#" onClick={handleClickWithPopup}  label="Mis Denuncias" />
          <SidebarLink to="#" onClick={handleClickWithPopup} label="Ubicaciones favoritas" />
          <SidebarLink to="#" onClick={handleClickWithPopup} label="Configuración" />
          
          <SidebarLink to="#" onClick={handleClickWithPopup} label="Cerrar Sesión" />
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
