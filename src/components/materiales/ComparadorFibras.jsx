import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const FIBRAS = [
  {
    id: "lana_oveja_tradicional",
    nombre: "Lana de Oveja Tradicional",
    origen: "Animal",
    dificultad_general: "Baja",
    color_alerta: "verde",
    propiedades: { elasticidad: "Alta", resistencia_tension: "Alta", friccion: "Baja" },
    tip_ux: "Ideal para principiantes. Si el telar ejerce mucha tensión, asegúrate de que la lana tenga una torsión fuerte para que no se deshilache.",
    compatibilidad_telares: {
      "Telar de Cartón": { puntuacion: 10, estado: "Excelente" },
      "Telar de Bastidor": { puntuacion: 10, estado: "Excelente" },
      "Telar Circular": { puntuacion: 6, estado: "Moderado" },
      "Telar Peine Rígido": { puntuacion: 10, estado: "Excelente" },
      "Telar María": { puntuacion: 10, estado: "Excelente" },
      "Telar Mapuche": { puntuacion: 10, estado: "Excelente" },
      "Telar Vikingo": { puntuacion: 10, estado: "Excelente" },
      "Telar Clavijas": { puntuacion: 10, estado: "Excelente" },
      "Telar Huck": { puntuacion: 2, estado: "No recomendado" },
      "Telar Calcetines": { puntuacion: 6, estado: "Moderado" },
    },
  },
  {
    id: "lana_merino",
    nombre: "Lana Merino",
    origen: "Animal",
    dificultad_general: "Media",
    color_alerta: "amarillo",
    propiedades: { elasticidad: "Alta", resistencia_tension: "Media", friccion: "Media" },
    tip_ux: "Al usarla en la urdimbre de los telares María o Peine Rígido, controla la tensión. En telar de calcetines, busca mezclas que incluyan nailon.",
    compatibilidad_telares: {
      "Telar de Cartón": { puntuacion: 5, estado: "Moderado" },
      "Telar de Bastidor": { puntuacion: 5, estado: "Moderado" },
      "Telar Circular": { puntuacion: 5, estado: "Moderado" },
      "Telar Peine Rígido": { puntuacion: 10, estado: "Excelente" },
      "Telar María": { puntuacion: 10, estado: "Excelente" },
      "Telar Mapuche": { puntuacion: 1, estado: "No recomendado" },
      "Telar Vikingo": { puntuacion: 1, estado: "No recomendado" },
      "Telar Clavijas": { puntuacion: 4, estado: "Moderado" },
      "Telar Huck": { puntuacion: 3, estado: "No recomendado" },
      "Telar Calcetines": { puntuacion: 10, estado: "Excelente" },
    },
  },
  {
    id: "alpaca_mohair",
    nombre: "Alpaca y Mohair",
    origen: "Animal",
    dificultad_general: "Alta",
    color_alerta: "rojo",
    propiedades: { elasticidad: "Baja", resistencia_tension: "Media", friccion: "Alta" },
    tip_ux: "¡Alerta de error! Si te equivocas tejiendo, es casi imposible destejer porque los pelos se enganchan entre sí. Úsala solo en la trama horizontal.",
    compatibilidad_telares: {
      "Telar de Cartón": { puntuacion: 3, estado: "No recomendado" },
      "Telar de Bastidor": { puntuacion: 9, estado: "Excelente" },
      "Telar Circular": { puntuacion: 2, estado: "No recomendado" },
      "Telar Peine Rígido": { puntuacion: 4, estado: "Moderado" },
      "Telar María": { puntuacion: 4, estado: "Moderado" },
      "Telar Mapuche": { puntuacion: 0, estado: "No recomendado" },
      "Telar Vikingo": { puntuacion: 0, estado: "No recomendado" },
      "Telar Clavijas": { puntuacion: 2, estado: "No recomendado" },
      "Telar Huck": { puntuacion: 0, estado: "No recomendado" },
      "Telar Calcetines": { puntuacion: 0, estado: "No recomendado" },
    },
  },
  {
    id: "acrilico",
    nombre: "Acrílico Sintético",
    origen: "Sintético",
    dificultad_general: "Baja",
    color_alerta: "verde",
    propiedades: { elasticidad: "Media", resistencia_tension: "Alta", friccion: "Baja" },
    tip_ux: "Excelente para prototipos y prácticas. Ten en cuenta que puede acumular estática en telares con piezas plásticas.",
    compatibilidad_telares: {
      "Telar de Cartón": { puntuacion: 10, estado: "Excelente" },
      "Telar de Bastidor": { puntuacion: 10, estado: "Excelente" },
      "Telar Circular": { puntuacion: 10, estado: "Excelente" },
      "Telar Peine Rígido": { puntuacion: 7, estado: "Moderado" },
      "Telar María": { puntuacion: 7, estado: "Moderado" },
      "Telar Mapuche": { puntuacion: 3, estado: "No recomendado" },
      "Telar Vikingo": { puntuacion: 3, estado: "No recomendado" },
      "Telar Clavijas": { puntuacion: 10, estado: "Excelente" },
      "Telar Huck": { puntuacion: 4, estado: "Moderado" },
      "Telar Calcetines": { puntuacion: 8, estado: "Excelente" },
    },
  },
  {
    id: "algodon_lino",
    nombre: "Algodón y Lino",
    origen: "Vegetal",
    dificultad_general: "Alta",
    color_alerta: "rojo",
    propiedades: { elasticidad: "Nula", resistencia_tension: "Alta", friccion: "Baja" },
    tip_ux: "Cero elasticidad. Al armar la urdimbre mantén una tensión uniforme; si un hilo queda más suelto que otro, el tejido se deformará.",
    compatibilidad_telares: {
      "Telar de Cartón": { puntuacion: 5, estado: "Moderado" },
      "Telar de Bastidor": { puntuacion: 10, estado: "Excelente" },
      "Telar Circular": { puntuacion: 5, estado: "Moderado" },
      "Telar Peine Rígido": { puntuacion: 10, estado: "Excelente" },
      "Telar María": { puntuacion: 10, estado: "Excelente" },
      "Telar Mapuche": { puntuacion: 4, estado: "Moderado" },
      "Telar Vikingo": { puntuacion: 4, estado: "Moderado" },
      "Telar Clavijas": { puntuacion: 2, estado: "No recomendado" },
      "Telar Huck": { puntuacion: 10, estado: "Excelente" },
      "Telar Calcetines": { puntuacion: 2, estado: "No recomendado" },
    },
  },
];

const TELARES = [
  "Telar de Cartón", "Telar de Bastidor", "Telar Circular", "Telar Peine Rígido",
  "Telar María", "Telar Mapuche", "Telar Vikingo", "Telar Clavijas", "Telar Huck", "Telar Calcetines",
];

const dificultadConfig = {
  Baja: { cls: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300", emoji: "🟢" },
  Media: { cls: "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300", emoji: "🟡" },
  Alta: { cls: "bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300", emoji: "🔴" },
};

const estadoConfig = {
  "Excelente": { bar: "bg-emerald-500", text: "text-emerald-700 dark:text-emerald-400" },
  "Moderado": { bar: "bg-amber-400", text: "text-amber-700 dark:text-amber-400" },
  "No recomendado": { bar: "bg-rose-400", text: "text-rose-700 dark:text-rose-400" },
};

export default function ComparadorFibras() {
  const [abierto, setAbierto] = useState(false);
  const [fibraSeleccionada, setFibraSeleccionada] = useState(FIBRAS[0].id);

  const fibra = FIBRAS.find(f => f.id === fibraSeleccionada);
  const dif = dificultadConfig[fibra.dificultad_general] || dificultadConfig.Baja;

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden">
      {/* Header colapsable */}
      <button
        onClick={() => setAbierto(!abierto)}
        className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
        aria-expanded={abierto}
      >
        <div className="flex items-center gap-2">
          <span className="text-lg">🧵</span>
          <div className="text-left">
            <p className="font-semibold text-sm text-foreground">Compatibilidad Fibra–Telar</p>
            <p className="text-xs text-muted-foreground">¿Qué fibra va mejor con tu telar?</p>
          </div>
        </div>
        {abierto ? <ChevronUp size={18} className="text-muted-foreground" /> : <ChevronDown size={18} className="text-muted-foreground" />}
      </button>

      {abierto && (
        <div className="px-4 pb-5 space-y-4 border-t border-border">

          {/* Selector de fibra */}
          <div className="flex flex-wrap gap-2 pt-3">
            {FIBRAS.map(f => (
              <button
                key={f.id}
                onClick={() => setFibraSeleccionada(f.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors border
                  ${fibraSeleccionada === f.id
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-muted text-muted-foreground border-border hover:text-foreground"}`}
              >
                {f.nombre}
              </button>
            ))}
          </div>

          {/* Info de la fibra seleccionada */}
          <div className="bg-muted/50 rounded-xl p-3 space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-heading text-base font-semibold text-foreground">{fibra.nombre}</span>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${dif.cls}`}>
                {dif.emoji} Dificultad {fibra.dificultad_general}
              </span>
              <span className="text-xs bg-muted border border-border px-2 py-0.5 rounded-full text-muted-foreground">
                {fibra.origen}
              </span>
            </div>

            {/* Propiedades */}
            <div className="flex gap-3 flex-wrap text-xs">
              <span className="flex items-center gap-1 text-muted-foreground">
                <span className="font-semibold text-foreground">Elasticidad:</span> {fibra.propiedades.elasticidad}
              </span>
              <span className="flex items-center gap-1 text-muted-foreground">
                <span className="font-semibold text-foreground">Resistencia:</span> {fibra.propiedades.resistencia_tension}
              </span>
              <span className="flex items-center gap-1 text-muted-foreground">
                <span className="font-semibold text-foreground">Fricción:</span> {fibra.propiedades.friccion}
              </span>
            </div>

            {/* Tip */}
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900 rounded-lg p-2.5">
              <p className="text-xs text-foreground leading-relaxed">💡 {fibra.tip_ux}</p>
            </div>
          </div>

          {/* Tabla de compatibilidad */}
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Compatibilidad con cada telar</p>
            <div className="space-y-2">
              {TELARES.map(telar => {
                const compat = fibra.compatibilidad_telares[telar];
                const cfg = estadoConfig[compat.estado] || estadoConfig["Moderado"];
                const pct = (compat.puntuacion / 10) * 100;
                return (
                  <div key={telar} className="flex items-center gap-3">
                    <span className="text-xs text-foreground w-32 flex-shrink-0 leading-tight">{telar}</span>
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div className={`h-full rounded-full transition-all ${cfg.bar}`} style={{ width: `${pct}%` }} />
                    </div>
                    <span className={`text-xs font-semibold w-28 text-right flex-shrink-0 ${cfg.text}`}>
                      {compat.estado}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}