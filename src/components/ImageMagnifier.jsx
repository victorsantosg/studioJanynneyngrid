import React, { useState, useRef, useEffect } from 'react';

export default function ImageMagnifier({ src, alt, zoomLevel = 2 }) {
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isFullScreen, setIsFullScreen] = useState(false);
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current || isFullScreen) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setPosition({ x, y });
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isFullScreen) setIsFullScreen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullScreen]);

  return (
    <>
      <div
        ref={containerRef}
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          cursor: showMagnifier ? 'zoom-in' : 'pointer',
          borderRadius: 'inherit'
        }}
        onMouseEnter={() => setShowMagnifier(true)}
        onMouseLeave={() => setShowMagnifier(false)}
        onMouseMove={handleMouseMove}
        onClick={() => setIsFullScreen(true)}
        title="Clique para expandir"
      >
        <img
          src={src}
          alt={alt}
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            transition: 'opacity 0.2s',
            opacity: showMagnifier ? 0 : 1
          }}
        />
        
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${src})`,
            backgroundPosition: `${position.x}% ${position.y}%`,
            backgroundSize: `${zoomLevel * 125}%`,
            backgroundRepeat: 'no-repeat',
            opacity: showMagnifier ? 1 : 0,
            pointerEvents: 'none',
            transition: 'opacity 0.2s ease-in-out',
            boxShadow: 'inset 0 0 15px rgba(0,0,0,0.15)'
          }}
        />
      </div>

      {isFullScreen && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            backgroundColor: 'rgba(0,0,0,0.85)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'zoom-out'
          }}
          onClick={(e) => {
            e.stopPropagation();
            setIsFullScreen(false);
          }}
        >
          <img 
            src={src} 
            alt={alt} 
            style={{
              maxWidth: '95vw',
              maxHeight: '95vh',
              objectFit: 'contain',
              boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
              borderRadius: '8px'
            }}
          />
        </div>
      )}
    </>
  );
}
