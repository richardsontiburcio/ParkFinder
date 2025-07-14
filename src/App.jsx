import { useState } from 'react'
import './App.css'
import SearchBar from './components/SearchBar'
import MapView from './components/MapView'
import ParkingDetails from './components/ParkingDetails'

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [selectedParking, setSelectedParking] = useState(null)

  const handleSearch = (term) => {
    setSearchTerm(term)
    console.log('Buscando por:', term)
  }

  const handleLocationSelect = (location) => {
    setSelectedLocation(location)
    console.log('Localização selecionada:', location)
  }

  const handleParkingSelect = (parking) => {
    setSelectedParking(parking)
  }

  const handleBackToMap = () => {
    setSelectedParking(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-blue-600">ParkFinder</h1>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#" className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                  Início
                </a>
                <a href="#" className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                  Perfil
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {!selectedParking ? (
          <div className="space-y-6">
            <SearchBar 
              onSearch={handleSearch} 
              onLocationSelect={handleLocationSelect}
            />
            <MapView 
              searchLocation={selectedLocation}
              onParkingSelect={handleParkingSelect} 
            />
            
            {/* Informações adicionais quando há busca */}
            {selectedLocation && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Resultados para: {selectedLocation.name?.split(',')[0] || searchTerm}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">5</div>
                    <div className="text-sm text-gray-600">Estacionamentos encontrados</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">4</div>
                    <div className="text-sm text-gray-600">Com vagas disponíveis</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">R$ 6-15</div>
                    <div className="text-sm text-gray-600">Faixa de preços/hora</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <ParkingDetails 
            parking={selectedParking} 
            onBack={handleBackToMap}
          />
        )}
      </main>
    </div>
  )
}

export default App

