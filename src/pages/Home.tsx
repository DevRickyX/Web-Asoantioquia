import { HeroSection } from '../components/HeroSection';
import { RecyclingImportanceSection } from '../components/RecyclingImportanceSection';
import { NewsSection } from '../components/NewsSection';
import { ContactForm } from '../components/ContactForm';
import { LocationsSection } from '../components/LocationsSection';
import { ActivitiesGallerySection } from '../components/ActivitiesGallerySection';

export function Home() {
  return (
    <>
      <HeroSection />
      {/* Cifras de impacto ocultas hasta contar con datos verificados. */}
      <RecyclingImportanceSection />
      {/* <PartnersSection /> */}
      <ActivitiesGallerySection />
      <NewsSection />
      <ContactForm />
      <LocationsSection />
    </>
  );
}
