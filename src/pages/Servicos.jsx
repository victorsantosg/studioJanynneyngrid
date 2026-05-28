import { Link } from 'react-router-dom';
import useReveal from '../hooks/useReveal';
import ParticleCanvas from '../components/ParticleCanvas';

const PROCESS = [
  {
    num: '01', accent: 'var(--verde)', badge: 'Início',
    title: 'Briefing & Imersão',
    desc: 'Mergulho profundo nos valores, DNA e referências da sua marca. Entendemos o que você quer comunicar antes de qualquer criação.',
    duration: '1–2 semanas',
  },
  {
    num: '02', accent: 'var(--rosa)', badge: 'Criação',
    title: 'Pesquisa & Conceito',
    desc: 'Desenvolvimento de referências visuais, moodboard e direção criativa. Apresentação de conceito para validação.',
    duration: '1–2 semanas',
  },
  {
    num: '03', accent: 'var(--azul)', badge: 'Desenvolvimento',
    title: 'Design & Refinamento',
    desc: 'Criação artística com até 3 rodadas de revisão incluídas. Cada detalhe é pensado com precisão e cuidado.',
    duration: '2–3 semanas',
  },
  {
    num: '04', accent: 'var(--amarelo-deep)', badge: 'Finalização',
    title: 'Entrega & Suporte',
    desc: 'Arquivos finais em todos os formatos necessários + guia de uso. Suporte para implementação.',
    duration: '1 semana',
  },
];

const SERVICES = [
  {
    icon: '◈', accent: 'verde',
    title: 'Design de Estampas',
    price: 'A partir de R$ 800',
    items: ['Pesquisa de referências', 'Desenvolvimento do padrão', 'Paleta de cores exclusiva', 'Arquivos prontos para produção', '2 revisões incluídas'],
  },
  {
    icon: '✦', accent: 'rosa', featured: true,
    title: 'Identidade Visual Completa',
    price: 'A partir de R$ 2.500',
    items: ['Logo + variações', 'Paleta de cores', 'Tipografia', 'Manual da marca', 'Aplicações digitais', '3 revisões incluídas'],
  },
  {
    icon: '◎', accent: 'azul',
    title: 'Branding para Moda',
    price: 'A partir de R$ 3.500',
    items: ['Identidade visual completa', 'Estratégia de marca', 'Design de estampas', 'Embalagens e tags', 'Suporte por 30 dias'],
  },
];

export default function Servicos() {
  const pageRef = useReveal();

  return (
    <div ref={pageRef} style={{ background: 'var(--creme)', paddingTop: '6rem' }}>

      {/* ─── HEADER ─── */}
      <section style={{ padding: '4rem 1.25rem 3rem', position: 'relative', overflow: 'hidden' }}>
        <ParticleCanvas />
        <div style={{ position: 'absolute', top: '5%', right: '-8%', width: 220, height: 200, borderRadius: '60% 40% 70% 30% / 50% 60% 40% 50%', background: 'var(--rosa-pale)', opacity: 0.7, pointerEvents: 'none' }} />

        <div className="reveal" style={{ marginBottom: '0.75rem' }}>
          <span className="badge badge-rosa">
            <span className="color-dot" style={{ background: 'var(--rosa)' }} />
            Serviços
          </span>
        </div>
        <h1 className="reveal reveal-delay-1" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem,8vw,3.5rem)', color: 'var(--ink)', lineHeight: 1.1, marginBottom: '1rem' }}>
          Como posso<br />
          <em style={{ fontStyle: 'italic', color: 'var(--rosa-deep)', fontFamily: 'var(--font-display)' }}>ajudar sua marca</em>
        </h1>
        <p className="reveal reveal-delay-2" style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--ink-soft)', lineHeight: 1.7, maxWidth: 400 }}>
          Cada projeto é único. Aqui você encontra os serviços e o processo criativo do Studio Janynne Yngrid.
        </p>
        <div className="brush-stroke reveal reveal-delay-3" style={{ width: 80, marginTop: '1.5rem' }} />
      </section>

      {/* ─── PACKAGES ─── */}
      <section className="section-padding" style={{ padding: '2rem 1.25rem 5rem' }}>
        <div className="desktop-grid-3">
          {SERVICES.map((s, i) => (
            <div
              key={s.title}
              className={`reveal reveal-delay-${i}`}
              style={{
                padding: '2rem',
                borderRadius: '1.5rem',
                background: s.featured ? 'var(--ink)' : 'white',
                border: s.featured ? 'none' : '1.5px solid rgba(168,214,106,0.2)',
                position: 'relative',
                overflow: 'hidden',
                transition: 'transform 0.4s cubic-bezier(0.32,0.72,0,1), box-shadow 0.4s',
              }}
            >
              {s.featured && (
                <>
                  <div style={{ position: 'absolute', top: '20%', right: '-5%', width: 140, height: 120, borderRadius: '60% 40% 70% 30% / 50% 60% 40% 50%', background: 'var(--rosa)', opacity: 0.12, pointerEvents: 'none' }} />
                  <div style={{ position: 'absolute', bottom: '15%', left: '5%', width: 100, height: 90, borderRadius: '50%', background: 'var(--verde)', opacity: 0.1, pointerEvents: 'none' }} />
                  <span style={{
                    position: 'absolute', top: '1.25rem', right: '1.25rem',
                    fontFamily: 'var(--font-body)', fontSize: 9, fontWeight: 700,
                    letterSpacing: '0.2em', textTransform: 'uppercase',
                    padding: '4px 12px', borderRadius: 9999,
                    background: 'var(--verde)', color: 'var(--ink)',
                  }}>
                    Mais Popular
                  </span>
                </>
              )}

              <div style={{ fontSize: 28, marginBottom: '0.75rem', color: s.featured ? s.accent === 'rosa' ? 'var(--rosa)' : 'var(--verde)' : `var(--${s.accent})` }}>
                {s.icon}
              </div>

              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', color: s.featured ? 'white' : 'var(--ink)', marginBottom: '0.25rem' }}>
                {s.title}
              </h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', fontWeight: 600, color: s.featured ? 'var(--verde)' : 'var(--verde-deep)', marginBottom: '1.25rem' }}>
                {s.price}
              </p>

              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8, marginBottom: '1.5rem' }}>
                {s.items.map(item => (
                  <li key={item} style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: s.featured ? 'rgba(255,255,255,0.8)' : 'var(--ink-soft)' }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: s.featured ? 'var(--verde)' : `var(--${s.accent})`, flexShrink: 0 }} />
                    {item}
                  </li>
                ))}
              </ul>

              <Link to="/contato" className="btn-primary" style={s.featured ? { background: 'var(--verde)', color: 'var(--ink)' } : {}}>
                <span className="label">Solicitar</span>
                <span className="btn-icon" style={s.featured ? { background: 'rgba(28,20,16,0.2)' } : {}}>→</span>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ─── PROCESSO ─── */}
      <section id="processo" className="section-padding" style={{ padding: '5rem 1.25rem', background: 'var(--creme-warm)', position: 'relative', overflow: 'hidden' }}>
        <ParticleCanvas count={20} />
        <div className="reveal" style={{ marginBottom: '0.75rem' }}>
          <span className="badge badge-azul">
            <span className="color-dot" style={{ background: 'var(--azul)' }} />
            Como funciona
          </span>
        </div>
        <h2 className="reveal reveal-delay-1" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.6rem,6vw,2.5rem)', color: 'var(--ink)', marginBottom: '2.5rem' }}>
          O Processo Criativo
        </h2>

        <div className="process-grid">
          {PROCESS.map((step, i) => (
            <div key={step.num} className={`reveal reveal-delay-${i % 3} process-step`} style={{ display: 'flex', gap: '1.25rem', paddingBottom: i < PROCESS.length - 1 ? '2rem' : 0, position: 'relative' }}>
              {/* Timeline line */}
              {i < PROCESS.length - 1 && (
                <div className="process-line" style={{ position: 'absolute', left: 22, top: 52, bottom: 0, width: 2, background: 'rgba(168,214,106,0.2)' }} />
              )}

              {/* Step number circle */}
              <div style={{
                width: 44, height: 44, borderRadius: '50%', flexShrink: 0,
                background: step.accent, display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontFamily: 'var(--font-body)',
                fontSize: 12, fontWeight: 700, color: step.accent === 'var(--amarelo-deep)' ? 'var(--ink)' : 'white',
                position: 'relative', zIndex: 1,
                boxShadow: `0 4px 16px ${step.accent}40`,
              }}>
                {step.num}
              </div>

              {/* Content */}
              <div style={{ paddingTop: 6 }}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-muted)', display: 'block', marginBottom: 4 }}>
                  {step.badge}  ·  {step.duration}
                </span>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', color: 'var(--ink)', marginBottom: '0.4rem' }}>{step.title}</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', lineHeight: 1.7, color: 'var(--ink-soft)' }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="section-padding" style={{ padding: '5rem 1.25rem 4rem', background: 'white', position: 'relative', overflow: 'hidden' }}>
        <ParticleCanvas count={15} />
        <div className="reveal" style={{ marginBottom: '0.75rem' }}>
          <span className="badge badge-verde">
            <span className="color-dot" style={{ background: 'var(--verde)' }} />
            Dúvidas
          </span>
        </div>
        <h2 className="reveal reveal-delay-1" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.6rem,6vw,2.5rem)', color: 'var(--ink)', marginBottom: '2rem' }}>
          Perguntas Frequentes
        </h2>

        <div className="desktop-grid-2">
          {[
            { q: 'Você faz revisões nos projetos?', a: 'Sim! Cada pacote inclui rodadas de revisão. Trabalho até o resultado ficar perfeito para você.' },
            { q: 'Como funciona o pagamento?', a: '50% de entrada para início do projeto e 50% na entrega dos arquivos finais.' },
            { q: 'Quais formatos de arquivo são entregues?', a: 'AI, PDF, PNG e JPEG em alta resolução. Formatos específicos podem ser acordados conforme a necessidade.' },
            { q: 'Você trabalha com clientes de outros estados?', a: 'Sim! Atendo clientes de todo o Brasil de forma totalmente online.' },
          ].map((faq, i) => (
            <div key={i} className={`reveal reveal-delay-${i % 3}`} style={{ padding: '1.25rem 1.5rem', borderRadius: '1rem', background: 'var(--creme)', border: '1px solid rgba(168,214,106,0.2)' }}>
              <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.95rem', color: 'var(--ink)', marginBottom: '0.5rem' }}>{faq.q}</h4>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', lineHeight: 1.7, color: 'var(--ink-soft)' }}>{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section style={{ padding: '5rem 1.25rem', textAlign: 'center', background: 'var(--creme-warm)', borderTop: '1px solid rgba(168,214,106,0.15)', position: 'relative', overflow: 'hidden' }}>
        <ParticleCanvas count={15} />
        <div className="reveal" style={{ marginBottom: '0.5rem' }}>
          <span style={{ fontFamily: 'var(--font-script)', fontSize: '1.4rem', color: 'var(--verde-deep)' }}>Pronto para começar?</span>
        </div>
        <p className="reveal reveal-delay-1" style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--ink-soft)', marginBottom: '1.5rem' }}>
          Vamos conversar sobre o seu projeto.
        </p>
        <div className="reveal reveal-delay-2">
          <Link to="/contato" className="btn-primary">
            <span className="label">Entrar em Contato</span>
            <span className="btn-icon">✉</span>
          </Link>
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
