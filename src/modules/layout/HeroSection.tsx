import { ArrowRight, Star } from 'lucide-react';
import { ParticleButton } from '../../core/components/ui/ParticleButton';

const WA_LINK = 'https://wa.me/50589535705?text=Hola%20Dulce%20Sabor%2C%20me%20interesa%20hacer%20un%20pedido%20%F0%9F%8E%82';
const HERO_IMG = 'https://images.unsplash.com/photo-1692987886640-85b91838dbd0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080';

export function HeroSection() {
  return (
    <section
      id="inicio"
      style={{
        minHeight: '100dvh',
        background: '#FAFAF8',
        display: 'flex',
        alignItems: 'center',
        padding: '80px 24px 60px',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
          gap: 'clamp(40px, 6vw, 80px)',
          alignItems: 'center',
        }}
      >
        {/* Text content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          {/* Editorial Top Tag */}
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#B07D4A',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              alignSelf: 'flex-start',
            }}
          >
            <span>Repostería Artesanal</span>
            <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#B07D4A', opacity: 0.5 }} />
            <span>Nagarote, Nicaragua</span>
          </div>

          {/* Heading */}
          <div>
            <h1
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(42px, 7vw, 76px)',
                fontWeight: 400,
                lineHeight: 1.1,
                color: '#1C1917',
                margin: 0,
                letterSpacing: '-0.01em',
              }}
            >
              Diseños
              <br />
              <em style={{ fontStyle: 'italic', color: '#B07D4A' }}>modernos</em>
              <br />
              y sabor que
              <br />
              <em style={{ fontStyle: 'italic' }}>enamora</em>
            </h1>
          </div>

          {/* Subtitle */}
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(15px, 2vw, 17px)',
              fontWeight: 300,
              color: '#78716C',
              lineHeight: 1.7,
              margin: 0,
              maxWidth: 440,
            }}
          >
            Pasteles altamente estéticos, diseñados a tu medida y empacados con{' '}
            <strong style={{ fontWeight: 500, color: '#1C1917' }}>máxima seguridad</strong>{' '}
            para que lleguen perfectos a tu celebración.
          </p>

          {/* CTA buttons */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            <ParticleButton
              onClick={() => window.open(WA_LINK, '_blank')}
              style={{
                background: '#1C1917',
                color: '#FAFAF8',
                fontFamily: "'Inter', sans-serif",
                fontSize: 15,
                fontWeight: 500,
                padding: '14px 28px',
                borderRadius: 100,
                border: 'none',
                cursor: 'pointer',
                letterSpacing: '0.01em',
                transition: 'background 0.2s, transform 0.15s',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              Agendar mi pedido por WhatsApp
            </ParticleButton>

            <a
              href="#catalogo"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                color: '#1C1917',
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                fontWeight: 500,
                textDecoration: 'none',
                borderBottom: '1px solid currentColor',
                paddingBottom: 2,
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#B07D4A')}
              onMouseLeave={e => (e.currentTarget.style.color = '#1C1917')}
            >
              Ver catálogo
              <ArrowRight size={14} />
            </a>
          </div>

        </div>

        {/* Image */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {/* Decorative background blob */}
          <div
            style={{
              position: 'absolute',
              inset: '-10%',
              background: 'radial-gradient(ellipse at 60% 50%, #F5ECD7 0%, transparent 70%)',
              borderRadius: '50%',
              zIndex: 0,
            }}
          />
          <img
            src={HERO_IMG}
            alt="Pastel artesanal de Dulce Sabor en empaque especial"
            style={{
              width: '100%',
              maxWidth: 500,
              aspectRatio: '3/4',
              objectFit: 'cover',
              borderRadius: 24,
              position: 'relative',
              zIndex: 1,
              boxShadow: '0 32px 80px rgba(28,25,23,0.08)',
            }}
          />
          {/* Floating card */}
          <div
            style={{
              position: 'absolute',
              bottom: 32,
              left: -16,
              background: '#FFFFFF',
              border: '1px solid #EDE8E3',
              borderRadius: 16,
              padding: '14px 18px',
              boxShadow: '0 8px 32px rgba(28,25,23,0.06)',
              zIndex: 2,
              maxWidth: 200,
            }}
          >
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 11,
                color: '#78716C',
                fontWeight: 400,
                marginBottom: 4,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
              }}
            >
              Pedidos esta semana
            </div>
            <div
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 22,
                fontWeight: 600,
                color: '#1C1917',
              }}
            >
              +48 pedidos
            </div>
          </div>
          {/* Rating card */}
          <div
            style={{
              position: 'absolute',
              top: 32,
              right: -16,
              background: '#1C1917',
              borderRadius: 16,
              padding: '12px 18px',
              boxShadow: '0 8px 32px rgba(28,25,23,0.15)',
              zIndex: 2,
            }}
          >
            <div style={{ display: 'flex', gap: 2, marginBottom: 4 }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={11} fill="#F59E0B" color="#F59E0B" />
              ))}
            </div>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 11,
                color: '#A8A29E',
                fontWeight: 400,
              }}
            >
              +200 reseñas
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
