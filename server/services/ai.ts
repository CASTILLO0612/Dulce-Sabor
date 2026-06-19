import { GoogleGenAI } from '@google/genai';

const SYSTEM_PROMPT = `
Eres el "Asistente Virtual de Dulce Sabor", un asistente de Inteligencia Artificial elegante, profesional y minimalista para una repostería artesanal de alta gama ubicada en Nagarote, Nicaragua.

Información Corporativa Importante (Debes basar tus respuestas estrictamente en esto):
1. Misión: Ofrecer experiencias memorables en el municipio de Nagarote a través de la elaboración artesanal de repostería creativa y Bento Cakes altamente estéticos. Nos enfocamos en satisfacer las necesidades de celebración y auto-antojo del segmento joven y universitario, combinando las tendencias visuales globales con ingredientes culinarios de alta calidad. Garantizamos la máxima confianza digital y la integridad estructural de cada producto mediante un sistema transparente de evidencia física, empaques rígidos de seguridad y un modelo eficiente de retiro presencial programado.
2. Visión: Ser la repostería artesanal líder y de mayor confianza en Nagarote para el año 2031, reconocida por transformar de manera idéntica las tendencias digitales en realidades comestibles perfectas. Aspiramos a consolidar un modelo operativo de vanguardia enfocado en la personalización masiva a pequeña escala, diversificando la oferta de forma sostenible hacia líneas de productos saludables y eliminando por completo los riesgos de fricción logística para nuestra comunidad de clientes.
3. Canales de Contacto:
   - WhatsApp Business: +505 8953 5705 (Enlace directo: https://wa.me/50589535705)
   - Página de Facebook: https://www.facebook.com/share/1EE5BpSLTf/?mibextid=wwXIfr
4. Ubicación y Retiro: Nuestro taller físico está en Nagarote, Nicaragua (dirección: Del Parque Central, 3c al sur). Por razones de seguridad y para preservar la integridad artística y estética de los pasteles, todos los pedidos se retiran exclusivamente de manera presencial en el taller. NO realizamos delivery.
5. Catálogo y Precios:
   - Bento Cake Estándar: Mini pastel personalizado para 1-2 personas. Precio: Desde C$ 190. Sabores: Vainilla o Chocolate. Decoración artesanal incluida.
   - Bento Cake Premium: Diseños complejos y técnicas avanzadas. Precio: Desde C$ 280. Sabores: Personalizados.
   - Combo Estudiantil: Bento Cake + 2 Cupcakes gratis de regalo por fin de semana. Precio: C$ 350.
   - Pastel Tradicional: Pasteles de 1 libra para celebraciones mayores. Precio: C$ 500 a C$ 800.
6. Políticas de Pedido: Se requiere realizar el pedido con un mínimo de 48 horas de anticipación mediante un abono del 50%.
7. Tono de Voz: Sofisticado, académico, servicial, cálido, minimalista y libre de emojis infantiles, exagerados o de estilo IA.

Si el usuario te pide una sugerencia de diseño de pastel o que generes una imagen/boceto de un pastel, descríbele una propuesta de diseño premium y minimalista y dile que estás generando un boceto para él.
`;

export class AIService {
  private ai: GoogleGenAI | null = null;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey && apiKey.length > 20) {
      try {
        this.ai = new GoogleGenAI({ apiKey });
        console.log('✓ Gemini AI inicializado correctamente con @google/genai');
      } catch (err) {
        console.error('Error al inicializar Google GenAI:', err);
      }
    } else {
      console.warn('⚠ GEMINI_API_KEY no configurada. Usando respuestas fallback.');
    }
  }

  // Detectar palabras clave para simulación local si falla la API
  private getFallbackResponse(message: string): { text: string; imageKeywords?: string } {
    const text = message.toLowerCase();

    if (text.includes('precio') || text.includes('cuanto vale') || text.includes('costo') || text.includes('catálogo')) {
      return {
        text: 'Nuestras opciones de repostería artesanal incluyen: Bento Cake Estándar (desde C$ 190), Bento Premium con diseños complejos (desde C$ 280), el Combo Estudiantil (Bento + 2 Cupcakes por C$ 350) y pasteles tradicionales de 1 libra (C$ 500 a C$ 800). Todos los precios incluyen decoración artesanal básica.',
      };
    }

    if (text.includes('delivery') || text.includes('domicilio') || text.includes('llevar') || text.includes('envio')) {
      return {
        text: 'Por motivos de seguridad y para garantizar que la delicada decoración artesanal de tu pastel llegue intacta, no ofrecemos servicio de delivery. Todos los pedidos se retiran exclusivamente en nuestro taller de Nagarote de manera presencial en la fecha y hora coordinadas.',
      };
    }

    if (text.includes('ubicacion') || text.includes('donde estan') || text.includes('taller') || text.includes('direccion')) {
      return {
        text: 'Nuestro taller de producción artesanal está ubicado en el municipio de Nagarote, León, Nicaragua. Tras confirmar tu pedido por WhatsApp, te compartiremos la dirección exacta y la geolocalización para que pases a retirarlo sin contratiempos.',
      };
    }

    if (text.includes('sabor') || text.includes('relleno') || text.includes('ingrediente')) {
      return {
        text: 'Para nuestros Bento Cakes estándar ofrecemos bizcochos sabor a vainilla y chocolate. Para opciones premium y pasteles de libra, podemos incorporar rellenos como dulce de leche, Nutella, crema de fresas o galleta Oreo de acuerdo a tu gusto.',
      };
    }

    if (text.includes('encargar') || text.includes('pedir') || text.includes('pedido') || text.includes('abono')) {
      return {
        text: 'Para agendar tu pedido solicitamos al menos 48 horas de anticipación y un abono previo del 50% de la cotización para asegurar la compra de materiales frescos. El saldo restante se cancela al retirar tu pastel en el taller.',
      };
    }

    if (text.includes('boceto') || text.includes('imagen') || text.includes('diseño') || text.includes('foto') || text.includes('idea') || text.includes('graduacion') || text.includes('boda') || text.includes('cumpleaños')) {
      // Simular la generación de una imagen extrayendo una palabra clave
      let keyword = 'cake';
      if (text.includes('chocolate')) keyword = 'chocolate,cake';
      else if (text.includes('fresa') || text.includes('rosa')) keyword = 'pink,cake';
      else if (text.includes('boda') || text.includes('matrimonio')) keyword = 'wedding,cake';
      else if (text.includes('graduacion')) keyword = 'graduation,cake';
      else if (text.includes('flores') || text.includes('floral')) keyword = 'floral,cake';
      else if (text.includes('minimal')) keyword = 'minimalist,cake';

      return {
        text: 'He diseñado una propuesta creativa para ti: un pastel minimalista y contemporáneo, con un alisado impecable, detalles ornamentales sobrios y un balance cromático equilibrado. He generado un boceto visual para ayudarte a visualizarlo.',
        imageKeywords: keyword,
      };
    }

    return {
      text: 'Hola. Soy el Asistente Virtual de Dulce Sabor. Puedo darte detalles sobre nuestros Bento Cakes, pasteles de libra, nuestros precios en Nagarote, nuestras políticas de retiro presencial y ayudarte a diseñar o visualizar ideas para tu celebración. ¿De qué te gustaría hablar?',
    };
  }

  // Generar respuesta del chat
  public async generateChatResponse(message: string, history: Array<{ role: 'user' | 'model'; parts: string }>): Promise<{ text: string; imageKeywords?: string }> {
    // Si la API no está configurada, usamos el motor fallback
    if (!this.ai) {
      return this.getFallbackResponse(message);
    }

    try {
      // Construir el historial de conversación como contenidos
      const contents = [
        ...history.map(h => ({
          role: h.role,
          parts: [{ text: h.parts }],
        })),
        {
          role: 'user' as const,
          parts: [{ text: message }],
        },
      ];

      // Generar respuesta con el nuevo SDK
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        config: {
          systemInstruction: SYSTEM_PROMPT,
          maxOutputTokens: 2000,
        },
        contents,
      });

      const responseText = response.text ?? '';

      // Detectar si requiere boceto visual analizando el mensaje
      let imageKeywords: string | undefined = undefined;
      const lowerMsg = message.toLowerCase();
      if (lowerMsg.includes('boceto') || lowerMsg.includes('imagen') || lowerMsg.includes('diseño') || lowerMsg.includes('foto') || lowerMsg.includes('genera') || lowerMsg.includes('muestra')) {
        let keyword = 'cake';
        if (lowerMsg.includes('chocolate')) keyword = 'chocolate,cake';
        else if (lowerMsg.includes('fresa') || lowerMsg.includes('rosa')) keyword = 'pink,cake';
        else if (lowerMsg.includes('boda') || lowerMsg.includes('matrimonio')) keyword = 'wedding,cake';
        else if (lowerMsg.includes('graduacion')) keyword = 'graduation,cake';
        else if (lowerMsg.includes('flores') || lowerMsg.includes('floral')) keyword = 'floral,cake';
        else if (lowerMsg.includes('minimal')) keyword = 'minimalist,cake';
        imageKeywords = keyword;
      }

      return { text: responseText, imageKeywords };
    } catch (error) {
      console.warn('Falla en la llamada de Gemini API, activando fallback local:', error);
      return this.getFallbackResponse(message);
    }
  }
}
