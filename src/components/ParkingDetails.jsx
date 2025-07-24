import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './Badge';
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  DollarSign, 
  Car, 
  Shield, 
  Accessibility,
  Camera,
  Zap,
  CreditCard
} from 'lucide-react';
import parkingImages from '../assets/parking_images';

const ParkingDetails = ({ parking, onBack }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    setCurrentImageIndex(0); // Resetar o índice da imagem ao mudar de estacionamento
  }, [parking]);

  if (!parking) return null;

  const images = parkingImages.interior; // Usar imagens internas para detalhes

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const getAmenityInfo = (amenity) => {
    const amenities = {
      covered: { icon: Car, label: 'Cobertura', description: 'Estacionamento coberto' },
      security: { icon: Shield, label: 'Segurança', description: 'Câmeras de vigilância' },
      accessibility: { icon: Accessibility, label: 'Acessibilidade', description: 'Acesso para PCD' },
      camera: { icon: Camera, label: 'Monitoramento', description: 'Circuito fechado' },
      electric: { icon: Zap, label: 'Carregamento', description: 'Carregador elétrico' },
      payment: { icon: CreditCard, label: 'Pagamento', description: 'Cartão e PIX' }
    };
    return amenities[amenity] || { icon: Car, label: amenity, description: '' };
  };

  const allAmenities = ['covered', 'security', 'accessibility', 'camera', 'electric', 'payment'];
  const availableAmenities = parking.amenities || [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm p-4 flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="text-lg font-semibold">Detalhes do Estacionamento</h1>
      </div>

      <div className="p-4 space-y-4">
        {/* Imagem do estacionamento - Carrossel */}
        <Card>
          <div className="relative h-48 rounded-t-lg overflow-hidden">
            <img 
              src={images[currentImageIndex]}
              alt="Imagem do Estacionamento"
              className="w-full h-full object-cover"
            />
            {images.length > 1 && (
              <>
                <button 
                  onClick={prevImage} 
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-r-lg focus:outline-none"
                >
                  &#10094;
                </button>
                <button 
                  onClick={nextImage} 
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-l-lg focus:outline-none"
                >
                  &#10095;
                </button>
              </>
            )}
            <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-2">
              {images.map((_, idx) => (
                <span
                  key={idx}
                  className={`block w-2 h-2 rounded-full ${idx === currentImageIndex ? 'bg-white' : 'bg-gray-400'}`}
                ></span>
              ))}
            </div>
          </div>
        </Card>

        {/* Informações básicas */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-xl">{parking.name}</CardTitle>
                <p className="text-gray-600 flex items-center gap-1 mt-1">
                  <MapPin className="w-4 h-4" />
                  {parking.address}
                </p>
              </div>
              <Badge variant={parking.available ? "default" : "destructive"}>
                {parking.available ? 'Disponível' : 'Lotado'}
              </Badge>
            </div>
          </CardHeader>
        </Card>

        {/* Preço */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold">Preço</h3>
            </div>
            <p className="text-2xl font-bold text-blue-600">{parking.price}</p>
            <p className="text-sm text-gray-600">Primeira hora com desconto de 20%</p>
          </CardContent>
        </Card>

        {/* Horário de funcionamento */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold">Horário de Funcionamento</h3>
            </div>
            <p className="text-lg">{parking.hours}</p>
            <p className="text-sm text-gray-600">Todos os dias da semana</p>
          </CardContent>
        </Card>

        {/* Comodidades */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3">Comodidades</h3>
            <div className="grid grid-cols-2 gap-3">
              {allAmenities.map((amenity) => {
                const amenityInfo = getAmenityInfo(amenity);
                const isAvailable = availableAmenities.includes(amenity);
                const IconComponent = amenityInfo.icon;
                
                return (
                  <div 
                    key={amenity}
                    className={`flex items-center gap-2 p-2 rounded-lg ${
                      isAvailable 
                        ? 'bg-blue-50 text-blue-700' 
                        : 'bg-gray-50 text-gray-400'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span className="text-sm font-medium">{amenityInfo.label}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Informações adicionais */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3">Informações Adicionais</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>• Capacidade: 150 vagas</p>
              <p>• Altura máxima: 2,10m</p>
              <p>• Vagas para PCD: 8 vagas</p>
              <p>• Vagas para idosos: 12 vagas</p>
              <p>• Tolerância: 15 minutos</p>
            </div>
          </CardContent>
        </Card>

        {/* Botão de reserva */}
        <div className="sticky bottom-4">
          <Button 
            className="w-full h-12 text-lg font-semibold"
            disabled={!parking.available}
            onClick={() => alert('Funcionalidade de reserva será implementada!')}
          >
            {parking.available ? 'Reservar Vaga' : 'Estacionamento Lotado'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ParkingDetails;

