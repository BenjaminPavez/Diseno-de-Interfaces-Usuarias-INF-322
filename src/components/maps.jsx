import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import redpin from "../assets/red_pin.png"; 

//Pin personalizado
const customIcon = new L.Icon({
  iconUrl: redpin,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

//Localicaciones cercanas al Prestigio
const locations = [
  { lat: -33.5027, lng: -70.6132 }, // UTFSM San Joaquín
  { lat: -33.5031, lng: -70.6115 }, // Punto cercano 1
  { lat: -33.5042, lng: -70.6141 }, // Punto cercano 2
  { lat: -33.5008, lng: -70.6127 }, // Punto cercano 3
  { lat: -33.5015, lng: -70.6152 }, // Punto cercano 4
  { lat: -33.5034, lng: -70.6109 }, // Punto cercano 5
];

function AddMarkers() {
  const map = useMap();

  useEffect(() => {
    locations.forEach((location) => {
      L.marker([location.lat, location.lng], { icon: customIcon }).addTo(map); 
    });
  }, [map]);

  return null;
}

function Maps() {
  const position = [-33.5027, -70.6132]; //Prestigio

  return (
    <MapContainer
      center={position}
      zoom={16}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <AddMarkers />
    </MapContainer>
  );
}

export default Maps;
