import React from 'react';
import { CompareProvider } from '@/contexts/CompareContextAstro';
import Header from '../Header';
import Footer from '../Footer';
import ScrollToTop from '../ScrollToTop';
import { Toaster } from '../ui/toaster';
import CatalogPage from './CatalogPage';
import CatalogHeader from './CatalogHeader';
import { Truck } from '@/models/TruckTypes';

interface CatalogPageWithProviderProps {
  initialVehicles: Truck[];
  initialVehicleCount: number;
  initialSearchQuery?: string;
}

const CatalogPageWithProvider: React.FC<CatalogPageWithProviderProps> = ({
  initialVehicles,
  initialVehicleCount,
  initialSearchQuery
}) => {
  return (
    <CompareProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <div className="container mx-auto px-4 py-8">
            <CatalogHeader initialVehicleCount={initialVehicleCount} />
            <CatalogPage initialVehicles={initialVehicles} initialSearchQuery={initialSearchQuery} />
          </div>
        </main>
        <Footer />
        <ScrollToTop />
        <Toaster />
      </div>
    </CompareProvider>
  );
};

export default CatalogPageWithProvider;
