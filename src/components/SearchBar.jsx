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
    <div className="relative p-4 bg-white shadow-sm" ref={searchContainerRef}>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Digite seu destino..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
            className="pl-10 pr-10"
          />
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          
          {showSuggestions && (
            <SearchSuggestions
              suggestions={suggestions}
              onSelect={handleSuggestionSelect}
              isLoading={isLoading}
            />
          )}
        </div>
        
        <Button onClick={handleSearch} size="sm" disabled={isLoading}>
          {isLoading ? (
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
          ) : (
            'Buscar'
          )}
        </Button>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleCurrentLocation}
          className="px-3"
          disabled={isLoading}
        >
          <Navigation className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;

