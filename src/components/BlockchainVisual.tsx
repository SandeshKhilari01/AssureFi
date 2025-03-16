
import React, { useEffect, useRef } from 'react';
import { Check, Link } from 'lucide-react';

const BlockchainVisual: React.FC = () => {
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
    
    // Define blockchain blocks
    const blocks = [
      { x: 10, y: 40, label: 'Contract Analysis' },
      { x: 150, y: 100, label: 'Risk Assessment' },
      { x: 290, y: 40, label: 'Liquidity Monitor' },
      { x: 430, y: 100, label: 'Sentiment Analysis' },
      { x: 570, y: 40, label: 'Secure DeFi' }
    ];
    
    // Animation loop
    let animationFrame: number;
    let time = 0;
    
    const animate = () => {
      time += 0.01;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw connections
      ctx.strokeStyle = '#0496FF';
      ctx.lineWidth = 2;
      
      for (let i = 0; i < blocks.length - 1; i++) {
        const startBlock = blocks[i];
        const endBlock = blocks[i + 1];
        
        ctx.beginPath();
        ctx.moveTo(startBlock.x + 70, startBlock.y + 30);
        ctx.lineTo(endBlock.x + 70, endBlock.y + 30);
        
        // Animate line with moving dots
        const lineLength = Math.sqrt(
          Math.pow(endBlock.x - startBlock.x, 2) + 
          Math.pow(endBlock.y - startBlock.y, 2)
        );
        
        const normalizedTime = (time % 1) * lineLength;
        const dotX = startBlock.x + 70 + normalizedTime * ((endBlock.x - startBlock.x) / lineLength);
        const dotY = startBlock.y + 30 + normalizedTime * ((endBlock.y - startBlock.y) / lineLength);
        
        ctx.stroke();
        
        // Draw moving dot
        ctx.fillStyle = '#8B5CF6';
        ctx.beginPath();
        ctx.arc(dotX, dotY, 4, 0, Math.PI * 2);
        ctx.fill();
      }
      
      // Draw blocks
      blocks.forEach((block, index) => {
        // Block background
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.strokeStyle = index % 2 === 0 ? '#0496FF' : '#8B5CF6';
        ctx.lineWidth = 2;
        
        // Slightly pulse the blocks
        const pulse = 1 + Math.sin(time * 2 + index) * 0.03;
        
        ctx.beginPath();
        ctx.roundRect(block.x, block.y, 140 * pulse, 60 * pulse, 10);
        ctx.fill();
        ctx.stroke();
        
        // Block label
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '14px "Inter", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(block.label, block.x + 70 * pulse, block.y + 35 * pulse);
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
    <div className="relative w-full h-[200px] my-12 fade-in overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] max-w-full">
        <canvas 
          ref={canvasRef} 
          className="w-full h-[200px]"
          style={{ background: 'transparent' }}
        />
      </div>
      
      {/* Mobile fallback */}
      <div className="md:hidden flex flex-wrap gap-4 justify-center pt-8">
        {["Contract Analysis", "Risk Assessment", "Liquidity Monitor", "Sentiment Analysis", "Secure DeFi"].map((label, index) => (
          <div key={index} className="flex items-center">
            {index > 0 && <Link className="h-4 w-4 mx-1 text-brand" />}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20">
              {index === 4 && <Check className="h-4 w-4 text-risk-low" />}
              <span className="text-sm">{label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlockchainVisual;
