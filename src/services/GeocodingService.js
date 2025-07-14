// Serviço de Geocodificação usando Nominatim API
class GeocodingService {
  static BASE_URL = 'https://nominatim.openstreetmap.org';

  // Buscar endereços por texto livre
  static async searchAddress(query) {
    try {
      const response = await fetch(
        `${this.BASE_URL}/search?q=${encodeURIComponent(query)}&format=json&limit=5&addressdetails=1&accept-language=pt-BR`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      return data.map(item => ({
        display_name: item.display_name,
        lat: parseFloat(item.lat),
        lon: parseFloat(item.lon),
        place_id: item.place_id,
        type: item.type,
        importance: item.importance,
        address: item.address || {}
      }));
    } catch (error) {
      console.error('Erro na busca de endereço:', error);
      throw error;
    }
  }

  // Busca reversa - coordenadas para endereço
  static async reverseGeocode(lat, lon) {
    try {
      const response = await fetch(
        `${this.BASE_URL}/reverse?lat=${lat}&lon=${lon}&format=json&addressdetails=1&accept-language=pt-BR`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      return {
        display_name: data.display_name,
        lat: parseFloat(data.lat),
        lon: parseFloat(data.lon),
        address: data.address || {}
      };
    } catch (error) {
      console.error('Erro na geocodificação reversa:', error);
      throw error;
    }
  }

  // Calcular distância entre dois pontos (fórmula de Haversine)
  static calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Raio da Terra em km
    const dLat = this.toRad(lat2 - lat1);
    const dLon = this.toRad(lon2 - lon1);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    return Math.round(distance * 100) / 100; // Arredondar para 2 casas decimais
  }

  static toRad(value) {
    return value * Math.PI / 180;
  }

  // Formatar distância para exibição
  static formatDistance(distanceKm) {
    if (distanceKm < 1) {
      return `${Math.round(distanceKm * 1000)}m`;
    }
    return `${distanceKm}km`;
  }
}

export default GeocodingService;

