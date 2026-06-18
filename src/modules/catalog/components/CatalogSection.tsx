import { useState, useEffect } from 'react';
import { MessageCircle, Star, X, Check, ChevronRight } from 'lucide-react';
import { ParticleButton } from '../../../core/components/ui/ParticleButton';

const WA_BASE = 'https://wa.me/50589535705?text=Hola%20Dulce%20Sabor%2C%20me%20interesa%20pedir%3A%20';

interface ProductItem {
  id: string;
  name: string;
  category: string;
  tag: string;
  tagColor: string;
  desc: string;
  longDesc: string;
  price: string;
  flavors: string[];
  benefits: string[];
  specs: string[];
  availability: string;
  img: string;
  alt: string;
}

const localFallbackProducts: ProductItem[] = [
  {
    id: 'bento-standard',
    name: 'Bento Cake Estándar',
    category: 'Bento Cakes',
    tag: 'Más popular',
    tagColor: '#B07D4A',
    desc: 'Mini pastel personalizado para 1–2 personas. Disponible en Vainilla o Chocolate con decoración artesanal incluida.',
    longDesc:
      'Nuestro Bento Cake Estándar es el favorito indiscutible de nuestros clientes. Es un mini pastel individual, perfecto para celebrar momentos íntimos o regalar un detalle único y completamente personalizado. Elaborado con un bizcocho sumamente esponjoso en sabor de Vainilla o Chocolate, relleno de delicioso dulce de leche o Nutella premium, y decorado a mano por nuestros artesanos con los colores y la frase que elijas.',
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
    longDesc:
      'El Bento Premium es nuestra obra de mayor complejidad y valor artístico. Empleamos técnicas avanzadas de decoración para plasmar cualquier tendencia digital: flores detalladas en relieve, figuras modeladas a mano, efectos tipo acuarela, texturas de óleo y paletas cromáticas personalizadas en buttercream. Cada Bento se diseña individualmente con el cliente para que sea una obra de arte comestible perfecta.',
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
    longDesc:
      'El Bento Corazón Love es el regalo ideal para celebrar aniversarios, meses de noviazgo o recordarle a esa persona cuánto la quieres. Horneado en un molde especial en forma de corazón, se cubre con una capa de buttercream premium color rojo intenso, rosa pastel o blanco nieve. Se finaliza con un mensaje romántico escrito con un pulso impecable por nuestros maestros reposteros.',
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
    longDesc:
      'Inspirado en las tendencias globales de la repostería coreana, este Bento Cake destaca por sus exquisitos volantes y ribetes vintage de crema (piping clásico victoriano). Adornado con perlas de azúcar comestibles de tono dorado o plateado, este minipastel ofrece una estética extremadamente sofisticada y fotogénica, ideal para redes sociales.',
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
    longDesc:
      'El Combo Estudiantil es la alternativa preferida por los jóvenes universitarios de Nagarote y León. Pensado para compartir sin exceder tu presupuesto, incluye un Bento Cake completamente personalizado (diseño y frase a elección) junto con 2 deliciosos cupcakes decorados a juego en sabor y temática. Una combinación sumamente económica y completa.',
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
    longDesc:
      'Nuestro Combo Cumpleaños Familiar está diseñado para ofrecer una mesa de postres unificada y estéticamente perfecta. Combina un pastel tradicional de 1/2 libra (ideal para 6–8 personas) con un set de 6 cupcakes decorados a juego de forma artesanal. Es la opción ideal para cumpleaños familiares o pequeñas reuniones sin necesidad de gastar de más.',
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
    desc: 'Pasteles de 1 libra con diseños personalizados para cumpleaños, reuniones y celebraciones especiales.',
    longDesc:
      'Los Pasteles Tradicionales de 1 libra son el centro de mesa ideal para eventos familiares y cumpleaños en Nagarote. Al hornearse en tamaño tradicional, ofrecen un bizcocho esponjoso y húmedo disponible en sabores clásicos como vainilla, chocolate, red velvet o tres leches. La decoración se diseña a medida con el cliente con acabados finos y elegantes en crema o fondant.',
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
    alt: 'Pastel tradicional personalizado con frutas y crema - Dulce Sabor',
  },
  {
    id: 'pastel-bodas-compromiso',
    name: 'Pastel de Bodas / Compromiso',
    category: 'Pasteles',
    tag: 'Premium Eventos',
    tagColor: '#B07D4A',
    desc: 'Pastel premium de 2 pisos con alisado de buttercream perfecto y flores naturales. Gran presencia.',
    longDesc:
      'El Pastel de Bodas y Compromiso es nuestra creación cumbre para eventos nupciales o pedidas de mano. Consta de dos pisos estructuralmente reforzados con soportes alimentarios internos para garantizar su transporte seguro en Nagarote. Se recubre con un alisado perfecto de buttercream blanco marfil y se adorna artísticamente con flores naturales seleccionadas y toques de follaje fresco.',
    price: 'Desde C$ 1,200',
    flavors: ['Tres Leches de Vainilla', 'Red Velvet Premium', 'Almendras y Amaretto'],
    benefits: [
      'Estructura de dos pisos elegante y de gran altura',
      'Decoración floral natural unificada con la temática',
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
    longDesc: 'El Bento Cake de Graduación es nuestra creación estrella para acompañar uno de los momentos más importantes de la vida. Diseñado con detalles que evocan el logro académico —togas en crema, diplomas modelados a mano, frases motivadoras escritas con pulso impecable— este minipasstel es la forma perfecta de celebrar a ese graduado especial. Disponible en temporada y bajo pedido especial con diseño personalizado.',
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
    longDesc: 'Nuestro pack de 6 Cupcakes Artesanales es la opción ideal para quienes quieren compartir sin comprometerse con un pastel entero. Cada cupcake se decora individualmente con una técnica de espiral de buttercream en distintos colores pastel, con toppers comestibles o flores de crema. Todos se embalan en una caja rígida con ventana transparente que resalta la estética del conjunto.',
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
    longDesc: 'El Pastel Red Velvet Especial es nuestra propuesta más sofisticada dentro de la categoría de pasteles de libra. La masa es de un bizcocho húmedo color rojo intenso elaborado con cacao de alta calidad, relleno con una cremosa capa de queso crema dulce, y cubierto con un elegante ganache de chocolate blanco o buttercream de vainilla. Un equilibrio perfecto entre elegancia visual y sabor extraordinario.',
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
    longDesc: 'Nuestro Pastel Tres Leches es una celebración del sabor clásico nicaragüense elevado a nivel artesanal. El bizcocho suave se remoja generosamente en una mezcla de tres lácteos premium, lo que le confiere una textura extraordinariamente húmeda y un sabor profundo y delicioso. Se cubre con nata montada artesanal y se decora con fresas frescas de temporada y un ligero toque de canela.',
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
    longDesc: 'El Combo San Valentín fue diseñado para hacer sentir especial a esa persona que más quieres. Incluye un Bento Corazón Love en color rojo o rosa a elección, acompañado de 4 mini cupcakes decorados en la misma paleta temática romántica —con corazones en crema, chispas rojas y mensajes dulces— más una elegante tarjeta personalizada con la frase que nos indiques. Un regalo completo, listo para entregar.',
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

const CATEGORIES = ['Todos', 'Bento Cakes', 'Combos', 'Pasteles'];

// ── Product Detail Modal ──────────────────────────────────────────────────────
function ProductDetailModal({
  product,
  onClose,
}: {
  product: ProductItem | null;
  onClose: () => void;
}) {
  if (!product) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1500,
        background: 'rgba(28,25,23,0.82)',
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
          maxWidth: 920,
          maxHeight: '90vh',
          background: '#FFFFFF',
          borderRadius: 24,
          border: '1px solid #EDE8E3',
          overflowY: 'auto',
          overflowX: 'hidden',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))',
          boxShadow: '0 24px 60px rgba(28,25,23,0.22)',
        }}
      >
        {/* Image side */}
        <div
          style={{
            position: 'relative',
            minHeight: 320,
            overflow: 'hidden',
            background: '#EDE8E3',
          }}
        >
          <img
            src={product.img}
            alt={product.alt}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              minHeight: 320,
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: 16,
              left: 16,
              background: product.tagColor,
              color: '#FFFFFF',
              fontFamily: "'Inter', sans-serif",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              padding: '6px 12px',
              borderRadius: 100,
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}
          >
            {product.tag}
          </div>
        </div>

        <div
          className="hide-scrollbar"
          style={{
            padding: 'clamp(28px, 5vw, 44px)',
            position: 'relative',
            background: '#FFFFFF',
          }}
        >
          <button
            onClick={onClose}
            aria-label="Cerrar modal"
            style={{
              position: 'absolute',
              top: 20,
              right: 20,
              background: '#F5F0EB',
              border: 'none',
              borderRadius: 10,
              width: 36,
              height: 36,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#1C1917',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#EAE0D5')}
            onMouseLeave={e => (e.currentTarget.style.background = '#F5F0EB')}
          >
            <X size={18} />
          </button>

          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#8A5C2D',
              marginBottom: 10,
            }}
          >
            {product.category}
          </div>

          <h2
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(26px, 3.5vw, 36px)',
              fontWeight: 500,
              color: '#1C1917',
              margin: '0 0 16px',
              lineHeight: 1.2,
              paddingRight: 40,
            }}
          >
            {product.name}
          </h2>

          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 15,
              fontWeight: 400,
              color: '#292524',
              lineHeight: 1.7,
              margin: '0 0 24px',
            }}
          >
            {product.longDesc}
          </p>

          {/* Price + availability banner */}
          <div
            style={{
              background: '#FAF7F2',
              borderRadius: 16,
              border: '1px solid #EADEC9',
              padding: '16px 20px',
              marginBottom: 28,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 16,
              flexWrap: 'wrap',
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 30,
                  fontWeight: 600,
                  color: '#8A5C2D',
                  lineHeight: 1,
                }}
              >
                {product.price}
              </div>
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 11.5,
                  color: '#57534E',
                  fontWeight: 400,
                  marginTop: 4,
                }}
              >
                Decoración artesanal + empaque de seguridad incluido
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                fontWeight: 600,
                color: '#15803D',
              }}
            >
              <Check size={16} />
              {product.availability}
            </div>
          </div>

          {/* Sabores */}
          <div style={{ marginBottom: 24 }}>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 11.5,
                fontWeight: 600,
                color: '#78716C',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: 10,
                borderBottom: '1px solid #EDE8E3',
                paddingBottom: 4,
              }}
            >
              Sabores disponibles
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {product.flavors.map(f => (
                <span
                  key={f}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 12.5,
                    fontWeight: 500,
                    color: '#44403C',
                    background: '#F5F0EB',
                    border: '1px solid #EDE8E3',
                    padding: '6px 14px',
                    borderRadius: 100,
                  }}
                >
                  {f}
                </span>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div style={{ marginBottom: 24 }}>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 11.5,
                fontWeight: 600,
                color: '#78716C',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: 10,
                borderBottom: '1px solid #EDE8E3',
                paddingBottom: 4,
              }}
            >
              Garantías y Beneficios
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {product.benefits.map(b => (
                <div
                  key={b}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 10,
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 13.5,
                    fontWeight: 400,
                    color: '#44403C',
                    lineHeight: 1.5,
                  }}
                >
                  <Check size={15} style={{ color: '#8A5C2D', flexShrink: 0, marginTop: 2 }} />
                  {b}
                </div>
              ))}
            </div>
          </div>

          {/* Specs */}
          <div style={{ marginBottom: 32 }}>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 11.5,
                fontWeight: 600,
                color: '#78716C',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: 10,
                borderBottom: '1px solid #EDE8E3',
                paddingBottom: 4,
              }}
            >
              Especificaciones de retiro
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {product.specs.map(s => (
                <div
                  key={s}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 10,
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 13.5,
                    fontWeight: 400,
                    color: '#44403C',
                    lineHeight: 1.5,
                  }}
                >
                  <ChevronRight size={15} style={{ color: '#8A5C2D', flexShrink: 0, marginTop: 2 }} />
                  {s}
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <ParticleButton
            onClick={() => window.open(`${WA_BASE}${encodeURIComponent(`Hola Dulce Sabor, me interesa pedir: ${product.name}`)}`, '_blank')}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              background: '#1C1917',
              color: '#FAFAF8',
              fontFamily: "'Inter', sans-serif",
              fontSize: 14,
              fontWeight: 600,
              padding: '15px',
              borderRadius: 100,
              border: 'none',
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}
          >
            <MessageCircle size={16} />
            Consultar disponibilidad por WhatsApp
          </ParticleButton>
        </div>
      </div>
    </div>
  );
}

// ── Main CatalogSection ───────────────────────────────────────────────────────
export function CatalogSection() {
  const [products, setProducts] = useState<ProductItem[]>(localFallbackProducts);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  useEffect(() => {
    fetch('/api/products')
      .then(res => {
        if (!res.ok) throw new Error('Error al conectar con la API de productos');
        return res.json();
      })
      .then(data => {
        if (data && data.length > 0) {
          // Merge API data with fallback detailed properties
          const merged = data.map((apiProd: any) => {
            const fallback = localFallbackProducts.find(p => p.id === apiProd.id);
            return {
              id: apiProd.id,
              name: apiProd.name || fallback?.name || '',
              category: apiProd.category || fallback?.category || 'Bento Cakes',
              tag: apiProd.tag || fallback?.tag || '',
              tagColor: apiProd.tagColor || fallback?.tagColor || '#B07D4A',
              desc: apiProd.desc || fallback?.desc || '',
              longDesc: apiProd.longDesc || fallback?.longDesc || apiProd.desc || fallback?.desc || '',
              price: apiProd.price || fallback?.price || '',
              flavors: apiProd.flavors && apiProd.flavors.length > 0 ? apiProd.flavors : (fallback?.flavors || []),
              benefits: apiProd.benefits || fallback?.benefits || [],
              specs: apiProd.specs || fallback?.specs || [],
              availability: apiProd.availability || fallback?.availability || 'Disponible bajo reserva',
              img: apiProd.img || fallback?.img || '',
              alt: apiProd.alt || fallback?.alt || '',
            };
          });
          setProducts(merged);
        } else {
          setProducts(localFallbackProducts);
        }
        setLoading(false);
      })
      .catch(err => {
        console.warn('Usando catálogo local (no se pudo conectar con MongoDB):', err);
        setProducts(localFallbackProducts);
        setLoading(false);
      });
  }, []);

  const filtered =
    activeCategory === 'Todos'
      ? products
      : products.filter(p => p.category === activeCategory);

  return (
    <>
      <section
        id="catalogo"
        style={{
          background: '#FAFAF8',
          padding: 'clamp(72px, 9vw, 112px) 24px',
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {/* ── Header ────────────────────────────────────────────── */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: 24,
              marginBottom: 'clamp(36px, 4vw, 48px)',
              flexWrap: 'wrap',
            }}
          >
            <div>
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
                Nuestro catálogo
              </p>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 'clamp(32px, 5vw, 52px)',
                  fontWeight: 400,
                  color: '#1C1917',
                  margin: 0,
                  lineHeight: 1.15,
                }}
              >
                Creaciones que{' '}
                <em style={{ fontStyle: 'italic', color: '#B07D4A' }}>deleitan</em>
              </h2>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Star size={14} fill="#F59E0B" color="#F59E0B" />
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 13,
                  color: '#78716C',
                  fontWeight: 300,
                }}
              >
                Todos los precios incluyen decoración artesanal
              </span>
            </div>
          </div>

          {/* ── Category Filter — clean text links separated by slashes ── */}
          <div
            style={{
              display: 'flex',
              gap: 'clamp(12px, 3vw, 24px)',
              flexWrap: 'wrap',
              marginBottom: 'clamp(32px, 4vw, 44px)',
              fontFamily: "'Inter', sans-serif",
              fontSize: 14,
            }}
          >
            {CATEGORIES.map((cat, i) => (
              <div key={cat} style={{ display: 'flex', alignItems: 'center', gap: 'clamp(12px, 3vw, 24px)' }}>
                {i > 0 && <span style={{ color: '#E2E0D9', userSelect: 'none' }}>/</span>}
                <button
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: '8px 0',
                    color: activeCategory === cat ? '#1C1917' : '#8E8883',
                    fontWeight: activeCategory === cat ? 500 : 300,
                    cursor: 'pointer',
                    transition: 'color 0.2s',
                    position: 'relative',
                  }}
                >
                  {cat}
                  {activeCategory === cat && (
                    <span
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: 2,
                        background: '#B07D4A',
                      }}
                    />
                  )}
                </button>
              </div>
            ))}
          </div>

          {/* ── Product Grid — Clean, borderless columns (NO cards) ── */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 260px), 1fr))',
              gap: '48px 32px',
            }}
          >
            {filtered.map(product => (
              <div
                key={product.id}
                onClick={() => setSelectedProduct(product)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  transition: 'transform 0.25s ease',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                }}
              >
                {/* Image Wrap */}
                <div
                  style={{
                    borderRadius: 12,
                    overflow: 'hidden',
                    aspectRatio: '4/3',
                    marginBottom: 16,
                    position: 'relative',
                    background: '#EDE8E3',
                  }}
                >
                  <img
                    src={product.img}
                    alt={product.alt}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      transition: 'transform 0.4s ease',
                    }}
                    onMouseEnter={e => {
                      (e.target as HTMLImageElement).style.transform = 'scale(1.03)';
                    }}
                    onMouseLeave={e => {
                      (e.target as HTMLImageElement).style.transform = 'scale(1)';
                    }}
                  />
                  {/* Subtle Text Label on Image */}
                  {product.tag && (
                    <div
                      style={{
                        position: 'absolute',
                        top: 12,
                        left: 12,
                        background: 'rgba(255, 255, 255, 0.92)',
                        backdropFilter: 'blur(8px)',
                        color: '#B07D4A',
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 10,
                        fontWeight: 600,
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                        padding: '4px 10px',
                        borderRadius: 4,
                        border: '1px solid rgba(176, 125, 74, 0.12)',
                      }}
                    >
                      {product.tag}
                    </div>
                  )}
                  {/* Hover ver detalle hint */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 12,
                      right: 12,
                      background: 'rgba(255, 255, 255, 0.9)',
                      backdropFilter: 'blur(8px)',
                      borderRadius: 100,
                      padding: '5px 12px',
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 11,
                      fontWeight: 400,
                      color: '#1C1917',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                      opacity: 0.9,
                    }}
                  >
                    Ver detalle
                    <ChevronRight size={11} />
                  </div>
                </div>

                {/* Info Stack */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 10,
                      fontWeight: 500,
                      color: '#A8A29E',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {product.category}
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontSize: 20,
                      fontWeight: 500,
                      color: '#1C1917',
                      margin: 0,
                      lineHeight: 1.25,
                    }}
                  >
                    {product.name}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 13,
                      fontWeight: 300,
                      color: '#78716C',
                      margin: 0,
                      lineHeight: 1.6,
                    }}
                  >
                    {product.desc}
                  </p>
                  <div
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontSize: 20,
                      fontWeight: 600,
                      color: '#B07D4A',
                      marginTop: 4,
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: 8,
                    }}
                  >
                    <span>{product.price}</span>
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 11,
                        color: '#A8A29E',
                        fontWeight: 300,
                      }}
                    >
                      (Decoración y empaque incluido)
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── Bottom Note — clean divider text (no card background) ── */}
          <div
            style={{
              textAlign: 'center',
              marginTop: 64,
              paddingTop: 32,
              borderTop: '1px solid #EDE8E3',
              fontFamily: "'Inter', sans-serif",
              fontSize: 14,
              color: '#78716C',
              lineHeight: 1.6,
            }}
          >
            ¿Tienes una idea especial? Escríbenos y creamos el diseño perfectamente a tu medida.{' '}
            <a
              href={`${WA_BASE}un%20dise%C3%B1o%20personalizado`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#B07D4A', fontWeight: 500, textDecoration: 'none' }}
            >
              Consultar diseño personalizado →
            </a>
          </div>
        </div>
      </section>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </>
  );
}
