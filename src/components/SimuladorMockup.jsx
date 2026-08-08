import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Sparkles, RefreshCw, ZoomIn, Eye, Check } from 'lucide-react';

const MOCKUP_MODELS = [
  { id: 'vestido', name: 'Vestido Fluido', image: 'https://ndco8rokii9ywnd8.public.blob.vercel-storage.com/VESTIDO_LONGO_FEMININO.png' },
  { id: 'pantalona', name: 'Pantalona Inverno', image: 'https://ndco8rokii9ywnd8.public.blob.vercel-storage.com/Pantalona_Inverno.png' }
];

export default function SimuladorMockup({ prints = [] }) {
  const [selectedPrint, setSelectedPrint] = useState(prints[0] || null);
  const [selectedModel, setSelectedModel] = useState(MOCKUP_MODELS[0]);
  const [tileSize, setTileSize] = useState(120); // tamanho da repetição/rapór em px
  const [blendOpacity, setBlendOpacity] = useState(0.85);
  const [imageAspect, setImageAspect] = useState(null); // proporção real (largura/altura) da imagem PNG
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isFullScreen, setIsFullScreen] = useState(false);
  const containerRef = useRef(null);

  if (!prints || prints.length === 0) return null;

  const currentPrint = selectedPrint || prints[0];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isFullScreen) setIsFullScreen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullScreen]);

  const handleMouseMove = (e) => {
    if (!containerRef.current || isFullScreen) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setPosition({ x, y });
  };

  const handleImageLoad = (e) => {
    const { naturalWidth, naturalHeight } = e.target;
    if (naturalWidth && naturalHeight) {
      setImageAspect(naturalWidth / naturalHeight);
    }
  };

  return (
    <div style={{
      background: 'var(--creme-warm)',
      borderRadius: '24px',
      padding: '1.5rem',
      border: '1px solid var(--border-soft)',
      boxShadow: '0 12px 32px rgba(28, 20, 16, 0.04)',
      margin: '2rem 0',
      width: '100%'
    }}>
      {/* Header do Simulador */}
      <div className="simulador-header-wrap" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '1.5rem' }}>
        <div>
          <span style={{
            fontFamily: 'var(--font-script)',
            fontSize: '1.3rem',
            color: 'var(--rosa-deep)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem'
          }}>
            <Sparkles size={16} />
            Simulador de Aplicação Têxtil
          </span>
          <h3 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.5rem',
            color: 'var(--ink)',
            fontWeight: 700,
            marginTop: '0.1rem'
          }}>
            Veja a Estampa Aplicada na Peça Real
          </h3>
        </div>

        {/* Modelo Seletor Pills */}
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          {MOCKUP_MODELS.map((model) => (
            <button
              key={model.id}
              onClick={() => setSelectedModel(model)}
              style={{
                padding: '0.4rem 0.8rem',
                borderRadius: '99px',
                border: selectedModel.id === model.id ? '2px solid var(--verde-deep)' : '1px solid var(--border-soft)',
                background: selectedModel.id === model.id ? 'var(--verde-pale)' : 'white',
                color: selectedModel.id === model.id ? 'var(--ink)' : 'var(--ink-soft)',
                fontSize: '0.78rem',
                fontWeight: selectedModel.id === model.id ? 700 : 500,
                transition: 'all 0.2s ease',
                cursor: 'pointer'
              }}
            >
              {model.name}
            </button>
          ))}
        </div>
      </div>

      {/* Layout Integrado: Imagem do Vestido -> Seleção de Estampas -> Rapór -> Conceito */}
      <div className="simulador-main-layout">
        
        {/* 1. VISUALIZADOR DA PEÇA (ENQUADRAMENTO MILIMÉTRICO SEM VAZAMENTO NAS BORDAS SUPERIOR OU INFERIOR) */}
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <div 
            ref={containerRef}
            className="simulador-preview-box" 
            style={{
              position: 'relative',
              display: 'inline-block',
              borderRadius: '24px',
              overflow: 'hidden',
              backgroundColor: '#FFFFFF',
              boxShadow: '0 16px 36px rgba(0,0,0,0.06)',
              border: '1px solid var(--border-soft)',
              margin: '0 auto',
              maxHeight: '75vh',
              cursor: showMagnifier ? 'zoom-in' : 'pointer'
            }}
            onMouseEnter={() => setShowMagnifier(true)}
            onMouseLeave={() => setShowMagnifier(false)}
            onMouseMove={handleMouseMove}
            onClick={() => setIsFullScreen(true)}
            title="Clique para ver em tela cheia"
          >
            {/* Inner container to apply scale transform for magnification */}
            <div style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: showMagnifier ? 'scale(2.2)' : 'scale(1)',
              transformOrigin: `${position.x}% ${position.y}%`,
              transition: 'transform 0.1s ease-out'
            }}>
              {/* CAMADA 1 (AO FUNDO): Estampa Aquarelada Seamless Repetida */}
              <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url(${currentPrint.img})`,
                backgroundRepeat: 'repeat',
                backgroundSize: `${tileSize * 1.2}px ${tileSize * 1.2}px`,
                zIndex: 1,
                transition: 'background-size 0.3s ease'
              }} />

              {/* CAMADA 2 (NA FRENTE 100% ENQUADRADA): Foto do Mockup PNG Transparente que Define o Tamanho Exato */}
              <img
                src={selectedModel.image}
                alt={selectedModel.name}
                onLoad={handleImageLoad}
                style={{
                  position: 'relative',
                  display: 'block',
                  maxWidth: '100%',
                  maxHeight: '75vh',
                  width: 'auto',
                  height: 'auto',
                  zIndex: 5,
                  pointerEvents: 'none'
                }}
              />
            </div>
          </div>
        </div>

        {/* 2. CONTROLES: SELEÇÃO DE ESTAMPAS & ESCALA DO RAPÓR LOGO ABAIXO DA FOTO */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          {/* Seletor da Estampa Ativa */}
          <div>
            <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--ink)', display: 'block', marginBottom: '0.4rem' }}>
              Selecione a Estampa em Aquarela:
            </label>
            <div className="simulador-thumbs-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.5rem' }}>
              {prints.slice(0, 10).map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedPrint(p)}
                  style={{
                    height: '50px',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    border: currentPrint.id === p.id ? '3px solid var(--rosa-deep)' : '1px solid var(--border-soft)',
                    cursor: 'pointer',
                    position: 'relative',
                    padding: 0,
                    transition: 'transform 0.2s ease'
                  }}
                >
                  <img src={p.img} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  {currentPrint.id === p.id && (
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(232, 131, 154, 0.35)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white'
                    }}>
                      <Check size={16} strokeWidth={3} />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Ajuste do Tamanho do Rapór (Repetição do Padrão) */}
          <div style={{ backgroundColor: 'white', padding: '0.75rem', borderRadius: '12px', border: '1px solid var(--border-soft)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem', fontSize: '0.78rem', fontWeight: 600, color: 'var(--ink)' }}>
              <span>Escala do Rapór (Repetição)</span>
              <span style={{ color: 'var(--rosa-deep)' }}>{tileSize}px</span>
            </div>
            <input
              type="range"
              min="60"
              max="240"
              value={tileSize}
              onChange={(e) => setTileSize(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--rosa-deep)', cursor: 'pointer' }}
            />
          </div>

          {/* 3. CONCEITO DA ESTAMPA POSICIONADO NO RODA PÉ DA IMAGEM */}
          <div style={{ fontSize: '0.8rem', color: 'var(--ink-soft)', lineHeight: 1.45, background: 'rgba(168, 214, 106, 0.12)', padding: '0.75rem', borderRadius: '12px', borderLeft: '3px solid var(--verde-deep)' }}>
            <strong>Conceito:</strong> {currentPrint.description || 'Estampa criada com técnica exclusiva de aquarela e textura têxtil.'}
          </div>

          {/* Identificação de Peça e Estampa Selecionadas */}
          <div style={{
            fontSize: '0.74rem',
            fontWeight: 500,
            color: 'var(--ink-muted)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            padding: '0 0.25rem',
            marginTop: '-0.25rem'
          }}>
            <Eye size={13} color="var(--rosa-deep)" style={{ opacity: 0.8 }} />
            <span style={{ fontWeight: 600, color: 'var(--ink-soft)' }}>{currentPrint.title}</span>
            <span style={{ opacity: 0.5 }}>&bull;</span>
            <span style={{ color: 'var(--verde-deep)', fontWeight: 600 }}>{selectedModel.name}</span>
          </div>

        </div>

      </div>

      {/* Tela Cheia Modal */}
      {isFullScreen && createPortal(
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999999,
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
          <div 
            style={{
              position: 'relative',
              borderRadius: '24px',
              overflow: 'hidden',
              backgroundColor: '#FFFFFF',
              boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
              border: '1px solid rgba(255,255,255,0.1)',
              maxWidth: '90vw',
              maxHeight: '90vh'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* CAMADA 1 (AO FUNDO): Estampa Aquarelada Seamless Repetida */}
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${currentPrint.img})`,
              backgroundRepeat: 'repeat',
              backgroundSize: `${tileSize * 1.8}px ${tileSize * 1.8}px`,
              zIndex: 1,
            }} />

            {/* CAMADA 2 (NA FRENTE 100% ENQUADRADA): Foto do Mockup PNG Transparente */}
            <img
              src={selectedModel.image}
              alt={selectedModel.name}
              style={{
                position: 'relative',
                display: 'block',
                maxWidth: '90vw',
                maxHeight: '90vh',
                width: 'auto',
                height: 'auto',
                zIndex: 5,
                pointerEvents: 'none'
              }}
            />

            {/* Close instruction */}
            <div style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              background: 'rgba(0, 0, 0, 0.6)',
              color: 'white',
              padding: '0.4rem 0.8rem',
              borderRadius: '99px',
              fontSize: '0.7rem',
              fontWeight: 600,
              zIndex: 10,
              cursor: 'pointer'
            }} onClick={() => setIsFullScreen(false)}>
              Fechar (Esc)
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
