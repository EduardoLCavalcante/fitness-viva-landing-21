
import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, MapContainerProps } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet icon issues
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

interface LocationMapProps {
  position: [number, number];
  zoom?: number;
  popupText?: string;
}

const LocationMap: React.FC<LocationMapProps> = ({ 
  position, 
  zoom = 15, 
  popupText = "Mais Vida - Studio de Musculação" 
}) => {
  useEffect(() => {
    // Fix for leaflet rendering issue
    window.dispatchEvent(new Event('resize'));
  }, []);

  // Convert position to LatLngExpression for TypeScript compatibility
  const mapPosition: L.LatLngExpression = position;

  return (
    <div className="overflow-hidden rounded-lg shadow-lg h-[400px] md:h-[500px] w-full transition-all duration-300 hover:shadow-xl">
      <MapContainer 
        center={mapPosition}
        zoom={zoom} 
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
        className="z-10"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={mapPosition}>
          <Popup>
            <div className="text-center p-1">
              <strong className="text-maisvida-green">{popupText}</strong>
              <p className="text-sm text-gray-600">Venha nos visitar!</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default LocationMap;
