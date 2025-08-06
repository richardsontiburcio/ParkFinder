import { useState } from 'react'
import './App.css'
import SearchBar from './components/SearchBar'
import RealMapView from './components/RealMapView'
import ParkingDetails from './components/ParkingDetails'
import FilterPanel from './components/FilterPanel'
import LoginScreen from './components/LoginScreen'
import RegisterScreen from './components/RegisterScreen'
import FilterService from './services/FilterService'

function App() {
  const [currentScreen, setCurrentScreen] = useState('login') // 'login', 'register', 'main'
  const [user, setUser] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLocation, setSelectedLocation] = useState({
    lat: -8.0584,
    lon: -34.8883,
    name: 'Conde da Boa Vista, Recife, Brasil'
  })
  const [selectedParking, setSelectedParking] = useState(null)
  const [filters, setFilters] = useState(FilterService.getDefaultFilters())
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false)

  const handleLogin = (loginData) => {
    console.log('Login realizado:', loginData)
    setUser({
      email: loginData.email,
      name: loginData.email.split('@')[0], // Usar parte do email como nome temporário
      type: 'individual'
    })
    setCurrentScreen('main')
  }

  const handleRegister = (registerData) => {
    console.log('Cadastro realizado:', registerData)
    setUser({
      email: registerData.email,
      name: registerData.name,
      type: registerData.userType,
      businessName: registerData.businessName,
      cnpj: registerData.cnpj,
      address: registerData.address
    })
    setCurrentScreen('main')
  }

  const handleLogout = () => {
    setUser(null)
    setCurrentScreen('login')
  }

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

  return (
    <div className="min-h-screen bg-gray-50">
      {currentScreen === 'login' && (
        <LoginScreen 
          onLogin={handleLogin}
          onSwitchToRegister={() => setCurrentScreen('register')}
        />
      )}
      
      {currentScreen === 'register' && (
        <RegisterScreen 
          onRegister={handleRegister}
          onSwitchToLogin={() => setCurrentScreen('login')}
        />
      )}
      
      {currentScreen === 'main' && (
        <>
          <header className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-orange-600 p-2 rounded-md text-center">
                    <h1 className="text-2xl font-bold text-white">ParkFinder</h1>
                    <p className="text-white text-xs mt-1">O jeito inteligente de estacionar.</p>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    <span className="text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                      Olá, {user?.name || 'Usuário'}
                    </span>
                    <a href="#" className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                      Perfil
                    </a>
                    <button
                      onClick={handleLogout}
                      className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Sair
                    </button>
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
                <RealMapView 
                  searchLocation={selectedLocation}
                  onParkingSelect={handleParkingSelect}
                  filters={filters}
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

            {/* Painel de filtros */}
            <FilterPanel
              filters={filters}
              onFiltersChange={handleFiltersChange}
              isOpen={isFilterPanelOpen}
              onToggle={toggleFilterPanel}
            />
          </main>
        </>
      )}
    </div>
  )
}

export default App

