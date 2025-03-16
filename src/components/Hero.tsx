import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, BarChart2, MessageSquare, ChevronRight } from 'lucide-react';

const Hero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const setDimensions = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    
    setDimensions();
    window.addEventListener('resize', setDimensions);
    
    // Create nodes for our network
    const nodes: { x: number; y: number; vx: number; vy: number; radius: number; color: string }[] = [];
    const connections: { from: number; to: number }[] = [];
    
    // Initialize nodes
    for (let i = 0; i < 12; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 4 + 2,
        color: ['#0496FF', '#8B5CF6', '#14B8A6'][Math.floor(Math.random() * 3)]
      });
    }
    
    // Create connections between nodes
    for (let i = 0; i < nodes.length; i++) {
      const connectionsCount = Math.floor(Math.random() * 2) + 1;
      for (let j = 0; j < connectionsCount; j++) {
        const targetIndex = Math.floor(Math.random() * nodes.length);
        if (targetIndex !== i) {
          connections.push({ from: i, to: targetIndex });
        }
      }
    }
    
    // Animation variables
    let animationFrame: number;
    let time = 0;
    
    const animate = () => {
      time += 0.01;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update node positions
      nodes.forEach((node, index) => {
        // Add some oscillation
        node.x += node.vx + Math.sin(time + index) * 0.2;
        node.y += node.vy + Math.cos(time + index) * 0.2;
        
        // Boundary check
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
        
        // Keep nodes within canvas
        node.x = Math.max(node.radius, Math.min(canvas.width - node.radius, node.x));
        node.y = Math.max(node.radius, Math.min(canvas.height - node.radius, node.y));
      });
      
      // Draw connections
      connections.forEach(connection => {
        const fromNode = nodes[connection.from];
        const toNode = nodes[connection.to];
        
        const distance = Math.sqrt(
          Math.pow(toNode.x - fromNode.x, 2) + 
          Math.pow(toNode.y - fromNode.y, 2)
        );
        
        // Only draw if nodes are within a certain distance
        if (distance < 150) {
          const opacity = 1 - (distance / 150);
          
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.5})`;
          ctx.lineWidth = 1;
          ctx.moveTo(fromNode.x, fromNode.y);
          ctx.lineTo(toNode.x, toNode.y);
          ctx.stroke();
          
          // Draw data pulse along the line
          const pulse = (time * 2) % 1;
          const pulseX = fromNode.x + (toNode.x - fromNode.x) * pulse;
          const pulseY = fromNode.y + (toNode.y - fromNode.y) * pulse;
          
          ctx.beginPath();
          ctx.fillStyle = fromNode.color;
          ctx.arc(pulseX, pulseY, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      
      // Draw nodes
      nodes.forEach(node => {
        ctx.beginPath();
        ctx.fillStyle = node.color;
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw glow
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(
          node.x, node.y, node.radius,
          node.x, node.y, node.radius * 3
        );
        gradient.addColorStop(0, `${node.color}80`);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.arc(node.x, node.y, node.radius * 3, 0, Math.PI * 2);
        ctx.fill();
      });
      
      animationFrame = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', setDimensions);
      cancelAnimationFrame(animationFrame);
    };
  }, []);
  
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
              {/* Animated blockchain network visualization */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand/10 rounded-full backdrop-blur-3xl animate-pulse-soft"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-defi-purple/10 rounded-full backdrop-blur-3xl animate-pulse-soft"></div>
              
              <div className="glass-panel p-2 relative animate-float">
                <canvas 
                  ref={canvasRef} 
                  className="w-full h-[280px] rounded-lg"
                  style={{ background: 'transparent' }}
                />
                
                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center p-2 bg-white/10 backdrop-blur-md rounded-lg">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-risk-low animate-pulse mr-2"></div>
                    <span className="text-xs">Network Active</span>
                  </div>
                  <div className="text-xs text-white/70">AssureFi Protocol</div>
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
