import { useState } from 'react';
import { ChevronDown, MessageCircle } from 'lucide-react';

const WA_LINK = 'https://wa.me/50589535705?text=Hola%20Dulce%20Sabor%2C%20tengo%20una%20pregunta';

interface FAQItem { q: string; a: string; }
interface FAQCategory { label: string; items: FAQItem[]; }

const faqData: FAQCategory[] = [
  {
    label: 'Pedidos',
    items: [
      { q: '¿Con cuánta anticipación debo hacer mi pedido?', a: 'Recomendamos un mínimo de 48 horas de anticipación para pedidos estándar. Para diseños altamente personalizados o fechas especiales, sugerimos reservar con al menos 5 a 7 días de adelanto.' },
      { q: '¿Cómo realizo un pedido?', a: 'Escríbenos por WhatsApp al +505 8953 5705, cuéntanos tu idea o elige un producto del catálogo, coordinamos los detalles, realizas el anticipo del 50% y agendamos la fecha de retiro.' },
      { q: '¿Puedo hacer cambios después de confirmarlo?', a: 'Los cambios de diseño se pueden solicitar hasta 24 horas antes de la fecha de retiro. Cambios en sabor o forma pueden aplicarse hasta 48 horas antes.' },
      { q: '¿Hacen pedidos corporativos?', a: 'Sí, trabajamos con empresas para pedidos corporativos, eventos y celebraciones institucionales. Contáctanos con anticipación para coordinar cantidades y diseños con tu identidad de marca.' },
    ],
  },
  {
    label: 'Pagos',
    items: [
      { q: '¿Cuáles son los métodos de pago?', a: 'Aceptamos efectivo al momento del retiro, transferencia bancaria a Banpro o LAFISE, y pago móvil. No procesamos pagos con tarjeta de crédito en este momento.' },
      { q: '¿Es obligatorio el anticipo?', a: 'Sí. El 50% de anticipo es requerido para confirmar y apartar la fecha. Este anticipo cubre el costo de los ingredientes y asegura tu espacio en la agenda.' },
      { q: '¿El precio incluye decoración y empaque?', a: 'Sí. Todos los precios publicados incluyen decoración artesanal básica y empaque rígido de seguridad. Los diseños Premium pueden tener un costo adicional.' },
    ],
  },
  {
    label: 'Retiro y Envíos',
    items: [
      { q: '¿Por qué no hacen delivery?', a: 'Por la seguridad de cada diseño artesanal. Los pasteles decorados son piezas delicadas que pueden dañarse durante el traslado. Preferimos que lo retires en nuestro taller en perfectas condiciones.' },
      { q: '¿En qué horario puedo retirar?', a: 'De lunes a viernes de 9:00 AM a 6:00 PM, sábados de 9:00 AM a 4:00 PM. Domingos solo para pedidos especiales previamente agendados.' },
      { q: '¿Cómo llego al taller?', a: 'Del Parque Central de Nagarote, 3 cuadras al sur, mano derecha. Casa con portón verde. Puedes usar el mapa en la sección de Contacto.' },
    ],
  },
  {
    label: 'Garantía',
    items: [
      { q: '¿Qué garantía tienen los productos?', a: 'Garantizamos condiciones perfectas al momento del retiro. Si encuentras algún defecto o problema de calidad, lo resolvemos de inmediato en el taller.' },
      { q: '¿Qué pasa si cancelo mi pedido?', a: 'Más de 48h: reembolso del 80% del anticipo. Entre 24-48h: reembolso del 50%. Menos de 24h: no reembolsable, ya que los materiales fueron utilizados.' },
      { q: '¿Y si no coincide con el diseño?', a: 'Trabajamos con aprobación del diseño antes de comenzar. Si el resultado no coincide significativamente, lo corregimos sin costo adicional o compensamos justamente.' },
    ],
  },
];

function AccordionItem({ item, isOpen, toggle }: { item: FAQItem; isOpen: boolean; toggle: () => void }) {
  return (
    <div style={{ borderBottom: '1px solid #EDE8E3' }}>
      <button
        onClick={toggle}
        style={{
          width: '100%',
          padding: '20px 0',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 16,
          textAlign: 'left',
        }}
      >
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 15,
            fontWeight: 400,
            color: isOpen ? '#B07D4A' : '#1C1917',
            lineHeight: 1.4,
            transition: 'color 0.2s',
          }}
        >
          {item.q}
        </span>
        <span
          style={{
            color: '#B07D4A',
            flexShrink: 0,
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.25s ease',
            display: 'flex',
          }}
        >
          <ChevronDown size={18} />
        </span>
      </button>
      <div
        style={{
          maxHeight: isOpen ? 300 : 0,
          overflow: 'hidden',
          transition: 'max-height 0.3s ease',
        }}
      >
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 14,
            fontWeight: 300,
            color: '#78716C',
            lineHeight: 1.7,
            margin: 0,
            paddingBottom: 20,
          }}
        >
          {item.a}
        </p>
      </div>
    </div>
  );
}

export function FAQSection() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleCategoryChange = (i: number) => {
    setActiveCategory(i);
    setOpenIndex(null);
  };

  return (
    <section
      id="faq"
      style={{
        background: '#FFFFFF',
        padding: 'clamp(80px, 10vw, 120px) 24px',
        borderBottom: '1px solid #EDE8E3',
      }}
    >
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        {/* ── Header ──────────────────────────────────────────── */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(48px, 6vw, 64px)' }}>
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
            Dudas frecuentes
          </p>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(34px, 5.5vw, 56px)',
              fontWeight: 400,
              color: '#1C1917',
              margin: 0,
              lineHeight: 1.12,
            }}
          >
            Preguntas{' '}
            <em style={{ fontStyle: 'italic', color: '#B07D4A' }}>frecuentes</em>
          </h2>
        </div>

        {/* ── Category Tabs — minimal pills ───────────────────── */}
        <div
          style={{
            display: 'flex',
            gap: 6,
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: 40,
          }}
        >
          {faqData.map((cat, i) => (
            <button
              key={cat.label}
              onClick={() => handleCategoryChange(i)}
              style={{
                padding: '8px 18px',
                borderRadius: 100,
                border: 'none',
                background: activeCategory === i ? '#1C1917' : 'transparent',
                color: activeCategory === i ? '#FAFAF8' : '#78716C',
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                fontWeight: activeCategory === i ? 500 : 400,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* ── Accordion — clean lines, NO card borders ────────── */}
        <div style={{ borderTop: '1px solid #EDE8E3' }}>
          {faqData[activeCategory].items.map((item, i) => (
            <AccordionItem
              key={`${activeCategory}-${i}`}
              item={item}
              isOpen={openIndex === i}
              toggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>

        {/* ── Bottom CTA ──────────────────────────────────────── */}
        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 14,
              fontWeight: 300,
              color: '#A8A29E',
              margin: '0 0 20px',
              lineHeight: 1.6,
            }}
          >
            ¿No encontraste lo que buscabas? Escríbenos directamente al <strong style={{ color: '#B07D4A' }}>+505 8953 5705</strong>.
          </p>
        </div>
      </div>
    </section>
  );
}
