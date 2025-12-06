import React from 'react';
import { CompareProvider } from '@/contexts/CompareContextAstro';
import Layout from './Layout';

interface LayoutWithProviderProps {
  children: React.ReactNode;
}

const LayoutWithProvider: React.FC<LayoutWithProviderProps> = ({ children }) => {
  return (
    <CompareProvider>
      <Layout>
        {children}
      </Layout>
    </CompareProvider>
  );
};

export default LayoutWithProvider;
