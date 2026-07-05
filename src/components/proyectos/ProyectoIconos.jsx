// Íconos SVG lineales 128x128px, stroke 2px, sin rellenos ni sombras
// Set coherente para proyectos de tejido en app pedagógica

const SVG_PROPS = {
  width: 128,
  height: 128,
  viewBox: "0 0 128 128",
  fill: "none",
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

// 1) Posavasos de colores — cuadrado con trama alternada sobre telar de cartón
export function IconoPosavasos({ stroke = "currentColor", size = 64 }) {
  return (
    <svg {...SVG_PROPS} width={size} height={size} stroke={stroke} strokeWidth={2}>
      {/* Telar cartón (fondo) */}
      <rect x="22" y="88" width="84" height="22" rx="2" />
      <line x1="36" y1="88" x2="36" y2="82" /><line x1="50" y1="88" x2="50" y2="82" />
      <line x1="64" y1="88" x2="64" y2="82" /><line x1="78" y1="88" x2="78" y2="82" />
      <line x1="92" y1="88" x2="92" y2="82" />
      {/* Posavasos */}
      <rect x="34" y="28" width="60" height="60" rx="3" />
      {/* Trama alternada */}
      <line x1="34" y1="38" x2="94" y2="38" /><line x1="34" y1="48" x2="94" y2="48" />
      <line x1="34" y1="58" x2="94" y2="58" /><line x1="34" y1="68" x2="94" y2="68" />
      <line x1="34" y1="78" x2="94" y2="78" />
      {/* Urdimbres */}
      <line x1="50" y1="28" x2="50" y2="88" /><line x1="64" y1="28" x2="64" y2="88" />
      <line x1="78" y1="28" x2="78" y2="88" />
    </svg>
  );
}

// 2) Tapete pequeño con flecos — rectángulo horizontal con flecos en bordes cortos
export function IconoTapeteFlecos({ stroke = "currentColor", size = 64 }) {
  return (
    <svg {...SVG_PROPS} width={size} height={size} stroke={stroke} strokeWidth={2}>
      {/* Cuerpo del tapete */}
      <rect x="18" y="42" width="92" height="44" rx="2" />
      {/* Trama interna */}
      <line x1="18" y1="53" x2="110" y2="53" /><line x1="18" y1="64" x2="110" y2="64" />
      <line x1="18" y1="75" x2="110" y2="75" />
      {/* Flecos izquierda */}
      <line x1="18" y1="47" x2="10" y2="47" /><line x1="18" y1="54" x2="10" y2="54" />
      <line x1="18" y1="61" x2="10" y2="61" /><line x1="18" y1="68" x2="10" y2="68" />
      <line x1="18" y1="75" x2="10" y2="75" /><line x1="18" y1="82" x2="10" y2="82" />
      {/* Flecos derecha */}
      <line x1="110" y1="47" x2="118" y2="47" /><line x1="110" y1="54" x2="118" y2="54" />
      <line x1="110" y1="61" x2="118" y2="61" /><line x1="110" y1="68" x2="118" y2="68" />
      <line x1="110" y1="75" x2="118" y2="75" /><line x1="110" y1="82" x2="118" y2="82" />
    </svg>
  );
}

// 3) Bolso tejido con asas — rectángulo vertical con asa curva
export function IconoBolsoAsas({ stroke = "currentColor", size = 64 }) {
  return (
    <svg {...SVG_PROPS} width={size} height={size} stroke={stroke} strokeWidth={2}>
      {/* Cuerpo del bolso */}
      <rect x="28" y="44" width="72" height="72" rx="4" />
      {/* Textura tejida */}
      <line x1="28" y1="56" x2="100" y2="56" /><line x1="28" y1="68" x2="100" y2="68" />
      <line x1="28" y1="80" x2="100" y2="80" /><line x1="28" y1="92" x2="100" y2="92" />
      <line x1="44" y1="44" x2="44" y2="116" /><line x1="64" y1="44" x2="64" y2="116" />
      <line x1="84" y1="44" x2="84" y2="116" />
      {/* Asa curva */}
      <path d="M42 44 Q42 18 64 18 Q86 18 86 44" />
    </svg>
  );
}

// 4) Tapiz geométrico — rectángulo colgado con varilla y rombos/zigzags
export function IconoTapizGeometrico({ stroke = "currentColor", size = 64 }) {
  return (
    <svg {...SVG_PROPS} width={size} height={size} stroke={stroke} strokeWidth={2}>
      {/* Varilla superior */}
      <rect x="16" y="14" width="96" height="6" rx="2" />
      {/* Cuerda de cuelgue */}
      <line x1="28" y1="14" x2="28" y2="8" /><line x1="100" y1="14" x2="100" y2="8" />
      <line x1="28" y1="8" x2="100" y2="8" />
      {/* Tapiz */}
      <rect x="24" y="20" width="80" height="92" rx="2" />
      {/* Rombo central grande */}
      <polygon points="64,34 88,64 64,94 40,64" />
      {/* Zigzag superior */}
      <polyline points="28,28 40,36 52,28 64,36 76,28 88,36 100,28" />
      {/* Zigzag inferior */}
      <polyline points="28,100 40,108 52,100 64,108 76,100 88,108 100,100" />
    </svg>
  );
}

// 5) Manta familiar en telar de clavijas — gran rectángulo sobre marco esquemático
export function IconoMantaClavijas({ stroke = "currentColor", size = 64 }) {
  return (
    <svg {...SVG_PROPS} width={size} height={size} stroke={stroke} strokeWidth={2}>
      {/* Marco con clavijas */}
      <rect x="12" y="82" width="104" height="32" rx="3" />
      <line x1="26" y1="82" x2="26" y2="76" /><line x1="40" y1="82" x2="40" y2="76" />
      <line x1="54" y1="82" x2="54" y2="76" /><line x1="68" y1="82" x2="68" y2="76" />
      <line x1="82" y1="82" x2="82" y2="76" /><line x1="96" y1="82" x2="96" y2="76" />
      {/* Manta grande */}
      <rect x="18" y="12" width="92" height="66" rx="3" />
      {/* Líneas de volumen grueso */}
      <line x1="18" y1="26" x2="110" y2="26" /><line x1="18" y1="40" x2="110" y2="40" />
      <line x1="18" y1="54" x2="110" y2="54" /><line x1="18" y1="68" x2="110" y2="68" />
    </svg>
  );
}

// 6) Tejido mapuche con rombo — rectángulo horizontal con rombo y telar mapuche
export function IconoTejidoMapuche({ stroke = "currentColor", size = 64 }) {
  return (
    <svg {...SVG_PROPS} width={size} height={size} stroke={stroke} strokeWidth={2}>
      {/* Telar mapuche simplificado (fondo) */}
      <line x1="16" y1="100" x2="16" y2="18" /><line x1="112" y1="100" x2="112" y2="18" />
      <line x1="16" y1="18" x2="112" y2="18" /><line x1="16" y1="100" x2="112" y2="100" />
      {/* Tejido con rombo */}
      <rect x="24" y="30" width="80" height="60" rx="2" />
      {/* Rombo central estilizado */}
      <polygon points="64,38 88,60 64,82 40,60" />
      {/* Líneas de relleno del rombo */}
      <line x1="64" y1="38" x2="64" y2="82" /><line x1="40" y1="60" x2="88" y2="60" />
      {/* Trama exterior */}
      <line x1="24" y1="44" x2="40" y2="44" /><line x1="88" y1="44" x2="104" y2="44" />
      <line x1="24" y1="76" x2="40" y2="76" /><line x1="88" y1="76" x2="104" y2="76" />
    </svg>
  );
}

// 7) Cinta vikinga — banda estrecha inclinada con patrón de zigzag
export function IconoCintaVikinga({ stroke = "currentColor", size = 64 }) {
  return (
    <svg {...SVG_PROPS} width={size} height={size} stroke={stroke} strokeWidth={2}>
      {/* Tablillas (arriba) */}
      <rect x="14" y="10" width="12" height="12" rx="1" />
      <rect x="30" y="10" width="12" height="12" rx="1" />
      <rect x="46" y="10" width="12" height="12" rx="1" />
      {/* Banda inclinada */}
      <path d="M10 30 L118 70" strokeWidth={14} />
      <path d="M10 30 L118 70" stroke="hsl(var(--background))" strokeWidth={10} />
      {/* Patrón zigzag sobre la banda */}
      <polyline points="14,34 26,42 38,34 50,42 62,34 74,42 86,34 98,42 110,34" />
      <polyline points="14,42 26,50 38,42 50,50 62,42 74,50 86,42 98,50 110,42" />
      {/* Extremo derecho */}
      <line x1="118" y1="62" x2="118" y2="78" /><line x1="118" y1="62" x2="112" y2="62" />
      <line x1="118" y1="78" x2="112" y2="78" />
    </svg>
  );
}

// 8) Tapiz Huck con relieve — rectángulo con bloques de doble línea
export function IconoTapizHuck({ stroke = "currentColor", size = 64 }) {
  return (
    <svg {...SVG_PROPS} width={size} height={size} stroke={stroke} strokeWidth={2}>
      {/* Varilla superior */}
      <rect x="20" y="12" width="88" height="6" rx="2" />
      <line x1="34" y1="12" x2="34" y2="6" /><line x1="94" y1="12" x2="94" y2="6" />
      {/* Tapiz */}
      <rect x="20" y="18" width="88" height="98" rx="2" />
      {/* Bloques de relieve (doble línea) — fila 1 */}
      <rect x="28" y="26" width="18" height="14" rx="1" /><rect x="30" y="28" width="14" height="10" rx="1" />
      <rect x="54" y="26" width="18" height="14" rx="1" /><rect x="56" y="28" width="14" height="10" rx="1" />
      <rect x="80" y="26" width="18" height="14" rx="1" /><rect x="82" y="28" width="14" height="10" rx="1" />
      {/* Fila 2 (desplazada) */}
      <rect x="40" y="48" width="18" height="14" rx="1" /><rect x="42" y="50" width="14" height="10" rx="1" />
      <rect x="68" y="48" width="18" height="14" rx="1" /><rect x="70" y="50" width="14" height="10" rx="1" />
      {/* Fila 3 */}
      <rect x="28" y="70" width="18" height="14" rx="1" /><rect x="30" y="72" width="14" height="10" rx="1" />
      <rect x="54" y="70" width="18" height="14" rx="1" /><rect x="56" y="72" width="14" height="10" rx="1" />
      <rect x="80" y="70" width="18" height="14" rx="1" /><rect x="82" y="72" width="14" height="10" rx="1" />
      {/* Fila 4 */}
      <rect x="40" y="92" width="18" height="14" rx="1" /><rect x="42" y="94" width="14" height="10" rx="1" />
      <rect x="68" y="92" width="18" height="14" rx="1" /><rect x="70" y="94" width="14" height="10" rx="1" />
    </svg>
  );
}

// 9) Mi primera bufanda — bufanda larga con caída suave
export function IconoBufanda({ stroke = "currentColor", size = 64 }) {
  return (
    <svg {...SVG_PROPS} width={size} height={size} stroke={stroke} strokeWidth={2}>
      {/* Peine rígido esquemático (arriba) */}
      <rect x="30" y="8" width="68" height="8" rx="2" />
      <line x1="40" y1="8" x2="40" y2="16" /><line x1="52" y1="8" x2="52" y2="16" />
      <line x1="64" y1="8" x2="64" y2="16" /><line x1="76" y1="8" x2="76" y2="16" />
      <line x1="88" y1="8" x2="88" y2="16" />
      {/* Bufanda con caída suave */}
      <path d="M36 16 Q32 60 36 100 Q40 116 64 116 Q88 116 92 100 Q96 60 92 16 Z" />
      {/* Líneas internas de trama */}
      <line x1="38" y1="30" x2="90" y2="30" /><line x1="37" y1="46" x2="91" y2="46" />
      <line x1="36" y1="62" x2="92" y2="62" /><line x1="37" y1="78" x2="91" y2="78" />
      <line x1="38" y1="94" x2="90" y2="94" />
      {/* Flecos inferiores */}
      <line x1="44" y1="116" x2="42" y2="122" /><line x1="52" y1="118" x2="50" y2="124" />
      <line x1="64" y1="118" x2="64" y2="124" /><line x1="76" y1="118" x2="78" y2="124" />
      <line x1="84" y1="116" x2="86" y2="122" />
    </svg>
  );
}

// 10) Posavasos circular — círculo con anillos concéntricos (telar circular)
export function IconoPosavaosoCircular({ stroke = "currentColor", size = 64 }) {
  return (
    <svg {...SVG_PROPS} width={size} height={size} stroke={stroke} strokeWidth={2}>
      {/* Anillos concéntricos */}
      <circle cx="64" cy="64" r="50" />
      <circle cx="64" cy="64" r="40" />
      <circle cx="64" cy="64" r="30" />
      <circle cx="64" cy="64" r="20" />
      <circle cx="64" cy="64" r="10" />
      {/* Radios */}
      <line x1="64" y1="14" x2="64" y2="54" /><line x1="64" y1="74" x2="64" y2="114" />
      <line x1="14" y1="64" x2="54" y2="64" /><line x1="74" y1="64" x2="114" y2="64" />
      <line x1="29" y1="29" x2="50" y2="50" /><line x1="78" y1="78" x2="99" y2="99" />
      <line x1="99" y1="29" x2="78" y2="50" /><line x1="50" y1="78" x2="29" y2="99" />
    </svg>
  );
}

// 11) Marcapáginas tejido — rectángulo delgado con cinta en extremo
export function IconoMarcapaginas({ stroke = "currentColor", size = 64 }) {
  return (
    <svg {...SVG_PROPS} width={size} height={size} stroke={stroke} strokeWidth={2}>
      {/* Peine (contexto) */}
      <rect x="44" y="8" width="40" height="6" rx="1" />
      <line x1="52" y1="8" x2="52" y2="14" /><line x1="60" y1="8" x2="60" y2="14" />
      <line x1="68" y1="8" x2="68" y2="14" /><line x1="76" y1="8" x2="76" y2="14" />
      {/* Marcapáginas estrecho */}
      <rect x="50" y="14" width="28" height="92" rx="3" />
      {/* Trama interna */}
      <line x1="50" y1="26" x2="78" y2="26" /><line x1="50" y1="38" x2="78" y2="38" />
      <line x1="50" y1="50" x2="78" y2="50" /><line x1="50" y1="62" x2="78" y2="62" />
      <line x1="50" y1="74" x2="78" y2="74" /><line x1="50" y1="86" x2="78" y2="86" />
      {/* Cinta en extremo inferior */}
      <path d="M50 106 L64 116 L78 106" />
    </svg>
  );
}

// 12) Camino de mesa — rectángulo largo y estrecho con trama interna
export function IconoCaminoMesa({ stroke = "currentColor", size = 64 }) {
  return (
    <svg {...SVG_PROPS} width={size} height={size} stroke={stroke} strokeWidth={2}>
      {/* Bastidor (contexto) */}
      <rect x="10" y="52" width="108" height="24" rx="3" />
      {/* Camino de mesa */}
      <rect x="16" y="30" width="96" height="68" rx="2" />
      {/* Trama densa */}
      <line x1="16" y1="40" x2="112" y2="40" /><line x1="16" y1="50" x2="112" y2="50" />
      <line x1="16" y1="60" x2="112" y2="60" /><line x1="16" y1="70" x2="112" y2="70" />
      <line x1="16" y1="80" x2="112" y2="80" /><line x1="16" y1="90" x2="112" y2="90" />
      {/* Urdimbres */}
      <line x1="36" y1="30" x2="36" y2="98" /><line x1="56" y1="30" x2="56" y2="98" />
      <line x1="76" y1="30" x2="76" y2="98" /><line x1="96" y1="30" x2="96" y2="98" />
      {/* Flecos extremos */}
      <line x1="16" y1="36" x2="10" y2="36" /><line x1="16" y1="50" x2="10" y2="50" />
      <line x1="16" y1="64" x2="10" y2="64" /><line x1="16" y1="78" x2="10" y2="78" />
      <line x1="16" y1="92" x2="10" y2="92" />
      <line x1="112" y1="36" x2="118" y2="36" /><line x1="112" y1="50" x2="118" y2="50" />
      <line x1="112" y1="64" x2="118" y2="64" /><line x1="112" y1="78" x2="118" y2="78" />
      <line x1="112" y1="92" x2="118" y2="92" />
    </svg>
  );
}

// 13) Bolso intermedio con asa lateral — bolso mediano con asa a un costado
export function IconoBolsoIntermedio({ stroke = "currentColor", size = 64 }) {
  return (
    <svg {...SVG_PROPS} width={size} height={size} stroke={stroke} strokeWidth={2}>
      {/* Cuerpo del bolso */}
      <rect x="24" y="30" width="72" height="84" rx="4" />
      {/* Detalle de tapa */}
      <path d="M24 52 Q60 44 96 52" />
      {/* Textura tejida */}
      <line x1="24" y1="62" x2="96" y2="62" /><line x1="24" y1="74" x2="96" y2="74" />
      <line x1="24" y1="86" x2="96" y2="86" /><line x1="24" y1="98" x2="96" y2="98" />
      <line x1="42" y1="52" x2="42" y2="114" /><line x1="60" y1="52" x2="60" y2="114" />
      <line x1="78" y1="52" x2="78" y2="114" />
      {/* Asa lateral */}
      <path d="M96 48 Q118 48 118 64 Q118 80 96 80" />
      {/* Cierre superior */}
      <line x1="40" y1="30" x2="40" y2="22" /><line x1="88" y1="30" x2="88" y2="22" />
      <line x1="40" y1="22" x2="88" y2="22" />
    </svg>
  );
}

// 14) Tapiz decorativo colgante — tapiz con formas libres y barra superior
export function IconoTapizDecorativo({ stroke = "currentColor", size = 64 }) {
  return (
    <svg {...SVG_PROPS} width={size} height={size} stroke={stroke} strokeWidth={2}>
      {/* Barra superior */}
      <rect x="14" y="10" width="100" height="7" rx="2" />
      {/* Cuerdas */}
      <line x1="26" y1="10" x2="26" y2="6" /><line x1="102" y1="10" x2="102" y2="6" />
      <line x1="26" y1="6" x2="102" y2="6" />
      {/* Tapiz */}
      <rect x="20" y="17" width="88" height="94" rx="2" />
      {/* Ondas decorativas */}
      <path d="M28 34 Q40 26 52 34 Q64 42 76 34 Q88 26 100 34" />
      <path d="M28 54 Q40 46 52 54 Q64 62 76 54 Q88 46 100 54" />
      {/* Bloque central */}
      <rect x="34" y="64" width="60" height="28" rx="2" />
      <line x1="34" y1="72" x2="94" y2="72" /><line x1="34" y1="80" x2="94" y2="80" />
      <line x1="54" y1="64" x2="54" y2="92" /><line x1="74" y1="64" x2="74" y2="92" />
      {/* Flecos inferiores */}
      <line x1="28" y1="111" x2="26" y2="120" /><line x1="38" y1="111" x2="36" y2="120" />
      <line x1="48" y1="111" x2="48" y2="120" /><line x1="58" y1="111" x2="60" y2="120" />
      <line x1="70" y1="111" x2="70" y2="120" /><line x1="80" y1="111" x2="82" y2="120" />
      <line x1="90" y1="111" x2="92" y2="120" /><line x1="100" y1="111" x2="102" y2="120" />
    </svg>
  );
}

// Mapa nombre → componente
export const ICONOS_PROYECTOS = {
  "Posavasos de colores": IconoPosavasos,
  "Posavasos tejido": IconoPosavasos,
  "Tapete pequeño con flecos": IconoTapeteFlecos,
  "Tapete con flecos": IconoTapeteFlecos,
  "Bolso tejido con asas": IconoBolsoAsas,
  "Bolso con asas": IconoBolsoAsas,
  "Tapiz con diseño geométrico": IconoTapizGeometrico,
  "Tapiz geométrico": IconoTapizGeometrico,
  "Manta familiar en telar de clavijas": IconoMantaClavijas,
  "Manta familiar": IconoMantaClavijas,
  "Tejido mapuche con diseño de rombo": IconoTejidoMapuche,
  "Tejido mapuche": IconoTejidoMapuche,
  "Cinta vikinga con patrón trenzado": IconoCintaVikinga,
  "Cinta vikinga": IconoCintaVikinga,
  "Tapiz Huck con relieve geométrico": IconoTapizHuck,
  "Tapiz Huck": IconoTapizHuck,
  "Mi primera bufanda": IconoBufanda,
  "Primera bufanda": IconoBufanda,
  "Bufanda": IconoBufanda,
  "Posavasos tejido circular": IconoPosavaosoCircular,
  "Posavasos circular": IconoPosavaosoCircular,
  "Marcapáginas tejido": IconoMarcapaginas,
  "Marcapáginas": IconoMarcapaginas,
  "Camino de mesa simple": IconoCaminoMesa,
  "Camino de mesa": IconoCaminoMesa,
  "Bolso tejido con asa": IconoBolsoIntermedio,
  "Bolso con asa": IconoBolsoIntermedio,
  "Tapiz decorativo": IconoTapizDecorativo,
};

// Componente genérico
export default function ProyectoIcono({ titulo, size = 64, stroke = "currentColor" }) {
  let IconComponent = ICONOS_PROYECTOS[titulo];
  if (!IconComponent) {
    const key = Object.keys(ICONOS_PROYECTOS).find(k =>
      titulo?.toLowerCase().includes(k.toLowerCase()) ||
      k.toLowerCase().includes(titulo?.toLowerCase())
    );
    IconComponent = key ? ICONOS_PROYECTOS[key] : null;
  }
  if (!IconComponent) return null;
  return <IconComponent size={size} stroke={stroke} />;
}