import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Card } from './ui/card';
import { MapPin, Navigation } from 'lucide-react';
import GeocodingService from '../services/GeocodingService';
import FilterService from '../services/FilterService';
import parkingImages from '../assets/parking_images';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Configurar ícones customizados para os marcadores
const createCustomIcon = (letter, color = '#FF8C00') => {
  return L.divIcon({
    html: `
      <div style="
        background-color: ${color};
        color: white;
        border-radius: 50%;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 14px;
        border: 2px solid white;
        box-shadow: 0 4px 12px rgba(255, 140, 0, 0.3);
      ">
        ${letter}
      </div>
    `,
    className: 'custom-div-icon',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16]
  });
};

const createDestinationIcon = () => {
  return L.divIcon({
    html: `
      <div style="
        background-color: #ef4444;
        color: white;
        border-radius: 50%;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 12px;
        border: 2px solid white;
        box-shadow: 0 2px 8px rgba(239, 68, 68, 0.4);
      ">
        📍
      </div>
    `,
    className: 'custom-div-icon',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12]
  });
};

const RealMapView = ({ searchLocation, onParkingSelect, filters }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [hoveredParking, setHoveredParking] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [allParkingLots] = useState([
    {
      id: 1,
      name: 'Shopping Recife',
      lat: -8.0584,
      lon: -34.8883,
      price: 'R$ 8,00/hora',
      availability: 'Disponível',
      features: ['Coberto', 'Segurança 24h', 'Acessível'],
      distance: null,
      image: parkingImages.exterior[0]
    },
    {
      id: 2,
      name: 'Estacionamento Boa Viagem',
      lat: -8.0600,
      lon: -34.8900,
      price: 'R$ 12,00/hora',
      availability: 'Quase lotado',
      features: ['Descoberto', 'Segurança', 'Lavagem'],
      distance: null,
      image: parkingImages.exterior[1]
    },
    {
      id: 3,
      name: 'Parking Marco Zero',
      lat: -8.0550,
      lon: -34.8850,
      price: 'R$ 15,00/hora',
      availability: 'Disponível',
      features: ['Coberto', 'Valet', 'Acessível'],
      distance: null,
      image: parkingImages.exterior[2]
    },
    {
      id: 4,
      name: 'Estacionamento RioMar',
      lat: -8.0570,
      lon: -34.8870,
      price: 'R$ 10,00/hora',
      availability: 'Disponível',
      features: ['Coberto', 'Segurança 24h'],
      distance: null,
      image: parkingImages.exterior[3]
    },
    {
      id: 5,
      name: 'Garagem Antigo',
      lat: -8.0590,
      lon: -34.8890,
      price: 'R$ 6,00/hora',
      availability: 'Disponível',
      features: ['Descoberto', 'Econômico'],
      distance: null,
      image: parkingImages.exterior[0] // Reutilizar primeira imagem
    }
  ]);
  
  const [filteredParkingLots, setFilteredParkingLots] = useState(allParkingLots);

  // Coordenadas da Conde da Boa Vista, Recife
  const defaultCenter = [-8.0584, -34.8883];
  const defaultZoom = 15;

  // Atualizar distâncias quando a localização de busca mudar
  useEffect(() => {
    let updatedLots = [...allParkingLots];
    
    if (searchLocation && searchLocation.lat && searchLocation.lon) {
      setSelectedLocation(searchLocation);
      
      // Calcular distâncias para todos os estacionamentos
      updatedLots = updatedLots.map(parking => ({
        ...parking,
        distance: GeocodingService.calculateDistance(
          searchLocation.lat,
          searchLocation.lon,
          parking.lat,
          parking.lon
        )
      }));
    }

    // Aplicar filtros
    const filtered = FilterService.applyFilters(updatedLots, filters);
    const sorted = FilterService.sortParkingLots(filtered, 'distance');
    setFilteredParkingLots(sorted);
  }, [searchLocation, filters, allParkingLots]);

  const handleParkingClick = (parking) => {
    onParkingSelect(parking);
  };

  const handleParkingHover = (parking, event) => {
    setHoveredParking(parking);
    setMousePosition({ x: event.originalEvent.clientX, y: event.originalEvent.clientY });
  };

  const handleParkingLeave = () => {
    setHoveredParking(null);
  };

  const getAvailabilityColor = (availability) => {
    switch (availability) {
      case 'Disponível':
        return '#10b981';
      case 'Quase lotado':
        return '#f59e0b';
      case 'Lotado':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  const stats = FilterService.getFilteredStats(allParkingLots, filteredParkingLots);

  return (
    <div className="relative w-full">
      {/* Container do mapa responsivo */}
      <div className="parkfinder-map relative w-full h-[60vh] sm:h-[70vh] lg:h-[75vh] rounded-lg overflow-hidden shadow-lg">
        <MapContainer
          center={defaultCenter}
          zoom={defaultZoom}
          style={{ height: '100%', width: '100%' }}
          className="z-0"
        >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Marcador da localização selecionada */}
        {selectedLocation && (
          <Marker
            position={[selectedLocation.lat, selectedLocation.lon]}
            icon={createDestinationIcon()}
          >
            <Popup>
              <div className="text-center">
                <strong>{selectedLocation.name?.split(',')[0] || 'Destino'}</strong>
                <br />
                <small>Sua localização selecionada</small>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Marcadores de estacionamento filtrados */}
        {filteredParkingLots.map((parking) => (
          <Marker
            key={parking.id}
            position={[parking.lat, parking.lon]}
            icon={createCustomIcon('E', getAvailabilityColor(parking.availability))}
            eventHandlers={{
              click: () => handleParkingClick(parking),
              mouseover: (e) => handleParkingHover(parking, e),
              mouseout: handleParkingLeave
            }}
          >
            <Popup>
              <div className="min-w-max">
                <div className="font-medium text-gray-900 mb-1">{parking.name}</div>
                <div className="text-sm text-gray-600 mb-1">{parking.price}</div>
                <div className={`text-xs px-2 py-1 rounded-full mb-2 ${
                  parking.availability === 'Disponível' 
                    ? 'bg-green-100 text-green-800' 
                    : parking.availability === 'Quase lotado'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {parking.availability}
                </div>
                {parking.features && parking.features.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {parking.features.slice(0, 3).map((feature, idx) => (
                      <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-1 py-0.5 rounded">
                        {feature}
                      </span>
                    ))}
                  </div>
                )}
                {parking.distance && (
                  <div className="text-xs text-blue-600 font-medium mt-1">
                    Distância: {GeocodingService.formatDistance(parking.distance)}
                  </div>
                )}
                <button
                  onClick={() => handleParkingClick(parking)}
                  className="mt-2 w-full bg-orange-600 text-white text-xs py-1 px-2 rounded hover:bg-orange-700"
                >
                  Ver Detalhes
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Legenda */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3 z-10">
        <div className="text-xs font-medium text-gray-900 mb-2">Legenda</div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-xs text-gray-700">Disponível</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-xs text-gray-700">Quase lotado</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-xs text-gray-700">Lotado</span>
          </div>
        </div>
        
        {/* Estatísticas dos filtros */}
        {FilterService.hasActiveFilters(filters) && (
          <div className="mt-3 pt-2 border-t border-gray-200">
            <div className="text-xs text-gray-600">
              Mostrando {stats.total} de {allParkingLots.length} estacionamentos
            </div>
          </div>
        )}
      </div>

      {/* Mensagem quando nenhum estacionamento atende aos filtros */}
      {filteredParkingLots.length === 0 && FilterService.hasActiveFilters(filters) && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <Card className="bg-white/95 backdrop-blur-sm p-6 text-center">
            <div className="text-gray-600 mb-2">
              Nenhum estacionamento encontrado
            </div>
            <div className="text-sm text-gray-500">
              Tente ajustar os filtros para ver mais resultados
            </div>
          </Card>
        </div>
      )}
      
      {/* Mini imagem hover - responsivo */}
      {hoveredParking && (
        <div 
          className="hover-image-card fixed z-50 pointer-events-none hidden sm:block"
          style={{
            left: mousePosition.x + 15,
            top: mousePosition.y - 80,
            transform: 'translateY(-50%)'
          }}
        >
          <div className="bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden max-w-xs">
            <img 
              src={hoveredParking.image}
              alt={hoveredParking.name}
              className="w-full h-24 sm:h-32 object-cover"
            />
            <div className="p-2">
              <div className="font-medium text-sm text-gray-900 truncate">{hoveredParking.name}</div>
              <div className="text-xs text-gray-600">{hoveredParking.price}</div>
              <div className={`text-xs px-2 py-1 rounded-full mt-1 inline-block ${
                hoveredParking.availability === 'Disponível' 
                  ? 'bg-green-100 text-green-800' 
                  : hoveredParking.availability === 'Quase lotado'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {hoveredParking.availability}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RealMapView;

