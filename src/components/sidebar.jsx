import React from 'react';
import { NavLink } from 'react-router-dom';
import user from '../assets/user.png';
import menu from '../assets/menu.png';

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const SidebarLink = ({ to, icon, label }) => (
    <li>
      <NavLink to={to} className={({ isActive }) => `nav-bar__link ${isActive ? 'nav-bar__link--active' : ''}`}>
        <i className={`bx ${icon}`}></i>
        <span className="links">{label}</span>
      </NavLink>
      <span className="tooltip">{label}</span>
    </li>
  );

  return (
    <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
      <div className="logo-container">
        <i 
          className={`bx ${isSidebarOpen ? 'bx-left-arrow' : 'bx-menu'}`} 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          style={{ cursor: 'pointer' }}
        />
      </div>

      <ul className="nav-container">
        <img name='menu' className="sidebar__close-btn" src={menu} onClick={closeSidebar}/>
        <li className="search">
          <i className="bx bx-search"></i>
          <span className="tooltip">Search</span>
        </li>
        <SidebarLink to="/" icon="bxs-dashboard" label="Home" />
        <SidebarLink to="/perfil" icon="bx-user" label="Perfil" />
        <SidebarLink to="/listado" icon="bx-conversation" label="Denuncias" />
        <SidebarLink to="/analytics" icon="bx-chart" label="Analytics" />
        <SidebarLink to="/files" icon="bx-folder" label="Files" />
        <SidebarLink to="/login" icon="bx-cog" label="Cerrar Sesion" />

        <div className="user-container">
          <img className="perfil" src={user} alt="perfil" />
          <div className="user-details">
            <div className="name">Julius Hibbert</div>
            <div className="job">Vecino</div>
          </div>
        </div>
        <i className="bx bx-log-out-circle" id="logout"></i>
      </ul>
    </div>
  );
};

export default Sidebar;
