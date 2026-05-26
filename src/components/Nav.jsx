import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    
    // Scroll suave para âncoras (IDs)
    if (location.hash) {
      const id = location.hash.substring(1);
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 200);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  const isActive = (path, hash = '') => {
    if (hash) {
      return location.pathname === path && location.hash === hash;
    }
    return location.pathname === path && !location.hash;
  };

  const Logo = () => (
    <div className="logo-watercolor-container">
      <div className="logo-splash teal-splash" />
      <div className="logo-splash pink-splash" />
      <div className="logo-splash yellow-splash" />
      
      {/* Ícone de Pincel SVG */}
      <svg 
        className="logo-paintbrush" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="var(--ink)" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <path d="M18 11l-6-6-8.5 8.5a3.5 3.5 0 0 0 5 5L17 12" />
        <path d="M14 14l1.5 1.5" />
        <path d="M18 11.5l1.5-1.5a1.5 1.5 0 0 1 2 2l-1.5 1.5" />
        <path d="M21 9l-2-2" />
        <path d="M3.5 14.5L2 22l7.5-1.5" />
      </svg>

      <div className="logo-text">
        <span className="logo-studio">Studio</span>
        <span className="logo-name">Janynne Yngrid</span>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <>
        <nav className={`nav-pill${scrolled ? ' scrolled' : ''}`}>
          {/* Wrapper da marca que encolhe e sumirá no scroll */}
          <div 
            className="nav-pill-brand-wrap" 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.75rem', 
              flexGrow: 1, 
              overflow: 'hidden',
              transition: 'max-width 0.5s cubic-bezier(0.32, 0.72, 0, 1), opacity 0.4s ease, gap 0.5s ease',
              maxWidth: scrolled ? 0 : 300,
              opacity: scrolled ? 0 : 1,
              pointerEvents: scrolled ? 'none' : 'auto'
            }}
          >
            <Link to="/" style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
              <img
                src="/logo_img.png"
                alt="Studio Janynne Yngrid"
                style={{ height: 36, width: 36, borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(168,214,106,0.5)' }}
              />
            </Link>
            <span style={{
              fontFamily: 'Dancing Script, cursive',
              fontSize: '1.05rem',
              color: 'var(--ink)',
              letterSpacing: '0.02em',
              whiteSpace: 'nowrap',
              flexGrow: 1,
              textAlign: 'center'
            }}>
              Janynne Yngrid
            </span>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Menu"
            style={{ background: 'none', border: 'none', padding: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
          >
            <div className={`hamburger${menuOpen ? ' open' : ''}`}>
              <span /><span /><span />
            </div>
          </button>
        </nav>

        {/* Full-screen menu overlay */}
        <div className={`menu-overlay${menuOpen ? ' open' : ''}`}>
          <div style={{ position: 'absolute', top: '10%', right: '8%', width: 240, height: 240, borderRadius: '50%', background: 'var(--verde-pale)', opacity: 0.5, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '12%', left: '5%', width: 180, height: 180, borderRadius: '50%', background: 'var(--rosa-pale)', opacity: 0.5, pointerEvents: 'none' }} />

          <Link to="/" className="menu-link">Home</Link>
          <Link to="/portfolio" className="menu-link">Estampas</Link>
          <Link to="/#sobre" className="menu-link">Sobre</Link>
          <Link to="/servicos#processo" className="menu-link">Processo Criativo</Link>
          <Link to="/contato" className="menu-link">Contato</Link>

          <div style={{ position: 'absolute', bottom: '2rem', display: 'flex', gap: 24, alignItems: 'center' }}>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="footer-link">Instagram</a>
            <span style={{ color: 'var(--ink-muted)', fontSize: 10 }}>·</span>
            <a href="https://wa.me/" target="_blank" rel="noreferrer" className="footer-link">WhatsApp</a>
          </div>
        </div>
      </>
    );
  }

  // DESKTOP NAVBAR
  return (
    <header className={`header-nav-container${scrolled ? ' scrolled' : ''}`}>
      <Link to="/" className="header-logo-section">
        <Logo />
      </Link>

      <nav className="header-links-section">
        <Link 
          to="/" 
          className={`nav-link${isActive('/') ? ' nav-link-active' : ''}`}
        >
          Home
        </Link>
        <Link 
          to="/portfolio" 
          className={`nav-link${isActive('/portfolio') ? ' nav-link-active' : ''}`}
        >
          Estampas
        </Link>
        <Link 
          to="/#sobre" 
          className={`nav-link${isActive('/', '#sobre') ? ' nav-link-active' : ''}`}
        >
          Sobre
        </Link>
        <Link 
          to="/servicos#processo" 
          className={`nav-link${isActive('/servicos', '#processo') ? ' nav-link-active' : ''}`}
        >
          Processo Criativo
        </Link>
        <Link 
          to="/contato" 
          className={`nav-link${isActive('/contato') ? ' nav-link-active' : ''}`}
        >
          Contato
        </Link>

        {/* Botão Pílula Aquarela */}
        <Link to="/contato" className="btn-watercolor-teal" style={{ marginLeft: '1rem' }}>
          Vamos criar juntas?
        </Link>
      </nav>
    </header>
  );
}
