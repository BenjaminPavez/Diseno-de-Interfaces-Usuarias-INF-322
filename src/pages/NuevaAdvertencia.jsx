import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { MapContainer, TileLayer, useMapEvents, Marker } from 'react-leaflet';
import { guardarEnLocalStorage, leerDesdeLocalStorage } from '../components/fileUtils';
import L from "leaflet";

import pinAuto from "../assets/pin_auto.png";
import pinLadron from "../assets/pin_ladron.png";
import pinPoste from "../assets/pin_poste.png";
import pinSemaforo from "../assets/pin_semaforo.png";
import pinFuego from "../assets/pin_fuego.png";

const icons = {
  auto: new L.Icon({ iconUrl: pinAuto, iconSize: [32, 32], iconAnchor: [16, 32] }),
  ladron: new L.Icon({ iconUrl: pinLadron, iconSize: [32, 32], iconAnchor: [16, 32] }),
  poste: new L.Icon({ iconUrl: pinPoste, iconSize: [32, 32], iconAnchor: [16, 32] }),
  semaforo: new L.Icon({ iconUrl: pinSemaforo, iconSize: [32, 32], iconAnchor: [16, 32] }),
  fuego: new L.Icon({ iconUrl: pinFuego, iconSize: [32, 32], iconAnchor: [16, 32] }),
};

function NuevaAdvertencia() {
  const { type } = useParams();
  const { state } = useLocation();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState("bajo");
  const [position, setPosition] = useState(state?.currentPosition);
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
      <MapContainer center={position} zoom={16} style={{ height: "300px", width: "100%", marginBottom: "20px" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position} icon={icons[type]} />
        <MapEvents />
      </MapContainer>

      <button type="submit" className="advertencia-form__button">Añadir al mapa</button>
    </form>
  );
}

export default NuevaAdvertencia;
