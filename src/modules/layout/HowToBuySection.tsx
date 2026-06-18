import { MessageCircle, Banknote, CreditCard, Smartphone, Check } from 'lucide-react';

const WA_LINK = 'https://wa.me/50589535705?text=Hola%20Dulce%20Sabor%2C%20quiero%20hacer%20un%20pedido%20%F0%9F%8E%82';

export function HowToBuySection() {
  return (
    <section
      id="como-comprar"
      style={{
        background: '#FAFAF8',
        padding: 'clamp(80px, 10vw, 120px) 24px',
        borderBottom: '1px solid #EDE8E3',
      }}
    >
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        {/* ── Header ──────────────────────────────────────────── */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(56px, 7vw, 80px)' }}>
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
            Proceso de compra
          </p>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(34px, 5.5vw, 56px)',
              fontWeight: 400,
              color: '#1C1917',
              margin: '0 0 20px',
              lineHeight: 1.12,
            }}
          >
            Así de fácil es{' '}
            <em style={{ fontStyle: 'italic', color: '#B07D4A' }}>hacer tu pedido</em>
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 15,
              fontWeight: 300,
              color: '#78716C',
              maxWidth: 480,
              margin: '0 auto',
              lineHeight: 1.75,
            }}
          >
            Un proceso sencillo, transparente y seguro para que tu celebración quede perfecta.
          </p>
        </div>

        {/* ── 3 Steps — numbered list, NO cards ──────────────── */}
        <div style={{ marginBottom: 'clamp(56px, 7vw, 80px)' }}>
          {[
            {
              num: '01',
              title: 'Escríbenos por WhatsApp',
              desc: 'Cuéntanos tu idea o elige un producto del catálogo. Coordinamos todos los detalles de manera personalizada.',
            },
            {
              num: '02',
              title: 'Realiza el anticipo',
              desc: 'Confirmado tu pedido, realizas el 50% de anticipo para apartar la fecha. El saldo se cancela al retirar.',
            },
            {
              num: '03',
              title: 'Recoge tu pedido',
              desc: 'Llegas al taller en la fecha y hora acordada. Tu pastel estará listo, empacado con seguridad y en perfectas condiciones.',
            },
          ].map((step, i) => (
            <div
              key={step.num}
              style={{
                display: 'grid',
                gridTemplateColumns: 'auto 1fr',
                gap: 'clamp(20px, 3vw, 36px)',
                alignItems: 'start',
                padding: '28px 0',
                borderBottom: '1px solid #EDE8E3',
              }}
            >
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 'clamp(36px, 5vw, 52px)',
                  fontWeight: 300,
                  color: '#EDE8E3',
                  lineHeight: 1,
                  userSelect: 'none',
                }}
              >
                {step.num}
              </span>
              <div style={{ paddingTop: 4 }}>
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: 22,
                    fontWeight: 500,
                    color: '#1C1917',
                    margin: '0 0 8px',
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
                    lineHeight: 1.7,
                    margin: 0,
                    maxWidth: 520,
                  }}
                >
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>




        {/* ── Payment Methods — clean icon rows, NO cards ──── */}
        <div style={{ marginBottom: 'clamp(48px, 6vw, 64px)' }}>
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
            Métodos de pago
          </p>
          <div style={{ maxWidth: 640, margin: '0 auto' }}>
            {[
              { icon: <Banknote size={20} />, title: 'Efectivo al retirar', desc: 'Paga el saldo restante en efectivo el día que retiras tu pedido.' },
              { icon: <CreditCard size={20} />, title: 'Transferencia bancaria', desc: 'Banpro / LAFISE. Te compartimos el número de cuenta al confirmar.' },
              { icon: <Smartphone size={20} />, title: 'Pago móvil', desc: 'Transferencia por aplicativo bancario o depósito. Confirmación inmediata.' },
            ].map((m, i) => (
              <div
                key={m.title}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '44px 1fr',
                  gap: 16,
                  alignItems: 'center',
                  padding: '18px 0',
                  borderBottom: '1px solid #EDE8E3',
                }}
              >
                <div style={{ color: '#B07D4A', display: 'flex', justifyContent: 'center' }}>
                  {m.icon}
                </div>
                <div>
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 14,
                      fontWeight: 500,
                      color: '#1C1917',
                    }}
                  >
                    {m.title}
                  </span>
                  <span style={{ color: '#A8A29E', margin: '0 8px' }}>—</span>
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 13,
                      fontWeight: 300,
                      color: '#78716C',
                    }}
                  >
                    {m.desc}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Conditions — dark block (kept, it's a single element not card spam) */}
        <div
          style={{
            background: '#1C1917',
            borderRadius: 20,
            padding: 'clamp(28px, 4vw, 40px)',
          }}
        >
          <h4
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 20,
              fontWeight: 500,
              color: '#FAFAF8',
              margin: '0 0 20px',
            }}
          >
            Condiciones de pago y retiro
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              'El anticipo del 50% es requerido para confirmar y apartar la fecha del pedido.',
              'Los pedidos se realizan con un mínimo de 48 horas de anticipación.',
              'Cambios de diseño pueden aplicarse hasta 24 horas antes de la fecha de entrega.',
              'No realizamos entregas a domicilio — todos los pedidos se retiran en el taller.',
              'El saldo restante (50%) se cancela el día del retiro.',
            ].map((p, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 10,
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 13,
                  fontWeight: 300,
                  color: '#D4C4B0',
                  lineHeight: 1.6,
                }}
              >
                <Check size={14} style={{ color: '#D4A96A', flexShrink: 0, marginTop: 3 }} />
                {p}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
