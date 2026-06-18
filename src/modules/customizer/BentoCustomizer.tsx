import { useState } from 'react';
import { MessageCircle, Check } from 'lucide-react';
import { ParticleButton } from '../../core/components/ui/ParticleButton';

const WA_BASE = 'https://wa.me/50589535705?text=';

interface CustomizerState {
  shape: 'Círculo' | 'Corazón';
  dough: 'Vainilla' | 'Chocolate' | 'Red Velvet';
  filling: 'Dulce de Leche' | 'Nutella' | 'Crema Oreo' | 'Mermelada de Fresa';
  frostingColor: 'Rosa Pastel' | 'Azul Cielo' | 'Lila Lavanda' | 'Blanco Vainilla' | 'Amarillo Claro';
  messageText: string;
  textColor: 'Marrón Chocolate' | 'Blanco Nieve' | 'Rojo Fresa' | 'Rosa Fuerte';
}

const colorMap = {
  'Rosa Pastel': '#FBCFE8',
  'Azul Cielo': '#BFDBFE',
  'Lila Lavanda': '#E9D5FF',
  'Blanco Vainilla': '#F9F8F6',
  'Amarillo Claro': '#FEF08A',
};

const textStyleMap = {
  'Marrón Chocolate': '#3F200F',
  'Blanco Nieve': '#FFFFFF',
  'Rojo Fresa': '#E11D48',
  'Rosa Fuerte': '#DB2777',
};

const steps = [
  { id: 'shape', label: 'Forma' },
  { id: 'dough', label: 'Bizcocho' },
  { id: 'filling', label: 'Relleno' },
  { id: 'frostingColor', label: 'Cobertura' },
  { id: 'messageText', label: 'Mensaje' },
];

export function BentoCustomizer() {
  const [activeStep, setActiveStep] = useState(0);
  const [state, setState] = useState<CustomizerState>({
    shape: 'Círculo',
    dough: 'Vainilla',
    filling: 'Dulce de Leche',
    frostingColor: 'Rosa Pastel',
    messageText: 'Feliz Día',
    textColor: 'Marrón Chocolate',
  });
  const [saving, setSaving] = useState(false);
  const [orderedId, setOrderedId] = useState<string | null>(null);

  const setOption = (key: keyof CustomizerState, value: any) => {
    setState(prev => ({ ...prev, [key]: value }));
  };

  const nextStep = () => {
    if (activeStep < steps.length - 1) setActiveStep(s => s + 1);
  };

  const prevStep = () => {
    if (activeStep > 0) setActiveStep(s => s - 1);
  };

  const handleOrder = async () => {
    setSaving(true);
    try {
      // 1. Guardar en Base de Datos de MongoDB
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          shape: state.shape,
          dough: state.dough,
          filling: state.filling,
          frostingColor: state.frostingColor,
          messageText: state.messageText,
          textColor: state.textColor,
        }),
      });

      if (!res.ok) throw new Error('Error al registrar pedido en base de datos');
      const order = await res.json();
      setOrderedId(order._id);

      // 2. Construir mensaje de WhatsApp
      const msg = `¡Hola Dulce Sabor! Acabo de diseñar mi Bento Cake personalizado en la web (Pedido ID: ${order._id || 'nuevo'}):
- Forma: ${state.shape}
- Sabor de Bizcocho: ${state.dough}
- Relleno: ${state.filling}
- Color de Cobertura: ${state.frostingColor}
- Mensaje: "${state.messageText}"
- Color de Letra: ${state.textColor}
¿Me confirman para realizar el abono?`;

      window.open(WA_BASE + encodeURIComponent(msg), '_blank');
    } catch (err) {
      console.error('Error al procesar el pedido:', err);
      // Fallback: Si no conecta con el backend, abre WhatsApp igualmente
      const msg = `¡Hola Dulce Sabor! Quiero encargar un Bento Cake personalizado:
- Forma: ${state.shape}
- Sabor de Bizcocho: ${state.dough}
- Relleno: ${state.filling}
- Color de Cobertura: ${state.frostingColor}
- Mensaje: "${state.messageText}"
- Color de Letra: ${state.textColor}`;
      window.open(WA_BASE + encodeURIComponent(msg), '_blank');
    } finally {
      setSaving(false);
    }
  };

  return (
    <section
      id="personalizar"
      style={{
        background: '#F5F0EB',
        padding: 'clamp(64px, 8vw, 100px) 24px',
        borderBottom: '1px solid #EDE8E3',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
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
            Personalizador interactivo
          </p>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(32px, 5vw, 52px)',
              fontWeight: 400,
              color: '#1C1917',
              margin: '0 0 16px',
            }}
          >
            Diseña tu propio Bento Cake
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 15,
              fontWeight: 300,
              color: '#78716C',
              maxWidth: 500,
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            Elige los ingredientes, colores y mensaje de tu pastel. Visualiza el resultado en tiempo real.
          </p>
        </div>

        {/* Layout Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 450px), 1fr))',
            gap: 40,
            alignItems: 'start',
          }}
        >
          {/* Stepper Panel */}
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: 24,
              border: '1px solid #EDE8E3',
              padding: 'clamp(24px, 4vw, 36px)',
              boxShadow: '0 8px 30px rgba(28,25,23,0.02)',
              display: 'flex',
              flexDirection: 'column',
              minHeight: 460,
            }}
          >
            {/* Step indicators */}
            <div style={{ display: 'flex', gap: 6, marginBottom: 28 }}>
              {steps.map((s, idx) => (
                <div
                  key={s.id}
                  style={{
                    flex: 1,
                    height: 4,
                    borderRadius: 2,
                    background: idx <= activeStep ? '#B07D4A' : '#EDE8E3',
                    transition: 'background 0.3s',
                  }}
                />
              ))}
            </div>

            {/* Current Step Label */}
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 11,
                fontWeight: 600,
                color: '#B07D4A',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: 6,
              }}
            >
              Paso {activeStep + 1} de {steps.length}
            </div>
            <h3
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 26,
                fontWeight: 500,
                color: '#1C1917',
                margin: '0 0 24px',
              }}
            >
              Selecciona: {steps[activeStep].label}
            </h3>

            {/* Option Selection Controls */}
            <div style={{ flex: 1 }}>
              {/* Shape Selection */}
              {activeStep === 0 && (
                <div style={{ display: 'flex', gap: 16 }}>
                  {(['Círculo', 'Corazón'] as const).map(shape => (
                    <button
                      key={shape}
                      onClick={() => setOption('shape', shape)}
                      style={{
                        flex: 1,
                        padding: '20px 16px',
                        borderRadius: 16,
                        border: state.shape === shape ? '2px solid #B07D4A' : '1px solid #EDE8E3',
                        background: state.shape === shape ? '#FAFAF8' : 'transparent',
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 14,
                        color: '#1C1917',
                        fontWeight: state.shape === shape ? 500 : 400,
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 8,
                      }}
                    >
                      {shape}
                      {state.shape === shape && <Check size={16} color="#B07D4A" />}
                    </button>
                  ))}
                </div>
              )}

              {/* Dough Selection */}
              {activeStep === 1 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {(['Vainilla', 'Chocolate', 'Red Velvet'] as const).map(dough => (
                    <button
                      key={dough}
                      onClick={() => setOption('dough', dough)}
                      style={{
                        padding: '16px 20px',
                        borderRadius: 12,
                        border: state.dough === dough ? '2px solid #B07D4A' : '1px solid #EDE8E3',
                        background: state.dough === dough ? '#FAFAF8' : 'transparent',
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 14,
                        color: '#1C1917',
                        fontWeight: state.dough === dough ? 500 : 400,
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      {dough}
                      {state.dough === dough && <Check size={16} color="#B07D4A" />}
                    </button>
                  ))}
                </div>
              )}

              {/* Filling Selection */}
              {activeStep === 2 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {(['Dulce de Leche', 'Nutella', 'Crema Oreo', 'Mermelada de Fresa'] as const).map(filling => (
                    <button
                      key={filling}
                      onClick={() => setOption('filling', filling)}
                      style={{
                        padding: '16px 20px',
                        borderRadius: 12,
                        border: state.filling === filling ? '2px solid #B07D4A' : '1px solid #EDE8E3',
                        background: state.filling === filling ? '#FAFAF8' : 'transparent',
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 14,
                        color: '#1C1917',
                        fontWeight: state.filling === filling ? 500 : 400,
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      {filling}
                      {state.filling === filling && <Check size={16} color="#B07D4A" />}
                    </button>
                  ))}
                </div>
              )}

              {/* Frosting Color Selection */}
              {activeStep === 3 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {(['Rosa Pastel', 'Azul Cielo', 'Lila Lavanda', 'Blanco Vainilla', 'Amarillo Claro'] as const).map(color => (
                    <button
                      key={color}
                      onClick={() => setOption('frostingColor', color)}
                      style={{
                        padding: '12px 16px',
                        borderRadius: 12,
                        border: state.frostingColor === color ? '2px solid #B07D4A' : '1px solid #EDE8E3',
                        background: state.frostingColor === color ? '#FAFAF8' : 'transparent',
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 14,
                        color: '#1C1917',
                        fontWeight: state.frostingColor === color ? 500 : 400,
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                      }}
                    >
                      <span
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: '50%',
                          background: colorMap[color],
                          border: '1px solid rgba(0,0,0,0.1)',
                          display: 'inline-block',
                        }}
                      />
                      {color}
                      {state.frostingColor === color && (
                        <Check size={16} color="#B07D4A" style={{ marginLeft: 'auto' }} />
                      )}
                    </button>
                  ))}
                </div>
              )}

              {/* Message text and color */}
              {activeStep === 4 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <div>
                    <label
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 12,
                        color: '#78716C',
                        display: 'block',
                        marginBottom: 6,
                      }}
                    >
                      Texto escrito (Máximo 20 caracteres)
                    </label>
                    <input
                      type="text"
                      maxLength={20}
                      value={state.messageText}
                      onChange={e => setOption('messageText', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '14px 16px',
                        borderRadius: 12,
                        border: '1px solid #EDE8E3',
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 14,
                        color: '#1C1917',
                        background: '#FAFAF8',
                        outline: 'none',
                      }}
                      placeholder="Escribe el mensaje..."
                    />
                  </div>

                  <div>
                    <label
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 12,
                        color: '#78716C',
                        display: 'block',
                        marginBottom: 8,
                      }}
                    >
                      Color de la Letra
                    </label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {(['Marrón Chocolate', 'Blanco Nieve', 'Rojo Fresa', 'Rosa Fuerte'] as const).map(color => (
                        <button
                          key={color}
                          onClick={() => setOption('textColor', color)}
                          style={{
                            padding: '10px 14px',
                            borderRadius: 100,
                            border: state.textColor === color ? '2px solid #B07D4A' : '1px solid #EDE8E3',
                            background: state.textColor === color ? '#FAFAF8' : 'transparent',
                            fontFamily: "'Inter', sans-serif",
                            fontSize: 12,
                            fontWeight: state.textColor === color ? 500 : 400,
                            color: '#1C1917',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 6,
                          }}
                        >
                          <span
                            style={{
                              width: 12,
                              height: 12,
                              borderRadius: '50%',
                              background: textStyleMap[color],
                              border: '1px solid rgba(0,0,0,0.1)',
                              display: 'inline-block',
                            }}
                          />
                          {color.split(' ')[0]}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Stepper Buttons */}
            <div style={{ display: 'flex', gap: 12, marginTop: 32 }}>
              {activeStep > 0 && (
                <button
                  onClick={prevStep}
                  style={{
                    padding: '12px 20px',
                    borderRadius: 100,
                    border: '1px solid #EDE8E3',
                    background: 'transparent',
                    color: '#78716C',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 13,
                    fontWeight: 500,
                    cursor: 'pointer',
                  }}
                >
                  Atrás
                </button>
              )}

              {activeStep < steps.length - 1 ? (
                <button
                  onClick={nextStep}
                  style={{
                    marginLeft: 'auto',
                    padding: '12px 24px',
                    borderRadius: 100,
                    border: 'none',
                    background: '#1C1917',
                    color: '#FAFAF8',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 13,
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#B07D4A')}
                  onMouseLeave={e => (e.currentTarget.style.background = '#1C1917')}
                >
                  Siguiente
                </button>
              ) : (
                <ParticleButton
                  onClick={handleOrder}
                  style={{
                    marginLeft: 'auto',
                    padding: '12px 24px',
                    borderRadius: 100,
                    border: 'none',
                    background: '#B07D4A',
                    color: '#FAFAF8',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                  }}
                >
                  <MessageCircle size={15} />
                  {saving ? 'Guardando...' : 'Confirmar y Pedir'}
                </ParticleButton>
              )}
            </div>
          </div>

          {/* Live 2D Visual Preview */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#FFFFFF',
              borderRadius: 24,
              border: '1px solid #EDE8E3',
              padding: 40,
              minHeight: 460,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Watermark brand */}
            <div
              style={{
                position: 'absolute',
                top: 20,
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 18,
                color: '#EDE8E3',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              Dulce Sabor
            </div>

            {/* Cake container */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                transform: 'scale(1.1)',
                filter: 'drop-shadow(0 20px 40px rgba(28,25,23,0.12))',
              }}
            >
              {state.shape === 'Círculo' ? (
                /* Round cake simulation */
                <div
                  style={{
                    width: 220,
                    height: 220,
                    borderRadius: '50%',
                    background: colorMap[state.frostingColor],
                    border: '6px solid rgba(255,255,255,0.4)',
                    boxShadow: 'inset 0 -12px 24px rgba(0,0,0,0.06), inset 0 6px 12px rgba(255,255,255,0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 16,
                    textAlign: 'center',
                    position: 'relative',
                    transition: 'background 0.3s ease',
                  }}
                >
                  {/* Decorative frosting border */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 4,
                      borderRadius: '50%',
                      border: '2px dashed rgba(255,255,255,0.6)',
                      pointerEvents: 'none',
                    }}
                  />
                  {/* Message written in frosting */}
                  <p
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontStyle: 'italic',
                      fontSize: 22,
                      fontWeight: 500,
                      color: textStyleMap[state.textColor],
                      margin: 0,
                      lineHeight: 1.3,
                      maxWidth: '85%',
                      wordBreak: 'break-word',
                      userSelect: 'none',
                      transition: 'color 0.3s ease',
                    }}
                  >
                    {state.messageText || ' '}
                  </p>
                </div>
              ) : (
                /* Heart cake simulation using SVG path with flex overlay */
                <div style={{ position: 'relative', width: 220, height: 220 }}>
                  <svg viewBox="0 0 200 200" style={{ width: '100%', height: '100%' }}>
                    <path
                      d="M 100,60 C 80,20 20,20 20,80 C 20,130 90,175 100,185 C 110,175 180,130 180,80 C 180,20 120,20 100,60 Z"
                      fill={colorMap[state.frostingColor]}
                      stroke="rgba(255,255,255,0.4)"
                      strokeWidth="6"
                      style={{
                        filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.04))',
                        transition: 'fill 0.3s ease',
                      }}
                    />
                    {/* Inner dash border path */}
                    <path
                      d="M 100,68 C 83,30 30,30 30,80 C 30,123 90,163 100,173 C 110,163 170,123 170,80 C 170,30 117,30 100,68 Z"
                      fill="none"
                      stroke="rgba(255,255,255,0.5)"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                    />
                  </svg>
                  {/* Overlay text */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: 24,
                      textAlign: 'center',
                      marginTop: -10, // adjust centering for heart shape
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        fontStyle: 'italic',
                        fontSize: 21,
                        fontWeight: 500,
                        color: textStyleMap[state.textColor],
                        margin: 0,
                        lineHeight: 1.3,
                        maxWidth: '80%',
                        wordBreak: 'break-word',
                        userSelect: 'none',
                        transition: 'color 0.3s ease',
                      }}
                    >
                      {state.messageText || ' '}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Spec readout card */}
            <div
              style={{
                marginTop: 36,
                width: '100%',
                maxWidth: 280,
                borderTop: '1px solid #EDE8E3',
                paddingTop: 16,
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 8,
              }}
            >
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#A8A29E' }}>Forma:</div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#44403C', fontWeight: 500, textAlign: 'right' }}>
                {state.shape}
              </div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#A8A29E' }}>Bizcocho:</div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#44403C', fontWeight: 500, textAlign: 'right' }}>
                {state.dough}
              </div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#A8A29E' }}>Relleno:</div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#44403C', fontWeight: 500, textAlign: 'right' }}>
                {state.filling}
              </div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#A8A29E' }}>Cobertura:</div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#44403C', fontWeight: 500, textAlign: 'right' }}>
                {state.frostingColor}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
