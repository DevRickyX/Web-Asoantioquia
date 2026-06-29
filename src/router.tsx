import { createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import { Root } from './components/Root';
import { Home } from './pages/Home';
import { Mission } from './pages/Mission';
import { SocialResponsibility } from './pages/SocialResponsibility';
import { Values } from './pages/Values';
import { Services } from './pages/Services';
import { Impact } from './pages/Impact';
import { Contact } from './pages/Contact';
import { NewsDetail } from './pages/NewsDetail';
import { TermsConditions } from './pages/TermsConditions';
import { Locations } from './pages/Locations';
import { LocationDetail } from './pages/LocationDetail';
import { AdminDashboard } from './pages/AdminDashboard';

const rootRoute = createRootRoute({
  component: Root,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});

const missionRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/mision-vision',
  component: Mission,
});

const socialResponsibilityRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/responsabilidad-social',
  component: SocialResponsibility,
});

const valuesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/valores',
  component: Values,
});

const servicesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/servicios',
  component: Services,
});

const impactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/impacto',
  component: Impact,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contacto',
  component: Contact,
});

const locationsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/sedes',
  component: Locations,
});

const locationDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/sedes/$slug',
  component: LocationDetail,
});

const newsDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/noticias/$slug',
  component: NewsDetail,
});

const termsConditionsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/terminos-condiciones',
  component: TermsConditions,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: AdminDashboard,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  missionRoute,
  socialResponsibilityRoute,
  valuesRoute,
  servicesRoute,
  impactRoute,
  contactRoute,
  locationsRoute,
  locationDetailRoute,
  newsDetailRoute,
  termsConditionsRoute,
  adminRoute,
]);

export const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
