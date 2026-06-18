import { Package, CalendarCheck, MapPin, AlertTriangle } from 'lucide-react';

const steps = [
  {
    num: '01',
    icon: <Package size={22} />,
    title: 'Eliges tu diseño',
    desc: 'Explora nuestro catálogo y elige el pastel que más te guste, o cuéntanos tu idea y lo personalizamos para ti.',
  },
  {
    num: '02',
    icon: <CalendarCheck size={22} />,
    title: 'Agendas tu hora de retiro',
    desc: 'Coordinamos por WhatsApp el día y hora exacta para que retires tu pedido. Sin filas, sin espera.',
  },
  {
    num: '03',
    icon: <MapPin size={22} />,
    title: 'Pasas por tu pedido',
    desc: 'Visitas nuestro taller en Nagarote en el horario acordado y recibes tu pastel en perfectas condiciones.',
  },
];

export function ValueSection() {
  return (
    <section
      id="como-funciona"
      style={{
        background: '#F5F0EB',
        padding: 'clamp(64px, 8vw, 100px) 24px',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Section header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(48px, 6vw, 72px)' }}>
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
            Nuestro proceso
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
            Simple, seguro y sin estrés
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 16,
              fontWeight: 300,
              color: '#78716C',
              maxWidth: 520,
              margin: '0 auto',
              lineHeight: 1.7,
            }}
          >
            Diseñamos un modelo pensado para que tu pastel llegue en perfectas
            condiciones, siempre.
          </p>
        </div>

        {/* Steps */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 24,
            marginBottom: 40,
          }}
        >
          {steps.map((step, i) => (
            <div
              key={step.num}
              style={{
                background: '#FFFFFF',
                borderRadius: 20,
                padding: '32px 28px',
                border: '1px solid #EDE8E3',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Step number watermark */}
              <div
                style={{
                  position: 'absolute',
                  top: -10,
                  right: 16,
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 100,
                  fontWeight: 300,
                  color: '#F5ECD7',
                  lineHeight: 1,
                  userSelect: 'none',
                  pointerEvents: 'none',
                }}
              >
                {step.num}
              </div>

              <div
                style={{
                  width: 48,
                  height: 48,
                  background: '#F5ECD7',
                  borderRadius: 14,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#B07D4A',
                  marginBottom: 20,
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                {step.icon}
              </div>

              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 22,
                  fontWeight: 500,
                  color: '#1C1917',
                  margin: '0 0 10px',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 14,
                  fontWeight: 300,
                  color: '#78716C',
                  lineHeight: 1.65,
                  margin: 0,
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                {step.desc}
              </p>

              {/* Connector dot */}
              {i < steps.length - 1 && (
                <div
                  className="hidden md:block"
                  style={{
                    position: 'absolute',
                    right: -13,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: 26,
                    height: 26,
                    background: '#B07D4A',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: 12,
                    fontWeight: 600,
                    zIndex: 10,
                  }}
                >
                  →
                </div>
              )}
            </div>
          ))}
        </div>

        {/* NO delivery notice */}
        <div
          style={{
            background: '#1C1917',
            borderRadius: 20,
            padding: 'clamp(28px, 4vw, 40px)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: 32,
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
            <div
              style={{
                width: 52,
                height: 52,
                background: 'rgba(176,125,74,0.2)',
                borderRadius: 14,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#D4A96A',
                flexShrink: 0,
              }}
            >
              <AlertTriangle size={24} />
            </div>
            <div>
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 24,
                  fontWeight: 500,
                  color: '#FAFAF8',
                  margin: '0 0 8px',
                  lineHeight: 1.2,
                }}
              >
                No hacemos delivery
              </h3>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 14,
                  fontWeight: 300,
                  color: '#A8A29E',
                  margin: 0,
                  lineHeight: 1.65,
                }}
              >
                Por la seguridad e integridad de cada diseño, todos los pedidos se
                retiran exclusivamente en nuestro taller. No arriesgamos el trabajo
                artesanal de cada pastel.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              '📦 Empaque rígido especializado incluido',
              '🎂 Diseño 100% intacto garantizado',
              '🤝 Entrega personalizada en mano',
            ].map(item => (
              <div
                key={item}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 14,
                  fontWeight: 400,
                  color: '#D4C4B0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
