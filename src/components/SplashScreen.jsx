import React, { useEffect, useState } from 'react';

function SplashScreen({ onFinish }) {
  const [fadeOut, setFadeOut] = useState(false);
  const [scale, setScale] = useState(1);

  const handleFinish = () => {
    setFadeOut(true);
    setTimeout(() => {
      onFinish();
    }, 800); // matching the 800ms transition time
  };

  useEffect(() => {
    const timer = setTimeout(handleFinish, 4500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // Target layout width is 640px and height is 400px
      const scaleX = (width * 0.9) / 640;
      const scaleY = (height * 0.8) / 400;
      
      // Limit max scale to 1.0 so it doesn't get excessively huge on desktop,
      // and down to 0.4 on very small screens to fit perfectly
      const newScale = Math.max(0.4, Math.min(1.0, Math.min(scaleX, scaleY)));
      setScale(newScale);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      id="splash-screen"
      className={`splash-screen ${fadeOut ? 'splash-fade-out' : ''}`}
    >
      {/* Gradientes Orgânicos Flutuantes ao Fundo */}
      <div className="splash-background">
        <div className="splash-blob-1" style={{ animationDuration: '8s' }}></div>
        <div className="splash-blob-2" style={{ animationDuration: '6s' }}></div>
        <div className="splash-blob-3"></div>
      </div>

      <div 
        className="splash-content"
        style={{ transform: `scale(${scale})` }}
      >
        {/* Palco Principal da Composição sem Círculo e sem overflow-hidden */}
        <div className="splash-stage anim-logo-container">
          
          {/* 3. Manchas de Aquarela no Fundo */}
          <div className="splash-watercolor-container">
            {/* Mancha Azul (Esquerda) */}
            <div className="splash-water-blue"></div>
            {/* Mancha Rosa (Centro) */}
            <div className="splash-water-pink"></div>
            {/* Mancha Amarela (Direita) */}
            <div className="splash-water-yellow"></div>
          </div>

          {/* 4. Pincel Pintando os Textos (Efeito de Caligrafia) */}
          <div className="splash-brush-sweep anim-brush-sweep">
            <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', transform: 'scaleX(-1)' }}>
              {/* Cabo de Madeira */}
              <path d="M 10,90 L 70,30" stroke="#b45309" strokeWidth="6" strokeLinecap="round" />
              {/* Virola (Metal) */}
              <path d="M 69,31 L 76,24" stroke="#9ca3af" strokeWidth="8" strokeLinecap="round" />
              {/* Cerdas */}
              <path d="M 75,25 Q 82,18 85,15 Q 88,12 83,10 Q 75,18 75,25" fill="#78350f" />
              {/* Ponta de Tinta Verde Úmida */}
              <path d="M 81,13 Q 86,10 84,7 Q 79,12 81,13" fill="#15803d" />
            </svg>
          </div>

          {/* 5. Textos Cursivos (Studio Janynne Yngrid) com Revelação Dinâmica */}
          <div className="splash-text-container">
            <div className="splash-text-studio-wrapper">
              <h1 className="font-script splash-text-studio anim-text-studio">
                Studio
              </h1>
            </div>
            <div className="splash-text-janynne-wrapper">
              <h2 className="font-script splash-text-janynne anim-text-janynne">
                Janynne Yngrid
              </h2>
            </div>
          </div>
          
        </div>

        {/* Subtítulo e Indicador de Carregamento */}
        <div className="splash-subtitle-container anim-subtitle">
          <p className="font-sans-custom splash-subtitle">
            Design de Moda &bull; Estamparia Autoral
          </p>
          <div className="splash-loading">
            <span className="splash-dot"></span>
            <span>Carregando Universo Criativo...</span>
          </div>
        </div>
      </div>

      {/* Botão Pular Intro */}
      <button 
        onClick={handleFinish} 
        className="splash-skip-btn"
      >
        <span>Pular Intro</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
      </button>
    </div>
  );
}

export default SplashScreen;
