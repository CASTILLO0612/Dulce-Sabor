import { Award, Users, Star, Package } from 'lucide-react';

const stats = [
  { value: '+3', label: 'Años en el mercado', icon: <Award size={18} /> },
  { value: '+800', label: 'Pedidos entregados', icon: <Package size={18} /> },
  { value: '+200', label: 'Clientes satisfechos', icon: <Users size={18} /> },
  { value: '5.0', label: 'Calificación promedio', icon: <Star size={18} /> },
];

export function AboutSection() {
  return (
    <section
      id="quienes-somos"
      style={{
        background: '#FFFFFF',
        padding: 'clamp(80px, 10vw, 120px) 24px',
        borderBottom: '1px solid #EDE8E3',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* ── Editorial Header ───────────────────────────────── */}
        <div
          style={{
            maxWidth: 720,
            margin: '0 auto',
            textAlign: 'center',
            marginBottom: 'clamp(56px, 7vw, 80px)',
          }}
        >
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#B07D4A',
              marginBottom: 20,
            }}
          >
            Nuestra historia
          </p>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(34px, 5.5vw, 56px)',
              fontWeight: 400,
              color: '#1C1917',
              margin: '0 0 28px',
              lineHeight: 1.12,
            }}
          >
            Repostería con{' '}
            <em style={{ fontStyle: 'italic', color: '#B07D4A' }}>alma propia</em>
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 16,
              fontWeight: 300,
              color: '#78716C',
              lineHeight: 1.8,
              margin: 0,
            }}
          >
            Dulce Sabor nació en Nagarote, Nicaragua, de la pasión de una familia por la
            repostería artesanal. Lo que comenzó como un pequeño emprendimiento casero, hoy es
            un taller reconocido por la calidad de sus diseños y la excelencia de sus sabores.
          </p>
        </div>

        {/* ── Misión / Visión — inline, sin cards ────────────── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))',
            gap: 0,
            marginBottom: 'clamp(56px, 7vw, 80px)',
          }}
        >
          {[
            {
              label: 'Misión',
              text: 'Ofrecer experiencias memorables en el municipio de Nagarote a través de la elaboración artesanal de repostería creativa y Bento Cakes altamente estéticos. Nos enfocamos en satisfacer las necesidades de celebración y auto-antojo del segmento joven y universitario, combinando las tendencias visuales globales con ingredientes culinarios de alta calidad. Garantizamos la máxima confianza digital y la integridad estructural de cada producto mediante un sistema transparente de evidencia física, empaques rígidos de seguridad y un modelo eficiente de retiro presencial programado.',
            },
            {
              label: 'Visión',
              text: 'Ser la repostería artesanal líder y de mayor confianza en Nagarote para el año 2031, reconocida por transformar de manera idéntica las tendencias digitales en realidades comestibles perfectas. Aspiramos a consolidar un modelo operativo de vanguardia enfocado en la personalización masiva a pequeña escala, diversificando la oferta de forma sostenible hacia líneas de productos saludables y eliminando por completo los riesgos de fricción logística para nuestra comunidad de clientes.',
            },
          ].map((item, i) => (
            <div
              key={item.label}
              style={{
                padding: 'clamp(32px, 4vw, 48px)',
                borderLeft: i === 1 ? '1px solid #EDE8E3' : 'none',
                borderTop: 'none',
              }}
            >
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#B07D4A',
                  marginBottom: 14,
                }}
              >
                {item.label}
              </div>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 'clamp(18px, 2.5vw, 22px)',
                  fontWeight: 400,
                  fontStyle: 'italic',
                  color: '#44403C',
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {item.text}
              </p>
            </div>
          ))}
        </div>

        {/* ── Values — clean text rows, NO cards ─────────────── */}
        <div style={{ marginBottom: 'clamp(56px, 7vw, 80px)' }}>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#B07D4A',
              marginBottom: 28,
              textAlign: 'center',
            }}
          >
            Lo que nos define
          </p>
          <div
            style={{
              maxWidth: 800,
              margin: '0 auto',
            }}
          >
            {[
              { title: 'Ingredientes naturales', desc: 'Seleccionamos ingredientes frescos y naturales de la más alta calidad, sin conservantes artificiales.' },
              { title: 'Amor artesanal', desc: 'Cada pieza es elaborada a mano con dedicación, cuidando cada detalle hasta el último acabado.' },
              { title: 'Calidad garantizada', desc: 'Nuestro empaque rígido especializado asegura que tu pastel llegue en perfectas condiciones.' },
              { title: 'Innovación constante', desc: 'Nos mantenemos al día con las últimas tendencias en diseño de repostería para ofrecerte creaciones únicas.' },
            ].map((v, i) => (
              <div
                key={v.title}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(160px, 200px) 1fr',
                  gap: 'clamp(16px, 3vw, 32px)',
                  alignItems: 'baseline',
                  padding: '20px 0',
                  borderTop: i === 0 ? '1px solid #EDE8E3' : 'none',
                  borderBottom: '1px solid #EDE8E3',
                }}
              >
                <h4
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: 18,
                    fontWeight: 500,
                    color: '#1C1917',
                    margin: 0,
                  }}
                >
                  {v.title}
                </h4>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 14,
                    fontWeight: 300,
                    color: '#78716C',
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Stats — minimal inline row ─────────────────────── */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 'clamp(32px, 6vw, 72px)',
            flexWrap: 'wrap',
          }}
        >
          {stats.map((s, i) => (
            <div
              key={s.label}
              style={{
                textAlign: 'center',
                position: 'relative',
                paddingLeft: i > 0 ? 'clamp(16px, 3vw, 36px)' : 0,
              }}
            >
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 'clamp(36px, 5vw, 52px)',
                  fontWeight: 400,
                  color: '#1C1917',
                  lineHeight: 1,
                  marginBottom: 6,
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 12,
                  fontWeight: 400,
                  color: '#A8A29E',
                  letterSpacing: '0.02em',
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
