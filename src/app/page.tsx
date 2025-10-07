import HeroSection from '@/components/HeroSection'
import Navigation from '@/components/Navigation'
import AboutSection from '@/components/AboutSection'
import SpecialAbout from '@/components/SpecialAbout'
import Services from '@/components/Services'
import BikesParallax from '@/components/animatedComponents/BikesParallax'
import HowToDominate from '@/components/HowToDominate'
import ContacUs from '@/components/ContacUs'
import Testimonials from '@/components/Testimonials'

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Navigation />
      <HeroSection />
      <Services />
      {/* <SpecialAbout /> */}
      <HowToDominate />
      <AboutSection />
      <Testimonials />
      {/* <BikesParallax /> */}
      <ContacUs />
    </main>
  )
}
