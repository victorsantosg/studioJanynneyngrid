import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import useReveal from '../hooks/useReveal';
import ParticleCanvas from '../components/ParticleCanvas';
import ImageMagnifier from '../components/ImageMagnifier';

const defaultDesc = "Uma estampa exclusiva criada com aquarela, pensada para trazer leveza e personalidade. Esse design foi desenvolvido focando no movimento das formas e na harmonia das cores.";
const defaultGallery = [];

const HIGHLIGHTED_PROJECTS = [
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
  },
  {
    id: 11,
    img: '/colecao_estampas/Aquarela-Tropical-ano/a48fc2195186333.66098164b1623.jpg.jpeg',
    title: 'Aquarela Tropical',
    cat: 'Estampas',
    accent: 'var(--rosa)',
    year: '2024',
    description: 'Os elementos em aquarela desta coleção foram desenvolvidos para representar as praias do Ceará, referências não apenas no Brasil, mas também mundialmente. A estampa carro-chefe da coleção da marca To Have Pet foi criada de forma exclusiva, com muito carinho and dedicação. Realizamos pesquisas, elaboramos um briefing detalhado e transformamos todas as ideias em uma estampa única, que traduz a essência da coleção. O resultado ficou incrível!',
    gallery: [
      '/colecao_estampas/Aquarela-Tropical-ano/8d6ba1195186333.66098164b130c.jpg.jpeg',
      '/colecao_estampas/Aquarela-Tropical-ano/ce03f8195186333.66098164b0cf4.jpg.jpeg',
      '/colecao_estampas/Aquarela-Tropical-ano/SJY00093 1 - frente e costas ecobag.jpg.jpeg',
      '/colecao_estampas/Aquarela-Tropical-ano/VID_79630927_092539_459.mp4'
    ]
  }
];

/* ── Paint blob palette ── */
const BLOBS = [
  { color: '#A8D66A', w: 120, h: 100, top: '38%', left: '8%', rotate: '-8deg', opacity: 0.85 },
  { color: '#F5B8C4', w: 90, h: 80, top: '52%', left: '18%', rotate: '4deg', opacity: 0.9 },
  { color: '#6ECFE3', w: 70, h: 65, top: '42%', left: '34%', rotate: '-5deg', opacity: 0.8 },
];

/* ── Marquee tags ── */
const TAGS = [
  'Estampas', 'Identidade Visual', 'Moda', 'Criação', 'Fashion Design',
  'Ilustração', 'Branding', 'Arte', 'Estamparia', 'Design Têxtil',
];

export default function Home() {
  const pageRef = useReveal();
  const [visible, setVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeMedia, setActiveMedia] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

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

  return (
    <div ref={pageRef} style={{ background: 'var(--creme)', position: 'relative' }} className="page-splashes-wrapper">
      {/* Manchas de aquarela de fundo nas laterais */}
      <div className="ambient-splash left-pink" style={{ top: '10%' }} />
      <div className="ambient-splash right-yellow" style={{ top: '35%' }} />
      <div className="ambient-splash bottom-teal" style={{ bottom: '15%' }} />

      {/* ═══════════════════════════════════════════
          HERO — Layout Original com Detalhes Mockup
      ═══════════════════════════════════════════ */}
      <section className="desktop-hero" style={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '0 1.25rem 5rem',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Ambient background blobs matching mockup colors */}
        <div style={{ position: 'absolute', top: '5%', right: '-5%', width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(168,214,106,0.3) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '20%', left: '-10%', width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(245,184,196,0.3) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '5%', width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(110,207,227,0.25) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <ParticleCanvas />

        {/* Floating photos — Z-Axis Cascade with polaroid-like watercolor frame style */}
        <div className="desktop-hero-images">
          <div style={{ position: 'absolute', top: '8%', right: '4%', zIndex: 2 }} className="float-a">
            <div className={`hero-float-a float-a${visible ? ' paint-pop' : ''}`} style={{ width: 'min(200px, 45vw)', borderRadius: '1.5rem', overflow: 'hidden', boxShadow: '0 20px 50px rgba(28,20,16,0.16)', border: '6px solid white', transform: 'rotate(-3deg)', background: 'white', padding: '6px 6px 18px' }}>
              <img src="/img_1.jpeg" alt="Janynne Yngrid" style={{ width: '100%', display: 'block', objectFit: 'cover', aspectRatio: '3/4', borderRadius: '1rem' }} />
              <div style={{ textAlign: 'center', marginTop: '8px', fontFamily: 'var(--font-script)', fontSize: '1.15rem', color: 'var(--ink-soft)' }}>Janynne Yngrid</div>
            </div>
          </div>

          <div style={{ position: 'absolute', top: '30%', right: '38%', zIndex: 1 }} className="float-b">
            <div className={`hero-float-b float-b${visible ? ' paint-pop' : ''}`} style={{ animationDelay: '0.2s', width: 'min(150px, 32vw)', borderRadius: '1rem', overflow: 'hidden', boxShadow: '0 15px 35px rgba(28,20,16,0.12)', border: '5px solid white', transform: 'rotate(2deg)', background: 'white', padding: '5px 5px 14px' }}>
              <img src="/img_3.jpeg" alt="Estampa" style={{ width: '100%', display: 'block', objectFit: 'cover', aspectRatio: '3/4', borderRadius: '0.75rem' }} />
              <div style={{ textAlign: 'center', marginTop: '6px', fontFamily: 'var(--font-script)', fontSize: '0.95rem', color: 'var(--ink-muted)' }}>Criação</div>
            </div>
          </div>
        </div>

        {/* Decorative paint blobs matching background design */}
        {BLOBS.map((b, i) => (
          <div key={i} style={{
            position: 'absolute', top: b.top, left: b.left,
            width: b.w, height: b.h,
            background: b.color,
            borderRadius: '60% 40% 70% 30% / 50% 60% 40% 50%',
            transform: `rotate(${b.rotate})`,
            opacity: b.opacity,
            pointerEvents: 'none',
            filter: 'blur(0.5px)',
            zIndex: 0,
          }} />
        ))}

        {/* Hero text alined left matching the mockup */}
        <div className="desktop-hero-text" style={{ position: 'relative', zIndex: 3, maxWidth: 550 }}>
          <div className={`reveal${visible ? ' visible' : ''}`} style={{ marginBottom: '1.25rem' }}>
            <span className="badge badge-verde">
              <span className="color-dot" style={{ background: 'var(--verde)' }} />
              Design · Arte · Moda
            </span>
          </div>

          {/* Slogan matching screenshot layout and highlights */}
          <h1 className={`reveal font-heading${visible ? ' visible' : ''}`} style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.5rem, 8vw, 4.3rem)',
            lineHeight: 1.05,
            color: 'var(--ink)',
            marginBottom: '1.5rem',
            fontWeight: 'normal',
          }}>
            Criando a<br />
            <span style={{ fontFamily: 'var(--font-script)', fontStyle: 'italic', textTransform: 'none', color: 'var(--rosa-deep)', display: 'inline-block', transform: 'rotate(-2deg)' }}>identidade</span><br />
            da sua marca<br />
            em <span className="brush-accent brush-accent-green" style={{ color: 'var(--verde-deep)' }}>cores</span> e<br />
            <span className="brush-accent brush-accent-pink">elementos.</span>
          </h1>

          <p className={`reveal reveal-delay-1${visible ? ' visible' : ''}`} style={{
            fontFamily: 'var(--font-body)', fontSize: '0.95rem', lineHeight: 1.7,
            color: 'var(--ink-soft)', marginBottom: '2.5rem', maxWidth: 420,
          }}>
            Studio especializado em design têxtil, estampas exclusivas e identidade visual para marcas de moda.
          </p>

          <div className={`reveal reveal-delay-2${visible ? ' visible' : ''}`} style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <Link to="/portfolio" className="btn-primary" style={{ background: 'var(--ink)', color: 'white' }}>
              <span className="label">Ver Portfólio</span>
              <span className="btn-icon" aria-hidden>↗</span>
            </Link>
            <Link to="/contato" className="btn-ghost">Solicitar Orçamento</Link>
          </div>
        </div>

        {/* Brush stroke divider */}
        <div className="brush-stroke" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3 }} />
      </section>

      {/* ═══════════════════════════════════════════
          MARQUEE — Disciplinas
      ═══════════════════════════════════════════ */}
      <div className="brand-marquee-container" style={{ margin: 0, borderBottom: 'none', paddingTop: '2.5rem', paddingBottom: '2.5rem' }}>
        <div className="brand-marquee-track">
          {[...TAGS, ...TAGS, ...TAGS].map((tag, i) => (
            <span key={i} className="brand-logo" style={{
              fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 600,
              letterSpacing: '0.25em', textTransform: 'uppercase',
              color: 'var(--ink-soft)',
              display: 'flex', alignItems: 'center', gap: '3.5rem'
            }}>
              {tag}
              <span style={{ color: i % 3 === 0 ? 'var(--verde)' : i % 3 === 1 ? 'var(--rosa)' : 'var(--azul)', fontSize: 24, lineHeight: 0 }}>·</span>
            </span>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          SOBRE — Editorial Split
      ═══════════════════════════════════════════ */}
      <section id="sobre" className="section-padding" style={{ padding: '6rem 1.25rem', position: 'relative', overflow: 'hidden' }}>
        <ParticleCanvas />
        <div style={{ position: 'absolute', top: 0, right: 0, width: 300, height: 300, background: 'radial-gradient(ellipse, #FAE0E6 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div className="reveal" style={{ marginBottom: '0.75rem' }}>
          <span className="badge badge-rosa">
            <span className="color-dot" style={{ background: 'var(--rosa)' }} />
            Sobre mim
          </span>
        </div>
        <div className="brush-stroke reveal reveal-delay-1" style={{ width: 60, marginBottom: '1.5rem' }} />

        <div className="desktop-grid-2" style={{ alignItems: 'center' }}>
          {/* Photo + info (Column 1) */}
          <div className="reveal" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            {/* Photo with double-bezel */}
            <div className="card-bezel float-b" style={{ flexShrink: 0 }}>
              <div className="card-inner" style={{ width: 'min(210px, 40vw)', borderRadius: 'calc(2rem - 6px)', overflow: 'hidden' }}>
                <img src="/img_4.jpeg" alt="Janynne Yngrid" style={{ width: '100%', height: 'auto', display: 'block' }} />
              </div>
            </div>

            {/* Text */}
            <div style={{ flex: 1 }}>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem,6vw,3.2rem)', lineHeight: 1.15, color: 'var(--ink)', marginBottom: '0.5rem' }}>
                Janynne<br />
                <span style={{ fontFamily: 'var(--font-script)', fontSize: '0.9em', color: 'var(--rosa-deep)' }}>Yngrid</span>
              </h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--ink-muted)', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
                Fashion Print & Brand Designer
              </p>
              {/* Color palette dots as credentials */}
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {[
                  { color: '#A8D66A', label: 'Design Têxtil' },
                  { color: '#F5B8C4', label: 'Moda' },
                  { color: '#6ECFE3', label: 'Branding' },
                ].map(item => (
                  <span key={item.label} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '4px 10px', borderRadius: 99, background: 'white', border: `1.5px solid ${item.color}`, color: 'var(--ink-soft)' }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: item.color, flexShrink: 0 }} />
                    {item.label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Bio text + Button (Column 2) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div className="reveal reveal-delay-1">
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--ink-soft)', marginBottom: '1rem' }}>
                Sou apaixonada por arte, cores e moda. Sou designer de estampas e estilista, formada em Design de Moda pela Universidade de Fortaleza e pós-graduanda em Inovação e Tecnologia em Design de Estampa pelo SENAI CETIQT.
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--ink-soft)', marginBottom: '1rem' }}>
                Há mais de 7 anos atuo no mercado da moda, desenvolvendo projetos para mais de 150 marcas. Crio estampas exclusivas, identidades visuais, ilustrações e croquis que unem estratégia criativa e desejo de mercado. Meu trabalho transforma conceitos em narrativas visuais autênticas, trazendo personalidade e identidade para marcas.
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--ink-soft)' }}>
                Mais do que criar estampas para todos os segmentos, busco traduzir emoções, tendências e histórias através da moda e do design.
              </p>
            </div>

            <div className="reveal reveal-delay-2">
              <Link to="/portfolio" className="btn-ghost" style={{ alignSelf: 'flex-start' }}>Ver Trabalhos</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          TRABALHOS EM DESTAQUE
      ═══════════════════════════════════════════ */}
      <section className="section-padding" style={{ padding: '6rem 1.25rem', background: 'white', position: 'relative', overflow: 'hidden' }}>
        <ParticleCanvas count={20} />
        <div className="reveal" style={{ marginBottom: '0.75rem' }}>
          <span className="badge badge-azul">
            <span className="color-dot" style={{ background: 'var(--azul)' }} />
            Portfólio
          </span>
        </div>
        <h2 className="reveal reveal-delay-1" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.6rem,6vw,2.5rem)', color: 'var(--ink)', marginBottom: '2rem' }}>
          Trabalhos em Destaque
        </h2>

        {/* Grid harmonioso estilo Portfólio */}
        <div className="desktop-grid-4" style={{ gap: '2rem', alignItems: 'start' }}>
          {HIGHLIGHTED_PROJECTS.map((p, i) => {
            const strokeColor = p.title === 'Jardim de Afetos' ? 'rose' : p.title === 'Cítricos do Sol' ? 'yellow' : 'teal';
            return (
              <div
                key={p.id}
                className={`reveal reveal-delay-${i} canvas-card-container portfolio-item-clickable`}
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
                    style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center', background: 'white', padding: '12px' }} 
                  />
                </div>
                <div className="canvas-card-label-area">
                  <div className={`card-brush-stroke card-brush-stroke-${strokeColor}`} />
                  <span className="card-brush-title-text" style={{ fontSize: '1.1rem' }}>
                    {p.title}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="reveal reveal-delay-3" style={{ marginTop: '2rem', textAlign: 'center' }}>
          <Link to="/portfolio" className="btn-primary">
            <span className="label">Ver Portfólio Completo</span>
            <span className="btn-icon" aria-hidden>→</span>
          </Link>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SERVIÇOS
      ═══════════════════════════════════════════ */}
      <section className="section-padding" style={{ padding: '6rem 1.25rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: 250, height: 250, background: 'radial-gradient(ellipse, #D6EDAF 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div className="reveal" style={{ marginBottom: '0.75rem' }}>
          <span className="badge badge-verde">
            <span className="color-dot" style={{ background: 'var(--verde)' }} />
            O que faço
          </span>
        </div>
        <h2 className="reveal reveal-delay-1" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.6rem,6vw,2.5rem)', color: 'var(--ink)', marginBottom: '2.5rem' }}>
          Serviços
        </h2>

        <div className="services-grid">
          {[
            { accent: 'verde', icon: '🎨', title: 'Design de Estampas', desc: 'Criação de padrões exclusivos para coleções de moda, com pesquisa de referências e desenvolvimento artístico completo.' },
            { accent: 'rosa', icon: '✦', title: 'Identidade Visual', desc: 'Construção da personalidade visual da sua marca — logo, paleta, tipografia e aplicações.' },
            { accent: 'azul', icon: '◈', title: 'Branding para Moda', desc: 'Estratégia e design visual pensados especificamente para marcas do setor fashion e lifestyle.' },
            { accent: 'amarelo', icon: '◎', title: 'Briefing & Consultoria', desc: 'Imersão nos valores da sua marca para guiar a criação com direção criativa assertiva.' },
          ].map((s, i) => (
            <div key={s.title} className={`reveal reveal-delay-${i % 3} service-card ${s.accent}`}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: '1rem', flexShrink: 0,
                  background: s.accent === 'verde' ? 'var(--verde-pale)' : s.accent === 'rosa' ? 'var(--rosa-pale)' : s.accent === 'azul' ? 'var(--azul-pale)' : '#FDF7D8',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 22,
                }}>
                  {s.icon}
                </div>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem', fontWeight: 600, color: 'var(--ink)', marginBottom: '0.4rem' }}>{s.title}</h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', lineHeight: 1.7, color: 'var(--ink-soft)' }}>{s.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          DEPOIMENTOS
      ═══════════════════════════════════════════ */}
      <section className="section-padding" style={{ padding: '6rem 1.25rem', background: 'var(--creme-warm)', position: 'relative', overflow: 'hidden' }}>
        <ParticleCanvas count={20} />
        <div className="reveal" style={{ marginBottom: '0.75rem' }}>
          <span className="badge badge-rosa">
            <span className="color-dot" style={{ background: 'var(--rosa)' }} />
            Clientes
          </span>
        </div>
        <h2 className="reveal reveal-delay-1" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.6rem,6vw,2.5rem)', color: 'var(--ink)', marginBottom: '2.5rem' }}>
          O que dizem
        </h2>

        <div className="desktop-grid-2" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {[
            { quote: '"A sensibilidade da Janynne para traduzir o sentimento da coleção em estampas foi extraordinária. Ela elevou o patamar do nosso design."', author: 'Maison Elegance', role: 'Alta Costura' },
            { quote: '"O processo criativo é fluido e transparente. O resultado final da nossa identidade visual superou todas as expectativas."', author: 'Atelier Nouveau', role: 'Moda Contemporânea' },
          ].map((t, i) => (
            <div key={i} className={`reveal reveal-delay-${i} testimonial-card`} style={{ marginLeft: i % 2 !== 0 ? '1rem' : 0 }}>
              <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '1rem', lineHeight: 1.75, color: 'var(--ink)', marginBottom: '1.25rem', position: 'relative', zIndex: 1 }}>
                {t.quote}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 24, height: 2, background: 'var(--rosa)', borderRadius: 2, flexShrink: 0 }} />
                <div>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--rosa-deep)' }}>{t.author}</span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 10, color: 'var(--ink-muted)', marginLeft: 6 }}>{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CTA FINAL
      ═══════════════════════════════════════════ */}
      <section className="section-padding" style={{ padding: '7rem 1.25rem', textAlign: 'center', position: 'relative', overflow: 'hidden', background: 'var(--ink)' }}>
        <ParticleCanvas count={25} />
        {/* Colored paint blobs on dark bg */}
        <div style={{ position: 'absolute', top: '20%', left: '10%', width: 160, height: 140, borderRadius: '60% 40% 70% 30% / 50% 60% 40% 50%', background: 'var(--verde)', opacity: 0.15, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '20%', right: '8%', width: 120, height: 100, borderRadius: '40% 60% 30% 70% / 60% 40% 60% 40%', background: 'var(--rosa)', opacity: 0.15, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '50%', right: '20%', width: 80, height: 70, borderRadius: '50%', background: 'var(--azul)', opacity: 0.15, pointerEvents: 'none' }} />

        <div className="reveal" style={{ marginBottom: '1rem' }}>
          <span style={{ fontFamily: 'var(--font-script)', fontSize: '1.5rem', color: 'var(--rosa)' }}>Vamos criar juntos?</span>
        </div>
        <h2 className="reveal reveal-delay-1" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem,7vw,3rem)', color: 'white', marginBottom: '1rem', lineHeight: 1.2 }}>
          Estampas criativas para marcas<br />
          <em style={{ fontStyle: 'italic', color: 'var(--verde)', fontFamily: 'var(--font-display)' }}>que desejam se destacar.</em>
        </h2>
        <p className="reveal reveal-delay-2" style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'rgba(255,255,255,0.6)', marginBottom: '2.5rem', maxWidth: 380, marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.7 }}>
          Estou disponível para novos projetos. Vamos conversar sobre sua coleção.
        </p>
        <div className="reveal reveal-delay-3">
          <Link to="/contato" className="btn-primary" style={{ background: 'var(--verde)', color: 'var(--ink)' }}>
            <span className="label">Solicitar Orçamento</span>
            <span className="btn-icon" style={{ background: 'rgba(28,20,16,0.15)' }}>✉</span>
          </Link>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════════ */}
      <footer style={{ background: '#111009', padding: '3rem 1.25rem', borderTop: '1px solid rgba(168,214,106,0.1)' }}>
        <div className="footer-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', textAlign: 'center' }}>
          <img src="/logo_img.png" alt="Studio Janynne Yngrid" style={{ width: 56, height: 56, borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(168,214,106,0.4)', opacity: 0.9 }} />

          <span style={{ fontFamily: 'var(--font-script)', fontSize: '1.3rem', color: 'white', opacity: 0.9 }}>Studio Janynne Yngrid</span>

          <nav className="footer-nav" style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link to="/" className="footer-link" style={{ color: 'rgba(255,255,255,0.5)' }}>Home</Link>
            <Link to="/portfolio" className="footer-link" style={{ color: 'rgba(255,255,255,0.5)' }}>Portfólio</Link>
            <Link to="/servicos" className="footer-link" style={{ color: 'rgba(255,255,255,0.5)' }}>Serviços</Link>
            <Link to="/contato" className="footer-link" style={{ color: 'rgba(255,255,255,0.5)' }}>Contato</Link>
          </nav>

          {/* Brand palette dots */}
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            {['var(--verde)', 'var(--rosa)', 'var(--azul)', 'var(--amarelo)'].map((c, i) => (
              <span key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: c, display: 'block' }} />
            ))}
          </div>

          <p style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            © 2025 Studio Janynne Yngrid · Todos os Direitos Reservados
          </p>
        </div>
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
