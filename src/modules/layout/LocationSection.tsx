import { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

const WA_LINK = 'https://wa.me/50589535705?text=Hola%20Dulce%20Sabor%2C%20me%20interesa%20hacer%20un%20pedido%20%F0%9F%8E%82';

export function LocationSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;
    setSending(true);
    const msg = `Hola Dulce Sabor 🎂, mi nombre es ${form.name} (${form.email}): "${form.message}"`;
    window.open(`https://wa.me/50589535705?text=${encodeURIComponent(msg)}`, '_blank');
    setSent(true);
    setForm({ name: '', email: '', message: '' });
    setSending(false);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 0',
    border: 'none',
    borderBottom: '1px solid #EDE8E3',
    fontFamily: "'Inter', sans-serif",
    fontSize: 14,
    color: '#1C1917',
    background: 'transparent',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s',
  };

  return (
    <section
      id="contacto"
      style={{
        background: '#FAFAF8',
        padding: 'clamp(80px, 10vw, 120px) 24px',
        borderBottom: '1px solid #EDE8E3',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
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
            Dónde encontrarnos
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
            Ubicación y{' '}
            <em style={{ fontStyle: 'italic', color: '#B07D4A' }}>contacto</em>
          </h2>
        </div>

        {/* ── Main Grid ───────────────────────────────────────── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 440px), 1fr))',
            gap: 'clamp(40px, 6vw, 80px)',
            alignItems: 'center',
          }}
        >
          {/* Left: Map only */}
          <div>
            <div
              style={{
                borderRadius: 16,
                overflow: 'hidden',
                border: '1px solid #EDE8E3',
                height: 480,
                minHeight: 380,
              }}
            >
              <iframe
                title="Taller Dulce Sabor - Nagarote, Nicaragua"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3899.1915442805467!2d-86.56525992497678!3d12.26500598782352!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f73f85888888889%3A0x6b77464654924c80!2sParque%20Central%20de%20Nagarote!5e0!3m2!1sen!2sni!4v1718500000000!5m2!1sen!2sni"
                width="100%"
                height="100%"
                style={{ border: 0, display: 'block' }}
                allowFullScreen
              />
            </div>
          </div>

          {/* Right: Contact Form — clean, minimal */}
          <div>
            <h3
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(26px, 3.5vw, 36px)',
                fontWeight: 400,
                color: '#1C1917',
                margin: '0 0 8px',
              }}
            >
              Envíanos un mensaje
            </h3>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                fontWeight: 300,
                color: '#78716C',
                lineHeight: 1.65,
                margin: '0 0 36px',
              }}
            >
              Completa el formulario y te responderemos de inmediato por WhatsApp.
            </p>

            {sent ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <CheckCircle2 size={40} style={{ color: '#B07D4A', marginBottom: 16 }} />
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: 22,
                    fontWeight: 500,
                    color: '#1C1917',
                    marginBottom: 8,
                  }}
                >
                  ¡Mensaje enviado!
                </div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 300, color: '#78716C', margin: '0 0 20px' }}>
                  Te redirigimos a WhatsApp para atenderte de inmediato.
                </p>
                <button
                  onClick={() => setSent(false)}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 13,
                    color: '#B07D4A',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                  }}
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <div>
                  <label style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 500, color: '#A8A29E', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Tu nombre..."
                    style={inputStyle}
                    onFocus={e => (e.currentTarget.style.borderBottomColor = '#B07D4A')}
                    onBlur={e => (e.currentTarget.style.borderBottomColor = '#EDE8E3')}
                  />
                </div>
                <div>
                  <label style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 500, color: '#A8A29E', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="tu@email.com"
                    style={inputStyle}
                    onFocus={e => (e.currentTarget.style.borderBottomColor = '#B07D4A')}
                    onBlur={e => (e.currentTarget.style.borderBottomColor = '#EDE8E3')}
                  />
                </div>
                <div>
                  <label style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 500, color: '#A8A29E', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    Mensaje
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Cuéntanos sobre tu pedido, fecha, diseño..."
                    style={{
                      ...inputStyle,
                      resize: 'none',
                    }}
                    onFocus={e => (e.currentTarget.style.borderBottomColor = '#B07D4A')}
                    onBlur={e => (e.currentTarget.style.borderBottomColor = '#EDE8E3')}
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  style={{
                    alignSelf: 'flex-start',
                    padding: '13px 32px',
                    borderRadius: 100,
                    border: 'none',
                    background: '#1C1917',
                    color: '#FAFAF8',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 14,
                    fontWeight: 500,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.background = '#B07D4A')}
                  onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = '#1C1917')}
                >
                  <Send size={15} />
                  {sending ? 'Enviando...' : 'Enviar mensaje'}
                </button>

                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 11,
                    fontWeight: 300,
                    color: '#A8A29E',
                    margin: 0,
                    lineHeight: 1.5,
                  }}
                >
                  Al enviar, te redirigiremos a WhatsApp Business para atención inmediata.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
