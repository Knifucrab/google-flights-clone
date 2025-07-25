import React from 'react';
import { ArrowRight, Users, Calendar, Clock, Plane } from 'lucide-react';
import './Booking.css';

const Booking = ({ selectedFlights, searchParams, onBack }) => {
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getAirlineInfo = (flight) => {
    if (flight.legs && flight.legs[0] && flight.legs[0].carriers) {
      const carrier = flight.legs[0].carriers.marketing[0];
      return {
        name: carrier.name,
        logo: carrier.logoUrl,
        flightNumber: flight.legs[0].segments[0]?.flightNumber || ''
      };
    }
    return {
      name: flight.airline || 'Unknown Airline',
      logo: null,
      flightNumber: flight.flightNumber || ''
    };
  };

  const getRouteInfo = (flight) => {
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
        stops: leg.stopCount
      };
    }
    return {
      origin: flight.origin || { time: '', airport: '', city: '' },
      destination: flight.destination || { time: '', airport: '', city: '' },
      stops: flight.stops || 0
    };
  };

  const calculateTotalPrice = () => {
    const outboundPrice = selectedFlights.outbound?.price?.raw || selectedFlights.outbound?.price || 0;
    const returnPrice = selectedFlights.return?.price?.raw || selectedFlights.return?.price || 0;
    return outboundPrice + returnPrice;
  };

  const getTotalPassengers = () => {
    return (searchParams?.adults || 1) + (searchParams?.children || 0) + (searchParams?.infants || 0);
  };

  const outboundRoute = getRouteInfo(selectedFlights.outbound);
  const returnRoute = selectedFlights.return ? getRouteInfo(selectedFlights.return) : null;
  const totalPrice = calculateTotalPrice();

  // Popular booking sites in the US
  const bookingSites = [
    {
      name: 'Expedia',
      logo: 'https://logos.skyscnr.com/images/websites/favicon/expe.png',
      price: totalPrice + 15,
      url: 'https://expedia.com'
    },
    {
      name: 'Kayak',
      logo: 'https://logos.skyscnr.com/images/websites/favicon/kaya.png', 
      price: totalPrice + 25,
      url: 'https://kayak.com'
    },
    {
      name: 'Priceline',
      logo: 'https://logos.skyscnr.com/images/websites/favicon/pric.png',
      price: totalPrice + 10,
      url: 'https://priceline.com'
    },
    {
      name: 'Google Flights',
      logo: 'https://logos.skyscnr.com/images/websites/favicon/goog.png',
      price: totalPrice,
      url: 'https://flights.google.com'
    },
    {
      name: 'Orbitz',
      logo: 'https://logos.skyscnr.com/images/websites/favicon/orbi.png',
      price: totalPrice + 20,
      url: 'https://orbitz.com'
    }
  ].sort((a, b) => a.price - b.price);

  return (
    <div className="booking-page">
      <div className="booking-header">
        <button onClick={onBack} className="back-button">
          ← Back to flights
        </button>
        <div className="trip-summary">
          <h1>
            {outboundRoute.origin.city} → {outboundRoute.destination.city}
          </h1>
          <div className="trip-details">
            <span className="trip-type">
              {selectedFlights.return ? 'Round trip' : 'One way'}
            </span>
            <span className="passenger-count">
              <Users size={16} />
              {getTotalPassengers()} passenger{getTotalPassengers() !== 1 ? 's' : ''}
            </span>
            <span className="total-price">
              ${totalPrice.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      <div className="booking-content">
        <div className="selected-flights">
          <h2>Selected Flights</h2>
          
          {/* Outbound Flight */}
          <div className="flight-detail-card">
            <div className="flight-header">
              <div className="flight-direction">
                <Plane size={20} />
                <span>Departing Flight</span>
              </div>
              <div className="flight-date">
                <Calendar size={16} />
                {formatDate(outboundRoute.origin.time)}
              </div>
            </div>
            
            <div className="flight-info">
              <div className="airline-section">
                {getAirlineInfo(selectedFlights.outbound).logo && (
                  <img 
                    src={getAirlineInfo(selectedFlights.outbound).logo} 
                    alt={getAirlineInfo(selectedFlights.outbound).name}
                    className="airline-logo"
                  />
                )}
                <div>
                  <div className="airline-name">{getAirlineInfo(selectedFlights.outbound).name}</div>
                  <div className="flight-number">{getAirlineInfo(selectedFlights.outbound).flightNumber}</div>
                </div>
              </div>
              
              <div className="route-section">
                <div className="airport-info">
                  <div className="time">{formatTime(outboundRoute.origin.time)}</div>
                  <div className="airport">{outboundRoute.origin.airport}</div>
                  <div className="city">{outboundRoute.origin.city}</div>
                </div>
                <div className="flight-path">
                  <ArrowRight size={20} />
                  <div className="stops-info">
                    {outboundRoute.stops === 0 ? 'Nonstop' : `${outboundRoute.stops} stop${outboundRoute.stops > 1 ? 's' : ''}`}
                  </div>
                </div>
                <div className="airport-info">
                  <div className="time">{formatTime(outboundRoute.destination.time)}</div>
                  <div className="airport">{outboundRoute.destination.airport}</div>
                  <div className="city">{outboundRoute.destination.city}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Return Flight */}
          {selectedFlights.return && (
            <div className="flight-detail-card">
              <div className="flight-header">
                <div className="flight-direction">
                  <Plane size={20} />
                  <span>Return Flight</span>
                </div>
                <div className="flight-date">
                  <Calendar size={16} />
                  {formatDate(returnRoute.origin.time)}
                </div>
              </div>
              
              <div className="flight-info">
                <div className="airline-section">
                  {getAirlineInfo(selectedFlights.return).logo && (
                    <img 
                      src={getAirlineInfo(selectedFlights.return).logo} 
                      alt={getAirlineInfo(selectedFlights.return).name}
                      className="airline-logo"
                    />
                  )}
                  <div>
                    <div className="airline-name">{getAirlineInfo(selectedFlights.return).name}</div>
                    <div className="flight-number">{getAirlineInfo(selectedFlights.return).flightNumber}</div>
                  </div>
                </div>
                
                <div className="route-section">
                  <div className="airport-info">
                    <div className="time">{formatTime(returnRoute.origin.time)}</div>
                    <div className="airport">{returnRoute.origin.airport}</div>
                    <div className="city">{returnRoute.origin.city}</div>
                  </div>
                  <div className="flight-path">
                    <ArrowRight size={20} />
                    <div className="stops-info">
                      {returnRoute.stops === 0 ? 'Nonstop' : `${returnRoute.stops} stop${returnRoute.stops > 1 ? 's' : ''}`}
                    </div>
                  </div>
                  <div className="airport-info">
                    <div className="time">{formatTime(returnRoute.destination.time)}</div>
                    <div className="airport">{returnRoute.destination.airport}</div>
                    <div className="city">{returnRoute.destination.city}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="reservation-options">
          <h2>Reservation Options</h2>
          <p>Choose a booking site to complete your reservation</p>
          
          <div className="booking-sites">
            {bookingSites.map((site, index) => (
              <div key={index} className="booking-site-card">
                <div className="site-info">
                  <img 
                    src={site.logo} 
                    alt={site.name}
                    className="site-logo"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                  <span className="site-name">{site.name}</span>
                </div>
                <div className="site-price">${site.price.toLocaleString()}</div>
                <button 
                  className="continue-booking-button"
                  onClick={() => window.open(site.url, '_blank')}
                >
                  Continue
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
