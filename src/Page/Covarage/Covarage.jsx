import React from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default marker icon issue

import markerIcon from "leaflet/dist/images/marker-icon.png";


L.Icon.Default.mergeOptions({
    // iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    // shadowUrl: markerShadow,
});

const Coverage = () => {
    // Center: Dhaka
    const position = [22.989081258902765, 90.0232541938652];

    return (
        <div className="w-full max-w-5xl h-[500px] mx-auto rounded-xl shadow-lg overflow-hidden">
            <MapContainer
                center={position}
                zoom={7}
                scrollWheelZoom={false}
                className="h-full w-full"
            >
                {/* Map style */}
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                />

                {/* Marker */}
                <Marker position={position}>
                    <Popup>Kotalipara – Service Available ✅</Popup>
                </Marker>

                {/* Circle Coverage */}
                <Circle
                    center={position}
                    // radius={50000} // 50km
                    // color="green"
                    // fillColor="lime"
                    // fillOpacity={0.3}
                />
            </MapContainer>
        </div>
    );
};

export default Coverage;
