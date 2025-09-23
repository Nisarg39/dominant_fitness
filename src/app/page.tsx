import HeroSection from '@/components/HeroSection'
import Navigation from '@/components/Navigation'
import AboutSection from '@/components/AboutSection'
import SpecialAbout from '@/components/SpecialAbout'
import SpecialAbout1 from '@/components/SpecialAbout1'
import BikesParallax from '@/components/animatedComponents/BikesParallax'
import HowToDominate from '@/components/HowToDominate'
import ContacUs from '@/components/ContacUs'

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Navigation />
      <HeroSection />
      <SpecialAbout1 />
      <SpecialAbout />
      <HowToDominate />
      <AboutSection />
      {/* <BikesParallax /> */}
      <ContacUs />
    </main>
  )
}
