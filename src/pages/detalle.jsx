import React from 'react';
import '../stylesheets/detalle.scss';
import { useParams, useNavigate } from 'react-router-dom';
import { leerDesdeLocalStorage, eliminarDeLocalStorage } from '../components/fileUtils';

function Detalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const locations = leerDesdeLocalStorage();
  const locationDetail = locations.find((loc) => loc.id === parseInt(id));

  if (!locationDetail) {
    return <div className="detalle">Ubicación no encontrada</div>;
  }

  const handleDelete = () => {
    eliminarDeLocalStorage(locationDetail.id);
    navigate("/maps"); // Redirige al usuario después de eliminar
  };

  return (
    <div className="detalle">
      <h2 className="detalle__titulo">{locationDetail.title}</h2>
      <p className="detalle__descripcion">{locationDetail.description}</p>
      <p className="detalle__gravedad">Gravedad: {locationDetail.severity}</p>
      <button onClick={handleDelete} className="detalle__eliminar-boton">Eliminar</button>
    </div>
  );
}

export default Detalle;
