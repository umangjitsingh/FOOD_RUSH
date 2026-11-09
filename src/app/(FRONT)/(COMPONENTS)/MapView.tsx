"use client"
import {useEffect, useState} from "react";
import {Circle, MapContainer, Marker, Popup, TileLayer, useMap} from "react-leaflet";
import L, {LatLngExpression} from "leaflet";
import "leaflet/dist/leaflet.css";

// Created once, outside the component (safe because this file is loaded with ssr: false)
const markerIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});

// MapContainer only reads `center` once, so move the map when position changes
function Recenter({position}: { position: [number, number] }) {
    const map = useMap();
    useEffect(() => {
        map.setView(position, map.getZoom());
    }, [position, map]);
    return null;
}

type MapViewProps = {
    position: [number, number] | null;
    accuracy?: number; // meters, optional
    onPositionChange: (pos: [number, number]) => void;
};

function MapView({position, accuracy, onPositionChange}: MapViewProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!position) {
        return (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground"
                 style={{height: "384px"}}>
                Waiting for location...
            </div>
        );
    }

    if (!mounted) {
        return (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground"
                 style={{height: "384px"}}>
                Loading map...
            </div>
        );
    }

    return (
        <div style={{height: "384px", width: "100%"}}>
            <MapContainer key="delivery-map" center={position as LatLngExpression} zoom={18} scrollWheelZoom={true}
                          style={{height: "100%", width: "100%"}}>
                <TileLayer key={"tile"}
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Recenter position={position}/>
                {accuracy ? <Circle center={position} radius={accuracy}/> : null}
                <Marker
                    position={position as LatLngExpression}
                    icon={markerIcon}
                    draggable={true}
                    eventHandlers={{
                        dragend: (event: L.LeafletEvent) => {
                            const {lat, lng} = (event.target as L.Marker).getLatLng();
                            onPositionChange([lat, lng]);
                        },
                    }}
                >
                    <Popup>Drag the pin to your exact delivery spot</Popup>
                </Marker>
            </MapContainer>
        </div>
    );
}

export default MapView;