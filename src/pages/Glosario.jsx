import React, { useState, useMemo } from "react";
import { Search, BookOpen } from "lucide-react";

const TERMINOS = [
  {
    termino: "Urdimbre",
    categoria: "Estructura",
    definicion: "Conjunto de hilos paralelos que se colocan de forma longitudinal en el telar, formando la base sobre la que se teje. Van de arriba a abajo (o de atrás hacia adelante) y permanecen fijos durante todo el proceso.",
    ejemplo: "En un telar de cartón, los hilos que envolves alrededor del cartón son la urdimbre.",
    emoji: "↕️",
  },
  {
    termino: "Trama",
    categoria: "Estructura",
    definicion: "El hilo que se pasa de lado a lado, entrelazándose con la urdimbre para crear el tejido. Va perpendicular a la urdimbre y es el hilo que 'teje' propiamente dicho.",
    ejemplo: "El hilo que pasas con la aguja o lanzadera de izquierda a derecha (y viceversa) es la trama.",
    emoji: "↔️",
  },
  {
    termino: "Calada",
    categoria: "Técnica",
    definicion: "El espacio o abertura que se forma entre los hilos de urdimbre levantados y los que quedan abajo, por donde pasa la lanzadera o el hilo de trama. Facilita el tejido rápido.",
    ejemplo: "Al levantar hilos alternos con una varilla en el telar de palo, creás una calada para pasar la trama más fácil.",
    emoji: "🔲",
  },
  {
    termino: "Lanzadera",
    categoria: "Herramienta",
    definicion: "Herramienta alargada que sostiene el hilo de trama y se desliza a través de la calada para pasar el hilo de un lado al otro del tejido de forma rápida y pareja.",
    ejemplo: "Una lanzadera puede ser tan simple como un palito de madera con muescas donde se enrolla el hilo.",
    emoji: "🚀",
  },
  {
    termino: "Peine o Rastrillo",
    categoria: "Herramienta",
    definicion: "Herramienta con dientes que se usa para apretar las pasadas de trama, compactando el tejido y dejándolo uniforme. También puede guiar los hilos de urdimbre.",
    ejemplo: "Después de pasar la trama, usás el peine para empujar el hilo hacia abajo y densificar el tejido.",
    emoji: "🪮",
  },
  {
    termino: "Pasada",
    categoria: "Técnica",
    definicion: "Cada vez que el hilo de trama cruza el ancho del tejido de un borde al otro. Una pasada va de izquierda a derecha, la siguiente de derecha a izquierda.",
    ejemplo: "Completar 10 pasadas en un telar pequeño equivale a aproximadamente 1 cm de tejido.",
    emoji: "➡️",
  },
  {
    termino: "Tensión",
    categoria: "Técnica",
    definicion: "La firmeza o presión con la que están montados los hilos de urdimbre y con la que se pasa la trama. Una tensión uniforme es clave para que el tejido quede parejo.",
    ejemplo: "Si la trama queda muy apretada, los bordes del tejido se encogen hacia adentro (este error se llama 'entallado').",
    emoji: "⚖️",
  },
  {
    termino: "Orillo o Borde",
    categoria: "Estructura",
    definicion: "Los bordes laterales del tejido, donde la trama da vuelta y regresa en la dirección contraria. Un buen orillo queda recto y parejo, sin tensarse ni soltarse.",
    ejemplo: "Para cuidar el orillo, no tirés fuerte de la trama al dar vuelta; dejá una pequeña curva antes de apretar con el peine.",
    emoji: "📏",
  },
  {
    termino: "Lienzo o Tafetán",
    categoria: "Ligamento",
    definicion: "El ligamento más simple del tejido: la trama pasa por arriba y por abajo de hilos de urdimbre alternos. Es el punto básico del que parten todas las técnicas.",
    ejemplo: "El tejido tipo 'uno sobre, uno bajo' es tafetán. Es lo primero que se aprende en cualquier telar.",
    emoji: "🔳",
  },
  {
    termino: "Rematar",
    categoria: "Técnica",
    definicion: "Asegurar el extremo de un hilo para que no se deshaga el tejido. Se hace pasando el hilo por las pasadas ya hechas con una aguja de tapiz antes de cortarlo.",
    ejemplo: "Siempre dejá una cola de 10 cm al cortar el hilo para poder rematarlo sin que se note.",
    emoji: "✂️",
  },
  {
    termino: "Tapiz",
    categoria: "Tipo de tejido",
    definicion: "Tejido generalmente decorativo donde la trama cubre completamente la urdimbre. Muy usado para hacer cuadros textiles, murales y obras de arte con hilo.",
    ejemplo: "En el telar de bastidor o de cuadro se hacen tapices. La urdimbre queda completamente oculta debajo de la trama.",
    emoji: "🖼️",
  },
  {
    termino: "Urdido",
    categoria: "Proceso",
    definicion: "El proceso de preparar y montar los hilos de urdimbre en el telar antes de comenzar a tejer. Es el primer paso de cualquier proyecto.",
    ejemplo: "Urdir un telar de cartón significa envolver el hilo alrededor del cartón siguiendo las muescas o marcas del borde.",
    emoji: "🧵",
  },
  {
    termino: "Cabilla o Varilla de calada",
    categoria: "Herramienta",
    definicion: "Varilla plana que se inserta entre hilos alternos de urdimbre para mantener la calada abierta y facilitar el paso de la trama.",
    ejemplo: "Girando la varilla de punta, la calada se abre más para pasar la lanzadera rápidamente.",
    emoji: "📌",
  },
  {
    termino: "Flecos",
    categoria: "Acabado",
    definicion: "Los extremos de la urdimbre que quedan libres en la parte superior e inferior del tejido al retirarlo del telar. Se pueden cortar, anudar o entretejer como parte del diseño.",
    ejemplo: "Para hacer flecos prolijos, cortá cada grupo de hilos al mismo largo y anudálos cerca del tejido.",
    emoji: "🎋",
  },
  {
    termino: "Aguja de tapiz",
    categoria: "Herramienta",
    definicion: "Aguja gruesa de punta roma con ojo grande, usada para pasar hilos de trama en telares pequeños y para rematar los cabos al terminar un proyecto.",
    ejemplo: "La aguja de tapiz es ideal para tejer en telares de cartón o bastidor sin necesidad de lanzadera.",
    emoji: "🪡",
  },
];

const CATEGORIAS = ["Todas", "Estructura", "Técnica", "Herramienta", "Ligamento", "Tipo de tejido", "Proceso", "Acabado"];

const categoriaColor = {
  Estructura: "bg-blue-100 text-blue-800 dark:bg-blue-950/50 dark:text-blue-300",
  Técnica: "bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300",
  Herramienta: "bg-violet-100 text-violet-800 dark:bg-violet-950/50 dark:text-violet-300",
  Ligamento: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300",
  "Tipo de tejido": "bg-rose-100 text-rose-800 dark:bg-rose-950/50 dark:text-rose-300",
  Proceso: "bg-orange-100 text-orange-800 dark:bg-orange-950/50 dark:text-orange-300",
  Acabado: "bg-teal-100 text-teal-800 dark:bg-teal-950/50 dark:text-teal-300",
};

function TerminoCard({ termino, definicion, ejemplo, categoria, emoji }) {
  return (
    <article className="bg-card border border-border rounded-2xl p-5 space-y-3">
      <div className="flex items-start gap-3">
        <span className="text-2xl flex-shrink-0 mt-0.5" aria-hidden="true">{emoji}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="font-heading text-lg font-semibold text-foreground">{termino}</h2>
            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${categoriaColor[categoria] || "bg-muted text-muted-foreground"}`}>
              {categoria}
            </span>
          </div>
          <p className="text-sm text-foreground/80 leading-relaxed mt-1.5">{definicion}</p>
        </div>
      </div>
      {ejemplo && (
        <div className="ml-10 bg-accent/60 border border-amber-200/60 dark:border-amber-800/40 rounded-xl px-4 py-3">
          <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-1">💡 Ejemplo práctico</p>
          <p className="text-xs text-foreground/75 leading-relaxed">{ejemplo}</p>
        </div>
      )}
    </article>
  );
}

export default function Glosario() {
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("Todas");

  const filtrados = useMemo(() => {
    return TERMINOS.filter(t => {
      const matchCat = categoria === "Todas" || t.categoria === categoria;
      const q = busqueda.trim().toLowerCase();
      const matchQ = !q || t.termino.toLowerCase().includes(q) || t.definicion.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [busqueda, categoria]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">

      {/* Encabezado */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <BookOpen size={22} className="text-primary" aria-hidden="true" />
          <h1 className="font-heading text-3xl font-semibold text-foreground">Glosario de Tejido</h1>
        </div>
        <p className="text-muted-foreground text-sm">
          Términos esenciales para entender el lenguaje del tejido. Ideal para principiantes.
        </p>
      </div>

      {/* Búsqueda */}
      <div className="relative">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" aria-hidden="true" />
        <input
          type="search"
          placeholder="Buscar término o definición…"
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-card text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {/* Filtro por categoría */}
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
        {CATEGORIAS.map(cat => (
          <button
            key={cat}
            onClick={() => setCategoria(cat)}
            aria-pressed={categoria === cat}
            className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors
              ${categoria === cat
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Contador */}
      <p className="text-xs text-muted-foreground">
        {filtrados.length} {filtrados.length === 1 ? "término" : "términos"}
      </p>

      {/* Lista */}
      {filtrados.length === 0 ? (
        <div className="text-center py-14 space-y-2">
          <p className="text-3xl">📖</p>
          <p className="text-muted-foreground text-sm">Sin resultados para "{busqueda}".</p>
          <button onClick={() => { setBusqueda(""); setCategoria("Todas"); }} className="text-sm text-primary hover:underline font-medium">
            Ver todos los términos
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filtrados.map(t => (
            <TerminoCard key={t.termino} {...t} />
          ))}
        </div>
      )}
    </div>
  );
}