"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import MarkerPng from "@/public/images/marker.png";
import { useTranslations } from "next-intl";

const marker = L.icon({
  iconUrl: MarkerPng.src,
  iconSize: [41, 41],
  iconAnchor: [12, 41],
});

export default function Map() {
  const position: [number, number] = [41.316088, 69.244968];

  const t = useTranslations();

  return (
    <div className="h-64 rounded-lg overflow-hidden shadow-md">
      <MapContainer
        center={position}
        zoom={17}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={position} icon={marker}>
          <Popup>
            Hoopla HQ <br /> {t("contacts.location")}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
