import { useState } from 'react'
import './App.css'
import SearchBar from './components/SearchBar'
import RealMapView from './components/RealMapView'
import ParkingDetails from './components/ParkingDetails'
import FilterPanel from './components/FilterPanel'
import ParkingInfo from './components/ParkingInfo'
import Login from './components/Login'
import FilterService from './services/FilterService'

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLocation, setSelectedLocation] = useState({
    lat: -8.0584,
    lon: -34.8883,
    name: 'Conde da Boa Vista, Recife, Brasil'
  })
  const [selectedParking, setSelectedParking] = useState(null)
  const [filters, setFilters] = useState(FilterService.getDefaultFilters())
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false)
  const [currentView, setCurrentView] = useState('home') // 'home', 'parking-info', 'login'

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

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters)
    console.log('Filtros aplicados:', newFilters)
  }

  const toggleFilterPanel = () => {
    setIsFilterPanelOpen(!isFilterPanelOpen)
  }

  const handleNavigateToHome = () => {
    setCurrentView('home')
    setSelectedParking(null)
  }

  const handleNavigateToParkingInfo = () => {
    setCurrentView('parking-info')
    setSelectedParking(null)
  }

  const handleNavigateToLogin = () => {
    setCurrentView('login')
    setSelectedParking(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cabeçalho responsivo */}
      <header className="parkfinder-header bg-white shadow-sm border-b border-gray-200 p-4 flex flex-col sm:flex-row justify-between items-center">
        <div className="parkfinder-logo bg-orange-500 text-white px-4 py-2 rounded-lg font-bold text-lg mb-2 sm:mb-0">
          ParkFinder
          <div className="text-sm font-normal opacity-90">O jeito inteligente de estacionar</div>
        </div>
        <nav className="parkfinder-nav flex flex-wrap gap-2 justify-center sm:justify-end">
          <button 
            onClick={handleNavigateToHome}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              currentView === 'home' 
                ? 'bg-green-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Início
          </button>
          <button 
            onClick={handleNavigateToParkingInfo}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              currentView === 'parking-info' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Estacionamentos
          </button>
          <button 
            onClick={handleNavigateToLogin}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              currentView === 'login' 
                ? 'bg-yellow-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Login
          </button>
        </nav>
      </header>

      <main className="w-full">
        {currentView === 'home' && !selectedParking && (
          <div className="w-full">
            <div className="search-container bg-white border-b border-gray-200 p-4">
              <SearchBar 
                onSearch={handleSearch} 
                onLocationSelect={handleLocationSelect}
              />
            </div>
            <div className="relative">
              <RealMapView 
                searchLocation={selectedLocation}
                onParkingSelect={handleParkingSelect}
                filters={filters}
              />
            </div>
            
            {/* Informações adicionais quando há busca - responsivo */}
            {selectedLocation && (
              <div className="bg-white border-t border-gray-200 p-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 text-center sm:text-left">
                  Resultados para: {selectedLocation.name?.split(',')[0] || searchTerm}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
        )}

        {currentView === 'home' && selectedParking && (
          <div className="w-full">
            <ParkingDetails 
              parking={selectedParking} 
              onBack={handleBackToMap}
            />
          </div>
        )}

        {currentView === 'parking-info' && (
          <div className="w-full">
            <ParkingInfo />
          </div>
        )}

        {currentView === 'login' && (
          <div className="max-w-md mx-auto p-4">
            <Login />
          </div>
        )}

        {/* Painel de filtros - apenas na tela home */}
        {currentView === 'home' && (
          <FilterPanel
            filters={filters}
            onFiltersChange={handleFiltersChange}
            isOpen={isFilterPanelOpen}
            onToggle={toggleFilterPanel}
          />
        )}
      </main>
    </div>
  )
}

export default App

