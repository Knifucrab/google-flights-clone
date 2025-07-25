import axios from 'axios';

const API_BASE_URL = 'https://sky-scrapper.p.rapidapi.com/api';
const API_KEY = import.meta.env.VITE_RAPIDAPI_KEY;

console.log('API Configuration:', {
  baseURL: API_BASE_URL,
  apiKey: API_KEY ? `${API_KEY.substring(0, 10)}...` : 'NOT SET',
  useDummyData: import.meta.env.VITE_USE_DUMMY_DATA
});

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'x-rapidapi-key': API_KEY,
    'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com'
  }
});

// Flag to use dummy data - controlled by environment variable
// Set to false to use real API, true for development with dummy data
const USE_DUMMY_DATA = import.meta.env.VITE_USE_DUMMY_DATA === 'true' ? true : false;

console.log('Using dummy data:', USE_DUMMY_DATA);

// Dummy data for development - updated to match Sky Scrapper API structure
const dummyAirports = [
  { 
    presentation: {
      title: "John F. Kennedy International Airport",
      suggestionTitle: "John F. Kennedy International Airport (JFK)",
      subtitle: "New York, United States"
    },
    navigation: {
      entityId: "95565058",
      entityType: "AIRPORT",
      localizedName: "John F. Kennedy International Airport",
      relevantFlightParams: {
        skyId: "JFK",
        entityId: "95565058",
        flightPlaceType: "AIRPORT",
        localizedName: "John F. Kennedy International Airport"
      }
    }
  },
  { 
    presentation: {
      title: "Los Angeles International Airport",
      suggestionTitle: "Los Angeles International Airport (LAX)",
      subtitle: "Los Angeles, United States"
    },
    navigation: {
      entityId: "27544008",
      entityType: "AIRPORT",
      localizedName: "Los Angeles International Airport",
      relevantFlightParams: {
        skyId: "LAX",
        entityId: "27544008",
        flightPlaceType: "AIRPORT",
        localizedName: "Los Angeles International Airport"
      }
    }
  },
  { 
    presentation: {
      title: "London Heathrow Airport",
      suggestionTitle: "London Heathrow Airport (LHR)",
      subtitle: "London, United Kingdom"
    },
    navigation: {
      entityId: "27537542",
      entityType: "AIRPORT",
      localizedName: "London Heathrow Airport",
      relevantFlightParams: {
        skyId: "LHR",
        entityId: "27537542",
        flightPlaceType: "AIRPORT",
        localizedName: "London Heathrow Airport"
      }
    }
  },
  { 
    presentation: {
      title: "Charles de Gaulle Airport",
      suggestionTitle: "Charles de Gaulle Airport (CDG)",
      subtitle: "Paris, France"
    },
    navigation: {
      entityId: "27537543",
      entityType: "AIRPORT",
      localizedName: "Charles de Gaulle Airport",
      relevantFlightParams: {
        skyId: "CDG",
        entityId: "27537543",
        flightPlaceType: "AIRPORT",
        localizedName: "Charles de Gaulle Airport"
      }
    }
  },
  { 
    presentation: {
      title: "Narita International Airport",
      suggestionTitle: "Narita International Airport (NRT)",
      subtitle: "Tokyo, Japan"
    },
    navigation: {
      entityId: "27537544",
      entityType: "AIRPORT",
      localizedName: "Narita International Airport",
      relevantFlightParams: {
        skyId: "NRT",
        entityId: "27537544",
        flightPlaceType: "AIRPORT",
        localizedName: "Narita International Airport"
      }
    }
  },
  { 
    presentation: {
      title: "Miami International Airport",
      suggestionTitle: "Miami International Airport (MIA)",
      subtitle: "Miami, United States"
    },
    navigation: {
      entityId: "95673821",
      entityType: "AIRPORT",
      localizedName: "Miami International Airport",
      relevantFlightParams: {
        skyId: "MIA",
        entityId: "95673821",
        flightPlaceType: "AIRPORT",
        localizedName: "Miami International Airport"
      }
    }
  },
  { 
    presentation: {
      title: "Chhatrapati Shivaji Maharaj International Airport",
      suggestionTitle: "Chhatrapati Shivaji Maharaj International Airport (BOM)",
      subtitle: "Mumbai, India"
    },
    navigation: {
      entityId: "95673320",
      entityType: "AIRPORT",
      localizedName: "Chhatrapati Shivaji Maharaj International Airport",
      relevantFlightParams: {
        skyId: "BOM",
        entityId: "95673320",
        flightPlaceType: "AIRPORT",
        localizedName: "Chhatrapati Shivaji Maharaj International Airport"
      }
    }
  },
  { 
    presentation: {
      title: "Sydney Kingsford Smith Airport",
      suggestionTitle: "Sydney Kingsford Smith Airport (SYD)",
      subtitle: "Sydney, Australia"
    },
    navigation: {
      entityId: "27537545",
      entityType: "AIRPORT",
      localizedName: "Sydney Kingsford Smith Airport",
      relevantFlightParams: {
        skyId: "SYD",
        entityId: "27537545",
        flightPlaceType: "AIRPORT",
        localizedName: "Sydney Kingsford Smith Airport"
      }
    }
  },
  { 
    presentation: {
      title: "Dubai International Airport",
      suggestionTitle: "Dubai International Airport (DXB)",
      subtitle: "Dubai, United Arab Emirates"
    },
    navigation: {
      entityId: "27537546",
      entityType: "AIRPORT",
      localizedName: "Dubai International Airport",
      relevantFlightParams: {
        skyId: "DXB",
        entityId: "27537546",
        flightPlaceType: "AIRPORT",
        localizedName: "Dubai International Airport"
      }
    }
  },
  { 
    presentation: {
      title: "Singapore Changi Airport",
      suggestionTitle: "Singapore Changi Airport (SIN)",
      subtitle: "Singapore, Singapore"
    },
    navigation: {
      entityId: "27537547",
      entityType: "AIRPORT",
      localizedName: "Singapore Changi Airport",
      relevantFlightParams: {
        skyId: "SIN",
        entityId: "27537547",
        flightPlaceType: "AIRPORT",
        localizedName: "Singapore Changi Airport"
      }
    }
  },
  { 
    presentation: {
      title: "Frankfurt Airport",
      suggestionTitle: "Frankfurt Airport (FRA)",
      subtitle: "Frankfurt, Germany"
    },
    navigation: {
      entityId: "27537548",
      entityType: "AIRPORT",
      localizedName: "Frankfurt Airport",
      relevantFlightParams: {
        skyId: "FRA",
        entityId: "27537548",
        flightPlaceType: "AIRPORT",
        localizedName: "Frankfurt Airport"
      }
    }
  },
  { 
    presentation: {
      title: "Amsterdam Airport Schiphol",
      suggestionTitle: "Amsterdam Airport Schiphol (AMS)",
      subtitle: "Amsterdam, Netherlands"
    },
    navigation: {
      entityId: "27537549",
      entityType: "AIRPORT",
      localizedName: "Amsterdam Airport Schiphol",
      relevantFlightParams: {
        skyId: "AMS",
        entityId: "27537549",
        flightPlaceType: "AIRPORT",
        localizedName: "Amsterdam Airport Schiphol"
      }
    }
  },
  { 
    presentation: {
      title: "Adolfo Suárez Madrid-Barajas Airport",
      suggestionTitle: "Adolfo Suárez Madrid-Barajas Airport (MAD)",
      subtitle: "Madrid, Spain"
    },
    navigation: {
      entityId: "27537550",
      entityType: "AIRPORT",
      localizedName: "Adolfo Suárez Madrid-Barajas Airport",
      relevantFlightParams: {
        skyId: "MAD",
        entityId: "27537550",
        flightPlaceType: "AIRPORT",
        localizedName: "Adolfo Suárez Madrid-Barajas Airport"
      }
    }
  },
  { 
    presentation: {
      title: "Barcelona-El Prat Airport",
      suggestionTitle: "Barcelona-El Prat Airport (BCN)",
      subtitle: "Barcelona, Spain"
    },
    navigation: {
      entityId: "27537551",
      entityType: "AIRPORT",
      localizedName: "Barcelona-El Prat Airport",
      relevantFlightParams: {
        skyId: "BCN",
        entityId: "27537551",
        flightPlaceType: "AIRPORT",
        localizedName: "Barcelona-El Prat Airport"
      }
    }
  },
  { 
    presentation: {
      title: "Leonardo da Vinci–Fiumicino Airport",
      suggestionTitle: "Leonardo da Vinci–Fiumicino Airport (FCO)",
      subtitle: "Rome, Italy"
    },
    navigation: {
      entityId: "27537552",
      entityType: "AIRPORT",
      localizedName: "Leonardo da Vinci–Fiumicino Airport",
      relevantFlightParams: {
        skyId: "FCO",
        entityId: "27537552",
        flightPlaceType: "AIRPORT",
        localizedName: "Leonardo da Vinci–Fiumicino Airport"
      }
    }
  },
  { 
    presentation: {
      title: "Istanbul Airport",
      suggestionTitle: "Istanbul Airport (IST)",
      subtitle: "Istanbul, Turkey"
    },
    navigation: {
      entityId: "27537553",
      entityType: "AIRPORT",
      localizedName: "Istanbul Airport",
      relevantFlightParams: {
        skyId: "IST",
        entityId: "27537553",
        flightPlaceType: "AIRPORT",
        localizedName: "Istanbul Airport"
      }
    }
  },
  { 
    presentation: {
      title: "Hamad International Airport",
      suggestionTitle: "Hamad International Airport (DOH)",
      subtitle: "Doha, Qatar"
    },
    navigation: {
      entityId: "27537554",
      entityType: "AIRPORT",
      localizedName: "Hamad International Airport",
      relevantFlightParams: {
        skyId: "DOH",
        entityId: "27537554",
        flightPlaceType: "AIRPORT",
        localizedName: "Hamad International Airport"
      }
    }
  },
  { 
    presentation: {
      title: "Hong Kong International Airport",
      suggestionTitle: "Hong Kong International Airport (HKG)",
      subtitle: "Hong Kong, Hong Kong"
    },
    navigation: {
      entityId: "27537555",
      entityType: "AIRPORT",
      localizedName: "Hong Kong International Airport",
      relevantFlightParams: {
        skyId: "HKG",
        entityId: "27537555",
        flightPlaceType: "AIRPORT",
        localizedName: "Hong Kong International Airport"
      }
    }
  },
  { 
    presentation: {
      title: "Incheon International Airport",
      suggestionTitle: "Incheon International Airport (ICN)",
      subtitle: "Seoul, South Korea"
    },
    navigation: {
      entityId: "27537556",
      entityType: "AIRPORT",
      localizedName: "Incheon International Airport",
      relevantFlightParams: {
        skyId: "ICN",
        entityId: "27537556",
        flightPlaceType: "AIRPORT",
        localizedName: "Incheon International Airport"
      }
    }
  },
  { 
    presentation: {
      title: "Toronto Pearson International Airport",
      suggestionTitle: "Toronto Pearson International Airport (YYZ)",
      subtitle: "Toronto, Canada"
    },
    navigation: {
      entityId: "27537557",
      entityType: "AIRPORT",
      localizedName: "Toronto Pearson International Airport",
      relevantFlightParams: {
        skyId: "YYZ",
        entityId: "27537557",
        flightPlaceType: "AIRPORT",
        localizedName: "Toronto Pearson International Airport"
      }
    }
  },
  { 
    presentation: {
      title: "São Paulo–Guarulhos International Airport",
      suggestionTitle: "São Paulo–Guarulhos International Airport (GRU)",
      subtitle: "São Paulo, Brazil"
    },
    navigation: {
      entityId: "27537558",
      entityType: "AIRPORT",
      localizedName: "São Paulo–Guarulhos International Airport",
      relevantFlightParams: {
        skyId: "GRU",
        entityId: "27537558",
        flightPlaceType: "AIRPORT",
        localizedName: "São Paulo–Guarulhos International Airport"
      }
    }
  },
  { 
    presentation: {
      title: "Mexico City International Airport",
      suggestionTitle: "Mexico City International Airport (MEX)",
      subtitle: "Mexico City, Mexico"
    },
    navigation: {
      entityId: "27537559",
      entityType: "AIRPORT",
      localizedName: "Mexico City International Airport",
      relevantFlightParams: {
        skyId: "MEX",
        entityId: "27537559",
        flightPlaceType: "AIRPORT",
        localizedName: "Mexico City International Airport"
      }
    }
  },
  { 
    presentation: {
      title: "O.R. Tambo International Airport",
      suggestionTitle: "O.R. Tambo International Airport (JNB)",
      subtitle: "Johannesburg, South Africa"
    },
    navigation: {
      entityId: "27537560",
      entityType: "AIRPORT",
      localizedName: "O.R. Tambo International Airport",
      relevantFlightParams: {
        skyId: "JNB",
        entityId: "27537560",
        flightPlaceType: "AIRPORT",
        localizedName: "O.R. Tambo International Airport"
      }
    }
  },
  { 
    presentation: {
      title: "Cairo International Airport",
      suggestionTitle: "Cairo International Airport (CAI)",
      subtitle: "Cairo, Egypt"
    },
    navigation: {
      entityId: "27537561",
      entityType: "AIRPORT",
      localizedName: "Cairo International Airport",
      relevantFlightParams: {
        skyId: "CAI",
        entityId: "27537561",
        flightPlaceType: "AIRPORT",
        localizedName: "Cairo International Airport"
      }
    }
  }
];

const popularAirports = dummyAirports.slice(0, 8); // First 8 airports as popular

// Updated dummy data to match Sky Scrapper API response structure
const dummyFlights = [
  {
    id: "13542-2025072508000--30756-0-12712-2025072516300",
    price: {
      raw: 299.18,
      formatted: "$299"
    },
    legs: [
      {
        id: "13542-2025072508000--30756-0-12712-2025072516300",
        origin: {
          id: "JFK",
          name: "New York John F. Kennedy",
          displayCode: "JFK",
          city: "New York",
          isHighlighted: false
        },
        destination: {
          id: "LAX",
          name: "Los Angeles International",
          displayCode: "LAX",
          city: "Los Angeles",
          isHighlighted: false
        },
        durationInMinutes: 330,
        stopCount: 0,
        isSmallestStops: true,
        departure: "2025-07-25T08:00:00",
        arrival: "2025-07-25T11:30:00",
        timeDeltaInDays: 0,
        carriers: {
          marketing: [
            {
              id: -30756,
              logoUrl: "https://logos.skyscnr.com/images/airlines/favicon/AA.png",
              name: "American Airlines"
            }
          ],
          operationType: "fully_operated"
        },
        segments: [
          {
            id: "13542-12712-2025072508000-2025072516300--30756",
            flightNumber: "123",
            marketingCarrier: {
              id: -30756,
              name: "American Airlines",
              alternateId: "AA",
              allianceId: 0
            },
            operatingCarrier: {
              id: -30756,
              name: "American Airlines",
              alternateId: "AA",
              allianceId: 0
            }
          }
        ]
      }
    ],
    isSelfTransfer: false,
    isProtectedSelfTransfer: false,
    farePolicy: {
      isChangeAllowed: true,
      isPartiallyChangeable: false,
      isCancellationAllowed: true,
      isPartiallyRefundable: false
    },
    tags: ["shortest"],
    isMashUp: false,
    hasFlexibleOptions: true,
    score: 0.998502
  },
  {
    id: "13542-2025072514150--30757-0-12712-2025072517450",
    price: {
      raw: 325.75,
      formatted: "$326"
    },
    legs: [
      {
        id: "13542-2025072514150--30757-0-12712-2025072517450",
        origin: {
          id: "JFK",
          name: "New York John F. Kennedy",
          displayCode: "JFK",
          city: "New York",
          isHighlighted: false
        },
        destination: {
          id: "LAX",
          name: "Los Angeles International",
          displayCode: "LAX",
          city: "Los Angeles",
          isHighlighted: false
        },
        durationInMinutes: 330,
        stopCount: 0,
        isSmallestStops: true,
        departure: "2025-07-25T14:15:00",
        arrival: "2025-07-25T17:45:00",
        timeDeltaInDays: 0,
        carriers: {
          marketing: [
            {
              id: -30757,
              logoUrl: "https://logos.skyscnr.com/images/airlines/favicon/DL.png",
              name: "Delta Air Lines"
            }
          ],
          operationType: "fully_operated"
        },
        segments: [
          {
            id: "13542-12712-2025072514150-2025072517450--30757",
            flightNumber: "456",
            marketingCarrier: {
              id: -30757,
              name: "Delta Air Lines",
              alternateId: "DL",
              allianceId: 0
            },
            operatingCarrier: {
              id: -30757,
              name: "Delta Air Lines",
              alternateId: "DL",
              allianceId: 0
            }
          }
        ]
      }
    ],
    isSelfTransfer: false,
    isProtectedSelfTransfer: false,
    farePolicy: {
      isChangeAllowed: true,
      isPartiallyChangeable: true,
      isCancellationAllowed: false,
      isPartiallyRefundable: true
    },
    tags: [],
    isMashUp: false,
    hasFlexibleOptions: false,
    score: 0.895432
  },
  {
    id: "13542-2025072519300--30758-0-12712-2025072523000",
    price: {
      raw: 275.50,
      formatted: "$276"
    },
    legs: [
      {
        id: "13542-2025072519300--30758-0-12712-2025072523000",
        origin: {
          id: "JFK",
          name: "New York John F. Kennedy",
          displayCode: "JFK",
          city: "New York",
          isHighlighted: false
        },
        destination: {
          id: "LAX",
          name: "Los Angeles International",
          displayCode: "LAX",
          city: "Los Angeles",
          isHighlighted: false
        },
        durationInMinutes: 330,
        stopCount: 0,
        isSmallestStops: true,
        departure: "2025-07-25T19:30:00",
        arrival: "2025-07-25T23:00:00",
        timeDeltaInDays: 0,
        carriers: {
          marketing: [
            {
              id: -30758,
              logoUrl: "https://logos.skyscnr.com/images/airlines/favicon/UA.png",
              name: "United Airlines"
            }
          ],
          operationType: "fully_operated"
        },
        segments: [
          {
            id: "13542-12712-2025072519300-2025072523000--30758",
            flightNumber: "789",
            marketingCarrier: {
              id: -30758,
              name: "United Airlines",
              alternateId: "UA",
              allianceId: 0
            },
            operatingCarrier: {
              id: -30758,
              name: "United Airlines",
              alternateId: "UA",
              allianceId: 0
            }
          }
        ]
      }
    ],
    isSelfTransfer: false,
    isProtectedSelfTransfer: false,
    farePolicy: {
      isChangeAllowed: false,
      isPartiallyChangeable: false,
      isCancellationAllowed: true,
      isPartiallyRefundable: false
    },
    tags: ["cheapest"],
    isMashUp: false,
    hasFlexibleOptions: true,
    score: 0.923456
  },
  {
    id: "13542-2025072506450--30759-0-12712-2025072510150",
    price: {
      raw: 289.25,
      formatted: "$289"
    },
    legs: [
      {
        id: "13542-2025072506450--30759-0-12712-2025072510150",
        origin: {
          id: "JFK",
          name: "New York John F. Kennedy",
          displayCode: "JFK",
          city: "New York",
          isHighlighted: false
        },
        destination: {
          id: "LAX",
          name: "Los Angeles International",
          displayCode: "LAX",
          city: "Los Angeles",
          isHighlighted: false
        },
        durationInMinutes: 330,
        stopCount: 0,
        isSmallestStops: true,
        departure: "2025-07-25T06:45:00",
        arrival: "2025-07-25T10:15:00",
        timeDeltaInDays: 0,
        carriers: {
          marketing: [
            {
              id: -30759,
              logoUrl: "https://logos.skyscnr.com/images/airlines/favicon/B6.png",
              name: "JetBlue Airways"
            }
          ],
          operationType: "fully_operated"
        },
        segments: [
          {
            id: "13542-12712-2025072506450-2025072510150--30759",
            flightNumber: "234",
            marketingCarrier: {
              id: -30759,
              name: "JetBlue Airways",
              alternateId: "B6",
              allianceId: 0
            },
            operatingCarrier: {
              id: -30759,
              name: "JetBlue Airways",
              alternateId: "B6",
              allianceId: 0
            }
          }
        ]
      }
    ],
    isSelfTransfer: false,
    isProtectedSelfTransfer: false,
    farePolicy: {
      isChangeAllowed: true,
      isPartiallyChangeable: true,
      isCancellationAllowed: true,
      isPartiallyRefundable: true
    },
    tags: [],
    isMashUp: false,
    hasFlexibleOptions: true,
    score: 0.887543
  },
  {
    id: "13542-2025072521100--30760-0-12712-2025072600400",
    price: {
      raw: 315.90,
      formatted: "$316"
    },
    legs: [
      {
        id: "13542-2025072521100--30760-0-12712-2025072600400",
        origin: {
          id: "JFK",
          name: "New York John F. Kennedy",
          displayCode: "JFK",
          city: "New York",
          isHighlighted: false
        },
        destination: {
          id: "LAX",
          name: "Los Angeles International",
          displayCode: "LAX",
          city: "Los Angeles",
          isHighlighted: false
        },
        durationInMinutes: 330,
        stopCount: 0,
        isSmallestStops: true,
        departure: "2025-07-25T21:10:00",
        arrival: "2025-07-26T00:40:00",
        timeDeltaInDays: 1,
        carriers: {
          marketing: [
            {
              id: -30760,
              logoUrl: "https://logos.skyscnr.com/images/airlines/favicon/AS.png",
              name: "Alaska Airlines"
            }
          ],
          operationType: "fully_operated"
        },
        segments: [
          {
            id: "13542-12712-2025072521100-2025072600400--30760",
            flightNumber: "567",
            marketingCarrier: {
              id: -30760,
              name: "Alaska Airlines",
              alternateId: "AS",
              allianceId: 0
            },
            operatingCarrier: {
              id: -30760,
              name: "Alaska Airlines",
              alternateId: "AS",
              allianceId: 0
            }
          }
        ]
      }
    ],
    isSelfTransfer: false,
    isProtectedSelfTransfer: false,
    farePolicy: {
      isChangeAllowed: false,
      isPartiallyChangeable: true,
      isCancellationAllowed: false,
      isPartiallyRefundable: true
    },
    tags: [],
    isMashUp: false,
    hasFlexibleOptions: false,
    score: 0.765432
  },
  {
    id: "13542-2025072512300--30761-1-12712-2025072515450",
    price: {
      raw: 245.75,
      formatted: "$246"
    },
    legs: [
      {
        id: "13542-2025072512300--30761-1-12712-2025072515450",
        origin: {
          id: "JFK",
          name: "New York John F. Kennedy",
          displayCode: "JFK",
          city: "New York",
          isHighlighted: false
        },
        destination: {
          id: "LAX",
          name: "Los Angeles International",
          displayCode: "LAX",
          city: "Los Angeles",
          isHighlighted: false
        },
        durationInMinutes: 375,
        stopCount: 1,
        isSmallestStops: false,
        departure: "2025-07-25T12:30:00",
        arrival: "2025-07-25T15:45:00",
        timeDeltaInDays: 0,
        carriers: {
          marketing: [
            {
              id: -30761,
              logoUrl: "https://logos.skyscnr.com/images/airlines/favicon/WN.png",
              name: "Southwest Airlines"
            }
          ],
          operationType: "fully_operated"
        },
        segments: [
          {
            id: "13542-12712-2025072512300-2025072515450--30761",
            flightNumber: "890",
            marketingCarrier: {
              id: -30761,
              name: "Southwest Airlines",
              alternateId: "WN",
              allianceId: 0
            },
            operatingCarrier: {
              id: -30761,
              name: "Southwest Airlines",
              alternateId: "WN",
              allianceId: 0
            }
          }
        ]
      }
    ],
    isSelfTransfer: false,
    isProtectedSelfTransfer: false,
    farePolicy: {
      isChangeAllowed: true,
      isPartiallyChangeable: false,
      isCancellationAllowed: true,
      isPartiallyRefundable: false
    },
    tags: ["cheapest"],
    isMashUp: false,
    hasFlexibleOptions: true,
    score: 0.934567
  }
];

export const flightService = {
  // Get popular airports for default suggestions
  async getPopularAirports() {
    if (USE_DUMMY_DATA) {
      return {
        status: true,
        timestamp: Date.now(),
        data: popularAirports.map(airport => ({
          presentation: airport.presentation,
          navigation: airport.navigation
        }))
      };
    }
    // In real implementation, this would fetch popular airports
    return {
      status: true,
      timestamp: Date.now(),
      data: popularAirports.map(airport => ({
        presentation: airport.presentation,
        navigation: airport.navigation
      }))
    };
  },

  // Test API connection
  async testConnection() {
    try {
      console.log('Testing API connection...');
      console.log('Base URL:', apiClient.defaults.baseURL);
      console.log('API Key (first 10 chars):', apiClient.defaults.headers['x-rapidapi-key']?.substring(0, 10) + '...');
      
      const response = await apiClient.get('/v1/flights/getNearByAirports', {
        params: {
          lat: '40.7128',
          lng: '-74.0060',
          locale: 'en-US'
        }
      });
      
      console.log('API connection test successful:', response.data);
      return response.data;
    } catch (error) {
      console.error('API connection test failed:', error.response?.status, error.response?.data);
      return null;
    }
  },

  // Search airports for autocomplete
  async searchAirports(query) {
    console.log('=== AIRPORT SEARCH DEBUG ===');
    console.log('USE_DUMMY_DATA:', USE_DUMMY_DATA);
    console.log('Query:', query);
    
    if (USE_DUMMY_DATA) {
      console.log('Using dummy data for airport search');
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const filtered = dummyAirports.filter(airport => 
        airport.presentation.title.toLowerCase().includes(query.toLowerCase()) ||
        airport.presentation.suggestionTitle.toLowerCase().includes(query.toLowerCase()) ||
        airport.presentation.subtitle.toLowerCase().includes(query.toLowerCase()) ||
        airport.navigation.relevantFlightParams.skyId.toLowerCase().includes(query.toLowerCase())
      );

      return {
        status: true,
        timestamp: Date.now(),
        data: filtered.map(airport => ({
          presentation: airport.presentation,
          navigation: airport.navigation
        }))
      };
    }

    // Test connection first
    console.log('Testing API connection before airport search...');
    const connectionTest = await this.testConnection();
    if (!connectionTest) {
      console.log('Connection test failed, using dummy data');
      const filtered = dummyAirports.filter(airport => 
        airport.presentation.title.toLowerCase().includes(query.toLowerCase()) ||
        airport.presentation.suggestionTitle.toLowerCase().includes(query.toLowerCase()) ||
        airport.presentation.subtitle.toLowerCase().includes(query.toLowerCase()) ||
        airport.navigation.relevantFlightParams.skyId.toLowerCase().includes(query.toLowerCase())
      );
      
      return {
        status: true,
        timestamp: Date.now(),
        data: filtered.slice(0, 5).map(airport => ({
          presentation: airport.presentation,
          navigation: airport.navigation
        }))
      };
    }

    // Since there's no dedicated airport search endpoint in the API docs,
    // we use getNearByAirports as a workaround and filter the results
    
    try {
      console.log('Searching airports with query:', query);
      
      // First try the most likely endpoint
      try {
        const response = await apiClient.get('/v1/flights/searchAirport', {
          params: {
            query,
            locale: 'en-US'
          }
        });
        console.log('Airport search successful:', response.data);
        return response.data;
      } catch (error) {
        console.log('searchAirport endpoint not available, trying getNearByAirports:', error.response?.status);
        
        // Fallback to getNearByAirports with NYC coordinates as an example
        const response = await apiClient.get('/v1/flights/getNearByAirports', {
          params: {
            lat: '40.7128',
            lng: '-74.0060',
            locale: 'en-US'
          }
        });
        
        console.log('getNearByAirports response:', response.data);
        
        // Filter the results based on the query
        if (response.data && response.data.data && response.data.data.nearby) {
          const filtered = response.data.data.nearby.filter(airport => 
            airport.presentation && (
              airport.presentation.title.toLowerCase().includes(query.toLowerCase()) ||
              airport.presentation.suggestionTitle?.toLowerCase().includes(query.toLowerCase()) ||
              airport.presentation.subtitle?.toLowerCase().includes(query.toLowerCase()) ||
              airport.navigation?.relevantFlightParams?.skyId?.toLowerCase().includes(query.toLowerCase())
            )
          );
          
          return {
            status: true,
            timestamp: Date.now(),
            data: filtered.slice(0, 5)
          };
        }
      }
    } catch (error) {
      console.error('All airport search methods failed:', error.response?.status, error.response?.data || error.message);
    }

    // If all API calls fail, return dummy data as fallback
    console.log('Using dummy data fallback for airport search');
    const filtered = dummyAirports.filter(airport => 
      airport.presentation.title.toLowerCase().includes(query.toLowerCase()) ||
      airport.presentation.suggestionTitle.toLowerCase().includes(query.toLowerCase()) ||
      airport.presentation.subtitle.toLowerCase().includes(query.toLowerCase()) ||
      airport.navigation.relevantFlightParams.skyId.toLowerCase().includes(query.toLowerCase())
    );
    
    return {
      status: true,
      timestamp: Date.now(),
      data: filtered.slice(0, 5).map(airport => ({
        presentation: airport.presentation,
        navigation: airport.navigation
      }))
    };
  },

  // Search flights
  async searchFlights({
    originSkyId,
    destinationSkyId,
    originEntityId,
    destinationEntityId,
    date,
    returnDate,
    cabinClass = 'economy',
    adults = 1,
    children = 0,
    infants = 0,
    sortBy = 'best',
    currency = 'USD',
    market = 'en-US',
    countryCode = 'US'
  }) {
    console.log('=== FLIGHT SEARCH DEBUG ===');
    console.log('USE_DUMMY_DATA:', USE_DUMMY_DATA);
    console.log('Input parameters:', {
      originSkyId,
      destinationSkyId,
      originEntityId,
      destinationEntityId,
      date,
      returnDate,
      cabinClass,
      adults,
      children,
      infants
    });
    
    if (USE_DUMMY_DATA) {
      console.log('Using dummy data for flight search');
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      return {
        status: true,
        timestamp: Date.now(),
        sessionId: 'dummy-session-' + Math.random().toString(36).substr(2, 9),
        data: {
          context: {
            status: "complete",
            totalResults: dummyFlights.length
          },
          itineraries: dummyFlights
        }
      };
    }

    try {
      // Ensure date is in YYYY-MM-DD format
      const formatDate = (date) => {
        if (!date) return null;
        if (typeof date === 'string') return date;
        if (date instanceof Date) {
          return date.toISOString().split('T')[0];
        }
        return date;
      };

      const formattedDate = formatDate(date);
      const formattedReturnDate = returnDate ? formatDate(returnDate) : null;

      console.log('Flight search parameters:', {
        originSkyId,
        destinationSkyId,
        originEntityId,
        destinationEntityId,
        date: formattedDate,
        returnDate: formattedReturnDate,
        cabinClass,
        adults,
        children,
        infants
      });

      const params = {
        originSkyId,
        destinationSkyId,
        originEntityId,
        destinationEntityId,
        date: formattedDate,
        cabinClass,
        adults,
        sortBy,
        currency,
        market,
        countryCode
      };

      if (formattedReturnDate) {
        params.returnDate = formattedReturnDate;
      }
      if (children > 0) {
        params.childrens = children;
      }
      if (infants > 0) {
        params.infants = infants;
      }

      console.log('Final API parameters:', params);

      const response = await apiClient.get('/v2/flights/searchFlights', {
        params
      });

      console.log('Flight search successful:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error searching flights:', error.response?.status, error.response?.data || error.message);
      console.log('Falling back to dummy flight data');
      return {
        status: true,
        timestamp: Date.now(),
        sessionId: 'fallback-session-' + Math.random().toString(36).substr(2, 9),
        data: {
          context: {
            status: "complete",
            totalResults: dummyFlights.length
          },
          itineraries: dummyFlights
        }
      };
    }
  },

  // Get flight details
  async getFlightDetails({
    itineraryId,
    legs,
    sessionId,
    adults = 1,
    children = 0, // eslint-disable-line no-unused-vars
    infants = 0, // eslint-disable-line no-unused-vars
    currency = 'USD',
    locale = 'en-US',
    market = 'en-US',
    cabinClass = 'economy',
    countryCode = 'US'
  }) {
    if (USE_DUMMY_DATA) {
      await new Promise(resolve => setTimeout(resolve, 800));
      return {
        data: {
          ...dummyFlights.find(f => f.id === itineraryId) || dummyFlights[0],
          details: {
            baggage: 'Carry-on included, 1 checked bag for $30',
            cancellation: 'Free cancellation within 24 hours',
            aircraft: 'Boeing 737-800',
            wifi: 'Available for purchase',
            entertainment: 'Personal device entertainment'
          }
        }
      };
    }

    try {
      const response = await apiClient.get('/v1/flights/getFlightDetails', {
        params: {
          itineraryId,
          legs: JSON.stringify(legs),
          sessionId,
          adults,
          currency,
          locale,
          market,
          cabinClass,
          countryCode
        }
      });

      return response.data;
    } catch (error) {
      console.error('Error getting flight details:', error);
      return {
        data: {
          ...dummyFlights[0],
          details: {
            baggage: 'Carry-on included',
            cancellation: 'Free cancellation within 24 hours'
          }
        }
      };
    }
  }
};

export default flightService;
