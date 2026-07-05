// Íconos SVG lineales 128x128px, stroke 2px, sin rellenos ni sombras
// Estilo coherente de ícono para interfaz web

const SVG_PROPS = {
  width: 128,
  height: 128,
  viewBox: "0 0 128 128",
  fill: "none",
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

// 1) Bastidor simple — marco rectangular con pocas urdimbres verticales
export function IconoBastidorSimple({ stroke = "currentColor", size = 64 }) {
  return (
    <svg {...SVG_PROPS} width={size} height={size} stroke={stroke} strokeWidth={2}>
      {/* Marco */}
      <rect x="20" y="16" width="88" height="96" rx="3" />
      {/* Barra superior */}
      <line x1="20" y1="28" x2="108" y2="28" />
      {/* Barra inferior */}
      <line x1="20" y1="100" x2="108" y2="100" />
      {/* Urdimbres verticales */}
      <line x1="38" y1="28" x2="38" y2="100" />
      <line x1="52" y1="28" x2="52" y2="100" />
      <line x1="64" y1="28" x2="64" y2="100" />
      <line x1="76" y1="28" x2="76" y2="100" />
      <line x1="90" y1="28" x2="90" y2="100" />
    </svg>
  );
}

// 2) Bastidor con clavos — rectángulo con marcas en dos lados y urdimbres
export function IconoBastidorClavos({ stroke = "currentColor", size = 64 }) {
  return (
    <svg {...SVG_PROPS} width={size} height={size} stroke={stroke} strokeWidth={2}>
      {/* Marco */}
      <rect x="24" y="16" width="80" height="96" rx="3" />
      {/* Clavos top */}
      <line x1="38" y1="16" x2="38" y2="10" />
      <line x1="52" y1="16" x2="52" y2="10" />
      <line x1="64" y1="16" x2="64" y2="10" />
      <line x1="76" y1="16" x2="76" y2="10" />
      <line x1="90" y1="16" x2="90" y2="10" />
      {/* Clavos bottom */}
      <line x1="38" y1="112" x2="38" y2="118" />
      <line x1="52" y1="112" x2="52" y2="118" />
      <line x1="64" y1="112" x2="64" y2="118" />
      <line x1="76" y1="112" x2="76" y2="118" />
      <line x1="90" y1="112" x2="90" y2="118" />
      {/* Urdimbres */}
      <line x1="38" y1="16" x2="38" y2="112" />
      <line x1="52" y1="16" x2="52" y2="112" />
      <line x1="64" y1="16" x2="64" y2="112" />
      <line x1="76" y1="16" x2="76" y2="112" />
      <line x1="90" y1="16" x2="90" y2="112" />
    </svg>
  );
}

// 3) Bastidor triangular — triángulo con marcas mínimas de clavos
export function IconoBastidorTriangular({ stroke = "currentColor", size = 64 }) {
  return (
    <svg {...SVG_PROPS} width={size} height={size} stroke={stroke} strokeWidth={2}>
      {/* Triángulo */}
      <polygon points="64,12 108,112 20,112" />
      {/* Clavos laterales izquierda */}
      <line x1="38" y1="70" x2="33" y2="73" />
      <line x1="30" y1="90" x2="25" y2="93" />
      {/* Clavos laterales derecha */}
      <line x1="90" y1="70" x2="95" y2="73" />
      <line x1="98" y1="90" x2="103" y2="93" />
      {/* Clavos base */}
      <line x1="44" y1="112" x2="44" y2="118" />
      <line x1="64" y1="112" x2="64" y2="118" />
      <line x1="84" y1="112" x2="84" y2="118" />
      {/* Urdimbres desde vértice superior */}
      <line x1="64" y1="12" x2="44" y2="112" />
      <line x1="64" y1="12" x2="64" y2="112" />
      <line x1="64" y1="12" x2="84" y2="112" />
    </svg>
  );
}

// 4) Telar circular — aro con líneas radiales de urdimbre
export function IconoTelarCircular({ stroke = "currentColor", size = 64 }) {
  return (
    <svg {...SVG_PROPS} width={size} height={size} stroke={stroke} strokeWidth={2}>
      {/* Aro exterior */}
      <circle cx="64" cy="64" r="48" />
      {/* Aro interior (tensión) */}
      <circle cx="64" cy="64" r="40" />
      {/* Urdimbres radiales */}
      <line x1="64" y1="24" x2="64" y2="104" />
      <line x1="24" y1="64" x2="104" y2="64" />
      <line x1="35" y1="35" x2="93" y2="93" />
      <line x1="93" y1="35" x2="35" y2="93" />
      <line x1="64" y1="24" x2="64" y2="24" />
      {/* Diagonales adicionales suaves */}
      <line x1="42" y1="26" x2="86" y2="102" />
      <line x1="86" y1="26" x2="42" y2="102" />
      <line x1="26" y1="42" x2="102" y2="86" />
      <line x1="26" y1="86" x2="102" y2="42" />
    </svg>
  );
}

// 5) Telar de cartón — rectángulo plano con ranuras en bordes y urdimbres
export function IconoTelarCarton({ stroke = "currentColor", size = 64 }) {
  return (
    <svg {...SVG_PROPS} width={size} height={size} stroke={stroke} strokeWidth={2}>
      {/* Cuerpo del cartón */}
      <rect x="16" y="36" width="96" height="56" rx="2" />
      {/* Ranuras top del cartón */}
      <line x1="34" y1="36" x2="34" y2="28" />
      <line x1="46" y1="36" x2="46" y2="28" />
      <line x1="58" y1="36" x2="58" y2="28" />
      <line x1="70" y1="36" x2="70" y2="28" />
      <line x1="82" y1="36" x2="82" y2="28" />
      <line x1="94" y1="36" x2="94" y2="28" />
      {/* Ranuras bottom */}
      <line x1="34" y1="92" x2="34" y2="100" />
      <line x1="46" y1="92" x2="46" y2="100" />
      <line x1="58" y1="92" x2="58" y2="100" />
      <line x1="70" y1="92" x2="70" y2="100" />
      <line x1="82" y1="92" x2="82" y2="100" />
      <line x1="94" y1="92" x2="94" y2="100" />
      {/* Urdimbres sobre el cartón */}
      <line x1="34" y1="28" x2="34" y2="100" />
      <line x1="46" y1="28" x2="46" y2="100" />
      <line x1="58" y1="28" x2="58" y2="100" />
      <line x1="70" y1="28" x2="70" y2="100" />
      <line x1="82" y1="28" x2="82" y2="100" />
      <line x1="94" y1="28" x2="94" y2="100" />
    </svg>
  );
}

// 6) Telar de peine de mesa — marco con dos barras horizontales y peine central
export function IconoTelarPeineMesa({ stroke = "currentColor", size = 64 }) {
  return (
    <svg {...SVG_PROPS} width={size} height={size} stroke={stroke} strokeWidth={2}>
      {/* Marco exterior */}
      <rect x="16" y="20" width="96" height="88" rx="3" />
      {/* Barra superior del peine */}
      <line x1="16" y1="38" x2="112" y2="38" />
      {/* Barra inferior del peine */}
      <line x1="16" y1="90" x2="112" y2="90" />
      {/* Dientes del peine (entre las barras) */}
      <line x1="30" y1="38" x2="30" y2="90" />
      <line x1="40" y1="38" x2="40" y2="90" />
      <line x1="50" y1="38" x2="50" y2="90" />
      <line x1="60" y1="38" x2="60" y2="90" />
      <line x1="70" y1="38" x2="70" y2="90" />
      <line x1="80" y1="38" x2="80" y2="90" />
      <line x1="90" y1="38" x2="90" y2="90" />
      <line x1="100" y1="38" x2="100" y2="90" />
    </svg>
  );
}

// 7) Telar de piso — marco con dos pedales simples abajo
export function IconoTelarPiso({ stroke = "currentColor", size = 64 }) {
  return (
    <svg {...SVG_PROPS} width={size} height={size} stroke={stroke} strokeWidth={2}>
      {/* Marco principal */}
      <rect x="20" y="10" width="88" height="80" rx="3" />
      {/* Patas */}
      <line x1="20" y1="90" x2="14" y2="118" />
      <line x1="108" y1="90" x2="114" y2="118" />
      {/* Patas traseras */}
      <line x1="30" y1="90" x2="26" y2="118" />
      <line x1="98" y1="90" x2="102" y2="118" />
      {/* Pedales */}
      <rect x="30" y="106" width="26" height="8" rx="2" />
      <rect x="72" y="106" width="26" height="8" rx="2" />
      {/* Conexión pedales a marco (ligazo) */}
      <line x1="43" y1="106" x2="43" y2="90" />
      <line x1="85" y1="106" x2="85" y2="90" />
      {/* Barra superior (envolvedor) */}
      <line x1="20" y1="24" x2="108" y2="24" />
      {/* Urdimbres */}
      <line x1="36" y1="24" x2="36" y2="90" />
      <line x1="50" y1="24" x2="50" y2="90" />
      <line x1="64" y1="24" x2="64" y2="90" />
      <line x1="78" y1="24" x2="78" y2="90" />
      <line x1="92" y1="24" x2="92" y2="90" />
    </svg>
  );
}

// 8) Telar de cintura — barra fija, barra al cuerpo, pocas urdimbres
export function IconoTelarCintura({ stroke = "currentColor", size = 64 }) {
  return (
    <svg {...SVG_PROPS} width={size} height={size} stroke={stroke} strokeWidth={2}>
      {/* Barra fija (arriba, atada a algo) */}
      <rect x="18" y="16" width="92" height="8" rx="2" />
      {/* Cuerdas de sujeción arriba */}
      <line x1="34" y1="16" x2="34" y2="8" />
      <line x1="94" y1="16" x2="94" y2="8" />
      <line x1="34" y1="8" x2="94" y2="8" />
      {/* Barra separadora (calada) */}
      <rect x="24" y="56" width="80" height="6" rx="2" />
      {/* Barra al cuerpo (abajo) */}
      <rect x="18" y="96" width="92" height="8" rx="2" />
      {/* Cinturón */}
      <path d="M18 100 Q64 114 110 100" strokeDasharray="4 3" />
      {/* Urdimbres entre barras */}
      <line x1="34" y1="24" x2="34" y2="96" />
      <line x1="48" y1="24" x2="48" y2="96" />
      <line x1="62" y1="24" x2="62" y2="96" />
      <line x1="76" y1="24" x2="76" y2="96" />
      <line x1="90" y1="24" x2="90" y2="96" />
    </svg>
  );
}

// 9) Telar mapuche — marco de cuatro palos con franja de tejido en la parte media
export function IconoTelarMapuche({ stroke = "currentColor", size = 64 }) {
  return (
    <svg {...SVG_PROPS} width={size} height={size} stroke={stroke} strokeWidth={2}>
      {/* Palo superior horizontal */}
      <rect x="18" y="14" width="92" height="7" rx="2" />
      {/* Palo inferior horizontal */}
      <rect x="18" y="107" width="92" height="7" rx="2" />
      {/* Palo izquierdo vertical */}
      <rect x="14" y="14" width="7" height="100" rx="2" />
      {/* Palo derecho vertical */}
      <rect x="107" y="14" width="7" height="100" rx="2" />
      {/* Urdimbres verticales */}
      <line x1="34" y1="21" x2="34" y2="107" />
      <line x1="46" y1="21" x2="46" y2="107" />
      <line x1="58" y1="21" x2="58" y2="107" />
      <line x1="70" y1="21" x2="70" y2="107" />
      <line x1="82" y1="21" x2="82" y2="107" />
      <line x1="94" y1="21" x2="94" y2="107" />
      {/* Franja de tejido en el centro (tramas horizontales densas) */}
      <line x1="21" y1="52" x2="107" y2="52" />
      <line x1="21" y1="57" x2="107" y2="57" />
      <line x1="21" y1="62" x2="107" y2="62" />
      <line x1="21" y1="67" x2="107" y2="67" />
      <line x1="21" y1="72" x2="107" y2="72" />
      <line x1="21" y1="77" x2="107" y2="77" />
      {/* Bordes de la franja tejida */}
      <line x1="21" y1="50" x2="107" y2="50" strokeWidth={2.5} />
      <line x1="21" y1="79" x2="107" y2="79" strokeWidth={2.5} />
    </svg>
  );
}

// 10) Telar de bastidor vertical — marco alto y angosto con urdimbres y franja central de tejido
export function IconoBastidorVertical({ stroke = "currentColor", size = 64 }) {
  return (
    <svg {...SVG_PROPS} width={size} height={size} stroke={stroke} strokeWidth={2}>
      {/* Marco alto y angosto */}
      <rect x="30" y="8" width="68" height="112" rx="3" />
      {/* Barra superior interior */}
      <line x1="30" y1="20" x2="98" y2="20" />
      {/* Barra inferior interior */}
      <line x1="30" y1="108" x2="98" y2="108" />
      {/* Urdimbres verticales */}
      <line x1="44" y1="20" x2="44" y2="108" />
      <line x1="56" y1="20" x2="56" y2="108" />
      <line x1="68" y1="20" x2="68" y2="108" />
      <line x1="80" y1="20" x2="80" y2="108" />
      {/* Franja central de tejido (tramas) */}
      <line x1="30" y1="54" x2="98" y2="54" />
      <line x1="30" y1="59" x2="98" y2="59" />
      <line x1="30" y1="64" x2="98" y2="64" />
      <line x1="30" y1="69" x2="98" y2="69" />
      <line x1="30" y1="74" x2="98" y2="74" />
      {/* Bordes franja */}
      <line x1="30" y1="52" x2="98" y2="52" strokeWidth={2.5} />
      <line x1="30" y1="76" x2="98" y2="76" strokeWidth={2.5} />
    </svg>
  );
}

// Mapa de nombre de telar → componente de ícono
export const ICONOS_TELARES = {
  "Telar de Bastidor Simple": IconoBastidorSimple,
  "Bastidor Simple": IconoBastidorSimple,
  "Telar de Bastidor con Clavos": IconoBastidorClavos,
  "Bastidor con Clavos": IconoBastidorClavos,
  "Telar de Bastidor Triangular": IconoBastidorTriangular,
  "Bastidor Triangular": IconoBastidorTriangular,
  "Telar Circular": IconoTelarCircular,
  "Telar de Aro": IconoTelarCircular,
  "Telar de Cartón": IconoTelarCarton,
  "Telar de Carton": IconoTelarCarton,
  "Telar de Peine de Mesa": IconoTelarPeineMesa,
  "Peine de Mesa": IconoTelarPeineMesa,
  "Telar de Piso": IconoTelarPiso,
  "Telar de Piso con Pedales": IconoTelarPiso,
  "Telar de Cintura": IconoTelarCintura,
  "Telar Mapuche": IconoTelarMapuche,
  "Witral": IconoTelarMapuche,
  "Telar de Bastidor Vertical": IconoBastidorVertical,
  "Bastidor Vertical": IconoBastidorVertical,
};

// Componente genérico: recibe nombre del telar y muestra el ícono correspondiente
export default function TelarIcono({ nombre, size = 64, stroke = "currentColor" }) {
  // Busca coincidencia exacta primero, luego parcial
  let IconComponent = ICONOS_TELARES[nombre];
  if (!IconComponent) {
    const key = Object.keys(ICONOS_TELARES).find(k =>
      nombre?.toLowerCase().includes(k.toLowerCase()) ||
      k.toLowerCase().includes(nombre?.toLowerCase())
    );
    IconComponent = key ? ICONOS_TELARES[key] : null;
  }
  if (!IconComponent) return null;
  return <IconComponent size={size} stroke={stroke} />;
}