
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, BarChart2, MessageSquare, ChevronRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative pb-16 pt-32 md:pt-40 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-mesh -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:max-w-2xl fade-in">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-brand/30 bg-brand/5 text-brand mb-6">
              <span className="text-sm font-medium">The future of DeFi risk analysis</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              Comprehensive <span className="text-gradient from-brand to-defi-purple">risk analysis</span> for the decentralized finance ecosystem
            </h1>
            
            <p className="text-lg md:text-xl text-foreground/80 mb-8 max-w-2xl">
              AssureFi combines smart contract analysis, liquidity monitoring, and social sentiment to provide you with the most comprehensive risk assessment tool in DeFi.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/dashboard" 
                className="px-8 py-3 rounded-full bg-brand hover:bg-brand-dark text-white font-medium transition-colors shadow-lg shadow-brand/20 hover-lift"
              >
                Launch App
              </Link>
              <Link 
                to="/about" 
                className="px-8 py-3 rounded-full border border-gray-300 dark:border-gray-700 hover:border-brand hover:text-brand font-medium transition-colors hover-lift flex items-center justify-center"
              >
                Learn More <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
          
          <div className="w-full md:w-auto scale-in">
            <div className="relative w-full max-w-sm mx-auto">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand/10 rounded-full backdrop-blur-3xl animate-pulse-soft"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-defi-purple/10 rounded-full backdrop-blur-3xl animate-pulse-soft"></div>
              
              <div className="glass-panel p-6 relative animate-float">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-risk-low"></div>
                    <div className="text-sm font-medium">AssureFi Status</div>
                  </div>
                  <div className="text-xs text-white/70">Live Network</div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-white/70">Risk Score</div>
                    <div className="text-sm font-medium">12 <span className="text-risk-low">(Low)</span></div>
                  </div>
                  
                  <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-risk-low h-full rounded-full" style={{ width: '12%' }}></div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <div className="p-2 rounded-lg bg-white/5">
                      <div className="text-xs text-white/70">Contract Audit</div>
                      <div className="text-sm font-medium text-risk-low">Verified</div>
                    </div>
                    
                    <div className="p-2 rounded-lg bg-white/5">
                      <div className="text-xs text-white/70">Liquidity</div>
                      <div className="text-sm font-medium">$12.5M</div>
                    </div>
                    
                    <div className="p-2 rounded-lg bg-white/5">
                      <div className="text-xs text-white/70">24h Volume</div>
                      <div className="text-sm font-medium">$4.2M</div>
                    </div>
                    
                    <div className="p-2 rounded-lg bg-white/5">
                      <div className="text-xs text-white/70">Sentiment</div>
                      <div className="text-sm font-medium text-risk-low">Positive</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 fade-in">
          <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 hover:border-brand/50 hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 rounded-full bg-defi-blue/10 flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-defi-blue" />
            </div>
            <h3 className="font-semibold text-xl mb-2">Smart Contract Analysis</h3>
            <p className="text-foreground/70">
              Identify vulnerabilities and security risks in smart contracts before they impact your investments.
            </p>
          </div>
          
          <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 hover:border-brand/50 hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 rounded-full bg-defi-teal/10 flex items-center justify-center mb-4">
              <BarChart2 className="h-6 w-6 text-defi-teal" />
            </div>
            <h3 className="font-semibold text-xl mb-2">Liquidity Monitoring</h3>
            <p className="text-foreground/70">
              Real-time tracking of liquidity changes to detect potential rug pulls and other malicious activities.
            </p>
          </div>
          
          <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 hover:border-brand/50 hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 rounded-full bg-defi-purple/10 flex items-center justify-center mb-4">
              <MessageSquare className="h-6 w-6 text-defi-purple" />
            </div>
            <h3 className="font-semibold text-xl mb-2">Sentiment Analysis</h3>
            <p className="text-foreground/70">
              Analyze social media signals to gauge community sentiment and identify potential red flags.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
