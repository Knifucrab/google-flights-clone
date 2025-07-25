import React from 'react';
import './PopularDestinations.css';

const PopularDestinations = ({ onDestinationSelect }) => {
  const destinations = [
    {
      id: 1,
      city: 'Los Angeles',
      country: 'United States',
      price: '$2,290',
      dates: 'Aug 11 - Aug 18',
      duration: '2 stops · 26h 40m',
      image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=200&fit=crop&crop=entropy&auto=format&q=80',
      airport: {
        skyId: "LAX",
        entityId: "27544008",
        name: "Los Angeles International Airport"
      },
      searchData: {
        origin: 'Buenos Aires',
        destination: 'Los Angeles',
        departDate: new Date('2024-08-11'),
        returnDate: new Date('2024-08-18'),
        passengers: { adults: 1, children: 0, infants: 0 },
        cabinClass: 'economy',
        tripType: 'roundtrip'
      }
    },
    {
      id: 2,
      city: 'New York',
      country: 'United States',
      price: '$1,850',
      dates: 'Jul 25 - Jul 31',
      duration: '1 stop · 22h 15m',
      image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=200&fit=crop&crop=entropy&auto=format&q=80',
      airport: {
        skyId: "JFK",
        entityId: "95565058",
        name: "John F. Kennedy International Airport"
      },
      searchData: {
        origin: 'Buenos Aires',
        destination: 'New York',
        departDate: new Date('2024-07-25'),
        returnDate: new Date('2024-07-31'),
        passengers: { adults: 1, children: 0, infants: 0 },
        cabinClass: 'economy',
        tripType: 'roundtrip'
      }
    },
    {
      id: 3,
      city: 'Paris',
      country: 'France',
      price: '$1,650',
      dates: 'Jul 25 - Jul 31',
      duration: '1 stop · 18h 30m',
      image: 'https://images.unsplash.com/photo-1549144511-f099e773c147?w=400&h=200&fit=crop&crop=entropy&auto=format&q=80',
      airport: {
        skyId: "CDG",
        entityId: "27537543",
        name: "Charles de Gaulle Airport"
      },
      searchData: {
        origin: 'Buenos Aires',
        destination: 'Paris',
        departDate: new Date('2024-07-25'),
        returnDate: new Date('2024-07-31'),
        passengers: { adults: 1, children: 0, infants: 0 },
        cabinClass: 'economy',
        tripType: 'roundtrip'
      }
    },
    {
      id: 4,
      city: 'London',
      country: 'United Kingdom',
      price: '$1,780',
      dates: 'Jul 25 - Jul 31',
      duration: '1 stop · 20h 45m',
      image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=200&fit=crop&crop=entropy&auto=format&q=80',
      airport: {
        skyId: "LHR",
        entityId: "27537542",
        name: "London Heathrow Airport"
      },
      searchData: {
        origin: 'Buenos Aires',
        destination: 'London',
        departDate: new Date('2024-07-25'),
        returnDate: new Date('2024-07-31'),
        passengers: { adults: 1, children: 0, infants: 0 },
        cabinClass: 'economy',
        tripType: 'roundtrip'
      }
    }
  ];

  const handleDestinationClick = (destination) => {
    if (onDestinationSelect) {
      // Create the airport object with the proper structure expected by FlightSearchForm
      
      const airportData = {
        presentation: {
          title: destination.airport.name,
          suggestionTitle: `${destination.airport.name} (${destination.airport.skyId})`,
          subtitle: `${destination.city}, ${destination.country}`
        },
        navigation: {
          entityId: destination.airport.entityId,
          entityType: "AIRPORT",
          localizedName: destination.airport.name,
          relevantFlightParams: {
            skyId: destination.airport.skyId,
            entityId: destination.airport.entityId,
            flightPlaceType: "AIRPORT",
            localizedName: destination.airport.name
          }
        }
      };

      // Update the search data to include the proper airport data
      const searchData = {
        ...destination.searchData,
        destinationAirport: airportData
      };

      onDestinationSelect(searchData);
    }
  };

  return (
    <section className="popular-destinations">
      <div className="destinations-container">
        <div className="destinations-grid">
          {destinations.map((destination) => (
            <div 
              key={destination.id}
              className="destination-card"
              onClick={() => handleDestinationClick(destination)}
            >
              <div className="destination-image">
                <img src={destination.image} alt={destination.city} />
              </div>
              <div className="destination-info">
                <div className="destination-header">
                  <h3 className="destination-city">{destination.city}</h3>
                  <p className="destination-price">{destination.price}</p>
                </div>
                <p className="destination-country">{destination.country}</p>
                <p className="destination-dates">{destination.dates}</p>
                <p className="destination-duration">{destination.duration}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularDestinations;
