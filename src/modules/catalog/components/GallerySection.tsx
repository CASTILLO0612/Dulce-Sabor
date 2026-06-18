import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star, X, PlusCircle } from 'lucide-react';

const galleryImages = [
  {
    src: '/images/cat-bento-standard.png',
    alt: 'Bento Cake estándar rosa con decoración artesanal en crema',
  },
  {
    src: '/images/cat-bento-premium.png',
    alt: 'Bento Cake Premium artístico con técnicas de acuarela en buttercream',
  },
  {
    src: '/images/cat-bento-corazon.png',
    alt: 'Bento Cake en forma de corazón para San Valentín y aniversarios',
  },
  {
    src: '/images/cat-bento-vintage.png',
    alt: 'Bento Cake estilo coreano vintage con volantes y perlas comestibles',
  },
  {
    src: '/images/bento-standard.png',
    alt: 'Mini pastel artesanal personalizado con buttercream pastel',
  },
  {
    src: '/images/bento-premium.png',
    alt: 'Bento Cake de gama alta con diseño exclusivo y acabado de lujo',
  },
  {
    src: '/images/cat-combo-estudiantil.png',
    alt: 'Combo Estudiantil: Bento Cake con 2 cupcakes decorados a juego',
  },
  {
    src: '/images/combo-familiar.png',
    alt: 'Combo Cumpleaños Familiar: pastel con 6 cupcakes temáticos',
  },
  {
    src: '/images/pastel-tradicional.png',
    alt: 'Pastel Tradicional personalizado con flores y crema artesanal',
  },
  {
    src: '/images/pastel-bodas.png',
    alt: 'Pastel de Bodas de dos pisos con decoración floral natural',
  },
  {
    src: '/images/bento-corazon.png',
    alt: 'Bento Corazón Love en buttercream rojo intenso para aniversario',
  },
  {
    src: '/images/bento-vintage.png',
    alt: 'Bento Vintage Coreano marfil con rosetones y perlas doradas',
  },
  {
    src: '/images/gallery-1.png',
    alt: 'Bento Cake minimalista con mensaje manuscrito en crema',
  },
  {
    src: '/images/gallery-2.png',
    alt: 'Porción de pastel de fresas frescas con crema artesanal',
  },
  {
    src: '/images/gallery-3.png',
    alt: 'Cupcakes artesanales con crema en espiral de colores pastel',
  },
  {
    src: '/images/gallery-4.png',
    alt: 'Pastel de chocolate con ganache, hoja de oro y frutos rojos',
  },
  {
    src: '/images/combo-estudiantil.png',
    alt: 'Set de repostería artesanal en tonos pastel coordinados',
  },
  {
    src: '/images/cat-combo-estudiantil.png',
    alt: 'Bento Cake con cupcakes temáticos en paleta unificada',
  },
];


interface ReviewItem {
  name: string;
  role: string;
  text: string;
  stars: number;
}

const localFallbackTestimonials: ReviewItem[] = [
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
  const [reviews, setReviews] = useState<ReviewItem[]>(localFallbackTestimonials);
  const [current, setCurrent] = useState(0);
  const [activePhoto, setActivePhoto] = useState<string | null>(null);

  // Estados para el Modal de Reseña
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState('Cliente');
  const [newText, setNewText] = useState('');
  const [newStars, setNewStars] = useState(5);
  const [submitting, setSubmitting] = useState(false);

  const loadReviews = () => {
    fetch('/api/reviews')
      .then(res => {
        if (!res.ok) throw new Error('Error al conectar con la API de reseñas');
        return res.json();
      })
      .then(data => {
        if (data && data.length > 0) {
          setReviews(data);
        }
      })
      .catch(err => {
        console.warn('Usando opiniones locales (no se pudo conectar con MongoDB):', err);
      });
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - 320 : scrollLeft + 320;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const prev = () => setCurrent(c => (c - 1 + reviews.length) % reviews.length);
  const next = () => setCurrent(c => (c + 1) % reviews.length);

  const t = reviews[current] || localFallbackTestimonials[0];

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newText.trim()) return;

    setSubmitting(true);
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newName,
          role: newRole,
          text: newText,
          stars: newStars,
        }),
      });

      if (!res.ok) throw new Error('Fallo al registrar la reseña');

      // Limpiar y recargar
      setNewName('');
      setNewRole('Cliente');
      setNewText('');
      setNewStars(5);
      setIsModalOpen(false);

      // Recargar desde MongoDB y forzar visualización en la primera posición (nueva)
      loadReviews();
      setCurrent(0);
    } catch (error) {
      console.error('Error al guardar reseña:', error);
      // Fallback local por si el backend se desconecta temporalmente
      const localNewReview: ReviewItem = {
        name: newName,
        role: newRole,
        text: newText,
        stars: newStars,
      };
      setReviews(prev => [localNewReview, ...prev]);
      setCurrent(0);
      setIsModalOpen(false);
    } finally {
      setSubmitting(false);
    }
  };

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
            Estas son creaciones reales, hechas con amor por nuestro taller artesanal en Nagarote. Desliza horizontalmente para ver más.
          </p>
        </div>

        {/* Horizontal scrollable gallery slider */}
        <div style={{ position: 'relative', marginBottom: 'clamp(56px, 7vw, 80px)' }}>
          {/* Navigation buttons */}
          <button
            onClick={() => scroll('left')}
            aria-label="Deslizar a la izquierda"
            style={{
              position: 'absolute',
              left: -16,
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 10,
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: '#FFFFFF',
              border: '1px solid #EDE8E3',
              boxShadow: '0 4px 12px rgba(28,25,23,0.08)',
              color: '#1C1917',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#F5F0EB';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1.05)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = '#FFFFFF';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
            }}
          >
            <ChevronLeft size={18} />
          </button>
          
          <button
            onClick={() => scroll('right')}
            aria-label="Deslizar a la derecha"
            style={{
              position: 'absolute',
              right: -16,
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 10,
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: '#FFFFFF',
              border: '1px solid #EDE8E3',
              boxShadow: '0 4px 12px rgba(28,25,23,0.08)',
              color: '#1C1917',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#F5F0EB';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1.05)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = '#FFFFFF';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
            }}
          >
            <ChevronRight size={18} />
          </button>

          {/* Scroll wrapper */}
          <div
            ref={scrollRef}
            className="hide-scrollbar"
            style={{
              display: 'flex',
              gap: 20,
              overflowX: 'auto',
              scrollSnapType: 'x mandatory',
              scrollBehavior: 'smooth',
              padding: '12px 4px',
            }}
          >
            {galleryImages.map((img, i) => (
              <div
                key={i}
                onClick={() => setActivePhoto(img.src)}
                style={{
                  flex: '0 0 280px',
                  height: 360,
                  scrollSnapAlign: 'start',
                  borderRadius: 16,
                  overflow: 'hidden',
                  position: 'relative',
                  cursor: 'pointer',
                  border: '1px solid #EDE8E3',
                  boxShadow: '0 4px 20px rgba(28,25,23,0.02)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 30px rgba(28,25,23,0.08)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(28,25,23,0.02)';
                }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.4s ease',
                  }}
                  onMouseEnter={e => ((e.target as HTMLImageElement).style.transform = 'scale(1.04)')}
                  onMouseLeave={e => ((e.target as HTMLImageElement).style.transform = 'scale(1)')}
                />
                {/* Elegant dark gradient overlay at bottom with caption */}
                <div
                  style={{
                    position: 'absolute',
                    inset: '0',
                    background: 'linear-gradient(to top, rgba(28,25,23,0.92) 0%, rgba(28,25,23,0.45) 45%, transparent 75%)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: 18,
                    pointerEvents: 'none',
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 12.5,
                      fontWeight: 400,
                      color: '#FAFAF8',
                      margin: 0,
                      lineHeight: 1.4,
                      textShadow: '0 1px 3px rgba(0,0,0,0.3)',
                    }}
                  >
                    {img.alt}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials Block */}
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
                color: '#8E8883',
                lineHeight: 1.65,
                margin: '0 0 24px',
              }}
            >
              Más de 200 clientes en Nagarote y León confían en nosotros para sus momentos especiales.
            </p>

            {/* Stars global & Leave Opinion Button */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ display: 'flex', gap: 3 }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} fill="#F59E0B" color="#F59E0B" />
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

              <button
                onClick={() => setIsModalOpen(true)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: '#FAFAF8',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 13,
                  fontWeight: 500,
                  padding: '10px 18px',
                  borderRadius: 100,
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(176,125,74,0.3)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
              >
                <PlusCircle size={15} color="#D4A96A" />
                Dejar mi reseña
              </button>
            </div>
          </div>

          {/* Testimonial card */}
          <div>
            <div
              key={current}
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 20,
                padding: '32px 28px',
                position: 'relative',
                minHeight: 220,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Quote
                size={32}
                style={{
                  color: '#B07D4A',
                  opacity: 0.4,
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
                  flex: 1,
                }}
              >
                "{t?.text}"
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
                  {t?.name?.[0] || 'U'}
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
                    {t?.name}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 12,
                      fontWeight: 300,
                      color: '#8E8883',
                    }}
                  >
                    {t?.role}
                  </div>
                </div>
                <div style={{ marginLeft: 'auto', display: 'flex', gap: 3 }}>
                  {[...Array(t?.stars || 5)].map((_, i) => (
                    <Star key={i} size={13} fill="#F59E0B" color="#F59E0B" />
                  ))}
                </div>
              </div>
            </div>

            {/* Controls */}
            <div style={{ display: 'flex', gap: 10, marginTop: 16, justifyContent: 'flex-end', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: 8, marginRight: 'auto' }}>
                {reviews.map((_, i) => (
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
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#FAFAF8',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.background = 'rgba(176,125,74,0.3)')}
                onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.06)')}
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

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          onClick={() => setActivePhoto(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            background: 'rgba(28,25,23,0.95)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
            backdropFilter: 'blur(10px)',
            transition: 'opacity 0.3s ease',
          }}
        >
          <button
            onClick={() => setActivePhoto(null)}
            style={{
              position: 'absolute',
              top: 24,
              right: 24,
              background: 'none',
              border: 'none',
              color: '#FAFAF8',
              cursor: 'pointer',
              padding: 8,
              transition: 'transform 0.2s',
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.1)')}
            onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)')}
          >
            <X size={32} />
          </button>

          <img
            src={activePhoto}
            alt="Pastel ampliado"
            onClick={e => e.stopPropagation()}
            style={{
              maxWidth: '100%',
              maxHeight: '85vh',
              objectFit: 'contain',
              borderRadius: 12,
              boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
            }}
          />
        </div>
      )}

      {/* Add Review Modal */}
      {isModalOpen && (
        <div
          onClick={() => setIsModalOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            background: 'rgba(28,25,23,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
            backdropFilter: 'blur(12px)',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: 460,
              background: '#FFFFFF',
              borderRadius: 24,
              border: '1px solid #EDE8E3',
              padding: 32,
              boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
              position: 'relative',
              fontFamily: "'Inter', sans-serif",
            }}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              style={{
                position: 'absolute',
                top: 20,
                right: 20,
                background: 'none',
                border: 'none',
                color: '#78716C',
                cursor: 'pointer',
                padding: 4,
              }}
            >
              <X size={22} />
            </button>

            <h3
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 28,
                fontWeight: 500,
                color: '#1C1917',
                margin: '0 0 8px',
              }}
            >
              Compartir mi opinión
            </h3>
            <p
              style={{
                fontSize: 13,
                color: '#78716C',
                lineHeight: 1.5,
                margin: '0 0 24px',
              }}
            >
              Tu opinión es de gran valor para mejorar nuestro servicio y diseño artesanal en Nagarote.
            </p>

            <form onSubmit={handleSubmitReview} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Name */}
              <div>
                <label style={{ fontSize: 12, color: '#78716C', display: 'block', marginBottom: 6 }}>Nombre completo</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: 10,
                    border: '1px solid #EDE8E3',
                    fontSize: 13,
                    background: '#FAFAF8',
                    outline: 'none',
                  }}
                  placeholder="Tu nombre..."
                />
              </div>

              {/* Role */}
              <div>
                <label style={{ fontSize: 12, color: '#78716C', display: 'block', marginBottom: 6 }}>Ocupación / Afiliación</label>
                <input
                  type="text"
                  required
                  value={newRole}
                  onChange={e => setNewRole(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: 10,
                    border: '1px solid #EDE8E3',
                    fontSize: 13,
                    background: '#FAFAF8',
                    outline: 'none',
                  }}
                  placeholder="Ej: Cliente, Estudiante de León..."
                />
              </div>

              {/* Stars Selection */}
              <div>
                <label style={{ fontSize: 12, color: '#78716C', display: 'block', marginBottom: 6 }}>Calificación</label>
                <div style={{ display: 'flex', gap: 6 }}>
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewStars(star)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                    >
                      <Star
                        size={20}
                        fill={star <= newStars ? '#F59E0B' : 'none'}
                        color={star <= newStars ? '#F59E0B' : '#78716C'}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Review Text */}
              <div>
                <label style={{ fontSize: 12, color: '#78716C', display: 'block', marginBottom: 6 }}>Comentario</label>
                <textarea
                  required
                  rows={4}
                  value={newText}
                  onChange={e => setNewText(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: 10,
                    border: '1px solid #EDE8E3',
                    fontSize: 13,
                    background: '#FAFAF8',
                    outline: 'none',
                    resize: 'none',
                  }}
                  placeholder="Comparte tu experiencia con nuestro sabor y servicio..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                style={{
                  marginTop: 8,
                  padding: '14px',
                  borderRadius: 100,
                  border: 'none',
                  background: '#1C1917',
                  color: '#FAFAF8',
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                  textAlign: 'center',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = '#B07D4A')}
                onMouseLeave={e => (e.currentTarget.style.background = '#1C1917')}
              >
                {submitting ? 'Enviando...' : 'Publicar Reseña'}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
