import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './db';
import { Product } from './models/Product';
import { Order } from './models/Order';
import { ChatMessage } from './models/ChatMessage';
import { AIService } from './services/ai';
import { Review } from './models/Review';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


const aiService = new AIService();


app.use(cors());
app.use(express.json());

app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ error: 'Error interno del servidor al obtener productos.' });
  }
});


app.post('/api/orders', async (req, res) => {
  try {
    const { shape, dough, filling, frostingColor, messageText, textColor } = req.body;

    if (!shape || !dough || !filling || !frostingColor || !textColor) {
      return res.status(400).json({ error: 'Faltan parámetros requeridos para el pedido.' });
    }

    const newOrder = new Order({
      shape,
      dough,
      filling,
      frostingColor,
      messageText,
      textColor,
    });

    await newOrder.save();
    console.log(' Pedido personalizado guardado en MongoDB:', newOrder._id);
    res.status(201).json(newOrder);
  } catch (error) {
    console.error('Error al guardar pedido:', error);
    res.status(500).json({ error: 'Error interno del servidor al guardar pedido.' });
  }
});

// 3. ChatBot Inteligente (Conversación + CRM logs)
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history, sessionId = 'default-session' } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'El mensaje no puede estar vacío.' });
    }

    // 1. Guardar mensaje de usuario en MongoDB (Logs del CRM)
    const userMsg = new ChatMessage({
      sessionId,
      sender: 'user',
      text: message,
    });
    await userMsg.save();

    // 2. Generar respuesta con IA (Gemini con fallback local)
    const result = await aiService.generateChatResponse(message, history || []);

    // 3. Guardar respuesta de bot en MongoDB (Logs del CRM)
    const botMsg = new ChatMessage({
      sessionId,
      sender: 'bot',
      text: result.text,
    });
    await botMsg.save();

    // Responder al cliente
    res.json({
      text: result.text,
      imageKeywords: result.imageKeywords,
    });
  } catch (error) {
    console.error('Error en endpoint de chat:', error);
    res.status(500).json({ error: 'Error al procesar el chat de IA.' });
  }
});

// 4. Obtener opiniones / reseñas (Feedback)
app.get('/api/reviews', async (req, res) => {
  try {
    const reviews = await Review.find({}).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    console.error('Error al obtener reseñas:', error);
    res.status(500).json({ error: 'Error interno del servidor al obtener reseñas.' });
  }
});

// 5. Guardar una nueva opinión / reseña
app.post('/api/reviews', async (req, res) => {
  try {
    const { name, role, text, stars } = req.body;

    if (!name || !role || !text || !stars) {
      return res.status(400).json({ error: 'Todos los campos son requeridos para la reseña.' });
    }

    const newReview = new Review({
      name,
      role,
      text,
      stars: Number(stars),
    });

    await newReview.save();
    console.log(' Reseña guardada en MongoDB:', newReview.name);
    res.status(201).json(newReview);
  } catch (error) {
    console.error('Error al guardar reseña:', error);
    res.status(500).json({ error: 'Error al procesar y guardar la reseña.' });
  }
});

// ── Producción: servir frontend compilado y archivos estáticos ──────────────
if (process.env.NODE_ENV === 'production') {
  // Imágenes generadas en public/images/
  app.use('/images', express.static(path.join(__dirname, '../public/images')));
  // Build de Vite
  app.use(express.static(path.join(__dirname, '../dist')));
  // SPA fallback — todas las rutas no-API devuelven index.html
  app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
}

// Iniciar servidor tras conectar la Base de Datos
async function startServer() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(` Servidor backend corriendo exitosamente en el puerto ${PORT}`);
  });
}

startServer();
