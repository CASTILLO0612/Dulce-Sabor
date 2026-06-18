import { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const galleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1617922784605-041e1e1a5d8e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600',
    alt: 'Pastel floral colorido artesanal',
    span: 'tall',
  },
  {
    src: 'https://images.unsplash.com/photo-1572823535719-64c4d624e731?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600',
    alt: 'Pastel redondo rosa artesanal',
    span: 'normal',
  },
  {
    src: 'https://images.unsplash.com/photo-1604413191066-4dd20bedf486?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600',
    alt: 'Pastel floral blanco y rosa',
    span: 'normal',
  },
  {
    src: 'https://images.unsplash.com/photo-1614249376843-959aa7466086?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600',
    alt: 'Cupcake con velas de colores',
    span: 'tall',
  },
  {
    src: 'https://images.unsplash.com/photo-1700448293876-07dca826c161?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600',
    alt: 'Rebanada de pastel de chocolate',
    span: 'normal',
  },
  {
    src: 'https://images.unsplash.com/photo-1536599524557-5f784dd53282?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600',
    alt: 'Rebanadas de pasteles variados',
    span: 'normal',
  },
];

const testimonials = [
  {
    name: 'Valeria M.',
    role: 'Estudiante UNAN-León',
    text: 'Pedí un bento cake para mi cumpleaños y quedé sin palabras. El diseño era increíblemente bonito y el sabor... ¡me comí hasta la decoración! Llegué al taller y me lo entregaron perfecto, sin un solo defecto. 100% recomendado.',
    stars: 5,
  },
  {
    name: 'Carlos R.',
    role: 'Emprendedor, Nagarote',
    text: 'Lo que más me sorprendió fue la caja. Nunca había visto un empaque tan sólido para un pastel. Se lo encargué a mi novia y cuando lo abrió, el "wow" fue inmediato. El sabor es simplemente de otro nivel.',
    stars: 5,
  },
  {
    name: 'Sofía L.',
    role: 'Universitaria',
    text: 'El proceso fue súper fácil: elegí el diseño por Instagram, coordiné la hora por WhatsApp y pasé a recogerlo. Sin estrés, sin filas. El pastel estaba perfecto y el chocolate... riquísimo. ¡Ya pedí el segundo!',
    stars: 5,
  },
  {
    name: 'Diego A.',
    role: 'Cliente frecuente',
    text: 'Ya van 4 pedidos y cada vez mejor. Celebré mi graduación, el cumpleaños de mi mamá y dos aniversarios con Dulce Sabor. La calidad es consistente y el trato es muy personalizado. No busco otra repostería.',
    stars: 5,
  },
];

export function GallerySection() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent(i => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent(i => (i + 1) % testimonials.length);

  const t = testimonials[current];

  return (
    <section
      id="galeria"
      style={{
        background: '#FAFAF8',
        padding: 'clamp(64px, 8vw, 100px) 24px',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Section header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(40px, 5vw, 56px)' }}>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#B07D4A',
              marginBottom: 12,
            }}
          >
            Nuestros trabajos reales
          </p>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(32px, 5vw, 52px)',
              fontWeight: 400,
              color: '#1C1917',
              margin: '0 0 16px',
              lineHeight: 1.2,
            }}
          >
            Cada pastel, una{' '}
            <em style={{ fontStyle: 'italic', color: '#B07D4A' }}>obra de arte</em>
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 15,
              fontWeight: 300,
              color: '#78716C',
              maxWidth: 480,
              margin: '0 auto',
              lineHeight: 1.7,
            }}
          >
            Estas son creaciones reales, hechas con amor por nuestro equipo artesanal en Nagarote.
          </p>
        </div>

        {/* Masonry-style gallery grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 260px), 1fr))',
            gridAutoRows: '200px',
            gap: 16,
            marginBottom: 'clamp(56px, 7vw, 80px)',
          }}
        >
          {galleryImages.map((img, i) => (
            <div
              key={i}
              style={{
                borderRadius: 16,
                overflow: 'hidden',
                gridRow: img.span === 'tall' ? 'span 2' : 'span 1',
                cursor: 'pointer',
              }}
            >
              <img
                src={img.src}
                alt={img.alt}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.4s',
                  display: 'block',
                }}
                onMouseEnter={e => ((e.target as HTMLImageElement).style.transform = 'scale(1.06)')}
                onMouseLeave={e => ((e.target as HTMLImageElement).style.transform = 'scale(1)')}
              />
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div
          style={{
            background: '#1C1917',
            borderRadius: 24,
            padding: 'clamp(40px, 5vw, 60px)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
            gap: 48,
            alignItems: 'center',
          }}
        >
          {/* Left label */}
          <div>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#B07D4A',
                marginBottom: 16,
              }}
            >
              Clientes satisfechos
            </p>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(28px, 4vw, 44px)',
                fontWeight: 400,
                color: '#FAFAF8',
                margin: '0 0 20px',
                lineHeight: 1.2,
              }}
            >
              Lo que dicen{' '}
              <em style={{ fontStyle: 'italic', color: '#D4A96A' }}>nuestros clientes</em>
            </h2>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                fontWeight: 300,
                color: '#78716C',
                lineHeight: 1.65,
                margin: '0 0 32px',
              }}
            >
              Más de 200 clientes en Nagarote y León confían en nosotros para sus momentos especiales.
            </p>

            {/* Stars global */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ display: 'flex', gap: 3 }}>
                {[...Array(5)].map((_, i) => (
                  <span key={i} style={{ fontSize: 18 }}>⭐</span>
                ))}
              </div>
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 28,
                  fontWeight: 500,
                  color: '#FAFAF8',
                }}
              >
                5.0
              </span>
            </div>
          </div>

          {/* Testimonial card */}
          <div>
            <div
              key={current}
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 20,
                padding: '32px 28px',
                position: 'relative',
              }}
            >
              <Quote
                size={32}
                style={{
                  color: '#B07D4A',
                  opacity: 0.6,
                  marginBottom: 16,
                }}
              />
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 18,
                  fontStyle: 'italic',
                  fontWeight: 300,
                  color: '#E7E5E4',
                  lineHeight: 1.65,
                  margin: '0 0 24px',
                }}
              >
                "{t.text}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #D4A96A, #B07D4A)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: 18,
                    fontWeight: 500,
                    color: '#FAFAF8',
                    flexShrink: 0,
                  }}
                >
                  {t.name[0]}
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 14,
                      fontWeight: 500,
                      color: '#FAFAF8',
                    }}
                  >
                    {t.name}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 12,
                      fontWeight: 300,
                      color: '#78716C',
                    }}
                  >
                    {t.role}
                  </div>
                </div>
                <div style={{ marginLeft: 'auto', display: 'flex', gap: 3 }}>
                  {[...Array(t.stars)].map((_, i) => (
                    <span key={i} style={{ fontSize: 14 }}>⭐</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Controls */}
            <div style={{ display: 'flex', gap: 10, marginTop: 16, justifyContent: 'flex-end', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: 8, marginRight: 'auto' }}>
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    style={{
                      width: i === current ? 24 : 8,
                      height: 8,
                      borderRadius: 100,
                      background: i === current ? '#B07D4A' : 'rgba(255,255,255,0.2)',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'width 0.25s, background 0.25s',
                      padding: 0,
                    }}
                  />
                ))}
              </div>
              <button
                onClick={prev}
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#FAFAF8',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.background = 'rgba(176,125,74,0.3)')}
                onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.08)')}
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={next}
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: '50%',
                  background: '#B07D4A',
                  border: 'none',
                  color: '#FAFAF8',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.background = '#C8973A')}
                onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = '#B07D4A')}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
