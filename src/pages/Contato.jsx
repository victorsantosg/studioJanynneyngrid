import { useState } from 'react';
import { Link } from 'react-router-dom';
import useReveal from '../hooks/useReveal';
import ParticleCanvas from '../components/ParticleCanvas';

export default function Contato() {
  const pageRef = useReveal();
  const [form, setForm] = useState({ nome: '', email: '', servico: '', mensagem: '' });
  const [sent, setSent] = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleSubmit = e => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div ref={pageRef} style={{ background: 'var(--creme)', paddingTop: '6rem' }}>

      {/* ─── HEADER ─── */}
      <section style={{ padding: '4rem 1.25rem 2rem', position: 'relative', overflow: 'hidden' }}>
        <ParticleCanvas />
        <div style={{ position: 'absolute', top: '5%', right: '-5%', width: 200, height: 180, borderRadius: '60% 40% 70% 30% / 50% 60% 40% 50%', background: 'var(--azul-pale)', opacity: 0.7, pointerEvents: 'none' }} />

        <div className="reveal" style={{ marginBottom: '0.75rem' }}>
          <span className="badge badge-azul">
            <span className="color-dot" style={{ background: 'var(--azul)' }} />
            Contato
          </span>
        </div>
        <h1 className="reveal reveal-delay-1" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem,8vw,3.5rem)', color: 'var(--ink)', lineHeight: 1.1, marginBottom: '1rem' }}>
          Vamos criar<br />
          <em style={{ fontStyle: 'italic', color: 'var(--azul-deep)', fontFamily: 'var(--font-display)' }}>algo incrível</em>
        </h1>
        <p className="reveal reveal-delay-2" style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--ink-soft)', lineHeight: 1.7, maxWidth: 380 }}>
          Conta pra mim sobre o seu projeto. Responderei em até 24 horas.
        </p>
        <div className="brush-stroke reveal reveal-delay-3" style={{ width: 80, marginTop: '1.5rem' }} />
      </section>

      {/* ─── CONTATO GERAL (CARDS + FORM) ─── */}
      <section className="section-padding contact-layout" style={{ padding: '2rem 1.25rem 6rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { icon: '📱', label: 'WhatsApp', value: '+55 (85) 9 9999-9999', accent: 'var(--verde)', href: 'https://wa.me/5585999999999' },
            { icon: '📸', label: 'Instagram', value: '@studiojanynneyngrid', accent: 'var(--rosa)', href: 'https://instagram.com/studiojanynneyngrid' },
            { icon: '✉', label: 'E-mail', value: 'studio@janynneyngrid.com', accent: 'var(--azul)', href: 'mailto:studio@janynneyngrid.com' },
          ].map((c, i) => (
            <a
              key={c.label}
              href={c.href}
              target="_blank"
              rel="noreferrer"
              className={`reveal reveal-delay-${i}`}
              style={{
                display: 'flex', alignItems: 'center', gap: 16,
                padding: '1.25rem 1.5rem', borderRadius: '1rem',
                background: 'white', border: '1.5px solid rgba(168,214,106,0.2)',
                textDecoration: 'none',
                transition: 'transform 0.35s cubic-bezier(0.32,0.72,0,1), box-shadow 0.35s',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateX(6px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(168,214,106,0.12)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
            >
              <div style={{ width: 44, height: 44, borderRadius: '0.75rem', background: `${c.accent}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
                {c.icon}
              </div>
              <div>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--ink-muted)', display: 'block' }}>{c.label}</span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: 500, color: 'var(--ink)' }}>{c.value}</span>
              </div>
              <span style={{ marginLeft: 'auto', color: c.accent, fontSize: 18 }}>→</span>
            </a>
          ))}
        </div>

        <div className="card-bezel">
          <div className="card-inner" style={{ padding: '2rem' }}>
            {!sent ? (
              <>
                <div style={{ marginBottom: '0.5rem' }}>
                  <span className="badge badge-verde" style={{ marginBottom: '1rem', display: 'inline-flex' }}>
                    <span className="color-dot" style={{ background: 'var(--verde)' }} />
                    Briefing Rápido
                  </span>
                </div>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--ink)', marginBottom: '1.5rem' }}>
                  Conte sobre seu projeto
                </h2>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div>
                    <label style={{ fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--ink-muted)', display: 'block', marginBottom: 6 }}>Seu nome</label>
                    <input name="nome" className="form-field" placeholder="Como posso te chamar?" value={form.nome} onChange={handleChange} required />
                  </div>
                  <div>
                    <label style={{ fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--ink-muted)', display: 'block', marginBottom: 6 }}>E-mail</label>
                    <input name="email" type="email" className="form-field" placeholder="seu@email.com" value={form.email} onChange={handleChange} required />
                  </div>
                  <div>
                    <label style={{ fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--ink-muted)', display: 'block', marginBottom: 6 }}>Serviço de interesse</label>
                    <select name="servico" className="form-field" value={form.servico} onChange={handleChange} style={{ appearance: 'none', cursor: 'pointer' }}>
                      <option value="">Selecione um serviço...</option>
                      <option>Design de Estampas</option>
                      <option>Identidade Visual Completa</option>
                      <option>Branding para Moda</option>
                      <option>Outro / Orçamento Personalizado</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--ink-muted)', display: 'block', marginBottom: 6 }}>Sobre o projeto</label>
                    <textarea
                      name="mensagem" className="form-field"
                      placeholder="Me conta um pouco sobre sua marca, o que você precisa e qual a sua visão..."
                      value={form.mensagem} onChange={handleChange}
                      rows={5} required
                      style={{ resize: 'vertical', minHeight: 120 }}
                    />
                  </div>

                  <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                    <span className="label">Enviar Briefing</span>
                    <span className="btn-icon">→</span>
                  </button>
                </form>
              </>
            ) : (
              /* ─── Success State ─── */
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <div style={{ fontSize: 48, marginBottom: '1rem' }}>🎨</div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: '1rem' }}>
                  {['var(--verde)', 'var(--rosa)', 'var(--azul)', 'var(--amarelo)'].map((c, i) => (
                    <span key={i} style={{ width: 12, height: 12, borderRadius: '50%', background: c, display: 'block' }} />
                  ))}
                </div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: 'var(--ink)', marginBottom: '0.75rem' }}>
                  Mensagem enviada!
                </h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--ink-soft)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                  Obrigada pelo contato! Responderei em até 24 horas. Mal posso esperar para conhecer mais sobre o seu projeto. ✨
                </p>
                <button className="btn-ghost" onClick={() => setSent(false)}>Enviar nova mensagem</button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ─── BIO CARD ─── */}
      <section style={{ padding: '4rem 1.25rem', background: 'var(--ink)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '15%', right: '5%', width: 150, height: 130, borderRadius: '60% 40% 70% 30% / 50% 60% 40% 50%', background: 'var(--verde)', opacity: 0.12, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '20%', left: '5%', width: 100, height: 90, borderRadius: '50%', background: 'var(--rosa)', opacity: 0.12, pointerEvents: 'none' }} />

        <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 72, height: 72, borderRadius: '50%', overflow: 'hidden', flexShrink: 0, border: '2px solid var(--verde)', opacity: 0.95 }}>
              <img src="/img_1.jpeg" alt="Janynne" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
            </div>
            <div style={{ textAlign: 'left' }}>
              <span style={{ fontFamily: 'var(--font-script)', fontSize: '1.3rem', color: 'var(--rosa)', display: 'block', marginBottom: 2 }}>Janynne Yngrid</span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>Fashion Print & Brand Designer</span>
            </div>
          </div>

          <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '1.15rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.75)', marginTop: '2rem' }}>
            "Acredito que toda marca tem uma história única para contar. Meu trabalho é encontrar as cores, formas e texturas que traduzem essa história com autenticidade."
          </p>
        </div>
      </section>

      <footer style={{ background: '#111009', padding: '2rem 1.25rem', textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
          © 2025 Studio Janynne Yngrid · Todos os Direitos Reservados
        </p>
      </footer>
    </div>
  );
}
