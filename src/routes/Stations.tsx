import { useState } from 'react'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'

interface Station {
  id: string
  name: string
  address: string
  city: string
  lat: number
  lng: number
  chargers: {
    type: string
    power: string
    available: number
    total: number
  }[]
  amenities: string[]
  status: 'available' | 'busy' | 'offline'
  operatingHours: string
}

const Stations = () => {
  const [selectedCity, setSelectedCity] = useState<string>('all')
  const [selectedChargerType, setSelectedChargerType] = useState<string>('all')

  const cities = ['all', 'Colombo', 'Kandy', 'Galle', 'Negombo', 'Jaffna']
  const chargerTypes = ['all', 'Level 2', 'DC Fast', 'Tesla Supercharger']

  // Mock stations data
  const stations: Station[] = [
    // {
    //   id: '1',
    //   name: 'LankaEVPlus Hub - Colombo Fort',
    //   address: '123 Main Street, Fort',
    //   city: 'Colombo',
    //   lat: 6.9271,
    //   lng: 79.8612,
    //   chargers: [
    //     { type: 'DC Fast', power: '50kW', available: 2, total: 4 },
    //     { type: 'Level 2', power: '22kW', available: 3, total: 4 },
    //   ],
    //   amenities: ['Wifi', 'Restrooms', 'Cafe', 'Parking'],
    //   status: 'available',
    //   operatingHours: '24/7',
    // },
    // {
    //   id: '2',
    //   name: 'ODEL City Centre',
    //   address: 'Alexandra Place, Colombo 7',
    //   city: 'Colombo',
    //   lat: 6.9147,
    //   lng: 79.8536,
    //   chargers: [
    //     { type: 'Level 2', power: '22kW', available: 1, total: 2 },
    //   ],
    //   amenities: ['Shopping', 'Restrooms', 'Parking'],
    //   status: 'busy',
    //   operatingHours: '9:00 AM - 9:00 PM',
    // },
    // {
    //   id: '3',
    //   name: 'Kandy City Center Station',
    //   address: 'Dalada Veediya, Kandy',
    //   city: 'Kandy',
    //   lat: 7.2906,
    //   lng: 80.6337,
    //   chargers: [
    //     { type: 'DC Fast', power: '100kW', available: 1, total: 2 },
    //     { type: 'Level 2', power: '11kW', available: 4, total: 4 },
    //   ],
    //   amenities: ['Wifi', 'Restrooms', 'Restaurant'],
    //   status: 'available',
    //   operatingHours: '6:00 AM - 10:00 PM',
    // },
    // {
    //   id: '4',
    //   name: 'Galle Fort Charging Point',
    //   address: 'Rampart Street, Galle Fort',
    //   city: 'Galle',
    //   lat: 6.0269,
    //   lng: 80.2170,
    //   chargers: [
    //     { type: 'Level 2', power: '7kW', available: 2, total: 2 },
    //   ],
    //   amenities: ['Parking', 'Tourist Area'],
    //   status: 'available',
    //   operatingHours: '8:00 AM - 8:00 PM',
    // },
    // {
    //   id: '5',
    //   name: 'Negombo Beach Hub',
    //   address: 'Lewis Place, Negombo',
    //   city: 'Negombo',
    //   lat: 7.2094,
    //   lng: 79.8358,
    //   chargers: [
    //     { type: 'DC Fast', power: '50kW', available: 0, total: 2 },
    //     { type: 'Level 2', power: '22kW', available: 2, total: 3 },
    //   ],
    //   amenities: ['Beach Access', 'Restrooms', 'Cafe'],
    //   status: 'busy',
    //   operatingHours: '24/7',
    // },
  ]

  const filteredStations = stations.filter((station) => {
    if (selectedCity !== 'all' && station.city !== selectedCity) return false
    if (selectedChargerType !== 'all') {
      const hasType = station.chargers.some((c) => c.type === selectedChargerType)
      if (!hasType) return false
    }
    return true
  })

  const getStatusColor = (status: Station['status']) => {
    switch (status) {
      case 'available':
        return 'bg-primary-500'
      case 'busy':
        return 'bg-amber-500'
      case 'offline':
        return 'bg-red-500'
    }
  }

  const getStatusText = (status: Station['status']) => {
    switch (status) {
      case 'available':
        return 'Available'
      case 'busy':
        return 'Busy'
      case 'offline':
        return 'Offline'
    }
  }

  return (
    <>
      <SEO
        title="Charging Stations Map - Find EV Chargers Near You"
        description="Find EV charging stations across Sri Lanka. Real-time availability, charger types, and amenities. Locate your nearest charging point."
        keywords="EV charging stations, charging map, EV charger locator, Sri Lanka charging network"
      />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-12 overflow-hidden bg-dark-950">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-950 to-dark-950" />
          <motion.div
            className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-primary-500/10 rounded-full blur-[100px]"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        </div>
        
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-primary-400 mb-4 block">
              Find Charging Stations
            </span>
            
            <h1 className="display-font text-5xl sm:text-6xl lg:text-7xl text-white mb-6">
              CHARGING MAP
            </h1>
            <p className="text-lg text-dark-300 max-w-2xl mx-auto">
              Real-time availability of charging stations across Sri Lanka.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Map & Stations */}
      <section className="py-8 bg-dark-950">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Filters & Station List */}
            <div className="lg:col-span-1 order-2 lg:order-1">
              {/* Filters */}
              <div className="bg-dark-900 border border-white/5 p-6 mb-6">
                <h3 className="text-white font-semibold mb-4">Filters</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-dark-400 text-sm block mb-2">City</label>
                    <select
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      className="w-full bg-dark-800 border border-white/10 text-white px-4 py-3 focus:border-primary-500 focus:outline-none"
                    >
                      {cities.map((city) => (
                        <option key={city} value={city}>
                          {city === 'all' ? 'All Cities' : city}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="text-dark-400 text-sm block mb-2">Charger Type</label>
                    <select
                      value={selectedChargerType}
                      onChange={(e) => setSelectedChargerType(e.target.value)}
                      className="w-full bg-dark-800 border border-white/10 text-white px-4 py-3 focus:border-primary-500 focus:outline-none"
                    >
                      {chargerTypes.map((type) => (
                        <option key={type} value={type}>
                          {type === 'all' ? 'All Types' : type}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Station List */}
              <div className="space-y-4 max-h-[600px] overflow-y-auto scrollbar-thin">
                {filteredStations.map((station, index) => (
                  <motion.div
                    key={station.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="bg-dark-900 border border-white/5 p-5 hover:border-primary-500/30 transition-colors cursor-pointer"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="text-white font-semibold mb-1">{station.name}</h4>
                        <p className="text-dark-400 text-sm">{station.address}</p>
                      </div>
                      <span className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${
                        station.status === 'available' ? 'bg-primary-500/20 text-primary-400' :
                        station.status === 'busy' ? 'bg-amber-500/20 text-amber-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${getStatusColor(station.status)}`} />
                        {getStatusText(station.status)}
                      </span>
                    </div>

                    {/* Chargers */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {station.chargers.map((charger, i) => (
                        <span key={i} className="px-2 py-1 bg-dark-800 text-dark-300 text-xs rounded">
                          {charger.type} • {charger.power} • {charger.available}/{charger.total} free
                        </span>
                      ))}
                    </div>

                    {/* Amenities */}
                    <div className="flex flex-wrap gap-1.5">
                      {station.amenities.slice(0, 3).map((amenity) => (
                        <span key={amenity} className="px-2 py-0.5 bg-dark-800/50 text-dark-500 text-xs">
                          {amenity}
                        </span>
                      ))}
                      {station.amenities.length > 3 && (
                        <span className="px-2 py-0.5 text-dark-500 text-xs">
                          +{station.amenities.length - 3} more
                        </span>
                      )}
                    </div>

                    <div className="mt-3 pt-3 border-t border-white/5 flex justify-between items-center">
                      <span className="text-dark-500 text-xs">{station.operatingHours}</span>
                      <button className="text-primary-400 text-sm font-medium hover:text-primary-300 transition-colors">
                        Directions →
                      </button>
                    </div>
                  </motion.div>
                ))}

                {filteredStations.length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-dark-500 mb-2">No stations found</div>
                    <button
                      onClick={() => {
                        setSelectedCity('all')
                        setSelectedChargerType('all')
                      }}
                      className="text-primary-400 text-sm hover:text-primary-300"
                    >
                      Clear filters
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Map */}
            <div className="lg:col-span-2 order-1 lg:order-2">
              <div className="bg-dark-900 border border-white/5 rounded-lg overflow-hidden h-[400px] lg:h-[700px] relative">
                {/* Map placeholder - would integrate real map here */}
                <div className="absolute inset-0 bg-gradient-to-br from-dark-800 to-dark-900">
                  {/* Grid pattern */}
                  <div 
                    className="absolute inset-0 opacity-30"
                    style={{
                      backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
                      backgroundSize: '40px 40px'
                    }}
                  />
                  
                  {/* Map outline of Sri Lanka */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-64 h-96">
                      {/* Station markers */}
                      {filteredStations.map((station, index) => (
                        <motion.div
                          key={station.id}
                          className="absolute cursor-pointer group"
                          style={{
                            left: `${30 + (index * 15) % 60}%`,
                            top: `${20 + (index * 20) % 60}%`,
                          }}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className={`w-4 h-4 ${getStatusColor(station.status)} rounded-full shadow-lg animate-pulse`} />
                          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-dark-900 border border-white/10 px-3 py-2 rounded shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                            <div className="text-white text-sm font-medium">{station.name}</div>
                            <div className="text-dark-400 text-xs">{station.city}</div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Map Legend */}
                  <div className="absolute bottom-6 left-6 bg-dark-950/90 border border-white/10 p-4 rounded-lg">
                    <div className="text-xs text-dark-400 uppercase tracking-wider mb-3">Legend</div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 bg-primary-500 rounded-full" />
                        <span className="text-dark-300 text-sm">Available</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 bg-amber-500 rounded-full" />
                        <span className="text-dark-300 text-sm">Busy</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 bg-red-500 rounded-full" />
                        <span className="text-dark-300 text-sm">Offline</span>
                      </div>
                    </div>
                  </div>

                  {/* Map Controls Placeholder */}
                  <div className="absolute top-6 right-6 flex flex-col gap-2">
                    <button className="w-10 h-10 bg-dark-900 border border-white/10 text-white hover:bg-dark-800 transition-colors flex items-center justify-center">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </button>
                    <button className="w-10 h-10 bg-dark-900 border border-white/10 text-white hover:bg-dark-800 transition-colors flex items-center justify-center">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    </button>
                    <button className="w-10 h-10 bg-dark-900 border border-white/10 text-white hover:bg-dark-800 transition-colors flex items-center justify-center">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                    </button>
                  </div>

                  {/* Coming Soon Note */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <svg className="w-16 h-16 text-primary-500/50 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                      <p className="text-dark-400 text-lg">Interactive map coming soon</p>
                      <p className="text-dark-500 text-sm mt-2">Browse stations from the list</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Download App CTA */}
      <section className="py-24 bg-dark-900 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 text-center">
          <h2 className="display-font text-4xl sm:text-5xl text-white mb-6">
            GET THE APP
          </h2>
          <p className="text-dark-400 max-w-xl mx-auto mb-8">
            Download the LankaEVPlus app for real-time updates, navigation, and seamless payments.
          </p>
          <div className="flex justify-center gap-4">
            <a href="#" className="block w-40 opacity-80 hover:opacity-100 transition-opacity">
              <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="Download on App Store" className="w-full" />
            </a>
            <a href="#" className="block w-40 opacity-80 hover:opacity-100 transition-opacity">
              <img src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" alt="Get it on Google Play" className="w-full" />
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

export default Stations
