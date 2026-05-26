import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import useReveal from '../hooks/useReveal';

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

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div ref={pageRef} style={{ background: 'var(--creme)' }}>

      {/* ═══════════════════════════════════════════
          HERO — Z-Axis Cascade Layout
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
        {/* Ambient background blobs */}
        <div style={{ position: 'absolute', top: '5%', right: '-5%', width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(ellipse, #D6EDAF 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '20%', left: '-10%', width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(ellipse, #FAE0E6 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '5%', width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(ellipse, #C2EBF5 0%, transparent 70%)', pointerEvents: 'none' }} />

        {/* Floating photos — Z-Axis Cascade */}
        <div className="desktop-hero-images">
          <div style={{ position: 'absolute', top: '8%', right: '4%', zIndex: 2 }} className="float-a">
            <div className={`hero-float-a float-a${visible ? ' paint-pop' : ''}`} style={{ width: 'min(180px, 42vw)', borderRadius: '1.5rem', overflow: 'hidden', boxShadow: '0 16px 48px rgba(28,20,16,0.18)', border: '4px solid white', transform: 'rotate(-3deg)' }}>
              <img src="/img_1.jpeg" alt="Janynne" style={{ width: '100%', display: 'block', objectFit: 'cover', aspectRatio: '3/4' }} />
            </div>
          </div>

          <div style={{ position: 'absolute', top: '30%', right: '38%', zIndex: 1 }} className="float-b">
            <div className={`hero-float-b float-b${visible ? ' paint-pop' : ''}`} style={{ animationDelay: '0.2s', width: 'min(130px, 30vw)', borderRadius: '1rem', overflow: 'hidden', boxShadow: '0 12px 36px rgba(28,20,16,0.14)', border: '3px solid white', transform: 'rotate(2deg)' }}>
              <img src="/img_3.jpeg" alt="Janynne" style={{ width: '100%', display: 'block', objectFit: 'cover', aspectRatio: '3/4' }} />
            </div>
          </div>
        </div>

        {/* Paint palette blobs (decorative) */}
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

        {/* Hero text */}
        <div className="desktop-hero-text" style={{ position: 'relative', zIndex: 3, maxWidth: 500 }}>
          <div className={`reveal${visible ? ' visible' : ''}`} style={{ marginBottom: '1rem' }}>
            <span className="badge badge-verde">
              <span className="color-dot" style={{ background: 'var(--verde)' }} />
              Design · Arte · Moda
            </span>
          </div>

          <h1 className={`reveal font-heading font-heading-hero${visible ? ' visible' : ''}`} style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.2rem, 9vw, 4.5rem)',
            lineHeight: 1.1,
            color: 'var(--ink)',
            marginBottom: '1.25rem',
          }}>
            Criando a{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--rosa-deep)', fontFamily: 'var(--font-display)' }}>identidade</em>
            <br />da sua marca em{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--verde-deep)', fontFamily: 'var(--font-display)' }}>cores</em>{' '}
            e elementos.
          </h1>

          <p className={`reveal reveal-delay-1${visible ? ' visible' : ''}`} style={{
            fontFamily: 'var(--font-body)', fontSize: '0.95rem', lineHeight: 1.7,
            color: 'var(--ink-soft)', marginBottom: '2rem', maxWidth: 380,
          }}>
            Studio especializado em design têxtil, estampas exclusivas e identidade visual para marcas de moda.
          </p>

          <div className={`reveal reveal-delay-2${visible ? ' visible' : ''}`} style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link to="/portfolio" className="btn-primary">
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
      <div style={{ background: 'var(--ink)', padding: '1rem 0', overflow: 'hidden' }}>
        <div className="marquee-track">
          {[...TAGS, ...TAGS].map((tag, i) => (
            <span key={i} style={{
              fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 600,
              letterSpacing: '0.2em', textTransform: 'uppercase',
              color: i % 3 === 0 ? 'var(--verde)' : i % 3 === 1 ? 'var(--rosa)' : 'var(--azul)',
              padding: '0 2rem', whiteSpace: 'nowrap',
            }}>
              {tag}  ·
            </span>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          SOBRE — Editorial Split
      ═══════════════════════════════════════════ */}
      <section className="section-padding" style={{ padding: '6rem 1.25rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, right: 0, width: 300, height: 300, background: 'radial-gradient(ellipse, #FAE0E6 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div className="reveal" style={{ marginBottom: '0.75rem' }}>
          <span className="badge badge-rosa">
            <span className="color-dot" style={{ background: 'var(--rosa)' }} />
            Sobre a Designer
          </span>
        </div>
        <div className="brush-stroke reveal reveal-delay-1" style={{ width: 60, marginBottom: '1.5rem' }} />

        <div className="desktop-grid-2" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {/* Photo + info */}
          <div className="reveal" style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
            {/* Photo with double-bezel */}
            <div className="card-bezel float-b" style={{ flexShrink: 0 }}>
              <div className="card-inner" style={{ width: 'min(140px, 36vw)', borderRadius: 'calc(2rem - 6px)', overflow: 'hidden' }}>
                <img src="/img_2.jpeg" alt="Janynne Yngrid" style={{ width: '100%', display: 'block', objectFit: 'cover', aspectRatio: '3/4' }} />
              </div>
            </div>

            {/* Text */}
            <div style={{ flex: 1 }}>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem,6vw,2.8rem)', lineHeight: 1.15, color: 'var(--ink)', marginBottom: '0.5rem' }}>
                Janynne<br />
                <span style={{ fontFamily: 'var(--font-script)', fontSize: '0.9em', color: 'var(--rosa-deep)' }}>Yngrid</span>
              </h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--ink-muted)', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1rem' }}>
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

          {/* Bio text */}
          <div className="reveal reveal-delay-1">
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', lineHeight: 1.8, color: 'var(--ink-soft)', marginBottom: '1rem' }}>
              Especialista em transformar conceitos abstratos em narrativas visuais tangíveis. Com um olhar refinado para a alta costura e design têxtil, Janynne une a precisão técnica do atelier à expressividade artística da ilustração manual.
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', lineHeight: 1.8, color: 'var(--ink-soft)' }}>
              Criando estampas exclusivas e identidades visuais que definem o DNA de marcas contemporâneas de moda.
            </p>
          </div>

          <div className="reveal reveal-delay-2">
            <Link to="/portfolio" className="btn-ghost" style={{ alignSelf: 'flex-start' }}>Ver Trabalhos</Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          TRABALHOS EM DESTAQUE
      ═══════════════════════════════════════════ */}
      <section className="section-padding" style={{ padding: '6rem 1.25rem', background: 'white' }}>
        <div className="reveal" style={{ marginBottom: '0.75rem' }}>
          <span className="badge badge-azul">
            <span className="color-dot" style={{ background: 'var(--azul)' }} />
            Portfólio
          </span>
        </div>
        <h2 className="reveal reveal-delay-1" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.6rem,6vw,2.5rem)', color: 'var(--ink)', marginBottom: '2rem' }}>
          Trabalhos em Destaque
        </h2>

        {/* Bento Grid */}
        <div className="desktop-grid-2" style={{ display: 'grid', gridTemplateRows: 'auto auto', gap: 16 }}>
          {/* Card 1 — full width */}
          <div className="reveal portfolio-card" style={{ height: 280 }}>
            <img src="/img_1.jpeg" alt="Design de Moda" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
            <div className="overlay">
              <div>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--verde)', display: 'block', marginBottom: 4 }}>Fashion Design</span>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', color: 'white' }}>Estampas Exclusivas</h3>
              </div>
            </div>
          </div>

          {/* Cards 2 & 3 — side by side */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div className="reveal reveal-delay-1 portfolio-card" style={{ height: 220 }}>
              <img src="/img_2.jpeg" alt="Identidade Visual" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
              <div className="overlay">
                <div>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 9, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--rosa)', display: 'block', marginBottom: 4 }}>Branding</span>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', color: 'white' }}>Identidade Visual</h3>
                </div>
              </div>
            </div>
            <div className="reveal reveal-delay-2 portfolio-card" style={{ height: 220 }}>
              <img src="/img_3.jpeg" alt="Ilustração" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
              <div className="overlay">
                <div>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 9, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--azul)', display: 'block', marginBottom: 4 }}>Design</span>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', color: 'white' }}>Ilustração</h3>
                </div>
              </div>
            </div>
          </div>
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

        <div className="services-grid" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
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
      <section className="section-padding" style={{ padding: '6rem 1.25rem', background: 'var(--creme-warm)' }}>
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
        {/* Colored paint blobs on dark bg */}
        <div style={{ position: 'absolute', top: '20%', left: '10%', width: 160, height: 140, borderRadius: '60% 40% 70% 30% / 50% 60% 40% 50%', background: 'var(--verde)', opacity: 0.15, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '20%', right: '8%', width: 120, height: 100, borderRadius: '40% 60% 30% 70% / 60% 40% 60% 40%', background: 'var(--rosa)', opacity: 0.15, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '50%', right: '20%', width: 80, height: 70, borderRadius: '50%', background: 'var(--azul)', opacity: 0.15, pointerEvents: 'none' }} />

        <div className="reveal" style={{ marginBottom: '1rem' }}>
          <span style={{ fontFamily: 'var(--font-script)', fontSize: '1.5rem', color: 'var(--rosa)' }}>Vamos criar juntos?</span>
        </div>
        <h2 className="reveal reveal-delay-1" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem,7vw,3rem)', color: 'white', marginBottom: '1rem', lineHeight: 1.2 }}>
          Sua marca merece uma identidade<br />
          <em style={{ fontStyle: 'italic', color: 'var(--verde)', fontFamily: 'var(--font-display)' }}>que conta uma história.</em>
        </h2>
        <p className="reveal reveal-delay-2" style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'rgba(255,255,255,0.6)', marginBottom: '2.5rem', maxWidth: 380, marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.7 }}>
          Estou disponível para novos projetos. Vamos conversar sobre a sua marca.
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
    </div>
  );
}
