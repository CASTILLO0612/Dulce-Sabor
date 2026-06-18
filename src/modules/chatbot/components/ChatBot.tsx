import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Sparkles } from 'lucide-react';

interface Message {
  role: 'user' | 'model';
  parts: string;
  image?: string;
}

/** Convierte markdown básico (**negrita**, • viñetas, saltos de línea) en JSX elegante */
function renderMarkdown(text: string): React.ReactNode {
  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];

  lines.forEach((line, lineIdx) => {
    // Línea vacía → separador visual
    if (!line.trim()) {
      elements.push(<div key={lineIdx} style={{ height: 6 }} />);
      return;
    }

    // Detectar viñeta (• , -, *)
    const isBullet = /^[•\-\*]\s/.test(line.trim());
    const content = isBullet ? line.trim().replace(/^[•\-\*]\s/, '') : line;

    // Parsear negritas (**texto**)
    const parseBold = (str: string): React.ReactNode[] => {
      const parts = str.split('**');
      return parts.map((part, i) =>
        i % 2 === 1
          ? <strong key={i} style={{ fontWeight: 650, color: '#1C1917' }}>{part}</strong>
          : part
      );
    };

    if (isBullet) {
      elements.push(
        <div key={lineIdx} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginTop: 3 }}>
          <span style={{ color: '#B07D4A', flexShrink: 0, marginTop: 1, fontSize: 14 }}>•</span>
          <span>{parseBold(content)}</span>
        </div>
      );
    } else {
      elements.push(
        <div key={lineIdx} style={{ marginTop: lineIdx > 0 ? 2 : 0 }}>
          {parseBold(content)}
        </div>
      );
    }
  });

  return <>{elements}</>;
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [sessionId] = useState(() => 'sess-' + Math.random().toString(36).substring(2, 9));

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [history, isOpen]);

  // Mensaje de bienvenida inicial si el historial está vacío
  useEffect(() => {
    if (history.length === 0) {
      setHistory([
        {
          role: 'model',
          parts: 'Hola. Soy tu Asistente Virtual de Dulce Sabor. Estoy aquí para resolver tus dudas sobre el menú, precios, ingredientes, nuestro taller en Nagarote y para diseñar contigo bocetos creativos de pasteles en tiempo real. ¿En qué te puedo asesorar hoy?',
        },
      ]);
    }
  }, [history]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessageText = input;
    setInput('');
    setLoading(true);

    // 1. Agregar mensaje de usuario al historial local
    const newHistory: Message[] = [...history, { role: 'user', parts: userMessageText }];
    setHistory(newHistory);

    try {
      // 2. Consumir la API de chat en el backend
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessageText,
          history: history.slice(1), // Excluir la bienvenida inicial para que no confunda a la API
          sessionId,
        }),
      });

      if (!res.ok) throw new Error('Error al conectar con el servidor de chat');
      const data = await res.json();

      // 3. Crear boceto de imagen si la respuesta incluye palabras clave
      // Fotos curadas de pasteles de alta calidad (sin API key requerida)
      const cakePhotoMap: Record<string, string> = {
        'chocolate,cake':   'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&q=80',
        'pink,cake':        'https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=500&q=80',
        'wedding,cake':     'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=500&q=80',
        'graduation,cake':  'https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?w=500&q=80',
        'floral,cake':      'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=500&q=80',
        'minimalist,cake':  'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=500&q=80',
        'cake':             'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=500&q=80',
      };
      let imageUrl: string | undefined = undefined;
      if (data.imageKeywords) {
        imageUrl = cakePhotoMap[data.imageKeywords] ?? cakePhotoMap['cake'];
      }

      // 4. Agregar respuesta del bot al historial
      setHistory(prev => [
        ...prev,
        {
          role: 'model',
          parts: data.text,
          image: imageUrl,
        },
      ]);
    } catch (err) {
      console.error('Error en el chat:', err);
      setHistory(prev => [
        ...prev,
        {
          role: 'model',
          parts: 'Disculpa, en este momento tengo problemas para procesar tu consulta. Por favor, escríbenos directamente a WhatsApp y te atenderemos de inmediato.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 1000, fontFamily: "'Inter', sans-serif" }}>
      {/* Floating Action Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            width: 60,
            height: 60,
            borderRadius: '50%',
            background: '#1C1917',
            color: '#FAFAF8',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 30px rgba(28,25,23,0.25)',
            transition: 'transform 0.2s, background 0.2s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.background = '#B07D4A';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.background = '#1C1917';
          }}
        >
          <MessageCircle size={26} />
        </button>
      )}

      {/* Expanded Chat Window */}
      {isOpen && (
        <div
          style={{
            width: 'clamp(320px, 90vw, 400px)',
            height: 'min(600px, 80vh)',
            background: 'rgba(255, 255, 255, 0.85)',
            border: '1px solid rgba(28,25,23,0.1)',
            borderRadius: 24,
            boxShadow: '0 12px 40px rgba(28,25,23,0.15)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            backdropFilter: 'blur(20px)',
            transition: 'all 0.3s ease',
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '16px 20px',
              background: '#1C1917',
              color: '#FAFAF8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #D4A96A, #B07D4A)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                }}
              >
                <Sparkles size={14} />
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>Asistente Dulce Sabor</div>
                <div style={{ fontSize: 10, color: '#A8A29E' }}>Con inteligencia artificial</div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                color: '#A8A29E',
                cursor: 'pointer',
                padding: 4,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages List */}
          <div
            style={{
              flex: 1,
              padding: 20,
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              background: 'rgba(250,250,248,0.4)',
            }}
          >
            {history.map((msg, idx) => {
              const isBot = msg.role === 'model';
              return (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignSelf: isBot ? 'flex-start' : 'flex-end',
                    maxWidth: '85%',
                    gap: 8,
                  }}
                >
                  <div
                    style={{
                      padding: '12px 16px',
                      borderRadius: isBot ? '16px 16px 16px 4px' : '16px 16px 4px 16px',
                      background: isBot ? '#FFFFFF' : '#1C1917',
                      color: isBot ? '#44403C' : '#FAFAF8',
                      border: isBot ? '1px solid #EDE8E3' : 'none',
                      fontSize: 13,
                      lineHeight: 1.6,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
                    }}
                  >
                    {isBot ? renderMarkdown(msg.parts) : msg.parts}
                  </div>

                  {/* Render Visual AI Sketch Card if available */}
                  {msg.image && (
                    <div
                      style={{
                        background: '#FFFFFF',
                        border: '1px solid #EDE8E3',
                        borderRadius: 16,
                        overflow: 'hidden',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
                        display: 'flex',
                        flexDirection: 'column',
                        marginTop: 4,
                      }}
                    >
                      <img
                        src={msg.image}
                        alt="Boceto de pastel generado"
                        style={{
                          width: '100%',
                          height: 180,
                          objectFit: 'cover',
                        }}
                      />
                      <div
                        style={{
                          padding: '10px 14px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6,
                          background: '#FAFAF8',
                          borderTop: '1px solid #EDE8E3',
                        }}
                      >
                        <Sparkles size={12} color="#B07D4A" />
                        <span style={{ fontSize: 11, color: '#78716C', fontWeight: 500 }}>
                          Boceto sugerido por IA
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {loading && (
              <div
                style={{
                  alignSelf: 'flex-start',
                  padding: '12px 16px',
                  borderRadius: '16px 16px 16px 4px',
                  background: '#FFFFFF',
                  color: '#A8A29E',
                  border: '1px solid #EDE8E3',
                  fontSize: 12,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <span>Pensando respuesta...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Panel */}
          <div
            style={{
              padding: '16px 20px',
              borderTop: '1px solid rgba(28,25,23,0.08)',
              display: 'flex',
              gap: 8,
              background: '#FFFFFF',
            }}
          >
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') handleSend();
              }}
              placeholder="Pregúntame sobre precios, bocetos..."
              style={{
                flex: 1,
                border: '1px solid #EDE8E3',
                borderRadius: 100,
                padding: '10px 18px',
                fontSize: 13,
                outline: 'none',
                background: '#FAFAF8',
                color: '#1C1917',
              }}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || loading}
              style={{
                width: 38,
                height: 38,
                borderRadius: '50%',
                background: input.trim() ? '#1C1917' : '#EDE8E3',
                color: '#FAFAF8',
                border: 'none',
                cursor: input.trim() ? 'pointer' : 'default',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.2s',
              }}
            >
              <Send size={15} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
