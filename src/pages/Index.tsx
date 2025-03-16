
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import BlockchainVisual from '../components/BlockchainVisual';
import ContractAnalyzer from '../components/ContractAnalyzer';
import DashboardPreview from '../components/DashboardPreview';
import Footer from '../components/Footer';

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <BlockchainVisual />
        <ContractAnalyzer />
        <DashboardPreview />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
