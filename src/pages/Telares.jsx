import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { ChevronDown, ChevronUp, Wrench, Package, Search, Heart, Eye, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

// Favoritos y recientes en localStorage
function getFavoritos() {
  try { return JSON.parse(localStorage.getItem("telares_favoritos") || "[]"); } catch { return []; }
}
function saveFavoritos(ids) {
  localStorage.setItem("telares_favoritos", JSON.stringify(ids));
}
function addReciente(id) {
  try {
    const prev = JSON.parse(localStorage.getItem("telares_recientes") || "[]");
    const next = [id, ...prev.filter(i => i !== id)].slice(0, 10);
    localStorage.setItem("telares_recientes", JSON.stringify(next));
  } catch {}
}

// Progreso de aprendizaje (telares que se han expandido/leído)
function getVistos() {
  try { return JSON.parse(localStorage.getItem("telares_vistos") || "[]"); } catch { return []; }
}
function addVisto(id) {
  try {
    const prev = JSON.parse(localStorage.getItem("telares_vistos") || "[]");
    if (!prev.includes(id)) localStorage.setItem("telares_vistos", JSON.stringify([...prev, id]));
  } catch {}
}

const nivelConfig = {
  Principiante: { cls: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300", emoji: "🌱" },
  Intermedio: { cls: "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300", emoji: "🌿" },
  Avanzado: { cls: "bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300", emoji: "🌺" },
};

function TelarCard({ telar, favoritos, onToggleFav, vistos, onVisto }) {
  const [expandido, setExpandido] = useState(false);
  const nivel = nivelConfig[telar.nivel_dificultad] || nivelConfig.Principiante;
  const esFav = favoritos.includes(telar.id);
  const visto = vistos.includes(telar.id);

  const handleExpand = () => {
    const nuevo = !expandido;
    setExpandido(nuevo);
    if (nuevo) {
      addReciente(telar.id);
      addVisto(telar.id);
      onVisto(telar.id);
    }
  };

  return (
    <article className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
      <div className="relative">
        {telar.imagen_url && (
          <img src={telar.imagen_url} alt={telar.nombre} className="w-full h-44 object-cover" />
        )}
        {/* Botón favorito */}
        <button
          onClick={(e) => { e.stopPropagation(); onToggleFav(telar.id); }}
          aria-label={esFav ? "Quitar de favoritos" : "Guardar en favoritos"}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center shadow transition-all
            ${esFav ? "bg-rose-500 text-white" : "bg-black/30 text-white hover:bg-rose-500"}`}
        >
          <Heart size={16} fill={esFav ? "currentColor" : "none"} />
        </button>
        {/* Indicador visto */}
        {visto && (
          <div className="absolute top-3 left-3 bg-emerald-500 text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1">
            <Eye size={11} /> Estudiado
          </div>
        )}
      </div>

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

        {/* Botón expandir */}
        <button
          onClick={handleExpand}
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

            {/* Siguiente paso sugerido */}
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold text-primary uppercase tracking-wider mb-0.5">¿Qué sigue?</p>
                <p className="text-sm text-foreground">Buscá un proyecto para este telar en la sección Proyectos.</p>
              </div>
              <Link to="/proyectos" className="flex-shrink-0 flex items-center gap-1 text-primary font-semibold text-sm hover:underline">
                Ver <ArrowRight size={13} />
              </Link>
            </div>
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
  const [favoritos, setFavoritos] = useState(getFavoritos);
  const [vistos, setVistos] = useState(getVistos);

  useEffect(() => {
    base44.entities.Telar.list().then(data => { setTelares(data); setCargando(false); });
  }, []);

  const handleVisto = (id) => {
    setVistos(prev => prev.includes(id) ? prev : [...prev, id]);
  };

  const handleToggleFav = (id) => {
    setFavoritos(prev => {
      const nuevos = prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id];
      saveFavoritos(nuevos);
      return nuevos;
    });
  };

  const niveles = ["Todos", "Principiante", "Intermedio", "Avanzado"];
  const filtrados = telares
    .filter(t => filtro === "Todos" || t.nivel_dificultad === filtro)
    .filter(t => {
      if (!busqueda.trim()) return true;
      const q = busqueda.toLowerCase();
      return t.nombre?.toLowerCase().includes(q) || t.tipo?.toLowerCase().includes(q) || t.descripcion?.toLowerCase().includes(q);
    });

  const totalTelares = telares.length;
  const totalVistos = vistos.filter(id => telares.some(t => t.id === id)).length;
  const progresoPorc = totalTelares > 0 ? Math.round((totalVistos / totalTelares) * 100) : 0;

  return (
    <div className="max-w-xl mx-auto px-4 py-8 space-y-6">
      <div>
        <h1 className="font-heading text-3xl font-semibold text-foreground">Tipos de Telares</h1>
        <p className="text-muted-foreground text-sm mt-1">Conocé cada telar y aprendé a fabricarlo vos mismo.</p>
      </div>

      {/* Progreso de aprendizaje */}
      {totalTelares > 0 && (
        <div className="bg-card border border-border rounded-2xl p-4 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-semibold text-foreground">Progreso de aprendizaje</span>
            <span className="text-muted-foreground text-xs">{totalVistos} de {totalTelares} telares estudiados</span>
          </div>
          <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-700 ${progresoPorc === 100 ? "bg-emerald-500" : "bg-primary"}`}
              style={{ width: `${progresoPorc}%` }}
            />
          </div>
          {progresoPorc === 100 && (
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">🎉 ¡Completaste todos los telares!</p>
          )}
        </div>
      )}

      {/* Acciones rápidas */}
      <div className="grid grid-cols-2 gap-2">
        <Link to="/quiz" className="flex items-center gap-2 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 hover:bg-amber-100 dark:hover:bg-amber-950/40 transition-colors">
          <span className="text-xl">🎯</span>
          <div>
            <p className="text-xs font-semibold text-amber-800 dark:text-amber-300">¿Cuál me conviene?</p>
            <p className="text-xs text-muted-foreground">Quiz rápido</p>
          </div>
        </Link>
        <Link to="/comparador" className="flex items-center gap-2 p-3 rounded-xl bg-violet-50 dark:bg-violet-950/20 border border-violet-200 dark:border-violet-800 hover:bg-violet-100 dark:hover:bg-violet-950/40 transition-colors">
          <span className="text-xl">⚖️</span>
          <div>
            <p className="text-xs font-semibold text-violet-800 dark:text-violet-300">Comparar telares</p>
            <p className="text-xs text-muted-foreground">Hasta 3 a la vez</p>
          </div>
        </Link>
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

      {/* Filtros */}
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
          {filtrados.map(t => (
            <TelarCard
              key={t.id}
              telar={t}
              favoritos={favoritos}
              onToggleFav={handleToggleFav}
              vistos={vistos}
              onVisto={handleVisto}
            />
          ))}
        </div>
      )}
    </div>
  );
}