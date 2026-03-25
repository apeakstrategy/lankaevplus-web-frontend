import { lazy, Suspense } from 'react'
import SEO from '../components/SEO'

// Lazy load sections for better performance
const HeroEV = lazy(() => import('../components/sections/HeroEV'))
const FeaturedProducts = lazy(() => import('../components/sections/FeaturedProducts'))
// const StatsSection = lazy(() => import('../components/sections/StatsSection'))
// const Testimonials = lazy(() => import('../components/sections/Testimonials'))
const CTASection = lazy(() => import('../components/sections/CTASection'))

const Home = () => {
  return (
    <>
      <SEO
        title="LankaEVPlus - Powering the EV Revolution in Sri Lanka"
        description="Sri Lanka's leading EV charging solutions. Premium EV chargers, electric scooters, and a complete charging ecosystem. Shop EV chargers, explore our charging network, and join the electric revolution."
        keywords="EV chargers Sri Lanka, electric vehicle charging, EV ecosystem, electric scooters, charging stations Sri Lanka, home EV charger, commercial EV charging, DC fast charger"
      />
      <Suspense fallback={<div className="min-h-screen bg-dark-950" />}>
        <HeroEV />
        <FeaturedProducts />
        {/* <StatsSection /> - Hidden per user request */}
        {/* <Testimonials /> - Hidden per user request */}
        <CTASection />
      </Suspense>
    </>
  )
}

export default Home
