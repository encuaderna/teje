import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { Check, X, Minus } from "lucide-react";

const CAMPOS = [
  { key: "nivel_dificultad", label: "Dificultad" },
  { key: "portabilidad", label: "Portabilidad" },
  { key: "tamano_proyecto", label: "Tamaño del proyecto" },
  { key: "tiempo_fabricacion", label: "Tiempo de fabricación" },
  { key: "materiales_necesarios", label: "Materiales" },
  { key: "usos_recomendados", label: "Usos recomendados" },
  { key: "consejos_armado", label: "Consejo inicial" },
];

const nivelColor = {
  Principiante: "text-emerald-700 dark:text-emerald-400",
  Intermedio: "text-amber-700 dark:text-amber-400",
  Avanzado: "text-rose-700 dark:text-rose-400",
};

function renderValor(key, val) {
  if (!val) return <span className="text-muted-foreground text-xs">—</span>;
  if (Array.isArray(val)) {
    return (
      <ul className="space-y-0.5">
        {val.slice(0, 4).map((v, i) => (
          <li key={i} className="text-xs flex items-start gap-1">
            <span className="text-primary mt-0.5">•</span>
            <span>{v}</span>
          </li>
        ))}
        {val.length > 4 && <li className="text-xs text-muted-foreground">+{val.length - 4} más</li>}
      </ul>
    );
  }
  if (key === "nivel_dificultad") {
    return <span className={`text-sm font-semibold ${nivelColor[val] || ""}`}>{val}</span>;
  }
  return <p className="text-xs leading-relaxed line-clamp-3">{val}</p>;
}

export default function Comparador() {
  const [telares, setTelares] = useState([]);
  const [seleccionados, setSeleccionados] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    base44.entities.Telar.list().then(data => {
      setTelares(data);
      setCargando(false);
    });
  }, []);

  const toggleSeleccion = (telar) => {
    setSeleccionados(prev => {
      const existe = prev.find(t => t.id === telar.id);
      if (existe) return prev.filter(t => t.id !== telar.id);
      if (prev.length >= 3) return prev; // máx 3
      return [...prev, telar];
    });
  };

  if (cargando) return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-3">
      {[1, 2, 3].map(i => <div key={i} className="h-16 bg-muted animate-pulse rounded-xl" />)}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <div>
        <h1 className="font-heading text-3xl font-semibold text-foreground">Comparar Telares</h1>
        <p className="text-muted-foreground text-sm mt-1">Seleccioná hasta 3 telares para comparar sus características.</p>
      </div>

      {/* Selector */}
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Elegí los telares a comparar</p>
        <div className="flex flex-wrap gap-2">
          {telares.map(t => {
            const sel = seleccionados.find(s => s.id === t.id);
            return (
              <button
                key={t.id}
                onClick={() => toggleSeleccion(t)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all
                  ${sel
                    ? "bg-primary text-primary-foreground border-primary shadow-sm"
                    : "bg-card text-muted-foreground border-border hover:border-primary hover:text-foreground"}`}
              >
                {sel && <Check size={12} className="inline mr-1" />}
                {t.nombre}
              </button>
            );
          })}
        </div>
        {seleccionados.length === 3 && (
          <p className="text-xs text-amber-600 dark:text-amber-400">Máximo 3 telares. Deseleccioná uno para cambiar.</p>
        )}
      </div>

      {/* Tabla comparativa */}
      {seleccionados.length >= 2 ? (
        <div className="overflow-x-auto rounded-2xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/60 border-b border-border">
                <th className="text-left p-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider w-36">Campo</th>
                {seleccionados.map(t => (
                  <th key={t.id} className="p-4 text-left">
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-heading text-base font-semibold text-foreground">{t.nombre}</span>
                      <button onClick={() => toggleSeleccion(t)} className="text-muted-foreground hover:text-destructive transition-colors flex-shrink-0 mt-0.5">
                        <X size={14} />
                      </button>
                    </div>
                    {t.tipo && <p className="text-xs text-muted-foreground mt-0.5">{t.tipo}</p>}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CAMPOS.map((campo, idx) => (
                <tr key={campo.key} className={idx % 2 === 0 ? "bg-card" : "bg-muted/30"}>
                  <td className="p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider align-top">{campo.label}</td>
                  {seleccionados.map(t => (
                    <td key={t.id} className="p-4 align-top">
                      {renderValor(campo.key, t[campo.key])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed border-border rounded-2xl">
          <p className="text-4xl mb-3">🪡</p>
          <p className="text-muted-foreground text-sm">Seleccioná al menos 2 telares para ver la comparación.</p>
        </div>
      )}
    </div>
  );
}