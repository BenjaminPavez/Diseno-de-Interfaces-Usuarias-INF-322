import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import { useNavigate } from 'react-router-dom';
import "leaflet/dist/leaflet.css";
import { leerDesdeLocalStorage } from '../components/fileUtils';

//Aqui se importan los iconos personalizados

import warningIcon from "../assets/advertencia.png";
import pinAuto from "../assets/pin_auto.png";
import pinLadron from "../assets/pin_ladron.png";
import pinPoste from "../assets/pin_poste.png";
import pinSemaforo from "../assets/pin_semaforo.png";
import pinFuego from "../assets/pin_fuego.png";
import iconAuto from "../assets/icon_auto.png";
import iconFuego from "../assets/icon_fuego.png";
import iconLadron from "../assets/icon_ladron.png";
import iconPoste from "../assets/icon_poste.png";
import iconSemaforo from "../assets/icon_semaforo.png";

const icons2 = {
  auto: new L.Icon({ iconUrl: iconAuto, iconSize: [32, 32], iconAnchor: [32, 32] }),
  ladron: new L.Icon({ iconUrl: iconLadron, iconSize: [32, 32], iconAnchor: [32, 32] }),
  poste: new L.Icon({ iconUrl: iconPoste, iconSize: [32, 32], iconAnchor: [32, 32] }),
  semaforo: new L.Icon({ iconUrl: iconSemaforo, iconSize: [32, 32], iconAnchor: [32, 32] }),
  fuego: new L.Icon({ iconUrl: iconFuego, iconSize: [32, 32], iconAnchor: [32, 32] }),
};

//Se mapea cada icono personalizado
const icons = {
  auto: new L.Icon({ iconUrl: pinAuto, iconSize: [32, 32], iconAnchor: [16, 32] }),
  ladron: new L.Icon({ iconUrl: pinLadron, iconSize: [32, 32], iconAnchor: [16, 32] }),
  poste: new L.Icon({ iconUrl: pinPoste, iconSize: [32, 32], iconAnchor: [16, 32] }),
  semaforo: new L.Icon({ iconUrl: pinSemaforo, iconSize: [32, 32], iconAnchor: [16, 32] }),
  fuego: new L.Icon({ iconUrl: pinFuego, iconSize: [32, 32], iconAnchor: [16, 32] }),
};

const locations = [
  { id: 1, lat: -33.5027, lng: -70.6132, type: "semaforo" },
  { id: 2, lat: -33.5031, lng: -70.6115, type: "ladron" },
  { id: 3, lat: -33.5042, lng: -70.6141, type: "auto" },
  { id: 4, lat: -33.5008, lng: -70.6127, type: "poste" },
  { id: 5, lat: -33.5015, lng: -70.6152, type: "fuego" },
];

function AddMarkers() {
  const map = useMap();
  const navigate = useNavigate();
  const locations = leerDesdeLocalStorage();

  useEffect(() => {
    locations.forEach((location) => {
      const icon = icons[location.type] || icons["default"];
      L.marker([location.lat, location.lng], { icon: icon })
        .addTo(map)
        .on("click", () => navigate(`/detalle/${location.id}`));
    });
  }, [map, navigate, locations]);

  return null;
}

function Maps() {
  const [showIcons, setShowIcons] = useState(false);
  const [currentPosition, setCurrentPosition] = useState([-33.5027, -70.6132]); // Posición inicial
  const navigate = useNavigate();

  const handleMapMoveEnd = (map) => {
    setCurrentPosition(map.getCenter()); // Actualiza posición cuando se mueve el mapa
  };

  return (
    <MapContainer
      center={currentPosition}
      zoom={16}
      style={{ height: "650px", width: "100%" }}
      whenCreated={(map) => {
        map.on("moveend", () => handleMapMoveEnd(map));
      }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <AddMarkers />
      <div className="warnings-button-container">
        {showIcons ? (
          <div className="warnings-icons">
            {Object.keys(icons).map((type) => (
              <img
                key={type}
                src={icons2[type].options.iconUrl}
                alt={type}
                onClick={() => navigate(`/NuevaAdvertencia/${type}`, {
                  state: { currentPosition }
                })}
                className="warning-icon"
              />
            ))}
          </div>
        ) : (
          <img
            src={warningIcon}
            alt="Advertencia"
            onClick={() => setShowIcons(true)}
            className="warning-button"
          />
        )}
      </div>
    </MapContainer>
  );
}

export default Maps;
