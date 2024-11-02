import React, { useState , useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { leerDesdeLocalStorage, eliminarDeLocalStorage } from '../components/fileUtils';

import iconAuto from "../assets/icon_auto.png";
import iconLadron from "../assets/icon_ladron.png";
import iconPoste from "../assets/icon_poste.png";
import iconSemaforo from "../assets/icon_semaforo.png";

const icons2 = {
  auto: new L.Icon({ iconUrl: iconAuto, iconSize: [32, 32], iconAnchor: [16, 16] }),
  ladron: new L.Icon({ iconUrl: iconLadron, iconSize: [32, 32], iconAnchor: [16, 16] }),
  poste: new L.Icon({ iconUrl: iconPoste, iconSize: [32, 32], iconAnchor: [16, 16] }),
  semaforo: new L.Icon({ iconUrl: iconSemaforo, iconSize: [32, 32], iconAnchor: [16, 16] }),
};

function Detalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const locations = leerDesdeLocalStorage();
  const locationDetail = locations.find((loc) => loc.id === parseInt(id));

  if (!locationDetail) {
    return <div className="detalle">Ubicación no encontrada</div>;
  };

  const [tipo_denuncia, setTipo_denuncia] = useState(locationDetail.type);

  useEffect(() => {
    const transformarTipoDenuncia = (tipo) => {
      switch (tipo) {
        case "ladron":
          return "Ladrones en la zona";
        case "auto":
          return "Incidente con vehículos";
        case "poste":
          return "Problema de iluminación";
        case "semaforo":
          return "Semáforo dañado";
        default:
          return tipo; // Retorna el valor original si no coincide con ningún caso
      }
    };

    setTipo_denuncia(transformarTipoDenuncia(locationDetail.type));
  }, [locationDetail.type]);

  const handleDelete = () => {
    eliminarDeLocalStorage(locationDetail.id);
    navigate("/"); // Redirige al usuario después de eliminar
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="detalle">
      <h2 className="detalle__titulo">{tipo_denuncia}</h2>
      <div className="alerta-icon-container">
        <img
          src={icons2[locationDetail.type].options.iconUrl}
          className="alerta-icon"
        />
      </div>

      <div className="detalle__info">

        <div className="detalle__gravedad-container">
          <p className="detalle__gravedad">Gravedad: {locationDetail.severity}</p>
        </div>

        <div className="detalle__descripcion-container">
          <p className="detalle__descripcion">{locationDetail.description}</p>
        </div>

      </div>

      <button onClick={handleBack} className="detalle__volver-boton">
        Volver
      </button>

      <button onClick={handleDelete} className="detalle__eliminar-boton">Eliminar</button>
    </div>
  );
}

export default Detalle;
