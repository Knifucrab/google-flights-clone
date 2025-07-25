import { useState, useCallback } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import FlightSearchForm from './components/FlightSearchForm'
import FlightResults from './components/FlightResults'
import Booking from './components/Booking'
import PopularDestinations from './components/PopularDestinations'
import FAQ from './components/FAQ'
import { flightService } from './services/flightService'
import './App.css'

function SearchPage() {
  const [flights, setFlights] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchParams, setSearchParams] = useState(null)
  const [selectedDestination, setSelectedDestination] = useState(null)
  const navigate = useNavigate()

  // useCallback here prevents SearchPage from re-rendering unnecessarily
  // Since this function is passed as a prop, without useCallback it would be "new" every render
  const handleSearch = useCallback(async (params) => {
    setLoading(true)
    setSearchParams(params)
    
    try {
      const result = await flightService.searchFlights(params)
      // Handle the new API response structure
      setFlights(result.data?.itineraries || [])
    } catch (error) {
      console.error('Error searching flights:', error)
      setFlights([])
    } finally {
      setLoading(false)
    }
  }, [])

  const handleFlightSelect = (selectedFlights) => {
    console.log('Selected flights:', selectedFlights)
    // Navigate to booking page with flight data
    navigate('/booking', { 
      state: { 
        selectedFlights, 
        searchParams 
      } 
    })
  }

  const handleDestinationSelect = useCallback((destinationData) => {
    setSelectedDestination(destinationData)
    // The FlightSearchForm will handle the automatic search
  }, [])

  return (
    <div className="search-page">
      <div className="page-header">
        <h1>Flights</h1>
      </div>
      <FlightSearchForm 
        onSearch={handleSearch} 
        selectedDestination={selectedDestination}
        onDestinationProcessed={() => setSelectedDestination(null)}
      />
      
      {/* Show destinations and FAQ only when no results - cleaner UX */}
      {!flights.length && !loading && (
        <>
          <PopularDestinations onDestinationSelect={handleDestinationSelect} />
          <FAQ />
        </>
      )}
      
      {/* Show results when we have flights or are loading */}
      {(flights.length > 0 || loading) && (
        <FlightResults 
          flights={flights} 
          loading={loading}
          onFlightSelect={handleFlightSelect}
          searchParams={searchParams}
        />
      )}
    </div>
  )
}

function BookingPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { selectedFlights, searchParams } = location.state || {}

  const handleBack = () => {
    navigate('/')
  }

  if (!selectedFlights) {
    navigate('/')
    return null
  }

  return (
    <Booking 
      selectedFlights={selectedFlights}
      searchParams={searchParams}
      onBack={handleBack}
    />
  )
}

function App() {
  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <div className="navbar">
            <div className="navbar-logo">
              <img 
                src="https://cdn.prod.website-files.com/66ba5dc07ac7a8ee388ef45d/66be3cdec98a938190f15779_Group%20(1).svg" 
                alt="Spotter Flights" 
                className="logo-image"
              />
            </div>
           
          </div>
        </header>

        <main className="app-main">
          <Routes>
            <Route path="/" element={<SearchPage />} />
            <Route path="/booking" element={<BookingPage />} />
          </Routes>
        </main>

        <footer className="app-footer">
          <p>2025 Spotter Flights. Developed by Mauro Bringas.</p>
        </footer>
      </div>
    </Router>
  )
}

export default App
