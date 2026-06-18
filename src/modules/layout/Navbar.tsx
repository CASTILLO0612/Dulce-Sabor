import { useState, useEffect } from 'react';
import { Menu, X, MessageCircle } from 'lucide-react';

const WA_LINK =
  'https://wa.me/50589535705?text=Hola%20Dulce%20Sabor%2C%20me%20interesa%20hacer%20un%20pedido%20%F0%9F%8E%82';

const navLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Quiénes Somos', href: '#quienes-somos' },
  { label: 'Catálogo', href: '#catalogo' },
  { label: 'Galería', href: '#galeria' },
  { label: 'Cómo Comprar', href: '#como-comprar' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contacto', href: '#contacto' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'background 0.3s, box-shadow 0.3s, backdrop-filter 0.3s',
        background: scrolled ? 'rgba(250,250,248,0.92)' : 'transparent',
        boxShadow: scrolled ? '0 4px 20px rgba(28,25,23,0.05)' : 'none',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(237, 232, 227, 0.5)' : 'none',
      }}
    >
      <nav
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 24px',
          height: 68,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
        }}
      >
        <a
          href="#inicio"
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 22,
            fontWeight: 500,
            color: '#1C1917',
            textDecoration: 'none',
            letterSpacing: '0.02em',
            flexShrink: 0,
          }}
        >
          Dulce<span style={{ color: '#B07D4A' }}> Sabor</span>
        </a>

        <ul
          className="hidden md:flex"
          style={{
            display: 'flex',
            gap: 24,
            listStyle: 'none',
            margin: 0,
            padding: 0,
          }}
        >
          {navLinks.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 13,
                  fontWeight: 400,
                  color: '#44403C',
                  textDecoration: 'none',
                  letterSpacing: '0.01em',
                  transition: 'color 0.2s',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#B07D4A')}
                onMouseLeave={e => (e.currentTarget.style.color = '#44403C')}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 7,
            background: '#1C1917',
            color: '#FAFAF8',
            fontFamily: "'Inter', sans-serif",
            fontSize: 13,
            fontWeight: 500,
            padding: '9px 18px',
            borderRadius: 100,
            textDecoration: 'none',
            transition: 'background 0.2s, transform 0.2s',
            flexShrink: 0,
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = '#B07D4A';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = '#1C1917';
            e.currentTarget.style.transform = 'none';
          }}
        >
          <MessageCircle size={14} />
          WhatsApp
        </a>

        <button
          className="md:hidden"
          onClick={() => setMenuOpen(o => !o)}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#1C1917',
            padding: 4,
          }}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {menuOpen && (
        <div
          className="md:hidden"
          style={{
            background: 'rgba(250,250,248,0.98)',
            borderTop: '1px solid #EDE8E3',
            padding: '12px 24px 24px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
          }}
        >
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column' }}>
            {navLinks.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: 'block',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 14,
                    fontWeight: 400,
                    color: '#1C1917',
                    textDecoration: 'none',
                    padding: '11px 0',
                    borderBottom: '1px solid #EDE8E3',
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li style={{ paddingTop: 16 }}>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  background: '#1C1917',
                  color: '#FAFAF8',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 14,
                  fontWeight: 500,
                  padding: '13px 20px',
                  borderRadius: 100,
                  textDecoration: 'none',
                }}
              >
                <MessageCircle size={15} />
                Agendar por WhatsApp
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
