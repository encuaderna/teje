import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";

const tipoColor = {
  "Hilo": "bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400",
  "Lana": "bg-violet-100 text-violet-700 dark:bg-violet-950/50 dark:text-violet-400",
  "Fibra natural": "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400",
  "Fibra sintética": "bg-orange-100 text-orange-700 dark:bg-orange-950/50 dark:text-orange-400",
  "Otro": "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
};

function MaterialCard({ material }) {
  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden">
      {material.imagen_url && (
        <img src={material.imagen_url} alt={material.nombre} className="w-full h-40 object-cover" />
      )}
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h2 className="font-heading text-lg font-semibold">{material.nombre}</h2>
            {material.textura && <p className="text-xs text-muted-foreground">Textura: {material.textura}</p>}
          </div>
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full flex-shrink-0 ${tipoColor[material.tipo] || tipoColor["Otro"]}`}>
            {material.tipo}
          </span>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed">{material.descripcion}</p>

        {material.usos_recomendados?.length > 0 && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Ideal para</p>
            <div className="flex flex-wrap gap-1.5">
              {material.usos_recomendados.map((uso, i) => (
                <span key={i} className="text-xs bg-muted px-2.5 py-1 rounded-full">{uso}</span>
              ))}
            </div>
          </div>
        )}

        {material.consejos && (
          <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900 rounded-xl p-3">
            <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider mb-1">💡 Consejo</p>
            <p className="text-sm text-foreground leading-relaxed">{material.consejos}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Materiales() {
  const [materiales, setMateriales] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [filtro, setFiltro] = useState("Todos");

  useEffect(() => {
    base44.entities.Material.list().then(data => { setMateriales(data); setCargando(false); });
  }, []);

  const tipos = ["Todos", "Hilo", "Lana", "Fibra natural", "Fibra sintética", "Otro"];
  const filtrados = filtro === "Todos" ? materiales : materiales.filter(m => m.tipo === filtro);

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold">Materiales</h1>
        <p className="text-muted-foreground text-sm mt-1">Conoce los hilos, lanas y fibras más usados en el tejido.</p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {tipos.map(t => (
          <button
            key={t}
            onClick={() => setFiltro(t)}
            className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors
              ${filtro === t ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {cargando ? (
        <div className="space-y-4">{[1, 2, 3].map(i => <div key={i} className="h-48 bg-muted animate-pulse rounded-2xl" />)}</div>
      ) : (
        <div className="space-y-4">
          {filtrados.map(m => <MaterialCard key={m.id} material={m} />)}
        </div>
      )}
    </div>
  );
}