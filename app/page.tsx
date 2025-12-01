import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ServicesGrid } from "@/components/services-grid"
import { Footer } from "@/components/footer"
import { AiGuide } from "@/components/ai-guide"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <ServicesGrid />
      <Footer />
      <AiGuide />
    </main>
  )
}
