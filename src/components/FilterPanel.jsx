import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Slider } from './ui/slider';
import { Badge } from './Badge';
import { Filter, X, RotateCcw } from 'lucide-react';

const FilterPanel = ({ filters, onFiltersChange, isOpen, onToggle }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const handlePriceRangeChange = (value) => {
    setLocalFilters(prev => ({
      ...prev,
      priceRange: value
    }));
  };

  const handleFeatureToggle = (feature) => {
    setLocalFilters(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const handleAvailabilityToggle = (availability) => {
    setLocalFilters(prev => ({
      ...prev,
      availability: prev.availability.includes(availability)
        ? prev.availability.filter(a => a !== availability)
        : [...prev.availability, availability]
    }));
  };

  const handleDistanceChange = (value) => {
    setLocalFilters(prev => ({
      ...prev,
      maxDistance: value[0]
    }));
  };

  const applyFilters = () => {
    onFiltersChange(localFilters);
  };

  const resetFilters = () => {
    const defaultFilters = {
      priceRange: [0, 20],
      features: [],
      availability: [],
      maxDistance: 10
    };
    setLocalFilters(defaultFilters);
    onFiltersChange(defaultFilters);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (localFilters.features.length > 0) count++;
    if (localFilters.availability.length > 0) count++;
    if (localFilters.priceRange[0] > 0 || localFilters.priceRange[1] < 20) count++;
    if (localFilters.maxDistance < 10) count++;
    return count;
  };

  const availableFeatures = [
    { id: 'Coberto', label: 'Coberto', icon: '🏠' },
    { id: 'Segurança 24h', label: 'Segurança 24h', icon: '🛡️' },
    { id: 'Acessível', label: 'Acessível', icon: '♿' },
    { id: 'Valet', label: 'Valet', icon: '🚗' },
    { id: 'Lavagem', label: 'Lavagem', icon: '🧽' },
    { id: 'Carregamento', label: 'Carregamento elétrico', icon: '⚡' }
  ];

  const availabilityOptions = [
    { id: 'Disponível', label: 'Disponível', color: 'bg-green-100 text-green-800' },
    { id: 'Quase lotado', label: 'Quase lotado', color: 'bg-yellow-100 text-yellow-800' },
    { id: 'Lotado', label: 'Lotado', color: 'bg-red-100 text-red-800' }
  ];

  if (!isOpen) {
    return (
      <div className="fixed top-20 right-4 z-40">
        <Button
          onClick={onToggle}
          className="bg-white text-gray-700 border border-gray-300 shadow-lg hover:bg-gray-50"
          size="sm"
        >
          <Filter className="w-4 h-4 mr-2" />
          Filtros
          {getActiveFiltersCount() > 0 && (
            <Badge className="ml-2 bg-blue-600 text-white px-2 py-1 text-xs">
              {getActiveFiltersCount()}
            </Badge>
          )}
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed top-20 right-4 z-40 w-80">
      <Card className="bg-white shadow-xl border-0">
        <div className="p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-gray-900">Filtros</h3>
              {getActiveFiltersCount() > 0 && (
                <Badge className="bg-blue-100 text-blue-800 px-2 py-1 text-xs">
                  {getActiveFiltersCount()} ativo{getActiveFiltersCount() > 1 ? 's' : ''}
                </Badge>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
              className="p-1 h-8 w-8"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Faixa de preço */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Faixa de preço por hora
            </label>
            <div className="px-2">
              <Slider
                value={localFilters.priceRange}
                onValueChange={handlePriceRangeChange}
                max={20}
                min={0}
                step={1}
                className="mb-2"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>R$ {localFilters.priceRange[0]}</span>
                <span>R$ {localFilters.priceRange[1]}</span>
              </div>
            </div>
          </div>

          {/* Distância máxima */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Distância máxima: {localFilters.maxDistance}km
            </label>
            <div className="px-2">
              <Slider
                value={[localFilters.maxDistance]}
                onValueChange={handleDistanceChange}
                max={10}
                min={0.5}
                step={0.5}
                className="mb-2"
              />
            </div>
          </div>

          {/* Comodidades */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Comodidades
            </label>
            <div className="space-y-3">
              {availableFeatures.map((feature) => (
                <div key={feature.id} className="flex items-center space-x-3">
                  <Checkbox
                    id={feature.id}
                    checked={localFilters.features.includes(feature.id)}
                    onCheckedChange={() => handleFeatureToggle(feature.id)}
                  />
                  <label
                    htmlFor={feature.id}
                    className="text-sm text-gray-700 cursor-pointer flex items-center gap-2"
                  >
                    <span>{feature.icon}</span>
                    {feature.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Disponibilidade */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Disponibilidade
            </label>
            <div className="space-y-3">
              {availabilityOptions.map((option) => (
                <div key={option.id} className="flex items-center space-x-3">
                  <Checkbox
                    id={`availability-${option.id}`}
                    checked={localFilters.availability.includes(option.id)}
                    onCheckedChange={() => handleAvailabilityToggle(option.id)}
                  />
                  <label
                    htmlFor={`availability-${option.id}`}
                    className="text-sm cursor-pointer"
                  >
                    <Badge className={`${option.color} px-2 py-1 text-xs`}>
                      {option.label}
                    </Badge>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Botões de ação */}
          <div className="flex gap-2">
            <Button
              onClick={applyFilters}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              size="sm"
            >
              Aplicar Filtros
            </Button>
            <Button
              onClick={resetFilters}
              variant="outline"
              size="sm"
              className="px-3"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default FilterPanel;

