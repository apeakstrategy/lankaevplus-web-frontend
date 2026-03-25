// Product data and types

export interface Product {
  id: string
  name: string
  description: string
  price: number
  image?: string
  category: 'solar-panels' | 'inverters' | 'batteries' | 'accessories' | 'systems'
  inStock: boolean
  rating?: number
  specifications?: Record<string, string>
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Solar Panel 300W Monocrystalline',
    description: 'High-efficiency monocrystalline solar panel perfect for residential installations. 25-year warranty.',
    price: 45000,
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=600&fit=crop',
    category: 'solar-panels',
    inStock: true,
    rating: 4.8,
    specifications: {
      'Power': '300W',
      'Type': 'Monocrystalline',
      'Efficiency': '20.5%',
      'Warranty': '25 years',
    },
  },
  {
    id: '2',
    name: 'Solar Panel 400W Monocrystalline',
    description: 'Premium 400W solar panel with advanced cell technology for maximum energy output.',
    price: 60000,
    image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800&h=600&fit=crop',
    category: 'solar-panels',
    inStock: true,
    rating: 4.9,
    specifications: {
      'Power': '400W',
      'Type': 'Monocrystalline',
      'Efficiency': '21.2%',
      'Warranty': '25 years',
    },
  },
  {
    id: '3',
    name: 'Hybrid Inverter 5KW',
    description: 'Smart hybrid inverter with battery backup capability. Perfect for grid-tie and off-grid systems.',
    price: 125000,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
    category: 'inverters',
    inStock: true,
    rating: 4.7,
    specifications: {
      'Power': '5KW',
      'Type': 'Hybrid',
      'Battery Support': 'Yes',
      'Warranty': '5 years',
    },
  },
  {
    id: '4',
    name: 'Lithium Battery 5KWh',
    description: 'High-capacity lithium battery for solar energy storage. Long lifespan and fast charging.',
    price: 180000,
    image: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=800&h=600&fit=crop',
    category: 'batteries',
    inStock: true,
    rating: 4.6,
    specifications: {
      'Capacity': '5KWh',
      'Type': 'Lithium',
      'Lifespan': '10+ years',
      'Warranty': '5 years',
    },
  },
  {
    id: '5',
    name: 'Complete Solar System 3KW',
    description: 'Complete 3KW solar system including panels, inverter, mounting, and installation. Perfect starter package.',
    price: 450000,
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&h=600&fit=crop',
    category: 'systems',
    inStock: true,
    rating: 4.9,
    specifications: {
      'System Size': '3KW',
      'Components': 'Panels + Inverter + Mounting',
      'Installation': 'Included',
      'Warranty': '5 years',
    },
  },
  {
    id: '6',
    name: 'Complete Solar System 5KW',
    description: 'Premium 5KW solar system with high-efficiency panels and hybrid inverter. Ideal for larger homes.',
    price: 750000,
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=600&fit=crop',
    category: 'systems',
    inStock: true,
    rating: 5.0,
    specifications: {
      'System Size': '5KW',
      'Components': 'Panels + Inverter + Mounting',
      'Installation': 'Included',
      'Warranty': '5 years',
    },
  },
  {
    id: '7',
    name: 'Solar Mounting Kit',
    description: 'Complete mounting kit for rooftop solar installation. Weather-resistant and durable.',
    price: 35000,
    image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&h=600&fit=crop',
    category: 'accessories',
    inStock: true,
    rating: 4.5,
    specifications: {
      'Material': 'Aluminum',
      'Capacity': 'Up to 20 panels',
      'Warranty': '10 years',
    },
  },
  {
    id: '8',
    name: 'Solar Monitoring System',
    description: 'Smart monitoring system to track your solar energy production in real-time via mobile app.',
    price: 25000,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    category: 'accessories',
    inStock: true,
    rating: 4.7,
    specifications: {
      'Connectivity': 'WiFi + Mobile App',
      'Features': 'Real-time monitoring',
      'Warranty': '2 years',
    },
  },
]

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id)
}

export const getProductsByCategory = (category: Product['category']): Product[] => {
  return products.filter(product => product.category === category)
}

