import { HeroSection } from '../components/HeroSection';
import { StatsSection } from '../components/StatsSection';
import { ServicesSection } from '../components/ServicesSection';
import { NewsSection } from '../components/NewsSection';
import { ContactForm } from '../components/ContactForm';
import { RecyclersSection } from '../components/RecyclersSection';
import { LocationsSection } from '../components/LocationsSection';
import { PartnersSection } from '../components/PartnersSection';
import { ActivitiesGallerySection } from '../components/ActivitiesGallerySection';

export function Home() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <PartnersSection />
      <ActivitiesGallerySection />
      <NewsSection />
      <RecyclersSection />
      <ContactForm />
      <LocationsSection />
    </>
  );
}
