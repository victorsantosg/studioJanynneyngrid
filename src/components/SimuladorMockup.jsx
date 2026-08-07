import { useState } from 'react';
import { Sparkles, RefreshCw, ZoomIn, Eye, Check } from 'lucide-react';

const MOCKUP_MODELS = [
  { id: 'vestido', name: 'Vestido Fluido', image: '/VESTIDO_LONGO_FEMININO.png' },
  { id: 'pantalona', name: 'Pantalona Inverno', image: '/Pantalona_Inverno.png' }
];

export default function SimuladorMockup({ prints = [] }) {
  const [selectedPrint, setSelectedPrint] = useState(prints[0] || null);
  const [selectedModel, setSelectedModel] = useState(MOCKUP_MODELS[0]);
  const [tileSize, setTileSize] = useState(120); // tamanho da repetição/rapór em px
  const [blendOpacity, setBlendOpacity] = useState(0.85);
  const [imageAspect, setImageAspect] = useState(null); // proporção real (largura/altura) da imagem PNG

  if (!prints || prints.length === 0) return null;

  const currentPrint = selectedPrint || prints[0];

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
      padding: '2rem',
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
            fontSize: '1.6rem',
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

      {/* Layout Vertical Integrado: Imagem do Vestido no Topo -> Seleção de Estampas -> Rapór -> Conceito Abaixo */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        {/* 1. VISUALIZADOR DA PEÇA (ENQUADRAMENTO MILIMÉTRICO SEM VAZAMENTO NAS BORDAS SUPERIOR OU INFERIOR) */}
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <div className="simulador-preview-box" style={{
            position: 'relative',
            display: 'inline-block',
            borderRadius: '24px',
            overflow: 'hidden',
            backgroundColor: '#FFFFFF',
            boxShadow: '0 16px 36px rgba(0,0,0,0.06)',
            border: '1px solid var(--border-soft)',
            margin: '0 auto',
            maxHeight: '75vh'
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

            {/* Badge Sobreposta de Alta Costura */}
            <div style={{
              position: 'absolute',
              bottom: '1rem',
              left: '1rem',
              background: 'rgba(255, 255, 255, 0.94)',
              backdropFilter: 'blur(10px)',
              padding: '0.45rem 0.9rem',
              borderRadius: '12px',
              boxShadow: '0 6px 18px rgba(0,0,0,0.1)',
              fontSize: '0.78rem',
              fontWeight: 700,
              color: 'var(--ink)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              zIndex: 10
            }}>
              <Eye size={15} color="var(--rosa-deep)" />
              <span>{currentPrint.title}</span>
              <span style={{ opacity: 0.5 }}>&bull;</span>
              <span style={{ color: 'var(--verde-deep)' }}>{selectedModel.name}</span>
            </div>
          </div>
        </div>

        {/* 2. CONTROLES: SELEÇÃO DE ESTAMPAS & ESCALA DO RAPÓR LOGO ABAIXO DA FOTO */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          
          {/* Seletor da Estampa Ativa */}
          <div>
            <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--ink)', display: 'block', marginBottom: '0.5rem' }}>
              Selecione a Estampa em Aquarela:
            </label>
            <div className="simulador-thumbs-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.6rem' }}>
              {prints.slice(0, 10).map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedPrint(p)}
                  style={{
                    height: '60px',
                    borderRadius: '12px',
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
          <div style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '14px', border: '1px solid var(--border-soft)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.78rem', fontWeight: 600, color: 'var(--ink)' }}>
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
          <div style={{ fontSize: '0.82rem', color: 'var(--ink-soft)', lineHeight: 1.5, background: 'rgba(168, 214, 106, 0.12)', padding: '1rem', borderRadius: '14px', borderLeft: '3px solid var(--verde-deep)' }}>
            <strong>Conceito:</strong> {currentPrint.description || 'Estampa criada com técnica exclusiva de aquarela e textura têxtil.'}
          </div>

        </div>

      </div>
    </div>
  );
}
