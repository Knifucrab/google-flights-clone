import React, { useState } from 'react';
import { Clock, MapPin, Plane, ArrowRight } from 'lucide-react';
import './FlightResults.css';

const FlightCard = ({ flight, onSelect, isSelected, isCheapest }) => {
  const formatTime = (time) => {
    if (typeof time === 'string') {
      const date = new Date(time);
      return date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      });
    }
    return time;
  };

  const formatDuration = (duration) => {
    if (typeof duration === 'number') {
      const hours = Math.floor(duration / 60);
      const minutes = duration % 60;
      return `${hours}h ${minutes}m`;
    }
    return duration;
  };

  // Extract airline info from the API response structure
  const getAirlineInfo = () => {
    if (flight.legs && flight.legs[0] && flight.legs[0].carriers) {
      const carrier = flight.legs[0].carriers.marketing[0];
      return {
        name: carrier.name,
        logo: carrier.logoUrl,
        flightNumber: flight.legs[0].segments[0]?.flightNumber || ''
      };
    }
    // Fallback for dummy data structure
    return {
      name: flight.airline || 'Unknown Airline',
      logo: null,
      flightNumber: flight.flightNumber || ''
    };
  };

  const getRouteInfo = () => {
    if (flight.legs && flight.legs[0]) {
      const leg = flight.legs[0];
      return {
        origin: {
          time: leg.departure,
          airport: leg.origin.displayCode,
          city: leg.origin.name
        },
        destination: {
          time: leg.arrival,
          airport: leg.destination.displayCode,
          city: leg.destination.name
        },
        duration: leg.durationInMinutes,
        stops: leg.stopCount
      };
    }
    // Fallback for dummy data structure
    return {
      origin: flight.origin || { time: '', airport: '', city: '' },
      destination: flight.destination || { time: '', airport: '', city: '' },
      duration: flight.duration || '',
      stops: flight.stops || 0
    };
  };

  const airlineInfo = getAirlineInfo();
  const routeInfo = getRouteInfo();
  const price = flight.price?.formatted || `$${flight.price?.raw || flight.price || 0}`;

  return (
    <div 
      className={`flight-card ${isSelected ? 'selected' : ''} ${isCheapest ? 'cheapest' : ''}`}
      onClick={() => onSelect(flight)}
    >
      <div className="flight-header">
        <div className="airline-info">
          <div className="airline-details">
            {airlineInfo.logo && (
              <img 
                src={airlineInfo.logo} 
                alt={airlineInfo.name}
                className="airline-logo"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            )}
            <div className="airline-text">
              <div className="airline-name">{airlineInfo.name}</div>
              <div className="flight-number">{airlineInfo.flightNumber}</div>
            </div>
          </div>
        </div>
        <div className="price-info">
          <div className="price">{price}</div>
        </div>
      </div>

      <div className="flight-details">
        <div className="route-info">
          <div className="airport-time">
            <div className="time">{formatTime(routeInfo.origin.time)}</div>
            <div className="airport">{routeInfo.origin.airport}</div>
            <div className="city">{routeInfo.origin.city}</div>
          </div>
          
          <div className="flight-path">
            <div className="duration">{formatDuration(routeInfo.duration)}</div>
            <div className="stops">
              {routeInfo.stops === 0 ? 'Nonstop' : `${routeInfo.stops} stop${routeInfo.stops > 1 ? 's' : ''}`}
            </div>
          </div>

          <div className="airport-time">
            <div className="time">{formatTime(routeInfo.destination.time)}</div>
            <div className="airport">{routeInfo.destination.airport}</div>
            <div className="city">{routeInfo.destination.city}</div>
          </div>
        </div>

        <div className="flight-meta">
          <span className="cabin-class">{flight.cabinClass || 'Economy'}</span>
        </div>
      </div>
    </div>
  );
};

const FlightResults = ({ flights, loading, onFlightSelect, searchParams }) => {
  const [selectedOutboundFlight, setSelectedOutboundFlight] = useState(null);
  const [selectedReturnFlight, setSelectedReturnFlight] = useState(null);
  const [sortBy, setSortBy] = useState('price');
  const [showReturnFlights, setShowReturnFlights] = useState(false);
  const [returnFlights, setReturnFlights] = useState([]);

  const handleFlightSelect = (flight) => {
    if (!selectedOutboundFlight) {
      // Selecting outbound flight
      setSelectedOutboundFlight(flight);
      
      // Check if this is a round trip using both tripType and returnDate
      const isRoundTrip = (searchParams?.tripType === 'roundtrip') && 
                          searchParams?.returnDate && 
                          searchParams.returnDate !== null && 
                          searchParams.returnDate !== '';
      
      if (isRoundTrip) {
        setShowReturnFlights(true);
        // Generate mock return flights (in real app, you'd fetch these)
        generateReturnFlights();
      } else {
        // One way trip, proceed to booking
        onFlightSelect({ outbound: flight, return: null });
      }
    } else if (!selectedReturnFlight) {
      // Selecting return flight
      setSelectedReturnFlight(flight);
      // Both flights selected, proceed to booking
      onFlightSelect({ outbound: selectedOutboundFlight, return: flight });
    }
  };

  const generateReturnFlights = () => {
    // Create return flights based on the original flights
    const returnFlightData = flights.map((flight, index) => {
      const newFlight = {
        ...flight,
        id: `return-${flight.id}-${index}`,
      };
      
      // If the flight has legs (API structure), swap origin and destination
      if (flight.legs && flight.legs[0]) {
        newFlight.legs = [{
          ...flight.legs[0],
          id: `return-${flight.legs[0].id}-${index}`,
          origin: flight.legs[0].destination,
          destination: flight.legs[0].origin,
          departure: `2025-07-${27 + (index % 4)}T${8 + (index % 8)}:00:00`,
          arrival: `2025-07-${27 + (index % 4)}T${14 + (index % 8)}:30:00`
        }];
      }
      
      return newFlight;
    });
    setReturnFlights(returnFlightData);
  };

  const sortFlights = (flights, sortBy) => {
    const sorted = [...flights];
    switch (sortBy) {
      case 'price':
        return sorted.sort((a, b) => {
          const priceA = a.price?.raw || a.price || 0;
          const priceB = b.price?.raw || b.price || 0;
          return priceA - priceB;
        });
      case 'duration':
        return sorted.sort((a, b) => {
          const getDurationInMinutes = (flight) => {
            if (flight.legs && flight.legs[0] && flight.legs[0].durationInMinutes) {
              return flight.legs[0].durationInMinutes;
            }
            if (typeof flight.duration === 'string') {
              const match = flight.duration.match(/(\d+)h\s*(\d+)?m?/);
              return match ? parseInt(match[1]) * 60 + (parseInt(match[2]) || 0) : 0;
            }
            return 0;
          };
          return getDurationInMinutes(a) - getDurationInMinutes(b);
        });
      case 'departure':
        return sorted.sort((a, b) => {
          const getTime = (flight) => {
            if (flight.legs && flight.legs[0] && flight.legs[0].departure) {
              return new Date(flight.legs[0].departure).getTime();
            }
            if (flight.origin && flight.origin.time) {
              return flight.origin.time.replace(':', '');
            }
            return 0;
          };
          return getTime(a) - getTime(b);
        });
      default:
        return sorted;
    }
  };

  const sortedFlights = sortFlights(flights, sortBy);

  // Find the cheapest flight
  const getCheapestFlightId = (flights) => {
    if (!flights || flights.length === 0) return null;
    
    let cheapestFlight = flights[0];
    let cheapestPrice = Infinity;
    
    flights.forEach(flight => {
      const price = flight.price?.raw || flight.rawPrice || 0;
      if (price < cheapestPrice) {
        cheapestPrice = price;
        cheapestFlight = flight;
      }
    });
    
    return cheapestFlight.id;
  };

  const cheapestFlightId = getCheapestFlightId(flights);

  if (loading) {
    return (
      <div className="flight-results loading">
        <div className="loading-spinner">
          <Plane className="spinner-icon" size={32} />
          <div>Searching for flights...</div>
        </div>
      </div>
    );
  }

  if (!flights || flights.length === 0) {
    return (
      <div className="flight-results empty">
        <div className="empty-state">
          <Plane size={48} />
          <h3>No flights found</h3>
          <p>Try adjusting your search criteria</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flight-results">
      {!selectedOutboundFlight && (
        <>
          <div className="results-header">
            <div className="results-info">
              <h2>Choose a departing flight</h2>
              <p>{flights.length} result{flights.length !== 1 ? 's' : ''} found</p>
            </div>
            
            <div className="sort-controls">
              <label>Sort by:</label>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="price">Best price</option>
                <option value="duration">Shortest</option>
                <option value="departure">Departure time</option>
              </select>
            </div>
          </div>

          <div className="flights-list">
            {sortedFlights.map((flight) => (
              <FlightCard
                key={flight.id}
                flight={flight}
                onSelect={handleFlightSelect}
                isSelected={false}
                isCheapest={flight.id === cheapestFlightId}
              />
            ))}
          </div>
        </>
      )}

      {selectedOutboundFlight && showReturnFlights && (
        <div className="flight-selection">
          {/* Selected Outbound Flight */}
          <div className="selected-flight-section">
            <div className="selected-flight-header">
              <h3>Selected departing flight</h3>
              <ArrowRight size={20} className="arrow-icon" />
            </div>
            <FlightCard
              flight={selectedOutboundFlight}
              onSelect={() => {}}
              isSelected={true}
              isCheapest={false}
            />
          </div>

          {/* Return Flight Selection */}
          <div className="return-flights-section">
            <div className="results-header">
              <div className="results-info">
                <h2>Select your return flight</h2>
                <p>{returnFlights.length} result{returnFlights.length !== 1 ? 's' : ''} found</p>
              </div>
              
              <div className="sort-controls">
                <label>Sort by:</label>
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="sort-select"
                >
                  <option value="price">Best price</option>
                  <option value="duration">Shortest</option>
                  <option value="departure">Departure time</option>
                </select>
              </div>
            </div>

            <div className="flights-list">
              {returnFlights.map((flight) => {
                const cheapestReturnFlightId = getCheapestFlightId(returnFlights);
                return (
                  <FlightCard
                    key={flight.id}
                    flight={flight}
                    onSelect={handleFlightSelect}
                    isSelected={selectedReturnFlight?.id === flight.id}
                    isCheapest={flight.id === cheapestReturnFlightId}
                  />
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightResults;
