import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Search, MapPin, Calendar, Users, ArrowLeftRight } from 'lucide-react';
import DatePicker from 'react-datepicker';
import { flightService } from '../services/flightService';
import './FlightSearchForm.css';
import 'react-datepicker/dist/react-datepicker.css';

const FlightSearchForm = ({ onSearch, selectedDestination, onDestinationProcessed }) => {
  // Get today's date and 3 days later - gives users sensible defaults
  const today = new Date();
  const threeDaysLater = new Date(today);
  threeDaysLater.setDate(today.getDate() + 3);

  // Main form state - everything the user fills in gets stored here
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    departDate: today,
    returnDate: threeDaysLater,
    passengers: {
      adults: 1,
      children: 0,
      infants: 0
    },
    cabinClass: 'economy',
    tripType: 'roundtrip'
  });

  // These handle the autocomplete dropdown suggestions
  const [originSuggestions, setOriginSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [showOriginSuggestions, setShowOriginSuggestions] = useState(false);
  const [showDestinationSuggestions, setShowDestinationSuggestions] = useState(false);
  
  // Store the actual airport objects (not just display text) for API calls later
  const [selectedOrigin, setSelectedOrigin] = useState(null);
  const [selectedDestinationAirport, setSelectedDestinationAirport] = useState(null);
  const [showPassengerDropdown, setShowPassengerDropdown] = useState(false);

  // useRef lets us access DOM elements directly for click-outside detection
  const originRef = useRef(null);
  const destinationRef = useRef(null);
  const passengerRef = useRef(null);
  
  // This prevents stale closure issues in our auto-search effect
  const onSearchRef = useRef(onSearch);

  // Keep the ref updated
  useEffect(() => {
    onSearchRef.current = onSearch;
  }, [onSearch]);

  // Handle selectedDestination from PopularDestinations
  useEffect(() => {
    if (selectedDestination) {
      // Create mock airport objects for the destination data
      const originAirport = {
        skyId: 'BUAR',
        entityId: '27544008',
        presentation: {
          suggestionTitle: selectedDestination.origin,
          subtitle: 'Argentina'
        }
      };

      const destinationAirport = {
        skyId: 'DEST',
        entityId: '27537542',
        presentation: {
          suggestionTitle: selectedDestination.destination,
          subtitle: 'International'
        }
      };

      // Update form data
      setFormData({
        ...selectedDestination,
        origin: selectedDestination.origin,
        destination: selectedDestination.destination
      });

      // Set selected airports
      setSelectedOrigin(originAirport);
      setSelectedDestinationAirport(destinationAirport);

      // Notify parent that destination has been processed
      if (onDestinationProcessed) {
        onDestinationProcessed();
      }
    }
  }, [selectedDestination, onDestinationProcessed]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (originRef.current && !originRef.current.contains(event.target)) {
        setShowOriginSuggestions(false);
      }
      if (destinationRef.current && !destinationRef.current.contains(event.target)) {
        setShowDestinationSuggestions(false);
      }
      if (passengerRef.current && !passengerRef.current.contains(event.target)) {
        setShowPassengerDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchAirports = async (query, type) => {
    try {
      let results;
      if (query.length === 0) {
        // Show popular airports when no query
        const popularResponse = await flightService.getPopularAirports();
        results = popularResponse.data || popularResponse;
      } else if (query.length >= 1) {
        // Search based on user input
        const searchResponse = await flightService.searchAirports(query);
        results = searchResponse.data || searchResponse;
      } else {
        return;
      }
      
      if (type === 'origin') {
        setOriginSuggestions(results);
        setShowOriginSuggestions(true);
      } else {
        setDestinationSuggestions(results);
        setShowDestinationSuggestions(true);
      }
    } catch (error) {
      console.error('Error searching airports:', error);
    }
  };

  const handleOriginChange = (value) => {
    setFormData(prev => ({ ...prev, origin: value }));
    searchAirports(value, 'origin');
  };

  const handleDestinationChange = (value) => {
    setFormData(prev => ({ ...prev, destination: value }));
    searchAirports(value, 'destination');
  };

  const selectAirport = (airport, type) => {
    if (type === 'origin') {
      setSelectedOrigin(airport);
      const skyId = airport.navigation?.relevantFlightParams?.skyId || airport.skyId || airport.iata;
      const subtitle = airport.presentation?.subtitle || `${airport.city}, ${airport.country}`;
      setFormData(prev => ({ ...prev, origin: `${subtitle.split(',')[0]} (${skyId})` }));
      setShowOriginSuggestions(false);
    } else {
      setSelectedDestinationAirport(airport);
      const skyId = airport.navigation?.relevantFlightParams?.skyId || airport.skyId || airport.iata;
      const subtitle = airport.presentation?.subtitle || `${airport.city}, ${airport.country}`;
      setFormData(prev => ({ ...prev, destination: `${subtitle.split(',')[0]} (${skyId})` }));
      setShowDestinationSuggestions(false);
    }
  };

  const swapAirports = () => {
    const tempOrigin = formData.origin;
    const tempSelectedOrigin = selectedOrigin;
    
    setFormData(prev => ({
      ...prev,
      origin: prev.destination,
      destination: tempOrigin
    }));
    
    setSelectedOrigin(selectedDestinationAirport);
    setSelectedDestinationAirport(tempSelectedOrigin);
  };

  const updatePassengers = (type, increment) => {
    setFormData(prev => ({
      ...prev,
      passengers: {
        ...prev.passengers,
        [type]: Math.max(0, prev.passengers[type] + increment)
      }
    }));
  };

  // useCallback prevents unnecessary re-renders when this function is passed as a prop
  // Without it, the component would re-render every time because it's a "new" function
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    
    if (!selectedOrigin || !selectedDestinationAirport || !formData.departDate) {
      alert('Please fill in all required fields');
      return;
    }

    // Extract data from the new API structure
    const originData = selectedOrigin.navigation?.relevantFlightParams || selectedOrigin;
    const destinationData = selectedDestinationAirport.navigation?.relevantFlightParams || selectedDestinationAirport;

    const searchParams = {
      originSkyId: originData.skyId,
      destinationSkyId: destinationData.skyId,
      originEntityId: originData.entityId,
      destinationEntityId: destinationData.entityId,
      date: formData.departDate.toISOString().split('T')[0],
      returnDate: formData.tripType === 'roundtrip' && formData.returnDate 
        ? formData.returnDate.toISOString().split('T')[0] 
        : null,
      tripType: formData.tripType,
      cabinClass: formData.cabinClass,
      adults: formData.passengers.adults,
      children: formData.passengers.children,
      infants: formData.passengers.infants
    };

    onSearch(searchParams);
  }, [selectedOrigin, selectedDestinationAirport, formData, onSearch]);

  // Auto-search magic when the form is complete, automatically search flights
  // This gives users instant results without clicking "search"
  useEffect(() => {
    // Check if form is complete
    const isFormComplete = selectedOrigin && 
                           selectedDestinationAirport && 
                           formData.departDate && 
                           (formData.tripType === 'oneway' || formData.returnDate);

    if (!isFormComplete) return;

    // Use a timeout to debounce rapid changes (prevents API spam)
    const timeoutId = setTimeout(() => {
      // Create search params
      const originData = selectedOrigin.navigation?.relevantFlightParams || selectedOrigin;
      const destinationData = selectedDestinationAirport.navigation?.relevantFlightParams || selectedDestinationAirport;

      const searchParams = {
        originSkyId: originData.skyId,
        destinationSkyId: destinationData.skyId,
        originEntityId: originData.entityId,
        destinationEntityId: destinationData.entityId,
        date: formData.departDate.toISOString().split('T')[0],
        returnDate: formData.tripType === 'roundtrip' && formData.returnDate 
          ? formData.returnDate.toISOString().split('T')[0] 
          : null,
        tripType: formData.tripType,
        cabinClass: formData.cabinClass,
        adults: formData.passengers.adults,
        children: formData.passengers.children,
        infants: formData.passengers.infants
      };

      onSearchRef.current(searchParams);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [
    selectedOrigin,
    selectedDestinationAirport, 
    formData
  ]);

  return (
    <div className="flight-search-form">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="form-row controls-row">
          <div className="input-group trip-type-group">
            <select
              value={formData.tripType}
              onChange={(e) => setFormData(prev => ({ ...prev, tripType: e.target.value }))}
              className="control-select small"
            >
              <option value="roundtrip">Round trip</option>
              <option value="oneway">One way</option>
            </select>
          </div>

          <div className="input-group passengers-input" ref={passengerRef}>
            <div 
              className="input-wrapper clickable passenger-selector small"
              onClick={() => setShowPassengerDropdown(!showPassengerDropdown)}
            >
              <Users className="input-icon small" size={14} />
              <span className="passenger-text small">
                {formData.passengers.adults + formData.passengers.children + formData.passengers.infants}
              </span>
            </div>
            {showPassengerDropdown && (
              <div className="passengers-dropdown">
                <div className="passenger-row">
                  <div className="passenger-info">
                    <div className="passenger-type">Adults</div>
                    <div className="passenger-desc">12+ years</div>
                  </div>
                  <div className="passenger-controls">
                    <button type="button" onClick={() => updatePassengers('adults', -1)} disabled={formData.passengers.adults <= 1}>-</button>
                    <span>{formData.passengers.adults}</span>
                    <button type="button" onClick={() => updatePassengers('adults', 1)}>+</button>
                  </div>
                </div>
                <div className="passenger-row">
                  <div className="passenger-info">
                    <div className="passenger-type">Children</div>
                    <div className="passenger-desc">2-11 years</div>
                  </div>
                  <div className="passenger-controls">
                    <button type="button" onClick={() => updatePassengers('children', -1)} disabled={formData.passengers.children <= 0}>-</button>
                    <span>{formData.passengers.children}</span>
                    <button type="button" onClick={() => updatePassengers('children', 1)}>+</button>
                  </div>
                </div>
                <div className="passenger-row">
                  <div className="passenger-info">
                    <div className="passenger-type">Infants</div>
                    <div className="passenger-desc">Under 2 years</div>
                  </div>
                  <div className="passenger-controls">
                    <button type="button" onClick={() => updatePassengers('infants', -1)} disabled={formData.passengers.infants <= 0}>-</button>
                    <span>{formData.passengers.infants}</span>
                    <button type="button" onClick={() => updatePassengers('infants', 1)}>+</button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="input-group">
            <select
              value={formData.cabinClass}
              onChange={(e) => setFormData(prev => ({ ...prev, cabinClass: e.target.value }))}
              className="control-select small"
            >
              <option value="economy">Economy</option>
              <option value="premium_economy">Premium Economy</option>
              <option value="business">Business</option>
              <option value="first">First</option>
            </select>
          </div>
        </div>

        <div className="form-row main-inputs-row">
          <div className="input-group airport-input" ref={originRef}>
            <div 
              className="input-wrapper compact"
              onClick={() => {
                setShowOriginSuggestions(true);
                if (formData.origin === '') {
                  searchAirports('', 'origin');
                }
              }}
            >
              <MapPin className="input-icon compact" size={16} />
              <input
                type="text"
                placeholder="Where from?"
                value={formData.origin}
                onChange={(e) => handleOriginChange(e.target.value)}
                onFocus={() => setShowOriginSuggestions(true)}
                required
              />
            </div>
            {showOriginSuggestions && originSuggestions.length > 0 && (
              <div className="suggestions">
                {originSuggestions.map((airport, index) => {
                  // Handle both old and new API structures
                  const title = airport.presentation?.title || airport.name;
                  const subtitle = airport.presentation?.subtitle || `${airport.city}, ${airport.country}`;
                  const skyId = airport.navigation?.relevantFlightParams?.skyId || airport.skyId || airport.iata;
                  const uniqueKey = airport.navigation?.entityId || airport.entityId || airport.id || `origin-${index}`;
                  
                  return (
                    <div
                      key={uniqueKey}
                      className="suggestion-item"
                      onClick={() => selectAirport(airport, 'origin')}
                    >
                      <div className="airport-info">
                        <div className="airport-name">{title}</div>
                        <div className="airport-location">{subtitle}</div>
                      </div>
                      <div className="airport-code">{skyId}</div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <button type="button" className="swap-button compact" onClick={swapAirports}>
            <ArrowLeftRight size={16} />
          </button>

          <div className="input-group airport-input" ref={destinationRef}>
            <div 
              className="input-wrapper compact"
              onClick={() => {
                setShowDestinationSuggestions(true);
                if (formData.destination === '') {
                  searchAirports('', 'destination');
                }
              }}
            >
              <MapPin className="input-icon compact" size={16} />
              <input
                type="text"
                placeholder="Where to?"
                value={formData.destination}
                onChange={(e) => handleDestinationChange(e.target.value)}
                onFocus={() => setShowDestinationSuggestions(true)}
                required
              />
            </div>
            {showDestinationSuggestions && destinationSuggestions.length > 0 && (
              <div className="suggestions">
                {destinationSuggestions.map((airport, index) => {
                  // Handle both old and new API structures
                  const title = airport.presentation?.title || airport.name;
                  const subtitle = airport.presentation?.subtitle || `${airport.city}, ${airport.country}`;
                  const skyId = airport.navigation?.relevantFlightParams?.skyId || airport.skyId || airport.iata;
                  const uniqueKey = airport.navigation?.entityId || airport.entityId || airport.id || `destination-${index}`;
                  
                  return (
                    <div
                      key={uniqueKey}
                      className="suggestion-item"
                      onClick={() => selectAirport(airport, 'destination')}
                    >
                      <div className="airport-info">
                        <div className="airport-name">{title}</div>
                        <div className="airport-location">{subtitle}</div>
                      </div>
                      <div className="airport-code">{skyId}</div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div className="form-row dates-row">
          <div className="input-group date-input">
            <div className="input-wrapper compact">
              <Calendar className="input-icon compact" size={16} />
              <DatePicker
                selected={formData.departDate}
                onChange={(date) => setFormData(prev => ({ ...prev, departDate: date }))}
                minDate={new Date()}
                dateFormat="MMM d, yyyy"
                placeholderText="Departure Date"
                className="date-picker-input"
                required
              />
            </div>
          </div>

          {formData.tripType === 'roundtrip' && (
            <div className="input-group date-input">
              <div className="input-wrapper compact">
                <Calendar className="input-icon compact" size={16} />
                <DatePicker
                  selected={formData.returnDate}
                  onChange={(date) => setFormData(prev => ({ ...prev, returnDate: date }))}
                  minDate={formData.departDate || new Date()}
                  dateFormat="MMM d, yyyy"
                  placeholderText="Return Date"
                  className="date-picker-input"
                  required={formData.tripType === 'roundtrip'}
                />
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default FlightSearchForm;
