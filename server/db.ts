import mongoose from 'mongoose';
import { Product } from './models/Product';
import { Review } from './models/Review';

const defaultProducts = [
  {
    id: 'bento-standard',
    name: 'Bento Cake Estándar',
    category: 'Bento Cakes',
    tag: 'Más popular',
    tagColor: '#B07D4A',
    desc: 'Mini pastel personalizado para 1–2 personas. Disponible en Vainilla o Chocolate con decoración artesanal incluida.',
    longDesc: 'Nuestro Bento Cake Estándar es el favorito indiscutible de nuestros clientes. Es un mini pastel individual, perfecto para celebrar momentos íntimos o regalar un detalle único y completamente personalizado. Elaborado con un bizcocho sumamente esponjoso en sabor de Vainilla o Chocolate, relleno de delicioso dulce de leche o Nutella premium, y decorado a mano por nuestros artesanos con los colores y la frase que elijas.',
    price: 'Desde C$ 190',
    flavors: ['Vainilla', 'Chocolate'],
    benefits: [
      'Decoración básica y mensaje a mano incluidos',
      'Empaque rígido protector de alta seguridad',
      'Elaborado con ingredientes frescos de alta calidad',
      'Porción perfecta para compartir en pareja',
    ],
    specs: [
      'Diámetro: 10 cm aprox.',
      'Altura: 8–10 cm',
      'Rellenos: Dulce de leche o Nutella',
      'Porciones: 1–2 personas',
      'Consumir en: 48 horas tras retiro',
    ],
    availability: 'Disponible bajo reserva (48h)',
    img: '/images/cat-bento-standard.png',
    alt: 'Bento cake estándar rosa - Dulce Sabor',
  },
  {
    id: 'bento-premium',
    name: 'Bento Premium Artístico',
    category: 'Bento Cakes',
    tag: 'Alta Gama',
    tagColor: '#7C3AED',
    desc: 'Diseños de alta complejidad con técnicas avanzadas de decoración en crema. Diseños únicos y artísticos.',
    longDesc: 'El Bento Premium es nuestra obra de mayor complejidad y valor artístico. Empleamos técnicas avanzadas de decoración para plasmar cualquier tendencia digital: flores detalladas en relieve, figuras modeladas a mano, efectos tipo acuarela, texturas de óleo y paletas cromáticas personalizadas en buttercream. Cada Bento se diseña individualmente con el cliente para que sea una obra de arte comestible perfecta.',
    price: 'Desde C$ 280',
    flavors: ['Personalizado', 'Red Velvet', 'Chocolate'],
    benefits: [
      'Diseño exclusivo coordinado con el cliente',
      'Técnicas complejas de pintura y relieve',
      'Empaque de lujo rígido con listón de regalo',
      'Garantía de replicación idéntica digital',
    ],
    specs: [
      'Diámetro: 10–12 cm aprox.',
      'Altura: 10–12 cm',
      'Rellenos: Dulce de leche, Oreo o Nutella',
      'Porciones: 2 personas',
      'Anticipación: Mínimo 3–5 días',
    ],
    availability: 'Disponible bajo reserva (3+ días)',
    img: '/images/cat-bento-premium.png',
    alt: 'Bento cake premium con detalles artísticos - Dulce Sabor',
  },
  {
    id: 'bento-corazon-love',
    name: 'Bento Corazón Love',
    category: 'Bento Cakes',
    tag: 'Romántico',
    tagColor: '#E11D48',
    desc: 'Bento en forma de corazón con buttercream de colores románticos. Ideal para aniversarios y San Valentín.',
    longDesc: 'El Bento Corazón Love es el regalo ideal para celebrar aniversarios, meses de noviazgo o recordarle a esa persona cuánto la quieres. Horneado en un molde especial en forma de corazón, se cubre con una capa de buttercream premium color rojo intenso, rosa pastel o blanco nieve. Se finaliza con un mensaje romántico escrito con un pulso impecable por nuestros maestros reposteros.',
    price: 'C$ 240',
    flavors: ['Vainilla con Fresa', 'Chocolate con Nutella'],
    benefits: [
      'Forma de corazón romántica',
      'Colores y tipografía elegantes para enamorados',
      'Empaque rígido con visor transparente de seguridad',
      'Incluye una velita mágica de regalo',
    ],
    specs: [
      'Forma: Corazón',
      'Diámetro: 10 cm aprox.',
      'Relleno: Mermelada de fresa o crema de chocolate',
      'Porciones: 1–2 personas',
      'Anticipación: 48 horas de abono previo',
    ],
    availability: 'Disponible bajo reserva (48h)',
    img: '/images/cat-bento-corazon.png',
    alt: 'Bento cake en forma de corazón rojo - Dulce Sabor',
  },
  {
    id: 'bento-vintage-coreano',
    name: 'Bento Vintage Coreano',
    category: 'Bento Cakes',
    tag: 'Tendencia',
    tagColor: '#B07D4A',
    desc: 'Estilo clásico victoriano con hermosos volantes de crema, perlas y tonos pastel de gran estética.',
    longDesc: 'Inspirado en las tendencias globales de la repostería coreana, este Bento Cake destaca por sus exquisitos volantes y ribetes vintage de crema (piping clásico victoriano). Adornado con perlas de azúcar comestibles de tono dorado o plateado, este minipastel ofrece una estética extremadamente sofisticada y fotogénica, ideal para redes sociales.',
    price: 'C$ 260',
    flavors: ['Vainilla', 'Limón y Coco', 'Chocolate'],
    benefits: [
      'Estilo estético vintage victoriano',
      'Ribeteado doble de gran detalle visual',
      'Perlas comestibles decorativas de alta calidad',
      'Perfecto para fotografías y celebraciones jóvenes',
    ],
    specs: [
      'Diámetro: 10 cm aprox.',
      'Ribetes: Buttercream vintage tradicional',
      'Colores: Tonos pastel a elección del cliente',
      'Porciones: 1–2 personas',
      'Anticipación: 48 horas',
    ],
    availability: 'Disponible bajo reserva (48h)',
    img: '/images/cat-bento-vintage.png',
    alt: 'Bento cake estilo coreano vintage con volantes - Dulce Sabor',
  },
  {
    id: 'combo-estudiantil',
    name: 'Combo Estudiantil',
    category: 'Combos',
    tag: 'Fin de semana',
    tagColor: '#059669',
    desc: 'Bento Cake personalizado + 2 Cupcakes decorados gratis. La opción perfecta para compartir con amigos.',
    longDesc: 'El Combo Estudiantil es la alternativa preferida por los jóvenes universitarios de Nagarote y León. Pensado para compartir sin exceder tu presupuesto, incluye un Bento Cake completamente personalizado (diseño y frase a elección) junto con 2 deliciosos cupcakes decorados a juego en sabor y temática. Una combinación sumamente económica y completa.',
    price: 'C$ 350',
    flavors: ['Bento + Cupcakes combinados'],
    benefits: [
      'Pack todo incluido: Bento + 2 Cupcakes a juego',
      'Ahorro de más del 20% comparado con compra individual',
      'Decoración temática unificada en todo el set',
      'Porción total para 3–4 personas',
    ],
    specs: [
      'Incluye: 1 Bento Cake (10cm) + 2 Cupcakes',
      'Sabor: Bizcocho húmedo de vainilla o chocolate',
      'Empaque unificado con base protectora rígida',
      'Abono: Requiere 50% previo',
    ],
    availability: 'Disponible todos los fines de semana',
    img: '/images/cat-combo-estudiantil.png',
    alt: 'Bento cake y cupcakes a juego - Dulce Sabor',
  },
  {
    id: 'combo-cumpleanos-familiar',
    name: 'Combo Cumpleaños Familiar',
    category: 'Combos',
    tag: 'Gran Ahorro',
    tagColor: '#EA580C',
    desc: 'Pastel tradicional de 1/2 libra + 6 cupcakes temáticos decorados a mano a juego. Ideal para reuniones familiares.',
    longDesc: 'Nuestro Combo Cumpleaños Familiar está diseñado para ofrecer una mesa de postres unificada y estéticamente perfecta. Combina un pastel tradicional de 1/2 libra (ideal para 6–8 personas) con un set de 6 cupcakes decorados a juego de forma artesanal. Es la opción ideal para cumpleaños familiares o pequeñas reuniones sin necesidad de gastar de más.',
    price: 'C$ 690',
    flavors: ['Vainilla con Dulce de Leche', 'Chocolate con Fudge'],
    benefits: [
      'Mesa de dulces coordinada en diseño y color',
      'Pastel de media libra + 6 cupcakes completos',
      'Rendimiento total para 12–14 personas',
      'Descuento exclusivo en pack familiar',
    ],
    specs: [
      'Pastel: 1/2 Libra (16 cm de diámetro)',
      'Cupcakes: 6 unidades grandes decoradas',
      'Empaques rígidos de transporte seguro incluidos',
      'Anticipación: Mínimo 3 días de abono',
    ],
    availability: 'Disponible bajo reserva (3 days)',
    img: '/images/combo-familiar.png',
    alt: 'Combo de pastel y cupcakes decorados para cumpleaños - Dulce Sabor',
  },
  {
    id: 'pastel-tradicional',
    name: 'Pastel Tradicional Personalizado',
    category: 'Pasteles',
    tag: 'Para eventos',
    tagColor: '#DC2626',
    desc: 'Pasteles de 1 libra con designs personalizados para eventos, cumpleaños y celebraciones especiales.',
    longDesc: 'Los Pasteles Tradicionales de 1 libra son el centro de mesa ideal para eventos familiares y cumpleaños en Nagarote. Al hornearse en tamaño tradicional, ofrecen un bizcocho esponjoso y húmedo disponible en sabores clásicos como vainilla, chocolate, red velvet o tres leches. La decoración se diseña a medida con el cliente con acabados finos y elegantes en crema o fondant.',
    price: 'C$ 500 – C$ 800',
    flavors: ['Vainilla', 'Chocolate', 'Red Velvet', 'Tres Leches'],
    benefits: [
      'Decoración temática personalizada según el evento',
      'Rendimiento ideal para 8–15 personas',
      'Múltiples opciones de relleno y sabores de masa',
      'Estructura interna reforzada para retiro presencial',
    ],
    specs: [
      'Peso: 1 libra de pastel',
      'Rendimiento: 8 a 15 porciones aprox.',
      'Decoración: Crema premium, buttercream o fondant',
      'Anticipación: Mínimo 3 días de anticipación',
    ],
    availability: 'Disponible bajo reserva (3 días)',
    img: '/images/pastel-tradicional.png',
    alt: 'Pastel tradicional floral - Dulce Sabor',
  },
  {
    id: 'pastel-bodas-compromiso',
    name: 'Pastel de Bodas / Compromiso',
    category: 'Pasteles',
    tag: 'Premium Eventos',
    tagColor: '#B07D4A',
    desc: 'Pastel premium de 2 pisos con alisado de buttercream perfecto y flores naturales. Gran presencia.',
    longDesc: 'El Pastel de Bodas y Compromiso es nuestra creación cumbre para eventos nupciales o pedidas de mano. Consta de dos pisos estructuralmente reforzados con soportes alimentarios internos para garantizar su transporte seguro en Nagarote. Se recubre con un alisado perfecto de buttercream blanco marfil y se adorna artísticamente con flores naturales seleccionadas y toques de follaje fresco.',
    price: 'Desde C$ 1,200',
    flavors: ['Tres Leches de Vainilla', 'Red Velvet Premium', 'Almendras y Amaretto'],
    benefits: [
      'Estructura de dos pisos elegante y de gran altura',
      'Decoración floral unificada con la temática',
      'Soportes de seguridad internos para retiro en taller',
      'Atención y coordinación directa por WhatsApp',
    ],
    specs: [
      'Pisos: 2 pisos reales superpuestos',
      'Porciones: 25 a 35 personas aprox.',
      'Flores: Naturales, higienizadas e insertadas de forma segura',
      'Anticipación: Mínimo 5–7 días',
    ],
    availability: 'Disponible bajo reserva (5+ días)',
    img: '/images/pastel-bodas.png',
    alt: 'Pastel elegante de bodas de dos pisos con flores - Dulce Sabor',
  },
  {
    id: 'bento-graduacion',
    name: 'Bento Cake Graduación',
    category: 'Bento Cakes',
    tag: 'Temporada',
    tagColor: '#4F46E5',
    desc: 'Diseño especial para celebrar logros académicos. Toga, diploma o mensaje personalizado en buttercream.',
    longDesc: 'El Bento Cake de Graduación es nuestra creación estrella para acompañar uno de los momentos más importantes de la vida. Diseñado con detalles que evocan el logro académico —togas en crema, diplomas modelados a mano, frases motivadoras escritas con pulso impecable— este minipasstel es la forma perfecta de celebrar a ese graduado especial.',
    price: 'C$ 220',
    flavors: ['Vainilla', 'Chocolate', 'Red Velvet'],
    benefits: [
      'Diseño temático de graduación personalizado',
      'Mensaje y nombre del graduado incluido en crema',
      'Empaque rígido especial con cinta decorativa',
      'Perfecto para fotografías y redes sociales',
    ],
    specs: [
      'Diámetro: 10 cm aprox.',
      'Altura: 8–10 cm',
      'Decoración: Toga, diploma o frase en crema',
      'Porciones: 1–2 personas',
      'Anticipación: 48 horas con diseño confirmado',
    ],
    availability: 'Disponible bajo reserva (48h)',
    img: '/images/gallery-1.png',
    alt: 'Bento cake de graduación con mensaje personalizado - Dulce Sabor',
  },
  {
    id: 'cupcakes-surtidos',
    name: 'Cupcakes Artesanales x6',
    category: 'Combos',
    tag: 'Para compartir',
    tagColor: '#7C3AED',
    desc: '6 cupcakes artesanales con crema en espiral, decorados individualmente en colores y sabores variados.',
    longDesc: 'Nuestro pack de 6 Cupcakes Artesanales es la opción ideal para quienes quieren compartir sin comprometerse con un pastel entero. Cada cupcake se decora individualmente con buttercream en espiral en distintos colores pastel, con toppers comestibles o flores de crema. Se embalan en caja rígida con ventana transparente.',
    price: 'C$ 420',
    flavors: ['Vainilla', 'Chocolate', 'Red Velvet', 'Oreo'],
    benefits: [
      '6 cupcakes con decoraciones únicas e individuales',
      'Caja rígida con ventana transparente para regalo',
      'Sabores mixtos disponibles en un mismo pedido',
      'Tamaño perfecto para reuniones pequeñas',
    ],
    specs: [
      'Cantidad: 6 cupcakes grandes',
      'Diámetro por cupcake: 5 cm aprox.',
      'Decoración: Crema en espiral con toppers o flores',
      'Empaque: Caja rígida con ventana',
      'Anticipación: 24 horas',
    ],
    availability: 'Disponible bajo reserva (24h)',
    img: '/images/gallery-3.png',
    alt: 'Cupcakes artesanales surtidos decorados a mano - Dulce Sabor',
  },
  {
    id: 'pastel-red-velvet',
    name: 'Pastel Red Velvet Especial',
    category: 'Pasteles',
    tag: 'Exclusivo',
    tagColor: '#BE123C',
    desc: 'Pastel Red Velvet de 1 libra con relleno de queso crema y cobertura de ganache de chocolate blanco.',
    longDesc: 'El Pastel Red Velvet Especial es nuestra propuesta más sofisticada dentro de la categoría de pasteles de libra. La masa de bizcocho húmedo rojo intenso se rellena con queso crema dulce y se cubre con ganache de chocolate blanco o buttercream de vainilla. Un equilibrio perfecto entre elegancia visual y sabor extraordinario.',
    price: 'C$ 600',
    flavors: ['Red Velvet con Queso Crema', 'Red Velvet con Nutella'],
    benefits: [
      'Bizcocho húmedo Red Velvet de alta calidad',
      'Relleno de queso crema dulce artesanal',
      'Cobertura de ganache blanco o buttercream premium',
      'Decoración elegante de rosas o frutos rojos',
    ],
    specs: [
      'Peso: 1 libra de pastel',
      'Rendimiento: 8–12 porciones',
      'Relleno: Queso crema o Nutella',
      'Cobertura: Ganache de chocolate blanco',
      'Anticipación: Mínimo 3 días',
    ],
    availability: 'Disponible bajo reserva (3 días)',
    img: '/images/gallery-4.png',
    alt: 'Pastel Red Velvet especial con ganache - Dulce Sabor',
  },
  {
    id: 'pastel-tres-leches',
    name: 'Pastel Tres Leches con Fresas',
    category: 'Pasteles',
    tag: 'Clásico',
    tagColor: '#0369A1',
    desc: 'Pastel tres leches artesanal remojado en mezcla láctea premium, cubierto de nata montada y fresas frescas.',
    longDesc: 'Nuestro Pastel Tres Leches celebra el sabor clásico nicaragüense elevado a nivel artesanal. El bizcocho se remoja en tres lácteos premium, se cubre con nata montada artesanal y se decora con fresas frescas de temporada y un toque de canela.',
    price: 'C$ 650',
    flavors: ['Tres Leches con Fresas', 'Tres Leches con Durazno'],
    benefits: [
      'Bizcocho remojado en mezcla de tres lácteos premium',
      'Nata montada artesanal sin conservantes',
      'Fresas o duraznos frescos de temporada',
      'Sabor clásico nicaragüense en formato artesanal',
    ],
    specs: [
      'Peso: 1 libra de pastel',
      'Rendimiento: 8–12 porciones',
      'Lácteos: Leche condensada, evaporada y crema',
      'Decoración: Frutas frescas de temporada',
      'Anticipación: Mínimo 3 días',
    ],
    availability: 'Disponible bajo reserva (3 días)',
    img: '/images/gallery-2.png',
    alt: 'Pastel tres leches artesanal con fresas frescas - Dulce Sabor',
  },
  {
    id: 'combo-san-valentin',
    name: 'Combo San Valentín',
    category: 'Combos',
    tag: 'Romántico',
    tagColor: '#E11D48',
    desc: 'Bento Corazón Love + 4 mini cupcakes temáticos de amor + tarjeta personalizada. El detalle perfecto.',
    longDesc: 'El Combo San Valentín incluye un Bento Corazón Love en color rojo o rosa a elección, 4 mini cupcakes románticos decorados a juego y una elegante tarjeta personalizada con la frase que nos indiques. Un regalo completo y listo para entregar.',
    price: 'C$ 480',
    flavors: ['Vainilla con Fresa', 'Chocolate con Nutella'],
    benefits: [
      'Pack completo: Bento Corazón + 4 cupcakes + tarjeta',
      'Temática romántica coordinada en todo el set',
      'Empaque especial tipo regalo con listón rojo',
      'Frase personalizada en tarjeta artesanal incluida',
    ],
    specs: [
      'Incluye: 1 Bento Corazón (10cm) + 4 mini cupcakes',
      'Colores: Rojo intenso, rosa pastel o blanco nieve',
      'Empaque: Caja regalo con visor y listón rojo',
      'Abono: Requiere 50% previo',
      'Anticipación: 48 horas',
    ],
    availability: 'Disponible bajo reserva (48h)',
    img: '/images/cat-bento-corazon.png',
    alt: 'Combo San Valentín bento corazón con cupcakes románticos - Dulce Sabor',
  },
];

const defaultReviews = [
  {
    name: 'Valeria M.',
    role: 'Estudiante UNAN-León',
    text: 'Pedí un bento cake para mi cumpleaños y quedé sin palabras. El diseño era increíblemente bonito y el sabor... ¡me comí hasta la decoración! Llegué al taller y me lo entregaron perfecto, sin un solo defecto. 100% recomendado.',
    stars: 5,
  },
  {
    name: 'Carlos R.',
    role: 'Emprendedor, Nagarote',
    text: 'Lo que más me sorprendió fue la caja. Nunca había visto un empaque tan sólido para un pastel. Se lo encargué a mi novia y cuando lo abrió, el "wow" fue inmediato. El sabor es simplemente de otro nivel.',
    stars: 5,
  },
  {
    name: 'Sofía L.',
    role: 'Universitaria',
    text: 'El proceso fue súper fácil: elegí el diseño por Instagram, coordiné la hora por WhatsApp y pasé a recogerlo. Sin estrés, sin filas. El pastel estaba perfecto y el chocolate... riquísimo. ¡Ya pedí el segundo!',
    stars: 5,
  },
  {
    name: 'Diego A.',
    role: 'Cliente frecuente',
    text: 'Ya van 4 pedidos y cada vez mejor. Celebré mi graduación, el cumpleaños de mi mamá y dos aniversarios con Dulce Sabor. La calidad es consistente y el trato es muy personalizado. No busco otra repostería.',
    stars: 5,
  },
];

export async function connectDB() {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('MONGODB_URI no está definida en las variables de entorno (.env)');
    }

    await mongoose.connect(uri);
    console.log(' Conectado exitosamente a la base de datos de MongoDB Atlas.');

    // Seed products with category/details check and migration support
    const existingProducts = await Product.find({});
    const needsMigration = 
      existingProducts.length === 0 || 
      existingProducts.length !== defaultProducts.length ||
      existingProducts.some(p => !p.category) ||
      existingProducts.some(p => p.img && p.img.startsWith('https://'));

    if (needsMigration) {
      console.log(' Colección de productos vacía o desactualizada. Sembrando/Actualizando catálogo...');
      await Product.deleteMany({});
      await Product.insertMany(defaultProducts);
      console.log(' Sembrado del catálogo completado con éxito.');
    }

    // Seed reviews
    const reviewCount = await Review.countDocuments();
    if (reviewCount === 0) {
      console.log(' Colección de reseñas vacía. Sembrando reseñas iniciales...');
      await Review.insertMany(defaultReviews);
      console.log(' Sembrado de reseñas completado con éxito.');
    }
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
    process.exit(1);
  }
}
