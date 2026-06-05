import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useReveal from '../hooks/useReveal';
import ImageMagnifier from '../components/ImageMagnifier';
import ParticleCanvas from '../components/ParticleCanvas';

const CATEGORIES = ['Todos', 'Estampas', 'Croquis', 'Ilustração'];

const defaultDesc = "Uma estampa exclusiva criada com aquarela, pensada para trazer leveza e personalidade. Esse design foi desenvolvido focando no movimento das formas e na harmonia das cores.";
const defaultGallery = [];

const PROJECTS = [
  { 
    id: 7, 
    img: '/colecao_estampas/Summer-Mocha-&-Blue/estampa1.jpeg', 
    title: 'Summer Mocha & Blue', 
    cat: 'Estampas', 
    accent: 'var(--verde)', 
    year: '2025', 
    description: 'Estampa criada destacando a cor do ano de 2025 Mocha Mousse e com uma pintada de azul escuro que fez uma combinação perfeita! Para realçar mais os elementos, textura não podia ficar de fora e agora mostro esse resultado incrível de estampa aquarela!', 
    gallery: ['/colecao_estampas/Summer-Mocha-&-Blue/estampa2.jpeg', '/colecao_estampas/Summer-Mocha-&-Blue/estampa3.jpeg'] 
  },
  {
    id: 8,
    img: '/colecao_estampas/Frutificar-ano-2024/08af04218897743.67a974d29d006.jpg.jpeg',
    title: 'Frutificar',
    cat: 'Estampas',
    accent: 'var(--amarelo-deep)',
    year: '2024',
    description: 'Fazer estampa infantil me leva a um mundo de cores e elementos criativos! É uma sensação maravilhosa e o resultado então? Fica tudo tão lindo! Elementos em aquarela com cartela primavera/verão com fundo textura de linho.',
    gallery: [
      '/colecao_estampas/Frutificar-ano-2024/0528.mp4',
      '/colecao_estampas/Frutificar-ano-2024/468179654_18146058658350434_4680175991980186050_n.jpg.jpeg',
      '/colecao_estampas/Frutificar-ano-2024/468278741_18146058145350434_3177576444346075973_n.jpg.jpeg',
      '/colecao_estampas/Frutificar-ano-2024/468280991_18146057968350434_3959330153825415454_n.jpg.jpeg',
      '/colecao_estampas/Frutificar-ano-2024/ac4f3e218897743.67a974d29c878.jpg.jpeg'
    ]
  },
  {
    id: 9,
    img: '/colecao_estampas/Paraiso-ano-2024/JY0523A.jpg.jpeg',
    title: 'Paraíso',
    cat: 'Estampas',
    accent: 'var(--rosa-deep)',
    year: '2024',
    description: 'Uma coleção infantil encantadora, desenvolvida a partir de um estudo cuidadoso da identidade da marca Turma de Meninas. As cores foram selecionadas estrategicamente para criar conexão com o público e fortalecer a essência lúdica da coleção. Com elementos aquarelados e uma proposta tropical delicada, o resultado traduz leveza, alegria e um universo cheio de encanto.',
    gallery: [
      '/colecao_estampas/Paraiso-ano-2024/behance_img_2.jpg.jpeg',
      '/colecao_estampas/Paraiso-ano-2024/behance_img_3.jpg.jpeg',
      '/colecao_estampas/Paraiso-ano-2024/behance_img_4.jpg.jpeg',
      '/colecao_estampas/Paraiso-ano-2024/behance_img_5.jpg.jpeg',
      '/colecao_estampas/Paraiso-ano-2024/behance_img_6.jpg.jpeg'
    ]
  },
  {
    id: 10,
    img: '/colecao_estampas/Santa-palha-aquarela/1354f7197106979.662a871a3f2e5.png',
    title: 'Santa Palha Aquarela',
    cat: 'Estampas',
    accent: 'var(--azul)',
    year: '2024',
    description: 'Mais um trabalho feito com muito carinho junto com a Supra Estamparia Digital! Amo trabalhar com aquarela pois enriquece a estampa de um jeito incrível, a finalização de cada elemento é uma surpresa e ver o resultado final ainda é mais surpreendente. Estampa com elementos em aquarela: palha, geométrico, folhagens e textura de linho.',
    gallery: [
      '/colecao_estampas/Santa-palha-aquarela/37bbd9197106979.662a871a3e7f5.jpg.jpeg',
      '/colecao_estampas/Santa-palha-aquarela/f2e0fc197106979.662a871a3ec45.jpg.jpeg',
      '/colecao_estampas/Santa-palha-aquarela/0605.mp4',
      '/colecao_estampas/Santa-palha-aquarela/20240422_132812.mp4'
    ]
  }
];

export default function Portfolio() {
  const [active, setActive] = useState('Todos');
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeMedia, setActiveMedia] = useState(null);
  const pageRef = useReveal([active]);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
      setActiveMedia({ img: selectedProject.img, desc: selectedProject.description });
    } else {
      document.body.style.overflow = 'auto';
      setActiveMedia(null);
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [selectedProject]);

  const filtered = active === 'Todos' ? PROJECTS : PROJECTS.filter(p => p.cat === active);

  return (
    <div ref={pageRef} style={{ background: 'var(--creme)', paddingTop: '6rem', position: 'relative' }} className="page-splashes-wrapper">
      {/* Manchas de aquarela de fundo nas laterais */}
      <div className="ambient-splash left-pink" style={{ top: '25%' }} />
      <div className="ambient-splash right-yellow" style={{ top: '60%' }} />
      <div className="ambient-splash bottom-teal" style={{ bottom: '10%' }} />

      {/* ─── HEADER ─── */}
      <section style={{ padding: '4rem 1.25rem 3rem', position: 'relative', overflow: 'hidden' }}>
        <ParticleCanvas />
        <div style={{ position: 'absolute', top: '10%', right: '-5%', width: 260, height: 260, borderRadius: '50%', background: 'radial-gradient(ellipse, #D6EDAF 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div className="reveal" style={{ marginBottom: '0.75rem' }}>
          <span className="badge badge-verde">
            <span className="color-dot" style={{ background: 'var(--verde)' }} />
            Trabalhos
          </span>
        </div>
        <h1 className="reveal reveal-delay-1" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem,8vw,3.5rem)', color: 'var(--ink)', lineHeight: 1.1, marginBottom: '1rem' }}>
          Portfólio
        </h1>
        <p className="reveal reveal-delay-2" style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--ink-soft)', lineHeight: 1.7, maxWidth: 400 }}>
          Uma seleção de projetos que revelam a personalidade visual de marcas através da arte e do design têxtil.
        </p>

        <div className="brush-stroke reveal reveal-delay-3" style={{ width: 80, marginTop: '1.5rem' }} />
      </section>

      {/* ─── BRAND MARQUEE (Carrossel Automático de Marcas) ─── */}
      <div className="brand-marquee-container reveal reveal-delay-2">
        <div className="brand-marquee-track">
          <span className="brand-logo brand-cabide">CABIDE CAIÇARA</span>
          <span className="brand-logo brand-dalutex">Dalutex</span>
          <span className="brand-logo brand-lancaster">LANCASTER</span>
          <span className="brand-logo brand-munny">MUNNY</span>
          <span className="brand-logo brand-triton">Triton</span>
          <span className="brand-logo brand-shein">SHEIN</span>
          <span className="brand-logo brand-ipanema">Ipanema</span>

          {/* Duplicado para rolagem contínua */}
          <span className="brand-logo brand-cabide">CABIDE CAIÇARA</span>
          <span className="brand-logo brand-dalutex">Dalutex</span>
          <span className="brand-logo brand-lancaster">LANCASTER</span>
          <span className="brand-logo brand-munny">MUNNY</span>
          <span className="brand-logo brand-triton">Triton</span>
          <span className="brand-logo brand-shein">SHEIN</span>
          <span className="brand-logo brand-ipanema">Ipanema</span>
        </div>
      </div>

      {/* ─── FILTER PILLS ─── */}
      <div className="reveal constrain-width" style={{ padding: '0 1.25rem 2rem', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            style={{
              padding: '8px 18px',
              borderRadius: 9999,
              border: active === cat ? 'none' : '1.5px solid rgba(168,214,106,0.3)',
              background: active === cat ? 'var(--ink)' : 'transparent',
              color: active === cat ? 'white' : 'var(--ink-soft)',
              fontFamily: 'var(--font-body)',
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.32,0.72,0,1)',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ─── GRID ─── */}
      <section className="section-padding" style={{ padding: '0 1.25rem 6rem' }}>
        <div className="desktop-grid-4" style={{ gap: 16 }}>
          {filtered.map((p, i) => {
            const strokeColor = p.cat === 'Estampas' || p.cat === 'Ilustração'
              ? 'rose'
              : p.cat === 'Identidade Visual'
                ? 'yellow'
                : 'teal';

            return (
              <div
                key={p.id}
                className={`reveal reveal-delay-${i % 4} canvas-card-container portfolio-item-clickable`}
                onClick={() => setSelectedProject(p)}
                style={{ cursor: 'pointer' }}
              >
                <div className={`canvas-card-inner ${p.gallery && p.gallery.length > 0 ? 'collection-stack' : ''}`} style={{ aspectRatio: '1/1', position: 'relative' }}>
                  {p.gallery && p.gallery.length > 0 && (
                    <div className="collection-badge">
                      <span>❖</span> VER
                    </div>
                  )}
                  <img
                    src={p.img}
                    alt={p.title}
                    style={{
                      objectPosition: 'top center',
                      objectFit: 'contain',
                      background: 'white',
                      padding: '8px'
                    }}
                  />
                </div>
                <div className="canvas-card-label-area">
                  <div className={`card-brush-stroke card-brush-stroke-${strokeColor}`} />
                  <span className="card-brush-title-text" style={{ fontSize: '1.25rem' }}>
                    {p.title}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section style={{ padding: '5rem 1.25rem', textAlign: 'center', background: 'var(--creme-warm)', borderTop: '1px solid rgba(168,214,106,0.15)' }}>
        <div className="reveal" style={{ marginBottom: '0.5rem' }}>
          <span style={{ fontFamily: 'var(--font-script)', fontSize: '1.4rem', color: 'var(--rosa-deep)' }}>Gostou do que viu?</span>
        </div>
        <p className="reveal reveal-delay-1" style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--ink-soft)', marginBottom: '1.5rem' }}>
          Vamos criar algo incrível para a sua marca.
        </p>
        <div className="reveal reveal-delay-2">
          <Link to="/contato" className="btn-primary">
            <span className="label">Falar com Janynne</span>
            <span className="btn-icon">↗</span>
          </Link>
        </div>
      </section>

      {/* Footer simples */}
      <footer style={{ background: '#111009', padding: '2rem 1.25rem', textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
          © 2025 Studio Janynne Yngrid · Todos os Direitos Reservados
        </p>
      </footer>

      {/* ─── MODAL DO PROJETO ─── */}
      {selectedProject && (
        <div className="project-modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="project-modal-content" onClick={e => e.stopPropagation()}>
            <button className="project-modal-close" onClick={() => setSelectedProject(null)}>
              ✕
            </button>
            <div className="project-modal-body">
              {/* Coluna Esquerda: Imagem Principal e Galeria */}
              {(() => {
                const allMedia = [
                  { img: selectedProject.img, desc: selectedProject.description },
                  ...(selectedProject.gallery || []).map((img) => ({
                    img,
                    desc: selectedProject.description
                  }))
                ];
                return (
                  <>
                    <div className="project-modal-media">
                      <div className="project-modal-main-image" style={{ borderColor: selectedProject.accent }}>
                        {activeMedia?.img?.endsWith('.mp4') ? (
                          <video 
                            key={activeMedia.img}
                            src={activeMedia.img} 
                            autoPlay loop muted playsInline
                            style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: 'calc(1.5rem - 4px)', background: 'black' }} 
                          />
                        ) : (
                          <ImageMagnifier src={activeMedia?.img || selectedProject.img} alt={selectedProject.title} zoomLevel={2.5} />
                        )}
                      </div>
                      {allMedia.length > 1 && (
                        <div className="project-modal-gallery">
                          {allMedia.map((media, idx) => {
                            const isActive = activeMedia?.img === media.img;
                            return (
                              <div
                                key={idx}
                                className="project-modal-thumb"
                                onClick={() => setActiveMedia(media)}
                                                               style={{
                                  cursor: 'pointer',
                                  border: isActive ? `3px solid ${selectedProject.accent}` : '3px solid transparent',
                                  opacity: isActive ? 1 : 0.6,
                                  transition: 'all 0.2s ease-in-out'
                                }}
                              >
                                {media.img.endsWith('.mp4') ? (
                                  <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
                                    <video src={media.img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} preload="metadata" />
                                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0, 0, 0, 0.45)' }}>
                                      <span style={{ color: 'white', fontSize: '1.4rem', filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.5))' }}>▶</span>
                                    </div>
                                  </div>
                                ) : (
                                  <img src={media.img} alt={`${selectedProject.title} thumb ${idx}`} />
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* Coluna Direita: Informações */}
                    <div className="project-modal-info">
                      <span className="badge" style={{ background: 'var(--creme-warm)', color: selectedProject.accent, border: `1px solid ${selectedProject.accent}` }}>
                        {selectedProject.cat}
                      </span>
                      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 5vw, 2.8rem)', color: 'var(--ink)', margin: '1rem 0 0.5rem', lineHeight: 1.1 }}>
                        {selectedProject.title}
                      </h2>
                      <div style={{ fontFamily: 'var(--font-script)', fontSize: '1.25rem', color: selectedProject.accent, marginBottom: '2rem' }}>
                        {selectedProject.year}
                      </div>

                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', lineHeight: 1.8, color: 'var(--ink-soft)', marginBottom: '2rem' }}>
                        {activeMedia?.desc || selectedProject.description}
                      </p>

                      <Link to="/contato" className="btn-primary" style={{ width: '100%', justifyContent: 'center', background: 'var(--ink)' }}>
                        <span className="label">Quero um projeto assim</span>
                        <span className="btn-icon">↗</span>
                      </Link>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
