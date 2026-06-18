import { useState } from 'react';
import { X, Shield, FileText, RefreshCw, Award } from 'lucide-react';

interface PoliciesModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: number;
}

const tabs = [
  { label: 'Privacidad', icon: <Shield size={15} /> },
  { label: 'Términos y Condiciones', icon: <FileText size={15} /> },
  { label: 'Cambios y Devoluciones', icon: <RefreshCw size={15} /> },
  { label: 'Garantía de Calidad', icon: <Award size={15} /> },
];

const content = [
  // Privacidad
  (
    <div>
      <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 22, fontWeight: 500, color: '#1C1917', margin: '0 0 16px' }}>
        Política de Privacidad
      </h3>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#A8A29E', margin: '0 0 20px' }}>
        Última actualización: enero 2026
      </p>
      {[
        {
          title: '1. Información que recopilamos',
          text: 'Al realizar un pedido o contactarnos, recopilamos información básica de contacto como nombre, número de teléfono y correo electrónico. Esta información se utiliza únicamente para coordinar y gestionar tu pedido de manera eficiente.',
        },
        {
          title: '2. Uso de la información',
          text: 'Los datos personales que nos proporciones son utilizados exclusivamente para: procesar y confirmar tu pedido, comunicarnos contigo sobre el estado del pedido, enviarte información sobre promociones (solo si das tu consentimiento expreso), y mejorar nuestro servicio de atención al cliente.',
        },
        {
          title: '3. Protección de datos',
          text: 'Tu información personal es almacenada de forma segura en nuestra base de datos y no es compartida con terceros sin tu consentimiento explícito, salvo cuando sea requerido por la ley. Aplicamos medidas de seguridad técnicas y organizativas para proteger tus datos.',
        },
        {
          title: '4. Comunicaciones por WhatsApp',
          text: 'Al contactarnos por WhatsApp, consientes el uso de esta plataforma para la gestión de tu pedido. Nuestras conversaciones de WhatsApp están sujetas a las políticas de privacidad de Meta (WhatsApp Inc.).',
        },
        {
          title: '5. Tus derechos',
          text: 'Tienes derecho a solicitar acceso, rectificación o eliminación de tus datos personales. Para ejercer estos derechos, contáctanos directamente por WhatsApp o correo electrónico.',
        },
      ].map(s => (
        <div key={s.title} style={{ marginBottom: 20 }}>
          <h4 style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, color: '#1C1917', margin: '0 0 6px' }}>{s.title}</h4>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 300, color: '#57534E', lineHeight: 1.7, margin: 0 }}>{s.text}</p>
        </div>
      ))}
    </div>
  ),

  // Términos y Condiciones
  (
    <div>
      <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 22, fontWeight: 500, color: '#1C1917', margin: '0 0 16px' }}>
        Términos y Condiciones
      </h3>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#A8A29E', margin: '0 0 20px' }}>
        Al realizar un pedido con Dulce Sabor, aceptas los siguientes términos.
      </p>
      {[
        {
          title: '1. Proceso de pedido',
          text: 'Los pedidos deben realizarse con un mínimo de 48 horas de anticipación. Para pedidos especiales, se requiere mayor tiempo. El pedido se considera confirmado únicamente tras el pago del anticipo del 50%.',
        },
        {
          title: '2. Precios',
          text: 'Los precios publicados en el catálogo son en Córdobas Nicaragüenses (C$) e incluyen decoración básica y empaque. Precios sujetos a variación según complejidad del diseño personalizado. Te confirmaremos el precio exacto al coordinarlo.',
        },
        {
          title: '3. Retiro del pedido',
          text: 'Dulce Sabor no realiza delivery. Todos los pedidos se retiran exclusivamente en el taller en Nagarote, en la fecha y hora acordada por WhatsApp. Los pedidos no retirados en la fecha acordada quedan en espera máximo 24 horas adicionales.',
        },
        {
          title: '4. Responsabilidad del producto',
          text: 'Una vez que el cliente retira el pedido del taller, Dulce Sabor no se responsabiliza por daños ocurridos durante el traslado. Recomendamos trasladar el pastel en posición horizontal, en superficie estable y sin movimientos bruscos.',
        },
        {
          title: '5. Fotografías y diseño',
          text: 'Dulce Sabor se reserva el derecho de fotografiar los pedidos para uso en redes sociales y portafolio. Si no deseas que tu pedido sea publicado, indícalo al momento de confirmar.',
        },
      ].map(s => (
        <div key={s.title} style={{ marginBottom: 20 }}>
          <h4 style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, color: '#1C1917', margin: '0 0 6px' }}>{s.title}</h4>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 300, color: '#57534E', lineHeight: 1.7, margin: 0 }}>{s.text}</p>
        </div>
      ))}
    </div>
  ),

  // Cambios y Devoluciones
  (
    <div>
      <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 22, fontWeight: 500, color: '#1C1917', margin: '0 0 16px' }}>
        Política de Cambios y Devoluciones
      </h3>
      {[
        {
          title: 'Cambios de diseño',
          text: 'Los cambios al diseño pueden solicitarse hasta 24 horas antes de la fecha acordada de retiro. Cambios solicitados con menos tiempo pueden no ser aplicables según el estado de elaboración del pedido.',
        },
        {
          title: 'Cancelación con reembolso total (80%)',
          text: 'Si cancelas tu pedido con más de 48 horas de anticipación, reembolsamos el 80% del anticipo pagado. El 20% restante cubre costos administrativos y de materias primas ya adquiridas.',
        },
        {
          title: 'Cancelación con reembolso parcial (50%)',
          text: 'Cancelaciones realizadas entre 24 y 48 horas antes de la fecha de retiro tendrán un reembolso del 50% del anticipo, ya que la producción habrá comenzado.',
        },
        {
          title: 'Cancelación sin reembolso',
          text: 'Cancelaciones con menos de 24 horas de anticipación no son reembolsables, ya que el pastel se encontrará en etapa final de elaboración y los materiales han sido completamente utilizados.',
        },
        {
          title: 'Pedidos con defectos de calidad',
          text: 'Si al momento del retiro el producto presenta defectos evidentes de calidad o no corresponde al diseño acordado, lo corregimos inmediatamente o coordinamos una compensación justa según el caso.',
        },
      ].map(s => (
        <div key={s.title} style={{ marginBottom: 20 }}>
          <h4 style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, color: '#1C1917', margin: '0 0 6px' }}>{s.title}</h4>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 300, color: '#57534E', lineHeight: 1.7, margin: 0 }}>{s.text}</p>
        </div>
      ))}
    </div>
  ),

  // Garantía
  (
    <div>
      <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 22, fontWeight: 500, color: '#1C1917', margin: '0 0 16px' }}>
        Garantía de Calidad
      </h3>
      {[
        {
          title: 'Garantía de integridad visual',
          text: 'Garantizamos que cada pastel se entrega con el diseño acordado, en perfectas condiciones estéticas, sin daños en la decoración ni defectos visibles. Esta garantía aplica en el momento del retiro en nuestro taller.',
        },
        {
          title: 'Garantía de sabor e ingredientes',
          text: 'Utilizamos ingredientes frescos y de calidad premium. Todos nuestros productos son elaborados el mismo día o un día antes del retiro para garantizar óptima frescura y sabor.',
        },
        {
          title: 'Empaque de seguridad garantizado',
          text: 'Todos los pedidos se entregan en empaque rígido especializado que protege el diseño durante el traslado. Este empaque está incluido en el precio y es parte integral de nuestra garantía de integridad del producto.',
        },
        {
          title: 'Alergias e ingredientes',
          text: 'Si tienes alergias alimentarias, indícalo al momento de hacer el pedido. Trabajamos con productos que pueden contener trazas de nueces, gluten, lácteos y huevo. No podemos garantizar la ausencia total de alérgenos.',
        },
        {
          title: 'Tiempo de consumo recomendado',
          text: 'Recomendamos consumir los pasteles dentro de las 48 horas siguientes al retiro, almacenándolos en refrigeración entre 2°C y 6°C para mantener la frescura y la integridad de la decoración.',
        },
      ].map(s => (
        <div key={s.title} style={{ marginBottom: 20 }}>
          <h4 style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, color: '#1C1917', margin: '0 0 6px' }}>{s.title}</h4>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 300, color: '#57534E', lineHeight: 1.7, margin: 0 }}>{s.text}</p>
        </div>
      ))}
    </div>
  ),
];

export function PoliciesModal({ isOpen, onClose, initialTab = 0 }: PoliciesModalProps) {
  const [activeTab, setActiveTab] = useState(initialTab);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2000,
        background: 'rgba(28,25,23,0.75)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px 16px',
        backdropFilter: 'blur(12px)',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: 700,
          maxHeight: '90vh',
          background: '#FAFAF8',
          borderRadius: 24,
          border: '1px solid #EDE8E3',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 24px 60px rgba(28,25,23,0.2)',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid #EDE8E3',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0,
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 22,
                fontWeight: 500,
                color: '#1C1917',
              }}
            >
              Políticas de la Empresa
            </div>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 12,
                fontWeight: 300,
                color: '#A8A29E',
                marginTop: 2,
              }}
            >
              Dulce Sabor · Nagarote, Nicaragua
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: '#F5F0EB',
              border: 'none',
              borderRadius: 10,
              width: 36,
              height: 36,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#78716C',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.background = '#EDE8E3')}
            onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = '#F5F0EB')}
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Bar */}
        <div
          style={{
            padding: '12px 24px',
            borderBottom: '1px solid #EDE8E3',
            display: 'flex',
            gap: 6,
            flexWrap: 'wrap',
            flexShrink: 0,
          }}
        >
          {tabs.map((tab, i) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(i)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '7px 14px',
                borderRadius: 100,
                border: activeTab === i ? '1.5px solid #B07D4A' : '1.5px solid transparent',
                background: activeTab === i ? '#F5ECD7' : 'transparent',
                color: activeTab === i ? '#B07D4A' : '#78716C',
                fontFamily: "'Inter', sans-serif",
                fontSize: 12,
                fontWeight: activeTab === i ? 500 : 400,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '28px 24px',
          }}
        >
          {content[activeTab]}
        </div>
      </div>
    </div>
  );
}
