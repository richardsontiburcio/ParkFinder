import { useState } from 'react';
import SearchBar from './components/SearchBar';
import MapView from './components/MapView';
import ParkingDetails from './components/ParkingDetails';
import { Home, User } from 'lucide-react';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('map');
  const [selectedParking, setSelectedParking] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (searchTerm) => {
    console.log('Buscando por:', searchTerm);
    // Aqui seria implementada a lógica de busca real
    alert(`Buscando estacionamentos próximos a: ${searchTerm}`);
  };

  const handleParkingSelect = (parking) => {
    setSelectedParking(parking);
    setCurrentView('details');
  };

  const handleBackToMap = () => {
    setCurrentView('map');
    setSelectedParking(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentView === 'map' && (
        <>
          {/* Header */}
          <div className="bg-white shadow-sm">
            <div className="p-4 text-center">
              <h1 className="text-2xl font-bold text-blue-600">ParkFinder</h1>
              <p className="text-sm text-gray-600">Encontre estacionamentos próximos</p>
            </div>
            <SearchBar onSearch={handleSearch} />
          </div>

          {/* Mapa */}
          <div className="h-[calc(100vh-200px)]">
            <MapView onParkingSelect={handleParkingSelect} />
          </div>

          {/* Navegação inferior */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
            <div className="flex justify-around">
              <button className="flex flex-col items-center gap-1 text-blue-600">
                <Home className="w-5 h-5" />
                <span className="text-xs">Início</span>
              </button>
              <button className="flex flex-col items-center gap-1 text-gray-400">
                <User className="w-5 h-5" />
                <span className="text-xs">Perfil</span>
              </button>
            </div>
          </div>
        </>
      )}

      {currentView === 'details' && (
        <ParkingDetails 
          parking={selectedParking} 
          onBack={handleBackToMap}
        />
      )}
    </div>
  );
}

export default App;
