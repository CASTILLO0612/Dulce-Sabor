import { useState, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';

const PARTICLE_COLORS = [
  '#D4A96A', '#E8C98A', '#C8973A', '#F5ECD7',
  '#B8873A', '#FDECD6', '#F0C87A', '#E8B86D',
  '#FFD9A8', '#C4935C',
];

interface Particle {
  id: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  size: number;
  color: string;
  duration: number;
}

interface ParticleButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export function ParticleButton({ children, onClick, className, style }: ParticleButtonProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const idRef = useRef(0);
  const isHoveredRef = useRef(false);
  const lastSpawnRef = useRef(0);

  const spawnParticles = useCallback((clientX: number, clientY: number) => {
    const now = Date.now();
    if (now - lastSpawnRef.current < 25) return;
    lastSpawnRef.current = now;

    const newParticles: Particle[] = [];

    for (let i = 0; i < 4; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 70 + 30;
      const id = idRef.current++;
      const duration = 0.65 + Math.random() * 0.5;

      newParticles.push({
        id,
        x: clientX,
        y: clientY,
        dx: Math.cos(angle) * speed * 0.8,
        dy: -(Math.random() * 70 + 30),
        size: Math.random() * 9 + 4,
        color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
        duration,
      });

      setTimeout(() => {
        setParticles(prev => prev.filter(p => p.id !== id));
      }, duration * 1000 + 300);
    }

    setParticles(prev => [...prev.slice(-100), ...newParticles]);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isHoveredRef.current) {
      spawnParticles(e.clientX, e.clientY);
    }
  }, [spawnParticles]);

  const portal = createPortal(
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 9999,
        overflow: 'hidden',
      }}
    >
      <AnimatePresence>
        {particles.map(p => (
          <motion.div
            key={p.id}
            initial={{
              x: p.x - p.size / 2,
              y: p.y - p.size / 2,
              opacity: 0.95,
              scale: 1,
            }}
            animate={{
              x: p.x + p.dx - p.size / 2,
              y: p.y + p.dy - p.size / 2,
              opacity: 0,
              scale: 0.2,
            }}
            transition={{ duration: p.duration, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              width: p.size,
              height: p.size,
              borderRadius: '50%',
              backgroundColor: p.color,
              left: 0,
              top: 0,
            }}
          />
        ))}
      </AnimatePresence>
    </div>,
    document.body
  );

  return (
    <>
      {portal}
      <button
        onClick={onClick}
        className={className}
        style={style}
        onMouseEnter={() => { isHoveredRef.current = true; }}
        onMouseLeave={() => { isHoveredRef.current = false; }}
        onMouseMove={handleMouseMove}
      >
        {children}
      </button>
    </>
  );
}
