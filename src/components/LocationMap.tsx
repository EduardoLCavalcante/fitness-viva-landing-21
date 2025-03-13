
import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

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
  const mapRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!mapRef.current) return;
    
    // Convert position to LatLngExpression
    const mapPosition: L.LatLngTuple = position;
    
    // Initialize map
    const map = L.map(mapRef.current, {
      center: mapPosition,
      zoom: zoom,
      zoomControl: false
    });
    
    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    // Add marker with custom icon
    const customIcon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
    
    const marker = L.marker(mapPosition, { icon: customIcon }).addTo(map);
    
    // Add popup
    marker.bindPopup(`
      <div class="text-center p-2">
        <strong class="text-green-500">${popupText}</strong>
        <p class="text-sm text-gray-600">Venha nos visitar!</p>
      </div>
    `).openPopup();
    
    // Fix rendering issues
    setTimeout(() => {
      map.invalidateSize();
    }, 100);
    
    // Cleanup on unmount
    return () => {
      map.remove();
    };
  }, [position, zoom, popupText]);
  
  return (
    <div className="overflow-hidden rounded-lg shadow-lg h-[400px] md:h-[500px] w-full transition-all duration-300 hover:shadow-xl border-4 border-white/10 bg-gradient-to-br from-maisvida-green/10 to-maisvida-red/10">
      <div ref={mapRef} className="h-full w-full z-10" />
    </div>
  );
};

export default LocationMap;
