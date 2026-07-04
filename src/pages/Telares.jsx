import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { ChevronDown, ChevronUp, Wrench, Package, Search } from "lucide-react";

const nivelConfig = {
  Principiante: { cls: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300", emoji: "🌱" },
  Intermedio:   { cls: "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300", emoji: "🌿" },
  Avanzado:     { cls: "bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300", emoji: "🌺" },
};

function TelarCard({ telar }) {
  const [expandido, setExpandido] = useState(false);
  const nivel = nivelConfig[telar.nivel_dificultad] || nivelConfig.Principiante;

  return (
    <article className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
      {telar.imagen_url && (
        <img src={telar.imagen_url} alt={telar.nombre} className="w-full h-44 object-cover" />
      )}
      <div className="p-5 space-y-4">

        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="font-heading text-xl font-semibold text-foreground leading-tight">{telar.nombre}</h2>
            {telar.tipo && <p className="text-xs text-muted-foreground mt-0.5">{telar.tipo}</p>}
          </div>
          <span className={`text-xs font-semibold px-3 py-1 rounded-full flex-shrink-0 flex items-center gap-1 ${nivel.cls}`}>
            <span aria-hidden="true">{nivel.emoji}</span> {telar.nivel_dificultad}
          </span>
        </div>

        <p className="text-sm text-foreground/80 leading-relaxed">{telar.descripcion}</p>

        {/* Usos recomendados */}
        {telar.usos_recomendados?.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {telar.usos_recomendados.map((uso, i) => (
              <span key={i} className="text-xs bg-muted px-2.5 py-1 rounded-full text-muted-foreground">{uso}</span>
            ))}
          </div>
        )}

        {/* Botón expandir — grande y claro */}
        <button
          onClick={() => setExpandido(!expandido)}
          aria-expanded={expandido}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary font-semibold text-sm transition-colors border border-primary/20"
        >
          {expandido ? <ChevronUp size={18} aria-hidden="true" /> : <ChevronDown size={18} aria-hidden="true" />}
          {expandido ? "Ocultar instrucciones" : "Cómo fabricar este telar"}
        </button>

        {expandido && (
          <div className="space-y-5 pt-1">

            {/* Materiales */}
            {telar.materiales_necesarios?.length > 0 && (
              <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900 rounded-xl p-4 space-y-2">
                <div className="flex items-center gap-2 mb-1">
                  <Package size={14} className="text-amber-700 dark:text-amber-400" aria-hidden="true" />
                  <p className="text-xs font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider">Materiales necesarios</p>
                </div>
                <ul className="space-y-1.5" role="list">
                  {telar.materiales_necesarios.map((m, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                      <span className="text-amber-500 font-bold mt-0.5" aria-hidden="true">•</span>
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Herramientas */}
            {telar.herramientas_necesarias?.length > 0 && (
              <div className="bg-muted/60 rounded-xl p-4 space-y-2">
                <div className="flex items-center gap-2 mb-1">
                  <Wrench size={14} className="text-muted-foreground" aria-hidden="true" />
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Herramientas</p>
                </div>
                <ul className="space-y-1.5" role="list">
                  {telar.herramientas_necesarias.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                      <span className="text-muted-foreground font-bold mt-0.5" aria-hidden="true">•</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Pasos numerados */}
            {telar.pasos_fabricacion?.length > 0 && (
              <div className="space-y-3">
                <p className="text-xs font-bold text-foreground uppercase tracking-wider">Pasos de fabricación</p>
                <ol className="space-y-3" role="list">
                  {telar.pasos_fabricacion.map((paso, i) => (
                    <li key={i} className="flex gap-3">
                      <span
                        className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold"
                        aria-label={`Paso ${i + 1}`}
                      >
                        {i + 1}
                      </span>
                      <p className="text-sm text-foreground leading-relaxed pt-1">{paso}</p>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Consejos de armado */}
            {telar.consejos_armado && (
              <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900 rounded-xl p-4">
                <p className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider mb-1">💡 Consejo de armado</p>
                <p className="text-sm text-foreground leading-relaxed">{telar.consejos_armado}</p>
              </div>
            )}

            {/* Errores frecuentes */}
            {telar.errores_frecuentes && (
              <div className="bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900 rounded-xl p-4">
                <p className="text-xs font-bold text-rose-800 dark:text-rose-300 uppercase tracking-wider mb-1">⚠️ Errores a evitar</p>
                <p className="text-sm text-foreground leading-relaxed">{telar.errores_frecuentes}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

export default function Telares() {
  const [telares, setTelares] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [filtro, setFiltro] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    base44.entities.Telar.list().then(data => { setTelares(data); setCargando(false); });
  }, []);

  const niveles = ["Todos", "Principiante", "Intermedio", "Avanzado"];
  const filtrados = telares
    .filter(t => filtro === "Todos" || t.nivel_dificultad === filtro)
    .filter(t => {
      if (!busqueda.trim()) return true;
      const q = busqueda.toLowerCase();
      return t.nombre?.toLowerCase().includes(q) || t.tipo?.toLowerCase().includes(q) || t.descripcion?.toLowerCase().includes(q);
    });

  return (
    <div className="max-w-xl mx-auto px-4 py-8 space-y-6">
      <div>
        <h1 className="font-heading text-3xl font-semibold text-foreground">Tipos de Telares</h1>
        <p className="text-muted-foreground text-sm mt-1">Conocé cada telar y aprendé a fabricarlo vos mismo.</p>
      </div>

      {/* Barra de búsqueda */}
      <div className="relative">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" aria-hidden="true" />
        <input
          type="search"
          placeholder="Buscar por nombre o tipo…"
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-card text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {/* Filtros accesibles */}
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
        <div className="space-y-4" aria-busy="true" aria-label="Cargando telares">
          {[1, 2, 3].map(i => <div key={i} className="h-48 bg-muted animate-pulse rounded-2xl" />)}
        </div>
      ) : filtrados.length === 0 ? (
        <p className="text-center py-12 text-muted-foreground text-sm">
          {busqueda ? `Sin resultados para "${busqueda}".` : "No hay telares en este nivel todavía."}
        </p>
      ) : (
        <div className="space-y-5">
          {filtrados.map(t => <TelarCard key={t.id} telar={t} />)}
        </div>
      )}
    </div>
  );
}