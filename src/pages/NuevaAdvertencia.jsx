import React, { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { MapContainer, TileLayer, useMapEvents, Marker } from 'react-leaflet';
import { guardarEnLocalStorage, leerDesdeLocalStorage } from '../components/fileUtils';
import L from "leaflet";

import iconAuto from "../assets/icon_auto.png";
import iconLadron from "../assets/icon_ladron.png";
import iconPoste from "../assets/icon_poste.png";
import iconSemaforo from "../assets/icon_semaforo.png";

// Reutilizar los mismos estilos de pines de Maps.jsx
const icons = {
  auto: new L.DivIcon({
    className: "pin",
    html: `<img src="${iconAuto}" class="icon" alt="Auto Icon"/>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  }),
  ladron: new L.DivIcon({
    className: "pin",
    html: `<img src="${iconLadron}" class="icon" alt="Ladron Icon"/>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  }),
  poste: new L.DivIcon({
    className: "pin",
    html: `<img src="${iconPoste}" class="icon" alt="Poste Icon"/>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  }),
  semaforo: new L.DivIcon({
    className: "pin",
    html: `<img src="${iconSemaforo}" class="icon" alt="Semaforo Icon"/>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  }),
};

function NuevaAdvertencia() {
  const { type: initialType } = useParams();
  const { state } = useLocation();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState("bajo");
  const [position, setPosition] = useState(state?.currentPosition);
  const [type, setType] = useState(initialType); // Nuevo estado para el tipo seleccionado
  const navigate = useNavigate();

  const handleAddLocation = (e) => {
    e.preventDefault();

    const newLocation = {
      id: Date.now(),
      lat: position[0],
      lng: position[1],
      type,
      title,
      description,
      severity,
    };

    const locations = leerDesdeLocalStorage();
    locations.push(newLocation);

    guardarEnLocalStorage(locations);
    navigate("/");
  };

  const MapEvents = () => {
    const map = useMapEvents({
      moveend: () => {
        const center = map.getCenter();
        setPosition([center.lat, center.lng]);
      },
    });
    return null;
  };

  return (
    <form onSubmit={handleAddLocation} className="advertencia-form">
      <h2 className="advertencia-form__title">Reportar {type}</h2>
      
      {/* Mapa con el pin seleccionado */}
      <MapContainer center={position} zoom={16} style={{ height: "300px", width: "100%", marginBottom: "20px" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position} icon={icons[type]} />
        <MapEvents />
      </MapContainer>
      {/* Selección de iconos en una fila horizontal */}
      <div className="icon-selection">
        {Object.entries(icons).map(([key, icon]) => (
          <div 
            key={key} 
            className={`icon-container ${key === type ? 'selected' : ''}`} 
            onClick={() => setType(key)}
          >
            <img src={icon.options.html.match(/src="([^"]+)"/)[1]} alt={`${key} Icon`} className="icon-image" />
          </div>
        ))}
      </div>

      {/* Formulario de datos */}
      <label className="advertencia-form__label">Título:
        <input value={title} onChange={(e) => setTitle(e.target.value)} className="advertencia-form__input" />
      </label>
      <label className="advertencia-form__label">Descripción:
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="advertencia-form__textarea" />
      </label>
      <label className="advertencia-form__label">Gravedad:
        <select value={severity} onChange={(e) => setSeverity(e.target.value)} className="advertencia-form__select">
          <option value="bajo">Bajo</option>
          <option value="medio">Medio</option>
          <option value="alto">Alto</option>
        </select>
      </label>
      
      <button type="submit" className="advertencia-form__button">Añadir al mapa</button>
    </form>
  );
}

export default NuevaAdvertencia;
