
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import RiskCard from '../components/RiskCard';
import Footer from '../components/Footer';
import { Search, Filter, RefreshCcw } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';

const Dashboard = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="mb-8 fade-in">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Risk Analysis Dashboard</h1>
            <p className="text-foreground/70">
              Monitor and analyze risks across multiple tokens and projects in one centralized dashboard.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 mb-8 fade-in">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/40" />
              <input 
                type="search" 
                placeholder="Search for a token or contract address..." 
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 focus:ring-brand focus:border-brand dark:bg-gray-800"
              />
            </div>
            
            <button className="flex items-center justify-center px-5 py-3 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-brand hover:text-brand transition-colors">
              <Filter className="h-5 w-5 mr-2" />
              Filters
            </button>
            
            <button className="flex items-center justify-center px-5 py-3 rounded-xl bg-brand hover:bg-brand-dark text-white transition-colors">
              <RefreshCcw className="h-5 w-5 mr-2" />
              Refresh Data
            </button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 scale-in">
            <div className="lg:col-span-3">
              <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                <h2 className="text-xl font-semibold mb-4">Overall Risk Summary</h2>
                <div className="flex flex-wrap gap-6">
                  <div className="flex-1 min-w-[200px]">
                    <div className="text-sm text-foreground/60 mb-1">Overall Risk Score</div>
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold">65</span>
                      <span className="text-foreground/60 text-sm ml-1">/100</span>
                    </div>
                    <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full relative overflow-hidden mt-2">
                      <div className="absolute top-0 left-0 h-full w-[65%] bg-risk-medium rounded-full"></div>
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-[200px]">
                    <div className="text-sm text-foreground/60 mb-1">Monitored Tokens</div>
                    <div className="text-3xl font-bold">5</div>
                  </div>
                  
                  <div className="flex-1 min-w-[200px]">
                    <div className="text-sm text-foreground/60 mb-1">Alerts (Last 24h)</div>
                    <div className="text-3xl font-bold">3</div>
                  </div>
                  
                  <div className="flex-1 min-w-[200px]">
                    <div className="text-sm text-foreground/60 mb-1">Last Updated</div>
                    <div className="text-xl font-semibold">2 mins ago</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-3">
              <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Token Analysis</h2>
                  <div className="text-sm text-foreground/60">
                    All data auto-refreshes every 30 seconds
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <th className="text-left py-3 px-4 font-medium">Token</th>
                        <th className="text-center py-3 px-4 font-medium">Contract Risk</th>
                        <th className="text-center py-3 px-4 font-medium">Liquidity Risk</th>
                        <th className="text-center py-3 px-4 font-medium">Social Sentiment</th>
                        <th className="text-center py-3 px-4 font-medium">Overall</th>
                        <th className="text-right py-3 px-4 font-medium">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                        <td className="py-4 px-4">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                              <span className="font-semibold text-xs">ETH</span>
                            </div>
                            <div>
                              <div className="font-medium">Ethereum</div>
                              <div className="text-sm text-foreground/60">0xc02...a6fd</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <div className="inline-flex items-center px-2 py-1 rounded-full bg-risk-low/10 text-risk-low text-sm">
                            <span className="font-medium">92</span>
                            <span className="text-xs ml-1">/100</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <div className="inline-flex items-center px-2 py-1 rounded-full bg-risk-low/10 text-risk-low text-sm">
                            <span className="font-medium">95</span>
                            <span className="text-xs ml-1">/100</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <div className="inline-flex items-center px-2 py-1 rounded-full bg-risk-low/10 text-risk-low text-sm">
                            <span className="font-medium">88</span>
                            <span className="text-xs ml-1">/100</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <div className="inline-flex items-center px-2 py-1 rounded-full bg-risk-low/10 text-risk-low text-sm">
                            <span className="font-medium">92</span>
                            <span className="text-xs ml-1">/100</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <button className="px-3 py-1 rounded-lg border border-brand text-brand hover:bg-brand hover:text-white transition-colors text-sm">
                            View Details
                          </button>
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                        <td className="py-4 px-4">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                              <span className="font-semibold text-xs">UNI</span>
                            </div>
                            <div>
                              <div className="font-medium">Uniswap</div>
                              <div className="text-sm text-foreground/60">0x1f9...8dd7</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <div className="inline-flex items-center px-2 py-1 rounded-full bg-risk-low/10 text-risk-low text-sm">
                            <span className="font-medium">85</span>
                            <span className="text-xs ml-1">/100</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <div className="inline-flex items-center px-2 py-1 rounded-full bg-risk-low/10 text-risk-low text-sm">
                            <span className="font-medium">80</span>
                            <span className="text-xs ml-1">/100</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <div className="inline-flex items-center px-2 py-1 rounded-full bg-risk-medium/10 text-risk-medium text-sm">
                            <span className="font-medium">65</span>
                            <span className="text-xs ml-1">/100</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <div className="inline-flex items-center px-2 py-1 rounded-full bg-risk-low/10 text-risk-low text-sm">
                            <span className="font-medium">77</span>
                            <span className="text-xs ml-1">/100</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <button className="px-3 py-1 rounded-lg border border-brand text-brand hover:bg-brand hover:text-white transition-colors text-sm">
                            View Details
                          </button>
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                        <td className="py-4 px-4">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                              <span className="font-semibold text-xs">DEF</span>
                            </div>
                            <div>
                              <div className="font-medium">DeFi Token</div>
                              <div className="text-sm text-foreground/60">0x8a3...f29e</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <div className="inline-flex items-center px-2 py-1 rounded-full bg-risk-medium/10 text-risk-medium text-sm">
                            <span className="font-medium">68</span>
                            <span className="text-xs ml-1">/100</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <div className="inline-flex items-center px-2 py-1 rounded-full bg-risk-medium/10 text-risk-medium text-sm">
                            <span className="font-medium">55</span>
                            <span className="text-xs ml-1">/100</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <div className="inline-flex items-center px-2 py-1 rounded-full bg-risk-high/10 text-risk-high text-sm">
                            <span className="font-medium">32</span>
                            <span className="text-xs ml-1">/100</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <div className="inline-flex items-center px-2 py-1 rounded-full bg-risk-medium/10 text-risk-medium text-sm">
                            <span className="font-medium">52</span>
                            <span className="text-xs ml-1">/100</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <button className="px-3 py-1 rounded-lg border border-brand text-brand hover:bg-brand hover:text-white transition-colors text-sm">
                            View Details
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            
            <RiskCard 
              title="Smart Contract Security"
              type="contract"
              score={82}
              insights={[
                "No reentrancy vulnerabilities detected",
                "Integer overflow/underflow protection",
                "Two privileged roles identified (owner, admin)"
              ]}
              className="h-full"
            />
            
            <RiskCard 
              title="Liquidity Health"
              type="liquidity"
              score={68}
              insights={[
                "Liquidity decreased 5% in last 24 hours",
                "LP tokens partially locked for 6 months",
                "Trading volume consistent with market trends"
              ]}
              className="h-full"
            />
            
            <RiskCard 
              title="Social Sentiment"
              type="sentiment"
              score={45}
              insights={[
                "Mixed sentiment on Twitter (60% positive)",
                "Recent concerns about team transparency",
                "Active community with growing engagement"
              ]}
              className="h-full"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
