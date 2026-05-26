import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  return (
    <>
      <nav className={`nav-pill${scrolled ? ' scrolled' : ''}`} style={{ minWidth: 'min(360px, 90vw)' }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src="/logo_img.jpeg"
            alt="Studio Janynne Yngrid"
            style={{ height: 36, width: 36, borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(168,214,106,0.5)' }}
          />
        </Link>

        {/* Brand name */}
        <span style={{
          fontFamily: 'Dancing Script, cursive',
          fontSize: '1.05rem',
          color: 'var(--ink)',
          flexGrow: 1,
          textAlign: 'center',
          letterSpacing: '0.02em',
        }}>
          Janynne Yngrid
        </span>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Menu"
          style={{ background: 'none', border: 'none', padding: 4 }}
        >
          <div className={`hamburger${menuOpen ? ' open' : ''}`}>
            <span /><span /><span />
          </div>
        </button>
      </nav>

      {/* Full-screen menu overlay */}
      <div className={`menu-overlay${menuOpen ? ' open' : ''}`}>
        {/* Decorative blobs */}
        <div style={{ position: 'absolute', top: '10%', right: '8%', width: 240, height: 240, borderRadius: '50%', background: 'var(--verde-pale)', opacity: 0.5, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '12%', left: '5%', width: 180, height: 180, borderRadius: '50%', background: 'var(--rosa-pale)', opacity: 0.5, pointerEvents: 'none' }} />

        <Link to="/" className="menu-link">Home</Link>
        <Link to="/portfolio" className="menu-link">Portfólio</Link>
        <Link to="/servicos" className="menu-link">Serviços</Link>
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
