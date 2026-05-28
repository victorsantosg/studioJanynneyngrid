import React, { useEffect, useRef } from 'react';

const COLORS = ['#A8D66A', '#F5B8C4', '#6ECFE3'];

const ParticleCanvas = ({ count = 30 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let particles = [];
    let animationFrameId;
    let mouse = { x: -1000, y: -1000, radius: 120 };
    
    const handleMouseMove = (e) => {
        const rect = canvas.parentElement?.getBoundingClientRect();
        if (rect) {
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        }
    };
    
    const handleMouseLeave = () => {
        mouse.x = -1000;
        mouse.y = -1000;
    };

    const resizeCanvas = () => {
        if (!canvas.parentElement) return;
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;
    };

    class Particle {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height + Math.random() * 100;
            this.size = Math.random() * 4 + 2;
            this.speedY = Math.random() * 1 + 0.2;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.5 + 0.3;
            this.vx = 0;
            this.vy = 0;
            this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
        }
        update() {
            // Interactive scatter/repel effect
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < mouse.radius) {
                const forceDirectionX = dx / distance;
                const forceDirectionY = dy / distance;
                const force = (mouse.radius - distance) / mouse.radius;
                
                // Repel multiplier
                this.vx -= forceDirectionX * force * 1.5;
                this.vy -= forceDirectionY * force * 1.5;
            }

            // Apply friction
            this.vx *= 0.95;
            this.vy *= 0.95;

            // Apply velocities
            this.x += this.speedX + this.vx;
            this.y -= this.speedY - this.vy;

            // Reset if out of bounds (including pushed out by mouse)
            if (this.y < -50 || this.y > canvas.height + 150 || this.x < -100 || this.x > canvas.width + 100) {
                this.reset();
            }
        }
        draw() {
            if(!ctx) return;
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.opacity;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    }

    const initParticles = () => {
        particles = [];
        for (let i = 0; i < count; i++) {
            particles.push(new Particle());
        }
    };

    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        animationFrameId = requestAnimationFrame(animate);
    };

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        window.addEventListener('resize', resizeCanvas);
        if (canvas.parentElement) {
            canvas.parentElement.addEventListener('mousemove', handleMouseMove);
            canvas.parentElement.addEventListener('mouseleave', handleMouseLeave);
        }
        resizeCanvas();
        initParticles();
        animate();
    }

    return () => {
        window.removeEventListener('resize', resizeCanvas);
        if (canvas.parentElement) {
            canvas.parentElement.removeEventListener('mousemove', handleMouseMove);
            canvas.parentElement.removeEventListener('mouseleave', handleMouseLeave);
        }
        cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}></canvas>;
};

export default ParticleCanvas;
