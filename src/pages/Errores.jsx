import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { ChevronDown, ChevronUp, AlertTriangle, Lightbulb } from "lucide-react";

const nivelColor = {
  Principiante: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400",
  Intermedio: "bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400",
  Avanzado: "bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-rose-400",
  Todos: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
};

function ErrorCard({ error }) {
  const [expandido, setExpandido] = useState(false);

  return (
    <div className="bg-card border border-border rounded-2xl p-4 space-y-3">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-rose-100 dark:bg-rose-950/30 rounded-xl flex-shrink-0 mt-0.5">
            <AlertTriangle size={16} className="text-rose-600 dark:text-rose-400" />
          </div>
          <div>
            <h2 className="font-heading text-base font-semibold">{error.titulo}</h2>
            {error.tecnica_relacionada && (
              <p className="text-xs text-muted-foreground mt-0.5">{error.tecnica_relacionada}</p>
            )}
          </div>
        </div>
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full flex-shrink-0 ${nivelColor[error.nivel] || nivelColor["Todos"]}`}>
          {error.nivel}
        </span>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed">{error.descripcion_error}</p>

      <button
        onClick={() => setExpandido(!expandido)}
        className="flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
      >
        {expandido ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        {expandido ? "Ocultar solución" : "Ver causa y solución"}
      </button>

      {expandido && (
        <div className="space-y-3 pt-2 border-t border-border">
          <div className="bg-amber-50 dark:bg-amber-950/20 rounded-xl p-3">
            <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider mb-1">¿Por qué ocurre?</p>
            <p className="text-sm text-foreground leading-relaxed">{error.causa}</p>
          </div>
          <div className="bg-emerald-50 dark:bg-emerald-950/20 rounded-xl p-3">
            <div className="flex items-center gap-1.5 mb-1">
              <Lightbulb size={13} className="text-emerald-600 dark:text-emerald-400" />
              <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">Cómo solucionarlo</p>
            </div>
            <p className="text-sm text-foreground leading-relaxed">{error.solucion}</p>
          </div>
        </div>
      )}
    </div>
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
  const filtrados = filtro === "Todos" ? errores : errores.filter(e => e.nivel === filtro || e.nivel === "Todos");

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold">Errores Frecuentes</h1>
        <p className="text-muted-foreground text-sm mt-1">Los problemas más comunes al tejer y cómo resolverlos.</p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {niveles.map(n => (
          <button
            key={n}
            onClick={() => setFiltro(n)}
            className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors
              ${filtro === n ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}
          >
            {n}
          </button>
        ))}
      </div>

      {cargando ? (
        <div className="space-y-4">{[1, 2, 3].map(i => <div key={i} className="h-32 bg-muted animate-pulse rounded-2xl" />)}</div>
      ) : (
        <div className="space-y-4">
          {filtrados.map(e => <ErrorCard key={e.id} error={e} />)}
        </div>
      )}
    </div>
  );
}