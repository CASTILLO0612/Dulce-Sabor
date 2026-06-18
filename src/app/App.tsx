import '../styles/fonts.css';
import { Navbar } from '../modules/layout/Navbar';
import { HeroSection } from '../modules/layout/HeroSection';
import { AboutSection } from '../modules/layout/AboutSection';
import { CatalogSection } from '../modules/catalog/components/CatalogSection';
import { GallerySection } from '../modules/catalog/components/GallerySection';
import { HowToBuySection } from '../modules/layout/HowToBuySection';
import { LocationSection } from '../modules/layout/LocationSection';
import { FAQSection } from '../modules/layout/FAQSection';
import { Footer } from '../modules/layout/Footer';
import { ChatBot } from '../modules/chatbot/components/ChatBot';

export default function App() {
  return (
    <div
      style={{
        fontFamily: "'Inter', sans-serif",
        background: '#FAFAF8',
        minHeight: '100vh',
        overflowX: 'hidden',
      }}
    >
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <CatalogSection />
        <GallerySection />
        <HowToBuySection />
        <LocationSection />
        <FAQSection />
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
}

