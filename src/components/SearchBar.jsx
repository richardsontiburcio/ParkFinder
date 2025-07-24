import React, { useState, useEffect, useRef } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Search, Navigation, X } from 'lucide-react';
import SearchSuggestions from './SearchSuggestions';
import GeocodingService from '../services/GeocodingService';

const SearchBar = ({ onSearch, onLocationSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchTimeoutRef = useRef(null);
  const searchContainerRef = useRef(null);

  // Buscar sugestões quando o usuário digita
  useEffect(() => {
    if (searchTerm.length >= 3) {
      // Limpar timeout anterior
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }

      // Definir novo timeout para evitar muitas requisições
      searchTimeoutRef.current = setTimeout(async () => {
        setIsLoading(true);
        try {
          const results = await GeocodingService.searchAddress(searchTerm);
          setSuggestions(results);
          setShowSuggestions(true);
        } catch (error) {
          console.error('Erro ao buscar sugestões:', error);
          setSuggestions([]);
        } finally {
          setIsLoading(false);
        }
      }, 300); // Aguardar 300ms após o usuário parar de digitar
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchTerm]);

  // Fechar sugestões quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      onSearch(searchTerm);
      setShowSuggestions(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSuggestionSelect = (suggestion) => {
    setSearchTerm(suggestion.display_name.split(',')[0]); // Usar apenas a primeira parte do nome
    setShowSuggestions(false);
    
    // Notificar o componente pai sobre a localização selecionada
    if (onLocationSelect) {
      onLocationSelect({
        name: suggestion.display_name,
        lat: suggestion.lat,
        lon: suggestion.lon,
        address: suggestion.address
      });
    }
    
    onSearch(suggestion.display_name);
  };

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const result = await GeocodingService.reverseGeocode(latitude, longitude);
            setSearchTerm('Localização atual');
            
            if (onLocationSelect) {
              onLocationSelect({
                name: result.display_name,
                lat: result.lat,
                lon: result.lon,
                address: result.address
              });
            }
            
            onSearch(`${latitude},${longitude}`);
          } catch (error) {
            console.error('Erro ao obter endereço da localização atual:', error);
            alert('Não foi possível obter o endereço da sua localização');
          } finally {
            setIsLoading(false);
          }
        },
        (error) => {
          setIsLoading(false);
          alert('Não foi possível obter sua localização');
        }
      );
    } else {
      alert('Geolocalização não é suportada neste navegador');
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto" ref={searchContainerRef}>
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-stretch sm:items-center">
        <div className="relative flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Digite seu destino..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input pl-10 pr-10 py-3 text-base border-2 border-gray-200 focus:border-orange-500 focus:ring-orange-500 rounded-lg"
              onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
            />
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
          
          {/* Sugestões */}
          {showSuggestions && suggestions.length > 0 && (
            <SearchSuggestions
              suggestions={suggestions}
              onSelect={handleSuggestionSelect}
              isLoading={isLoading}
            />
          )}
        </div>
        
        <div className="flex gap-2">
          <Button
            onClick={handleSearch}
            disabled={!searchTerm.trim() || isLoading}
            className="search-button flex-1 sm:flex-none px-6 py-3 text-base font-semibold"
          >
            {isLoading ? 'Buscando...' : 'Buscar'}
          </Button>
          
          <Button
            onClick={handleCurrentLocation}
            variant="outline"
            className="px-3 py-3 border-2 border-gray-200 hover:border-orange-500 hover:text-orange-600"
            title="Usar localização atual"
          >
            <Navigation className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;

