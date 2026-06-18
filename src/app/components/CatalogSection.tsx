import { MessageCircle, Star } from 'lucide-react';
import { ParticleButton } from './ParticleButton';

const WA_BASE = 'https://wa.me/50512345678?text=Hola%20Dulce%20Sabor%2C%20me%20interesa%20pedir%3A%20';

const products = [
  {
    id: 'bento-standard',
    name: 'Bento Cake Estándar',
    tag: 'Más popular',
    tagColor: '#B07D4A',
    desc: 'Mini pastel personalizado para 1–2 personas. Disponible en Vainilla o Chocolate con decoración artesanal incluida.',
    price: 'Desde C$ 190',
    flavors: ['Vainilla', 'Chocolate'],
    img: 'https://images.unsplash.com/photo-1747336960771-a5cb8b0ce221?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600',
    alt: 'Bento cake en caja - Dulce Sabor',
  },
  {
    id: 'bento-premium',
    name: 'Bento Premium',
    tag: 'Top diseño',
    tagColor: '#7C3AED',
    desc: 'Diseños de alta complejidad con técnicas avanzadas de decoración. Para quienes buscan algo verdaderamente especial.',
    price: 'Desde C$ 280',
    flavors: ['Personalizado'],
    img: 'https://images.unsplash.com/photo-1707143985779-15ee53db42d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600',
    alt: 'Bento cake premium en caja rosa - Dulce Sabor',
  },
  {
    id: 'combo-estudiantil',
    name: 'Combo Estudiantil',
    tag: '🎉 Fin de semana',
    tagColor: '#059669',
    desc: 'Bento Cake + 2 Cupcakes decorados gratis. La opción perfecta para celebrar con tus amigos sin gastar de más.',
    price: 'Consultar precio',
    flavors: ['Bento + Cupcakes'],
    img: 'https://images.unsplash.com/photo-1759524322924-2024f209a011?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600',
    alt: 'Cupcakes artesanales con decoración - Dulce Sabor',
  },
  {
    id: 'pastel-tradicional',
    name: 'Pastel Tradicional',
    tag: 'Para eventos',
    tagColor: '#DC2626',
    desc: 'Pasteles de 1 libra con diseños personalizados para eventos, cumpleaños y celebraciones especiales.',
    price: 'C$ 500 – C$ 800',
    flavors: ['Múltiples sabores'],
    img: 'https://images.unsplash.com/photo-1604413191066-4dd20bedf486?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600',
    alt: 'Pastel tradicional floral - Dulce Sabor',
  },
];

export function CatalogSection() {
  return (
    <section
      id="catalogo"
      style={{
        background: '#FAFAF8',
        padding: 'clamp(64px, 8vw, 100px) 24px',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: 24,
            marginBottom: 'clamp(40px, 5vw, 60px)',
            flexWrap: 'wrap',
          }}
        >
          <div>
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
              Nuestro catálogo
            </p>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(32px, 5vw, 52px)',
                fontWeight: 400,
                color: '#1C1917',
                margin: 0,
                lineHeight: 1.15,
              }}
            >
              Creaciones que{' '}
              <em style={{ fontStyle: 'italic', color: '#B07D4A' }}>deleitan</em>
            </h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Star size={14} fill="#F59E0B" color="#F59E0B" />
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                color: '#78716C',
                fontWeight: 400,
              }}
            >
              Todos los precios incluyen decoración artesanal
            </span>
          </div>
        </div>

        {/* Product grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
            gap: 24,
          }}
        >
          {products.map(product => (
            <div
              key={product.id}
              style={{
                background: '#FFFFFF',
                borderRadius: 20,
                border: '1px solid #EDE8E3',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                transition: 'box-shadow 0.2s, transform 0.2s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = '0 16px 48px rgba(28,25,23,0.1)';
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
              }}
            >
              {/* Image */}
              <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden' }}>
                <img
                  src={product.img}
                  alt={product.alt}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.4s',
                  }}
                  onMouseEnter={e => ((e.target as HTMLImageElement).style.transform = 'scale(1.05)')}
                  onMouseLeave={e => ((e.target as HTMLImageElement).style.transform = 'scale(1)')}
                />
                {/* Tag */}
                <div
                  style={{
                    position: 'absolute',
                    top: 12,
                    left: 12,
                    background: product.tagColor,
                    color: '#FFFFFF',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 11,
                    fontWeight: 500,
                    padding: '4px 10px',
                    borderRadius: 100,
                    letterSpacing: '0.02em',
                  }}
                >
                  {product.tag}
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: '22px 22px 24px', flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div>
                  <h3
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontSize: 21,
                      fontWeight: 500,
                      color: '#1C1917',
                      margin: '0 0 6px',
                      lineHeight: 1.2,
                    }}
                  >
                    {product.name}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 13,
                      fontWeight: 300,
                      color: '#78716C',
                      margin: 0,
                      lineHeight: 1.6,
                    }}
                  >
                    {product.desc}
                  </p>
                </div>

                {/* Flavors */}
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {product.flavors.map(f => (
                    <span
                      key={f}
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 11,
                        fontWeight: 400,
                        color: '#78716C',
                        background: '#F5F0EB',
                        padding: '3px 10px',
                        borderRadius: 100,
                        border: '1px solid #EDE8E3',
                      }}
                    >
                      {f}
                    </span>
                  ))}
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: 'auto',
                    paddingTop: 8,
                    borderTop: '1px solid #EDE8E3',
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        fontSize: 22,
                        fontWeight: 600,
                        color: '#B07D4A',
                        lineHeight: 1.1,
                      }}
                    >
                      {product.price}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 10,
                        color: '#A8A29E',
                        marginTop: 2,
                      }}
                    >
                      Decoración incluida
                    </div>
                  </div>

                  <ParticleButton
                    onClick={() =>
                      window.open(
                        `${WA_BASE}${encodeURIComponent(product.name)}`,
                        '_blank'
                      )
                    }
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      background: '#1C1917',
                      color: '#FAFAF8',
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 13,
                      fontWeight: 500,
                      padding: '10px 16px',
                      borderRadius: 100,
                      border: 'none',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      transition: 'background 0.2s',
                    }}
                  >
                    <MessageCircle size={13} />
                    Pedir
                  </ParticleButton>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div
          style={{
            textAlign: 'center',
            marginTop: 48,
            padding: '24px 32px',
            background: '#F5ECD7',
            borderRadius: 16,
            fontFamily: "'Inter', sans-serif",
            fontSize: 14,
            color: '#78716C',
            lineHeight: 1.6,
          }}
        >
          ¿Tienes una idea especial? Escríbenos y creamos el diseño perfectamente a tu medida.{' '}
          <a
            href={WA_BASE + 'un%20dise%C3%B1o%20personalizado'}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#B07D4A', fontWeight: 500, textDecoration: 'none' }}
          >
            Consultar diseño personalizado →
          </a>
        </div>
      </div>
    </section>
  );
}
