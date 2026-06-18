import { useState } from 'react';
import {
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  Instagram,
  Facebook,
  AlertTriangle,
  ExternalLink,
} from 'lucide-react';
import { PoliciesModal } from './PoliciesModal';

const WA_LINK =
  'https://wa.me/50589535705?text=Hola%20Dulce%20Sabor%2C%20me%20interesa%20hacer%20un%20pedido%20%F0%9F%8E%82';

// TikTok icon as SVG (no está en Lucide)
const TikTokIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.28 6.28 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.19 8.19 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
  </svg>
);

const quickLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Quiénes Somos', href: '#quienes-somos' },
  { label: 'Catálogo', href: '#catalogo' },
  { label: 'Galería', href: '#galeria' },
  { label: 'Cómo Comprar', href: '#como-comprar' },
  { label: 'Preguntas Frecuentes', href: '#faq' },
  { label: 'Contacto', href: '#contacto' },
];

const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://instagram.com/dulcesabor.nagarote',
    icon: <Instagram size={17} />,
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/share/1EE5BpSLTf/?mibextid=wwXIfr',
    icon: <Facebook size={17} />,
  },
  {
    label: 'TikTok',
    href: 'https://tiktok.com/@dulcesabornagarote',
    icon: <TikTokIcon />,
  },
  {
    label: 'WhatsApp Business',
    href: WA_LINK,
    icon: <MessageCircle size={17} />,
  },
];

const schedule = [
  { days: 'Lunes – Viernes', hours: '9:00 AM – 6:00 PM' },
  { days: 'Sábado', hours: '9:00 AM – 4:00 PM' },
  { days: 'Domingo', hours: 'Solo pedidos especiales' },
];

export function Footer() {
  const [isPoliciesOpen, setIsPoliciesOpen] = useState(false);
  const [policyTab, setPolicyTab] = useState(0);

  const openPolicy = (tab: number) => {
    setPolicyTab(tab);
    setIsPoliciesOpen(true);
  };

  return (
    <>
      <footer
        style={{
          background: '#1C1917',
          color: '#FAFAF8',
          padding: 'clamp(56px, 7vw, 80px) 24px 0',
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {/* ── CTA Banner ─────────────────────────────────────────── */}
          <div
            style={{
              background: '#B07D4A',
              borderRadius: 20,
              padding: 'clamp(28px, 4vw, 40px) clamp(28px, 4vw, 48px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 24,
              flexWrap: 'wrap',
              marginBottom: 'clamp(48px, 6vw, 72px)',
            }}
          >
            <div>
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 'clamp(22px, 3.5vw, 34px)',
                  fontWeight: 400,
                  color: '#FAFAF8',
                  margin: '0 0 8px',
                  lineHeight: 1.2,
                }}
              >
                ¿Lista para tu próxima celebración?
              </h3>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 14,
                  fontWeight: 300,
                  color: 'rgba(250,250,248,0.8)',
                  margin: 0,
                }}
              >
                Escríbenos y agendamos tu pedido hoy mismo. Respuesta en minutos.
              </p>
            </div>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                background: '#FAFAF8',
                color: '#1C1917',
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                fontWeight: 600,
                padding: '13px 24px',
                borderRadius: 100,
                textDecoration: 'none',
                flexShrink: 0,
                transition: 'background 0.2s, transform 0.2s',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = '#F5ECD7';
                (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = '#FAFAF8';
                (e.currentTarget as HTMLAnchorElement).style.transform = 'none';
              }}
            >
              <MessageCircle size={16} />
              Agendar por WhatsApp
            </a>
          </div>

          {/* ── Main Footer Grid ────────────────────────────────────── */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 190px), 1fr))',
              gap: 'clamp(28px, 4vw, 48px)',
              paddingBottom: 'clamp(40px, 5vw, 60px)',
            }}
          >
            {/* Brand Column */}
            <div style={{ gridColumn: 'span 1' }}>
              <a
                href="#inicio"
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 26,
                  fontWeight: 500,
                  color: '#FAFAF8',
                  textDecoration: 'none',
                  display: 'block',
                  marginBottom: 12,
                  letterSpacing: '0.01em',
                }}
              >
                Dulce<span style={{ color: '#D4A96A' }}> Sabor</span>
              </a>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 13,
                  fontWeight: 300,
                  color: '#78716C',
                  lineHeight: 1.65,
                  margin: '0 0 20px',
                  maxWidth: 220,
                }}
              >
                Repostería artesanal moderna con los más altos estándares de diseño y sabor en Nagarote.
              </p>

              {/* Social icons */}
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {socialLinks.map(s => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    title={s.label}
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: '#A8A29E',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textDecoration: 'none',
                      transition: 'background 0.2s, color 0.2s',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLAnchorElement).style.background =
                        'rgba(176,125,74,0.25)';
                      (e.currentTarget as HTMLAnchorElement).style.color = '#D4A96A';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLAnchorElement).style.background =
                        'rgba(255,255,255,0.06)';
                      (e.currentTarget as HTMLAnchorElement).style.color = '#A8A29E';
                    }}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links Column */}
            <div>
              <h4
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#B07D4A',
                  marginBottom: 18,
                }}
              >
                Navegación
              </h4>
              <ul
                style={{
                  listStyle: 'none',
                  margin: 0,
                  padding: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                }}
              >
                {quickLinks.map(link => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 13,
                        fontWeight: 300,
                        color: '#78716C',
                        textDecoration: 'none',
                        transition: 'color 0.2s',
                      }}
                      onMouseEnter={e =>
                        ((e.currentTarget as HTMLAnchorElement).style.color = '#D4A96A')
                      }
                      onMouseLeave={e =>
                        ((e.currentTarget as HTMLAnchorElement).style.color = '#78716C')
                      }
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Column */}
            <div>
              <h4
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#B07D4A',
                  marginBottom: 18,
                }}
              >
                Contacto
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'flex-start', gap: 10, textDecoration: 'none' }}
                >
                  <MessageCircle
                    size={14}
                    style={{ color: '#B07D4A', flexShrink: 0, marginTop: 3 }}
                  />
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 13,
                      fontWeight: 300,
                      color: '#78716C',
                      lineHeight: 1.5,
                    }}
                  >
                    +505 8953 5705
                    <br />
                    <span style={{ fontSize: 11, color: '#57534E' }}>WhatsApp Business</span>
                  </span>
                </a>
                <a
                  href="mailto:hola@dulcesabor.ni"
                  style={{ display: 'flex', alignItems: 'flex-start', gap: 10, textDecoration: 'none' }}
                >
                  <Mail size={14} style={{ color: '#B07D4A', flexShrink: 0, marginTop: 3 }} />
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 13,
                      fontWeight: 300,
                      color: '#78716C',
                    }}
                  >
                    hola@dulcesabor.ni
                  </span>
                </a>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <MapPin size={14} style={{ color: '#B07D4A', flexShrink: 0, marginTop: 3 }} />
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 13,
                      fontWeight: 300,
                      color: '#78716C',
                      lineHeight: 1.55,
                    }}
                  >
                    Del Parque Central, 3c al sur
                    <br />
                    <strong style={{ fontWeight: 400, color: '#A8A29E' }}>
                      Nagarote, Nicaragua
                    </strong>
                    <br />
                    <span style={{ fontSize: 11, color: '#57534E' }}>Solo retiros presenciales</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Hours + Policies Column */}
            <div>
              <h4
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#B07D4A',
                  marginBottom: 18,
                }}
              >
                Horarios
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {schedule.map(s => (
                  <div key={s.days} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <Clock size={13} style={{ color: '#B07D4A', flexShrink: 0, marginTop: 3 }} />
                    <div>
                      <div
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: 12,
                          fontWeight: 400,
                          color: '#A8A29E',
                          marginBottom: 1,
                        }}
                      >
                        {s.days}
                      </div>
                      <div
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: 12,
                          fontWeight: 300,
                          color: '#78716C',
                        }}
                      >
                        {s.hours}
                      </div>
                    </div>
                  </div>
                ))}
                <div
                  style={{
                    background: 'rgba(176,125,74,0.1)',
                    border: '1px solid rgba(176,125,74,0.2)',
                    borderRadius: 10,
                    padding: '9px 12px',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 11,
                    fontWeight: 300,
                    color: '#D4A96A',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 7,
                    lineHeight: 1.5,
                    marginTop: 4,
                  }}
                >
                  <AlertTriangle size={13} style={{ flexShrink: 0, marginTop: 1 }} />
                  Solo bajo reserva previa por WhatsApp
                </div>
              </div>

              {/* Policies Links */}
              <div style={{ marginTop: 24 }}>
                <h4
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 11,
                    fontWeight: 500,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: '#B07D4A',
                    marginBottom: 12,
                  }}
                >
                  Políticas
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {[
                    { label: 'Política de Privacidad', tab: 0 },
                    { label: 'Términos y Condiciones', tab: 1 },
                    { label: 'Cambios y Devoluciones', tab: 2 },
                    { label: 'Garantía de Calidad', tab: 3 },
                  ].map(p => (
                    <button
                      key={p.label}
                      onClick={() => openPolicy(p.tab)}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 12,
                        fontWeight: 300,
                        color: '#78716C',
                        textAlign: 'left',
                        padding: 0,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 5,
                        transition: 'color 0.2s',
                      }}
                      onMouseEnter={e =>
                        ((e.currentTarget as HTMLButtonElement).style.color = '#D4A96A')
                      }
                      onMouseLeave={e =>
                        ((e.currentTarget as HTMLButtonElement).style.color = '#78716C')
                      }
                    >
                      <ExternalLink size={11} style={{ flexShrink: 0 }} />
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Bottom Bar ──────────────────────────────────────────── */}
          <div
            style={{
              borderTop: '1px solid rgba(255,255,255,0.07)',
              padding: '18px 0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 12,
              flexWrap: 'wrap',
            }}
          >
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 12,
                fontWeight: 300,
                color: '#57534E',
                margin: 0,
              }}
            >
              © 2026 Dulce Sabor · Nagarote, Nicaragua. Todos los derechos reservados.
            </p>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 12,
                fontWeight: 300,
                color: '#57534E',
                margin: 0,
              }}
            >
              Hecho con amor en Nicaragua 🇳🇮
            </p>
          </div>
        </div>
      </footer>

      {/* Policies Modal */}
      <PoliciesModal
        isOpen={isPoliciesOpen}
        onClose={() => setIsPoliciesOpen(false)}
        initialTab={policyTab}
      />
    </>
  );
}
