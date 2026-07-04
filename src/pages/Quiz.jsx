import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, RotateCcw } from "lucide-react";

const PREGUNTAS = [
  {
    id: "experiencia",
    pregunta: "¿Cuánta experiencia tenés con el tejido?",
    opciones: [
      { valor: "cero", label: "Ninguna — es mi primera vez" },
      { valor: "algo", label: "Algo — hice algún proyecto sencillo" },
      { valor: "bastante", label: "Bastante — ya domino técnicas básicas" },
    ],
  },
  {
    id: "objetivo",
    pregunta: "¿Qué te gustaría tejer principalmente?",
    opciones: [
      { valor: "accesorios", label: "Accesorios pequeños (pulseras, posavasos, marcadores)" },
      { valor: "textiles", label: "Textiles del hogar (tapices, alfombras, mantas)" },
      { valor: "ropa", label: "Prendas de vestir (bufandas, calcetines, tejidos)" },
      { valor: "arte", label: "Arte textil y piezas decorativas" },
    ],
  },
  {
    id: "presupuesto",
    pregunta: "¿Con qué presupuesto contás para empezar?",
    opciones: [
      { valor: "cero", label: "Cero — quiero hacerlo con materiales caseros" },
      { valor: "bajo", label: "Bajo — unos pocos materiales básicos" },
      { valor: "medio", label: "Medio — dispuesto/a a invertir en un telar comprado" },
    ],
  },
  {
    id: "portabilidad",
    pregunta: "¿Querés poder tejer fuera de casa?",
    opciones: [
      { valor: "si", label: "Sí, quiero llevarlo a todos lados" },
      { valor: "no", label: "No, prefiero un telar fijo en casa" },
    ],
  },
];

const RESULTADOS = {
  carton: {
    nombre: "Telar de Cartón",
    emoji: "📦",
    descripcion: "Perfecto para ti. Con cartón de una caja y lana básica ya podés empezar hoy mismo. Sin inversión, sin herramientas especiales.",
    nivel: "Principiante",
    por_que: "Cero costo, materiales caseros, ideal para aprender los fundamentos del tejido.",
  },
  circular: {
    nombre: "Telar Circular o Redondo",
    emoji: "⭕",
    descripcion: "Un telar circular de madera o plástico es económico, portátil y perfecto para hacer mandalas, posavasos y apliques decorativos.",
    nivel: "Principiante",
    por_que: "Resultados visualmente atractivos desde la primera sesión. Muy intuitivo.",
  },
  peine: {
    nombre: "Telar de Peine Rígido",
    emoji: "🔲",
    descripcion: "El peine rígido es liviano, portátil y permite tejer bufandas y cintas de manera rápida. Ideal para tejer en viajes.",
    nivel: "Principiante",
    por_que: "Portátil, versátil y fácil de aprender. Permite tejer bufandas y cintas con buenos resultados.",
  },
  bastidor: {
    nombre: "Telar de Bastidor",
    emoji: "🖼️",
    descripcion: "El bastidor de madera es el clásico para tapices y alfombras. Te da control total sobre el diseño y es muy estable.",
    nivel: "Principiante",
    por_que: "Excelente para proyectos decorativos, estable y versátil para distintos tamaños.",
  },
  maria: {
    nombre: "Telar María",
    emoji: "🧵",
    descripcion: "El Telar María es el paso natural para quien ya domina lo básico y quiere tejer telas más anchas con más control.",
    nivel: "Intermedio",
    por_que: "Mayor control del diseño, permite patrones más complejos y telas más anchas.",
  },
  calcetines: {
    nombre: "Telar Circular para Calcetines",
    emoji: "🧦",
    descripcion: "Especializado en calcetines y tubos de tejido, es un telar compacto y mecánico muy satisfactorio de usar.",
    nivel: "Principiante",
    por_que: "Resultado inmediato: calcetines funcionales desde las primeras sesiones.",
  },
};

function calcularResultado(respuestas) {
  const { experiencia, objetivo, presupuesto, portabilidad } = respuestas;

  if (presupuesto === "cero") return "carton";
  if (objetivo === "ropa" && portabilidad === "si") return "peine";
  if (objetivo === "ropa") return "calcetines";
  if (objetivo === "accesorios" && portabilidad === "si") return "circular";
  if (objetivo === "accesorios") return "carton";
  if (objetivo === "textiles" && experiencia === "bastante") return "maria";
  if (objetivo === "textiles") return "bastidor";
  if (objetivo === "arte") return experiencia === "bastante" ? "maria" : "bastidor";
  if (portabilidad === "si") return "peine";
  return "bastidor";
}

export default function Quiz() {
  const [paso, setPaso] = useState(0);
  const [respuestas, setRespuestas] = useState({});
  const [resultado, setResultado] = useState(null);

  const preguntaActual = PREGUNTAS[paso];
  const totalPasos = PREGUNTAS.length;
  const progreso = ((paso) / totalPasos) * 100;

  const handleOpcion = (valor) => {
    const nuevas = { ...respuestas, [preguntaActual.id]: valor };
    setRespuestas(nuevas);
    if (paso + 1 < totalPasos) {
      setPaso(paso + 1);
    } else {
      setResultado(calcularResultado(nuevas));
    }
  };

  const reiniciar = () => {
    setPaso(0);
    setRespuestas({});
    setResultado(null);
  };

  if (resultado) {
    const res = RESULTADOS[resultado];
    return (
      <div className="max-w-xl mx-auto px-4 py-8 space-y-6">
        <div className="bg-card border border-border rounded-2xl p-8 text-center space-y-4">
          <div className="text-6xl">{res.emoji}</div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">Tu telar ideal es</p>
            <h2 className="font-heading text-3xl font-semibold text-foreground">{res.nombre}</h2>
            <span className="inline-block mt-2 text-xs font-semibold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
              {res.nivel}
            </span>
          </div>
          <p className="text-foreground/80 leading-relaxed">{res.descripcion}</p>
          <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900 rounded-xl p-4 text-left">
            <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider mb-1">¿Por qué este telar?</p>
            <p className="text-sm text-foreground">{res.por_que}</p>
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={reiniciar} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-muted text-foreground font-semibold text-sm hover:bg-muted/80 transition-colors">
              <RotateCcw size={15} /> Repetir quiz
            </button>
            <Link to="/telares" className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors">
              Ver telares <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-8 space-y-6">
      <div>
        <h1 className="font-heading text-3xl font-semibold text-foreground">¿Qué telar me conviene?</h1>
        <p className="text-muted-foreground text-sm mt-1">4 preguntas para encontrar el telar perfecto para vos.</p>
      </div>

      {/* Barra de progreso */}
      <div className="space-y-1">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Pregunta {paso + 1} de {totalPasos}</span>
          <span>{Math.round(progreso)}%</span>
        </div>
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${progreso}%` }} />
        </div>
      </div>

      {/* Pregunta */}
      <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
        <h2 className="font-heading text-xl font-semibold text-foreground leading-snug">{preguntaActual.pregunta}</h2>
        <div className="space-y-2">
          {preguntaActual.opciones.map(op => (
            <button
              key={op.valor}
              onClick={() => handleOpcion(op.valor)}
              className="w-full text-left p-4 rounded-xl border border-border bg-background hover:border-primary hover:bg-primary/5 transition-all text-sm font-medium text-foreground flex items-center justify-between group"
            >
              {op.label}
              <ArrowRight size={14} className="text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 ml-2" />
            </button>
          ))}
        </div>
      </div>

      {paso > 0 && (
        <button onClick={() => setPaso(paso - 1)} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft size={14} /> Volver a la pregunta anterior
        </button>
      )}
    </div>
  );
}