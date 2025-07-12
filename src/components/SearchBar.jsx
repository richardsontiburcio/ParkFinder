import React, { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Search, Navigation } from 'lucide-react';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    if (searchTerm.trim()) {
      onSearch(searchTerm);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          onSearch(`${latitude},${longitude}`);
          setSearchTerm('Localização atual');
        },
        (error) => {
          alert('Não foi possível obter sua localização');
        }
      );
    } else {
      alert('Geolocalização não é suportada neste navegador');
    }
  };

  return (
    <div className="flex gap-2 p-4 bg-white shadow-sm">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          type="text"
          placeholder="Digite seu destino..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
          className="pl-10 pr-4"
        />
      </div>
      <Button onClick={handleSearch} size="sm">
        Buscar
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={handleCurrentLocation}
        className="px-3"
      >
        <Navigation className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default SearchBar;

