import React from 'react';
import { Card } from './ui/card';
import { MapPin, Clock } from 'lucide-react';

const SearchSuggestions = ({ suggestions, onSelect, isLoading }) => {
  if (isLoading) {
    return (
      <Card className="absolute top-full left-0 right-0 mt-1 p-4 z-50 bg-white shadow-lg">
        <div className="flex items-center gap-2 text-gray-500">
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent"></div>
          <span className="text-sm">Buscando endereços...</span>
        </div>
      </Card>
    );
  }

  if (!suggestions || suggestions.length === 0) {
    return null;
  }

  return (
    <Card className="absolute top-full left-0 right-0 mt-1 p-2 z-50 bg-white shadow-lg max-h-80 overflow-y-auto">
      {suggestions.map((suggestion, index) => (
        <div
          key={suggestion.place_id || index}
          className="flex items-start gap-3 p-3 hover:bg-gray-50 cursor-pointer rounded-lg transition-colors"
          onClick={() => onSelect(suggestion)}
        >
          <MapPin className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {suggestion.display_name.split(',')[0]}
            </p>
            <p className="text-xs text-gray-600 truncate">
              {suggestion.display_name}
            </p>
            {suggestion.type && (
              <span className="inline-block mt-1 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                {suggestion.type}
              </span>
            )}
          </div>
        </div>
      ))}
    </Card>
  );
};

export default SearchSuggestions;

