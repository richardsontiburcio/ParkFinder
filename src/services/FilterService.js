// Serviço para filtrar estacionamentos
class FilterService {
  // Aplicar todos os filtros aos estacionamentos
  static applyFilters(parkingLots, filters) {
    return parkingLots.filter(parking => {
      // Filtro de preço
      if (!this.matchesPriceRange(parking, filters.priceRange)) {
        return false;
      }

      // Filtro de comodidades
      if (!this.matchesFeatures(parking, filters.features)) {
        return false;
      }

      // Filtro de disponibilidade
      if (!this.matchesAvailability(parking, filters.availability)) {
        return false;
      }

      // Filtro de distância
      if (!this.matchesDistance(parking, filters.maxDistance)) {
        return false;
      }

      return true;
    });
  }

  // Verificar se o estacionamento está na faixa de preço
  static matchesPriceRange(parking, priceRange) {
    if (!priceRange || priceRange.length !== 2) return true;
    
    const price = this.extractPriceFromString(parking.price);
    return price >= priceRange[0] && price <= priceRange[1];
  }

  // Verificar se o estacionamento tem as comodidades selecionadas
  static matchesFeatures(parking, selectedFeatures) {
    if (!selectedFeatures || selectedFeatures.length === 0) return true;
    
    return selectedFeatures.every(feature => 
      parking.features && parking.features.includes(feature)
    );
  }

  // Verificar se o estacionamento tem a disponibilidade selecionada
  static matchesAvailability(parking, selectedAvailability) {
    if (!selectedAvailability || selectedAvailability.length === 0) return true;
    
    return selectedAvailability.includes(parking.availability);
  }

  // Verificar se o estacionamento está dentro da distância máxima
  static matchesDistance(parking, maxDistance) {
    if (!maxDistance || !parking.distance) return true;
    
    return parking.distance <= maxDistance;
  }

  // Extrair valor numérico do preço (ex: "R$ 10,00/hora" -> 10)
  static extractPriceFromString(priceString) {
    if (!priceString) return 0;
    
    const match = priceString.match(/(\d+(?:,\d+)?)/);
    if (match) {
      return parseFloat(match[1].replace(',', '.'));
    }
    return 0;
  }

  // Ordenar estacionamentos por critério
  static sortParkingLots(parkingLots, sortBy = 'distance') {
    const sorted = [...parkingLots];
    
    switch (sortBy) {
      case 'distance':
        return sorted.sort((a, b) => {
          if (!a.distance && !b.distance) return 0;
          if (!a.distance) return 1;
          if (!b.distance) return -1;
          return a.distance - b.distance;
        });
        
      case 'price':
        return sorted.sort((a, b) => {
          const priceA = this.extractPriceFromString(a.price);
          const priceB = this.extractPriceFromString(b.price);
          return priceA - priceB;
        });
        
      case 'availability':
        return sorted.sort((a, b) => {
          const availabilityOrder = { 'Disponível': 0, 'Quase lotado': 1, 'Lotado': 2 };
          return availabilityOrder[a.availability] - availabilityOrder[b.availability];
        });
        
      default:
        return sorted;
    }
  }

  // Obter estatísticas dos estacionamentos filtrados
  static getFilteredStats(originalLots, filteredLots) {
    const availableCount = filteredLots.filter(p => p.availability === 'Disponível').length;
    const prices = filteredLots.map(p => this.extractPriceFromString(p.price)).filter(p => p > 0);
    const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
    const maxPrice = prices.length > 0 ? Math.max(...prices) : 0;
    
    return {
      total: filteredLots.length,
      available: availableCount,
      priceRange: prices.length > 0 ? `R$ ${minPrice}-${maxPrice}` : 'N/A',
      filtered: originalLots.length - filteredLots.length
    };
  }

  // Obter filtros padrão
  static getDefaultFilters() {
    return {
      priceRange: [0, 20],
      features: [],
      availability: [],
      maxDistance: 10
    };
  }

  // Verificar se há filtros ativos
  static hasActiveFilters(filters) {
    const defaultFilters = this.getDefaultFilters();
    
    return (
      filters.priceRange[0] !== defaultFilters.priceRange[0] ||
      filters.priceRange[1] !== defaultFilters.priceRange[1] ||
      filters.features.length > 0 ||
      filters.availability.length > 0 ||
      filters.maxDistance !== defaultFilters.maxDistance
    );
  }
}

export default FilterService;

