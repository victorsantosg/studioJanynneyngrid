import { useState } from 'react';
import { Link } from 'react-router-dom';
import useReveal from '../hooks/useReveal';

const CATEGORIES = ['Todos', 'Estampas', 'Identidade Visual', 'Branding', 'Ilustração'];

const PROJECTS = [
  { id: 1, img: '/img_1.jpeg', title: 'Coleção Primavera', cat: 'Estampas', accent: 'var(--verde)', year: '2024' },
  { id: 2, img: '/img_2.jpeg', title: 'Marca Atelier', cat: 'Identidade Visual', accent: 'var(--rosa)', year: '2024' },
  { id: 3, img: '/img_3.jpeg', title: 'Fashion Branding', cat: 'Branding', accent: 'var(--azul)', year: '2025' },
  { id: 4, img: '/img_1.jpeg', title: 'Estampa Floral', cat: 'Estampas', accent: 'var(--amarelo-deep)', year: '2025' },
  { id: 5, img: '/img_3.jpeg', title: 'Ilustração Têxtil', cat: 'Ilustração', accent: 'var(--verde)', year: '2025' },
  { id: 6, img: '/img_2.jpeg', title: 'Identidade de Marca', cat: 'Identidade Visual', accent: 'var(--rosa)', year: '2024' },
];

export default function Portfolio() {
  const [active, setActive] = useState('Todos');
  const pageRef = useReveal();

  const filtered = active === 'Todos' ? PROJECTS : PROJECTS.filter(p => p.cat === active);

  return (
    <div ref={pageRef} style={{ background: 'var(--creme)', paddingTop: '6rem' }}>

      {/* ─── HEADER ─── */}
      <section style={{ padding: '4rem 1.25rem 3rem', position: 'relative', overflow: 'hidden' }}>
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

      {/* ─── FILTER PILLS ─── */}
      <div className="reveal" style={{ padding: '0 1.25rem 2rem', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
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
        <div className="desktop-grid-4" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {filtered.map((p, i) => (
            <div
              key={p.id}
              className={`reveal reveal-delay-${i % 4} portfolio-card`}
              style={{
                gridColumn: i === 0 ? '1 / -1' : 'auto',
                height: i === 0 ? 300 : 220,
              }}
            >
              <img src={p.img} alt={p.title} style={{ objectPosition: 'top center' }} />
              <div className="overlay">
                <div>
                  <span style={{
                    fontFamily: 'var(--font-body)', fontSize: 9, fontWeight: 700,
                    letterSpacing: '0.2em', textTransform: 'uppercase',
                    color: p.accent, display: 'block', marginBottom: 4,
                  }}>
                    {p.cat}  ·  {p.year}
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: i === 0 ? '1.3rem' : '1rem', color: 'white' }}>
                    {p.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
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
    </div>
  );
}
