
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
  popupText = "Rua Padre Raul Vieira, 854 - Centro, Russas-CE" 
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!mapRef.current) return;
    
    // Initialize map
    const map = L.map(mapRef.current).setView(position, zoom);
    
    // Add dark map tiles
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
    }).addTo(map);
    
    // Create custom icon for marker
    const customIcon = L.divIcon({
      className: 'custom-map-marker',
      html: `
        <div class="flex items-center justify-center w-8 h-8 rounded-full bg-maisvida-green text-white shadow-lg">
          <div class="w-6 h-6 rounded-full bg-maisvida-green border-2 border-white flex items-center justify-center relative">
            <span class="absolute inset-0 animate-ping bg-maisvida-green/50 rounded-full"></span>
            <span class="text-xs text-white font-bold">+V</span>
          </div>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32]
    });
    
    // Add marker with custom icon
    const marker = L.marker(position, { icon: customIcon }).addTo(map);
    
    // Add popup with custom styling
    marker.bindPopup(`
      <div class="p-2 text-center">
        <strong class="text-maisvida-green block text-lg">+ VIDA</strong>
        <span class="block text-sm text-gray-400">Studio de Musculação</span>
        <p class="text-sm mt-2 text-white">${popupText}</p>
        <a href="https://maps.google.com/?q=${position[0]},${position[1]}" target="_blank" class="mt-2 inline-block px-3 py-1 bg-maisvida-green text-white text-xs rounded-full">Como chegar</a>
      </div>
    `).openPopup();
    
    // Fix rendering issues
    setTimeout(() => {
      map.invalidateSize();
    }, 100);
    
    // Add custom styles to map
    const customStyles = document.createElement('style');
    customStyles.textContent = `
      .custom-map-marker {
        background: transparent;
        border: none;
      }
      .leaflet-popup-content-wrapper, .leaflet-popup-tip {
        background-color: #111;
        color: white;
        border: 1px solid rgba(79, 209, 79, 0.2);
      }
      .leaflet-popup-content {
        color: white;
      }
      .leaflet-container {
        background: #111;
      }
    `;
    document.head.appendChild(customStyles);
    
    // Cleanup on unmount
    return () => {
      map.remove();
      document.head.removeChild(customStyles);
    };
  }, [position, zoom, popupText]);
  
  return (
    <div className="overflow-hidden rounded-2xl shadow-2xl h-[400px] md:h-[500px] w-full bg-gradient-to-br from-black via-maisvida-dark to-black border border-maisvida-green/10">
      <div ref={mapRef} className="h-full w-full z-10" />
    </div>
  );
};

export default LocationMap;
