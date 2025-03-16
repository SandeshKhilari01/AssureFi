
import React, { useEffect, useRef } from 'react';

const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    // Initial sizing
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Node class for network visualization
    class Node {
      x: number;
      y: number;
      radius: number;
      color: string;
      vx: number;
      vy: number;
      connected: boolean;
      riskScore: number;
      
      constructor(x: number, y: number, radius: number) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.riskScore = Math.random();
        
        // Color based on risk (green for low risk, yellow for medium, red for high)
        if (this.riskScore > 0.66) {
          this.color = 'rgba(239, 68, 68, 0.4)'; // High risk (red)
        } else if (this.riskScore > 0.33) {
          this.color = 'rgba(245, 158, 11, 0.4)'; // Medium risk (amber)
        } else {
          this.color = 'rgba(34, 197, 94, 0.4)'; // Low risk (green)
        }
        
        // Random velocity
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.connected = false;
      }
      
      update() {
        // Move node
        this.x += this.vx;
        this.y += this.vy;
        
        // Bounce off edges
        if (this.x < this.radius || this.x > canvas.width - this.radius) {
          this.vx *= -1;
        }
        
        if (this.y < this.radius || this.y > canvas.height - this.radius) {
          this.vy *= -1;
        }
      }
      
      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }
    
    // Create nodes
    const nodeCount = Math.floor(window.innerWidth / 100); // Adjust node density
    const nodes: Node[] = [];
    
    for (let i = 0; i < nodeCount; i++) {
      const radius = Math.random() * 5 + 3;
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      nodes.push(new Node(x, y, radius));
    }
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw nodes
      nodes.forEach(node => {
        node.update();
        node.draw(ctx);
        node.connected = false;
      });
      
      // Draw connections between nearby nodes
      const maxDistance = 150;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            // Calculate connection opacity based on distance
            const opacity = 1 - distance / maxDistance;
            
            // Determine connection color based on risk scores
            const avgRisk = (nodes[i].riskScore + nodes[j].riskScore) / 2;
            let strokeColor;
            
            if (avgRisk > 0.66) {
              strokeColor = `rgba(239, 68, 68, ${opacity * 0.3})`; // High risk (red)
            } else if (avgRisk > 0.33) {
              strokeColor = `rgba(245, 158, 11, ${opacity * 0.3})`; // Medium risk (amber)
            } else {
              strokeColor = `rgba(34, 197, 94, ${opacity * 0.3})`; // Low risk (green)
            }
            
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = strokeColor;
            ctx.lineWidth = 1;
            ctx.stroke();
            
            // Mark nodes as connected
            nodes[i].connected = true;
            nodes[j].connected = true;
          }
        }
      }
      
      // Interaction with mouse
      canvas.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        nodes.forEach(node => {
          const dx = mouseX - node.x;
          const dy = mouseY - node.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Nodes are repelled by cursor
          if (distance < 100) {
            const angle = Math.atan2(dy, dx);
            const force = 0.5;
            node.vx -= Math.cos(angle) * force;
            node.vy -= Math.sin(angle) * force;
          }
        });
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 pointer-events-auto -z-10 opacity-20"
    />
  );
};

export default AnimatedBackground;
