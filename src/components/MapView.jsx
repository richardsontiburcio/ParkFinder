import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { MapPin, Navigation, Zap } from 'lucide-react';
import GeocodingService from '../services/GeocodingService';

const MapView = ({ searchLocation, onParkingSelect }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [parkingLots, setParkingLots] = useState([
    {
      id: 1,
      name: 'Shopping Center Norte',
      lat: -23.5505,
      lon: -46.6333,
      price: 'R$ 8,00/hora',
      availability: 'Disponível',
      features: ['Coberto', 'Segurança 24h', 'Acessível'],
      distance: null
    },
    {
      id: 2,
      name: 'Estacionamento Vila Madalena',
      lat: -23.5489,
      lon: -46.6388,
      price: 'R$ 12,00/hora',
      availability: 'Quase lotado',
      features: ['Descoberto', 'Segurança', 'Lavagem'],
      distance: null
    },
    {
      id: 3,
      name: 'Parking São Paulo Center',
      lat: -23.5475,
      lon: -46.6361,
      price: 'R$ 15,00/hora',
      availability: 'Disponível',
      features: ['Coberto', 'Valet', 'Acessível'],
      distance: null
    },
    {
      id: 4,
      name: 'Estacionamento Paulista',
      lat: -23.5558,
      lon: -46.6396,
      price: 'R$ 10,00/hora',
      availability: 'Disponível',
      features: ['Coberto', 'Segurança 24h'],
      distance: null
    },
    {
      id: 5,
      name: 'Garagem Liberdade',
      lat: -23.5587,
      lon: -46.6347,
      price: 'R$ 6,00/hora',
      availability: 'Disponível',
      features: ['Descoberto', 'Econômico'],
      distance: null
    }
  ]);

  // Atualizar distâncias quando a localização de busca mudar
  useEffect(() => {
    if (searchLocation && searchLocation.lat && searchLocation.lon) {
      setSelectedLocation(searchLocation);
      
      // Calcular distâncias para todos os estacionamentos
      const updatedParkingLots = parkingLots.map(parking => ({
        ...parking,
        distance: GeocodingService.calculateDistance(
          searchLocation.lat,
          searchLocation.lon,
          parking.lat,
          parking.lon
        )
      }));

      // Ordenar por distância
      updatedParkingLots.sort((a, b) => a.distance - b.distance);
      setParkingLots(updatedParkingLots);
    }
  }, [searchLocation]);

  const handleParkingClick = (parking) => {
    onParkingSelect(parking);
  };

  const getAvailabilityColor = (availability) => {
    switch (availability) {
      case 'Disponível':
        return 'bg-green-500';
      case 'Quase lotado':
        return 'bg-yellow-500';
      case 'Lotado':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getMarkerPosition = (parking) => {
    // Simular posições no mapa baseadas nas coordenadas
    const baseX = 50; // posição base X em %
    const baseY = 50; // posição base Y em %
    
    // Adicionar variação baseada no ID para espalhar os marcadores
    const offsetX = (parking.id - 3) * 15;
    const offsetY = (parking.id % 2 === 0 ? 1 : -1) * (parking.id * 8);
    
    return {
      left: `${Math.max(10, Math.min(90, baseX + offsetX))}%`,
      top: `${Math.max(10, Math.min(90, baseY + offsetY))}%`
    };
  };

  return (
    <div className="relative h-96 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg overflow-hidden">
      {/* Simulação do mapa */}
      <div className="absolute inset-0 bg-gray-200">
        {/* Grid simulando ruas */}
        <div className="absolute inset-0 opacity-20">
          <div className="grid grid-cols-8 grid-rows-6 h-full w-full">
            {Array.from({ length: 48 }).map((_, i) => (
              <div key={i} className="border border-gray-400"></div>
            ))}
          </div>
        </div>

        {/* Localização selecionada */}
        {selectedLocation && (
          <div 
            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
            style={{ left: '50%', top: '50%' }}
          >
            <div className="relative">
              <div className="w-6 h-6 bg-red-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                <Navigation className="w-3 h-3 text-white" />
              </div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                {selectedLocation.name?.split(',')[0] || 'Destino'}
              </div>
            </div>
          </div>
        )}

        {/* Marcadores de estacionamento */}
        {parkingLots.map((parking) => (
          <div
            key={parking.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 group"
            style={getMarkerPosition(parking)}
            onClick={() => handleParkingClick(parking)}
          >
            <div className="relative">
              <div className="w-8 h-8 bg-blue-600 rounded-full border-2 border-white shadow-lg flex items-center justify-center hover:bg-blue-700 transition-colors group-hover:scale-110 transform">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              
              {/* Indicador de disponibilidade */}
              <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${getAvailabilityColor(parking.availability)} border border-white`}></div>
              
              {/* Tooltip com informações básicas */}
              <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-2 min-w-max opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="text-xs font-medium text-gray-900">{parking.name}</div>
                <div className="text-xs text-gray-600">{parking.price}</div>
                {parking.distance && (
                  <div className="text-xs text-blue-600 font-medium">
                    {GeocodingService.formatDistance(parking.distance)}
                  </div>
                )}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-white"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Legenda */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3">
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
      </div>

      {/* Lista de estacionamentos próximos (quando há busca) */}
      {selectedLocation && parkingLots.some(p => p.distance !== null) && (
        <div className="absolute top-4 right-4 w-80 max-h-80 overflow-y-auto">
          <Card className="bg-white/95 backdrop-blur-sm">
            <div className="p-3">
              <h3 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-600" />
                Estacionamentos próximos
              </h3>
              <div className="space-y-2">
                {parkingLots.slice(0, 3).map((parking) => (
                  <div
                    key={parking.id}
                    className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                    onClick={() => handleParkingClick(parking)}
                  >
                    <div className="flex-1">
                      <div className="font-medium text-sm text-gray-900">{parking.name}</div>
                      <div className="text-xs text-gray-600">{parking.price}</div>
                    </div>
                    <div className="text-right">
                      {parking.distance && (
                        <div className="text-sm font-medium text-blue-600">
                          {GeocodingService.formatDistance(parking.distance)}
                        </div>
                      )}
                      <div className={`text-xs px-2 py-1 rounded-full ${
                        parking.availability === 'Disponível' 
                          ? 'bg-green-100 text-green-800' 
                          : parking.availability === 'Quase lotado'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {parking.availability}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default MapView;

