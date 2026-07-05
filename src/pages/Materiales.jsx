import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { CheckSquare, Square, BookOpen } from "lucide-react";
import ComparadorFibras from "@/components/materiales/ComparadorFibras";

const tipoColor = {
  "Hilo": "bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400",
  "Lana": "bg-violet-100 text-violet-700 dark:bg-violet-950/50 dark:text-violet-400",
  "Fibra natural": "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400",
  "Fibra sintética": "bg-orange-100 text-orange-700 dark:bg-orange-950/50 dark:text-orange-400",
  "Otro": "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
};

function MaterialCard({ material, checkedItems, onToggle, proyectosRelacionados }) {
  const [expandido, setExpandido] = useState(false);
  const isChecked = checkedItems[material.id] || false;

  return (
    <div className={`bg-card border rounded-2xl overflow-hidden transition-all ${isChecked ? "border-emerald-300 dark:border-emerald-700" : "border-border"}`}>
      {material.imagen_url && (
        <img src={material.imagen_url} alt={material.nombre} className="w-full h-36 object-cover" />
      )}
      <div className="p-4 space-y-3">
        {/* Header con checkbox */}
        <div className="flex items-start gap-3">
          <button
            onClick={() => onToggle(material.id)}
            className={`flex-shrink-0 mt-0.5 transition-colors ${isChecked ? "text-emerald-500" : "text-muted-foreground hover:text-foreground"}`}
            aria-label={isChecked ? "Desmarcar" : "Marcar como tengo"}
          >
            {isChecked ? <CheckSquare size={22} /> : <Square size={22} />}
          </button>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h2 className={`font-heading text-base font-semibold leading-tight ${isChecked ? "line-through text-muted-foreground" : ""}`}>
                {material.nombre}
              </h2>
              <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full flex-shrink-0 ${tipoColor[material.tipo] || tipoColor["Otro"]}`}>
                {material.tipo}
              </span>
            </div>
            {material.textura && <p className="text-xs text-muted-foreground mt-0.5">Textura: {material.textura}</p>}
          </div>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed">{material.descripcion}</p>

        {/* Proyectos relacionados */}
        {proyectosRelacionados.length > 0 && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 flex items-center gap-1">
              <BookOpen size={11} /> Proyectos que lo usan
            </p>
            <div className="flex flex-wrap gap-1.5">
              {proyectosRelacionados.map(p => (
                <span key={p.id} className="text-xs bg-muted px-2.5 py-1 rounded-full">{p.titulo}</span>
              ))}
            </div>
          </div>
        )}

        {/* Toggle detalle */}
        <button
          onClick={() => setExpandido(!expandido)}
          className="text-xs text-primary hover:text-primary/80 font-medium transition-colors"
        >
          {expandido ? "▲ Ocultar detalles" : "▼ Ver usos y consejos"}
        </button>

        {expandido && (
          <div className="space-y-3 pt-2 border-t border-border">
            {material.usos_recomendados?.length > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">Ideal para</p>
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
        )}
      </div>
    </div>
  );
}

export default function Materiales() {
  const [materiales, setMateriales] = useState([]);
  const [proyectos, setProyectos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [filtro, setFiltro] = useState("Todos");
  // checklist guardado en localStorage
  const [checkedItems, setCheckedItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem("materiales_checklist") || "{}"); } catch { return {}; }
  });

  useEffect(() => {
    Promise.all([
      base44.entities.Material.list(),
      base44.entities.Proyecto.list(),
    ]).then(([mats, projs]) => {
      setMateriales(mats);
      setProyectos(projs);
      setCargando(false);
    }).catch(() => setCargando(false)); // evita skeleton infinito si falla la carga
  }, []);

  const handleToggle = (id) => {
    setCheckedItems(prev => {
      const next = { ...prev, [id]: !prev[id] };
      localStorage.setItem("materiales_checklist", JSON.stringify(next));
      return next;
    });
  };

  const tipos = ["Todos", "Hilo", "Lana", "Fibra natural", "Fibra sintética", "Otro"];
  const filtrados = filtro === "Todos" ? materiales : materiales.filter(m => m.tipo === filtro);
  const totalChecked = Object.values(checkedItems).filter(Boolean).length;

  // Para cada material, buscar proyectos que lo mencionen en sus materiales[]
  const getProyectosRelacionados = (material) =>
    proyectos.filter(p =>
      p.materiales?.some(mat => mat.toLowerCase().includes(material.nombre.toLowerCase()))
    );

  return (
    <div className="max-w-xl mx-auto px-4 py-8 space-y-6">
      <div>
        <h1 className="font-heading text-3xl font-semibold text-foreground">Materiales</h1>
        <p className="text-muted-foreground text-sm mt-1">Conocé los hilos, lanas y fibras más usados en el tejido.</p>
      </div>

      {/* Checklist resumen */}
      {materiales.length > 0 && (
        <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-4 flex items-center justify-between">
          <div>
            <p className="font-semibold text-sm text-emerald-800 dark:text-emerald-300">Mi colección</p>
            <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-0.5">Marca los materiales que ya tenés</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold font-heading text-emerald-600 dark:text-emerald-400">{totalChecked}</p>
            <p className="text-xs text-muted-foreground">de {materiales.length}</p>
          </div>
        </div>
      )}

      {/* Comparador de fibras */}
      <ComparadorFibras />

      <div role="group" aria-label="Filtrar por tipo" className="flex gap-2 overflow-x-auto pb-1">
        {tipos.map(t => (
          <button
            key={t}
            onClick={() => setFiltro(t)}
            aria-pressed={filtro === t}
            className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-semibold transition-colors
              ${filtro === t ? "bg-primary text-primary-foreground shadow-sm" : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {cargando ? (
        <div className="space-y-4">{[1, 2, 3].map(i => <div key={i} className="h-40 bg-muted animate-pulse rounded-2xl" />)}</div>
      ) : filtrados.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground text-sm">No hay materiales en esta categoría.</div>
      ) : (
        <div className="space-y-4">
          {filtrados.map(m => (
            <MaterialCard
              key={m.id}
              material={m}
              checkedItems={checkedItems}
              onToggle={handleToggle}
              proyectosRelacionados={getProyectosRelacionados(m)}
            />
          ))}
        </div>
      )}
    </div>
  );
}