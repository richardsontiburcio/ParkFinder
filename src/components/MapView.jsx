import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { MapPin, Navigation, Clock, Shield, Car, Accessibility } from 'lucide-react';
import '../App.css';

const MapView = ({ onParkingSelect }) => {
  const [selectedParking, setSelectedParking] = useState(null);

  // Dados simulados de estacionamentos
  const parkingLots = [
    {
      id: 1,
      name: "Estacionamento Centro",
      address: "Rua das Flores, 123 - Centro",
      price: "R$ 8,00/hora",
      hours: "24 horas",
      available: true,
      amenities: ['covered', 'security', 'accessibility'],
      position: { top: '20%', left: '30%' },
      image: "/api/placeholder/400/200"
    },
    {
      id: 2,
      name: "Shopping Plaza",
      address: "Av. Principal, 456 - Centro",
      price: "R$ 12,00/hora",
      hours: "8:00 - 22:00",
      available: true,
      amenities: ['covered', 'security'],
      position: { top: '40%', left: '60%' },
      image: "/api/placeholder/400/200"
    },
    {
      id: 3,
      name: "Estacionamento Norte",
      address: "Rua do Norte, 789 - Zona Norte",
      price: "R$ 6,00/hora",
      hours: "6:00 - 20:00",
      available: false,
      amenities: ['security'],
      position: { top: '60%', left: '25%' },
      image: "/api/placeholder/400/200"
    },
    {
      id: 4,
      name: "Garagem Sul",
      address: "Av. Sul, 321 - Zona Sul",
      price: "R$ 10,00/hora",
      hours: "24 horas",
      available: true,
      amenities: ['covered', 'accessibility'],
      position: { top: '70%', left: '70%' },
      image: "/api/placeholder/400/200"
    },
    {
      id: 5,
      name: "Estacionamento Oeste",
      address: "Rua Oeste, 654 - Zona Oeste",
      price: "R$ 7,00/hora",
      hours: "7:00 - 19:00",
      available: true,
      amenities: ['security', 'accessibility'],
      position: { top: '35%', left: '15%' },
      image: "/api/placeholder/400/200"
    }
  ];

  const handleMarkerClick = (parking) => {
    setSelectedParking(parking);
    onParkingSelect(parking);
  };

  const getAmenityIcon = (amenity) => {
    switch (amenity) {
      case 'covered':
        return <Car className="w-4 h-4" />;
      case 'security':
        return <Shield className="w-4 h-4" />;
      case 'accessibility':
        return <Accessibility className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="relative w-full h-full parkfinder-map">
      {/* Simulação de ruas no mapa */}
      <div className="absolute inset-0">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0,30 Q50,25 100,30" stroke="#cbd5e1" strokeWidth="0.5" fill="none" />
          <path d="M0,50 L100,50" stroke="#cbd5e1" strokeWidth="0.8" fill="none" />
          <path d="M0,70 Q50,75 100,70" stroke="#cbd5e1" strokeWidth="0.5" fill="none" />
          <path d="M20,0 L20,100" stroke="#cbd5e1" strokeWidth="0.5" fill="none" />
          <path d="M40,0 L40,100" stroke="#cbd5e1" strokeWidth="0.6" fill="none" />
          <path d="M60,0 L60,100" stroke="#cbd5e1" strokeWidth="0.6" fill="none" />
          <path d="M80,0 L80,100" stroke="#cbd5e1" strokeWidth="0.5" fill="none" />
        </svg>
      </div>

      {/* Marcadores de estacionamento */}
      {parkingLots.map((parking) => (
        <div
          key={parking.id}
          className="absolute parking-marker"
          style={{
            top: parking.position.top,
            left: parking.position.left,
            transform: 'translate(-50%, -50%)'
          }}
          onClick={() => handleMarkerClick(parking)}
        >
          P
        </div>
      ))}

      {/* Card de informações do estacionamento selecionado */}
      {selectedParking && (
        <Card className="absolute bottom-4 left-4 right-4 p-4 bg-white shadow-lg">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-semibold text-lg">{selectedParking.name}</h3>
              <p className="text-sm text-gray-600">{selectedParking.address}</p>
            </div>
            <span className={selectedParking.available ? 'status-available' : 'status-unavailable'}>
              {selectedParking.available ? 'Disponível' : 'Lotado'}
            </span>
          </div>
          
          <div className="flex items-center gap-4 mb-3">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium">{selectedParking.price}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-blue-600" />
              <span className="text-sm">{selectedParking.hours}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-3">
            {selectedParking.amenities.map((amenity, index) => (
              <div key={index} className="text-blue-600">
                {getAmenityIcon(amenity)}
              </div>
            ))}
          </div>

          <Button 
            className="w-full" 
            disabled={!selectedParking.available}
            onClick={() => alert('Funcionalidade de reserva será implementada!')}
          >
            {selectedParking.available ? 'Reservar Vaga' : 'Indisponível'}
          </Button>
        </Card>
      )}
    </div>
  );
};

export default MapView;

