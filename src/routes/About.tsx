import { lazy, Suspense } from 'react'
import SEO from '../components/SEO'

const AboutHero = lazy(() => import('../components/sections/AboutHero'))
const StorySplitSection = lazy(() => import('../components/sections/StorySplitSection'))
const LegacyStats = lazy(() => import('../components/sections/LegacyStats'))
const VisionMissionCards = lazy(() => import('../components/sections/VisionMissionCards'))
const ValuesGrid = lazy(() => import('../components/sections/ValuesGrid'))
const JourneyTimeline = lazy(() => import('../components/sections/JourneyTimeline'))
const AboutCTASection = lazy(() => import('../components/sections/AboutCTASection'))

const About = () => {
  return (
    <>
      <SEO
        title="About LankaEVPlus - Powering Sri Lanka's EV Revolution"
        description="Learn about LankaEVPlus, Sri Lanka's premium EV charging solutions provider. Our mission, vision, and the legacy driving sustainable mobility forward."
        keywords="about LankaEVPlus, EV company Sri Lanka, electric vehicle Sri Lanka, sustainable mobility"
      />
      
      <Suspense fallback={<div className="min-h-[100svh] bg-dark-950 flex flex-col justify-center items-center"><div className="w-12 h-12 border-2 border-primary-500/20 border-t-primary-500 rounded-full animate-spin"/></div>}>
        <AboutHero />
        <StorySplitSection />
        <LegacyStats />
        <VisionMissionCards />
        <ValuesGrid />
        <JourneyTimeline />
        <AboutCTASection />
      </Suspense>
    </>
  )
}

export default About
