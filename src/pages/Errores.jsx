import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { ChevronDown, ChevronUp, AlertTriangle, Lightbulb, HelpCircle } from "lucide-react";

const nivelConfig = {
  Principiante: { cls: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300", emoji: "🌱" },
  Intermedio:   { cls: "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300", emoji: "🌿" },
  Avanzado:     { cls: "bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300", emoji: "🌺" },
  Todos:        { cls: "bg-muted text-muted-foreground", emoji: "📌" },
};

function ErrorCard({ error }) {
  const [expandido, setExpandido] = useState(false);
  const nivel = nivelConfig[error.nivel] || nivelConfig.Todos;

  return (
    <article className="bg-card border border-border rounded-2xl p-5 space-y-4 shadow-sm">
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="p-2.5 bg-rose-100 dark:bg-rose-950/40 rounded-xl flex-shrink-0">
          <AlertTriangle size={18} className="text-rose-700 dark:text-rose-400" aria-hidden="true" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h2 className="font-heading text-base font-semibold text-foreground leading-snug">{error.titulo}</h2>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0 flex items-center gap-1 ${nivel.cls}`}>
              <span aria-hidden="true">{nivel.emoji}</span> {error.nivel}
            </span>
          </div>
          {error.tecnica_relacionada && (
            <p className="text-xs text-muted-foreground mt-0.5">{error.tecnica_relacionada}</p>
          )}
        </div>
      </div>

      <p className="text-sm text-foreground/80 leading-relaxed">{error.descripcion_error}</p>

      {/* Botón expandir — grande */}
      <button
        onClick={() => setExpandido(!expandido)}
        aria-expanded={expandido}
        className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-muted hover:bg-muted/70 text-foreground font-semibold text-sm transition-colors"
      >
        {expandido ? <ChevronUp size={18} aria-hidden="true" /> : <ChevronDown size={18} aria-hidden="true" />}
        {expandido ? "Ocultar solución" : "Ver causa y solución"}
      </button>

      {expandido && (
        <div className="space-y-3">
          {/* Causa */}
          <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <HelpCircle size={14} className="text-amber-700 dark:text-amber-400" aria-hidden="true" />
              <p className="text-xs font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider">¿Por qué ocurre?</p>
            </div>
            <p className="text-sm text-foreground leading-relaxed">{error.causa}</p>
          </div>

          {/* Solución */}
          <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb size={14} className="text-emerald-700 dark:text-emerald-400" aria-hidden="true" />
              <p className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">Cómo solucionarlo</p>
            </div>
            <p className="text-sm text-foreground leading-relaxed">{error.solucion}</p>
          </div>
        </div>
      )}
    </article>
  );
}

export default function Errores() {
  const [errores, setErrores] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [filtro, setFiltro] = useState("Todos");

  useEffect(() => {
    base44.entities.ErrorFrecuente.list().then(data => { setErrores(data); setCargando(false); });
  }, []);

  const niveles = ["Todos", "Principiante", "Intermedio", "Avanzado"];
  const filtrados = filtro === "Todos"
    ? errores
    : errores.filter(e => e.nivel === filtro || e.nivel === "Todos");

  return (
    <div className="max-w-xl mx-auto px-4 py-8 space-y-6">
      <div>
        <h1 className="font-heading text-3xl font-semibold text-foreground">Errores Frecuentes</h1>
        <p className="text-muted-foreground text-sm mt-1">Los problemas más comunes al tejer y cómo resolverlos.</p>
      </div>

      <div role="group" aria-label="Filtrar por nivel" className="flex gap-2 overflow-x-auto pb-1">
        {niveles.map(n => (
          <button
            key={n}
            onClick={() => setFiltro(n)}
            aria-pressed={filtro === n}
            className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-semibold transition-colors
              ${filtro === n
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"}`}
          >
            {n}
          </button>
        ))}
      </div>

      {cargando ? (
        <div className="space-y-4" aria-busy="true">
          {[1, 2, 3].map(i => <div key={i} className="h-32 bg-muted animate-pulse rounded-2xl" />)}
        </div>
      ) : filtrados.length === 0 ? (
        <p className="text-center py-12 text-muted-foreground text-sm">No hay errores registrados para este nivel.</p>
      ) : (
        <div className="space-y-4">
          {filtrados.map(e => <ErrorCard key={e.id} error={e} />)}
        </div>
      )}
    </div>
  );
}