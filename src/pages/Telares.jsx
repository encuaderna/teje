import React, { useEffect, useState, useMemo } from "react";
import { base44 } from "@/api/base44Client";
import { Search, Heart, Scale, X } from "lucide-react";
import { Link } from "react-router-dom";
import TelarCard from "@/components/telares/TelarCard";

// ── localStorage helpers ─────────────────────────────────────────────────────
function getFavoritos() {
  try { return JSON.parse(localStorage.getItem("telares_favoritos") || "[]"); } catch { return []; }
}
function saveFavoritos(ids) {
  localStorage.setItem("telares_favoritos", JSON.stringify(ids));
}
function getVistos() {
  try { return JSON.parse(localStorage.getItem("telares_vistos") || "[]"); } catch { return []; }
}
function addVistoLS(id) {
  try {
    const prev = getVistos();
    if (!prev.includes(id)) localStorage.setItem("telares_vistos", JSON.stringify([...prev, id]));
    // también recientes
    const rec = JSON.parse(localStorage.getItem("telares_recientes") || "[]");
    localStorage.setItem("telares_recientes", JSON.stringify([id, ...rec.filter(i => i !== id)].slice(0, 10)));
  } catch {}
}

// ── Filtros disponibles ──────────────────────────────────────────────────────
const NIVELES = ["Todos", "Principiante", "Intermedio", "Avanzado"];

const USOS_CATEGORIAS = {
  "Todos los usos": null,
  "Prendas y ropa": ["Telas para prendas", "Telas para ropa", "Bufandas", "Cinturones tejidos"],
  "Decoración": ["Tapices decorativos", "Cuadros textiles", "Tapetes mini", "Tapetes pequeños", "Tapetes de entrada", "Apliques decorativos", "Mandalas textiles"],
  "Accesorios": ["Posavasos", "Marcadores de libro", "Pulseras", "Ligas para el cabello", "Bolsos tejidos", "Bolsos y totes", "Correas para bolsos"],
  "Hogar y mantas": ["Mantas y frazadas", "Alfombras pequeñas", "Alfombras grandes", "Cojines rellenos", "Mantelería"],
  "Calcetines y tejido circular": ["Calcetines", "Tejidos circulares", "Atrapasueños"],
  "Tradición y cultura": ["Mantas ceremoniales (makuñ)", "Fajas (trarilwe)", "Tejidos con diseños geométricos tradicionales"],
};

export default function Telares() {
  const [telares, setTelares] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [nivel, setNivel] = useState("Todos");
  const [usoCategoria, setUsoCategoria] = useState("Todos los usos");
  const [busqueda, setBusqueda] = useState("");
  const [favoritos, setFavoritos] = useState(getFavoritos);
  const [vistos, setVistos] = useState(getVistos);
  const [soloFavoritos, setSoloFavoritos] = useState(false);

  useEffect(() => {
    base44.entities.Telar.list().then(data => {
      setTelares(data);
      setCargando(false);
    });
  }, []);

  const handleVisto = (id) => {
    addVistoLS(id);
    setVistos(prev => prev.includes(id) ? prev : [...prev, id]);
  };

  const handleToggleFav = (id) => {
    setFavoritos(prev => {
      const nuevos = prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id];
      saveFavoritos(nuevos);
      return nuevos;
    });
  };

  // Filtros combinados
  const filtrados = useMemo(() => {
    const usosFiltro = USOS_CATEGORIAS[usoCategoria];
    return telares
      .filter(t => nivel === "Todos" || t.nivel_dificultad === nivel)
      .filter(t => {
        if (!usosFiltro) return true;
        return t.usos_recomendados?.some(u => usosFiltro.some(f => u.toLowerCase().includes(f.toLowerCase())));
      })
      .filter(t => !soloFavoritos || favoritos.includes(t.id))
      .filter(t => {
        const q = busqueda.trim().toLowerCase();
        if (!q) return true;
        return (
          t.nombre?.toLowerCase().includes(q) ||
          t.tipo?.toLowerCase().includes(q) ||
          t.descripcion?.toLowerCase().includes(q) ||
          t.usos_recomendados?.some(u => u.toLowerCase().includes(q))
        );
      });
  }, [telares, nivel, usoCategoria, busqueda, soloFavoritos, favoritos]);

  const totalTelares = telares.length;
  const totalVistos = vistos.filter(id => telares.some(t => t.id === id)).length;
  const progresoPorc = totalTelares > 0 ? Math.round((totalVistos / totalTelares) * 100) : 0;
  const hayFiltros = nivel !== "Todos" || usoCategoria !== "Todos los usos" || busqueda.trim() || soloFavoritos;

  const limpiarFiltros = () => {
    setNivel("Todos");
    setUsoCategoria("Todos los usos");
    setBusqueda("");
    setSoloFavoritos(false);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">

      {/* ── Encabezado ── */}
      <div>
        <h1 className="font-heading text-3xl font-semibold text-foreground">Tipos de Telares</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Conocé cada telar, sus ventajas, cómo fabricarlo y qué proyectos podés hacer con él.
        </p>
      </div>

      {/* ── Progreso de aprendizaje ── */}
      {totalTelares > 0 && (
        <div className="bg-card border border-border rounded-2xl p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-foreground">Tu progreso de aprendizaje</span>
            <span className="text-xs text-muted-foreground">{totalVistos} / {totalTelares} telares estudiados</span>
          </div>
          <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-700 ${progresoPorc === 100 ? "bg-emerald-500" : "bg-primary"}`}
              style={{ width: `${progresoPorc}%` }}
            />
          </div>
          {progresoPorc === 100 && (
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">🎉 ¡Estudiaste todos los telares!</p>
          )}
        </div>
      )}

      {/* ── Herramientas rápidas ── */}
      <div className="grid grid-cols-2 gap-2">
        <Link
          to="/quiz"
          className="flex items-center gap-2.5 p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 hover:bg-amber-100 dark:hover:bg-amber-950/40 transition-colors"
        >
          <span className="text-xl flex-shrink-0">🎯</span>
          <div>
            <p className="text-xs font-semibold text-amber-800 dark:text-amber-300">¿Cuál me conviene?</p>
            <p className="text-xs text-muted-foreground">Quiz rápido</p>
          </div>
        </Link>
        <Link
          to="/comparador"
          className="flex items-center gap-2.5 p-3.5 rounded-xl bg-violet-50 dark:bg-violet-950/20 border border-violet-200 dark:border-violet-800 hover:bg-violet-100 dark:hover:bg-violet-950/40 transition-colors"
        >
          <Scale size={20} className="text-violet-600 dark:text-violet-400 flex-shrink-0" />
          <div>
            <p className="text-xs font-semibold text-violet-800 dark:text-violet-300">Comparar telares</p>
            <p className="text-xs text-muted-foreground">Hasta 3 a la vez</p>
          </div>
        </Link>
      </div>

      {/* ── Búsqueda ── */}
      <div className="relative">
        <Search
          size={16}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
          aria-hidden="true"
        />
        <input
          type="search"
          placeholder="Buscar por nombre, tipo o proyecto…"
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-card text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {/* ── Filtros por nivel ── */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Filtrar por nivel</p>
        <div role="group" aria-label="Filtrar por nivel" className="flex gap-2 flex-wrap">
          {NIVELES.map(n => (
            <button
              key={n}
              onClick={() => setNivel(n)}
              aria-pressed={nivel === n}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold transition-colors
                ${nivel === n
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"}`}
            >
              {n === "Principiante" ? "🌱 " + n
               : n === "Intermedio"   ? "🌿 " + n
               : n === "Avanzado"     ? "🌺 " + n
               : n}
            </button>
          ))}
        </div>
      </div>

      {/* ── Filtros por uso / tipo de proyecto ── */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Filtrar por tipo de proyecto</p>
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
          {Object.keys(USOS_CATEGORIAS).map(cat => (
            <button
              key={cat}
              onClick={() => setUsoCategoria(cat)}
              aria-pressed={usoCategoria === cat}
              className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors
                ${usoCategoria === cat
                  ? "bg-violet-600 text-white shadow-sm"
                  : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── Favoritos toggle + contador ── */}
      <div className="flex items-center gap-3 flex-wrap">
        <button
          onClick={() => setSoloFavoritos(f => !f)}
          aria-pressed={soloFavoritos}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors border whitespace-nowrap
            ${soloFavoritos
              ? "bg-rose-500 text-white border-rose-500"
              : "bg-card border-border text-muted-foreground hover:text-foreground hover:border-rose-300"}`}
        >
          <Heart size={15} fill={soloFavoritos ? "currentColor" : "none"} aria-hidden="true" />
          {soloFavoritos ? "Solo mis favoritos" : "Mostrar favoritos"}
          {favoritos.length > 0 && (
            <span className={`text-xs px-1.5 py-0.5 rounded-full ${soloFavoritos ? "bg-white/20" : "bg-rose-100 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400"}`}>
              {favoritos.length}
            </span>
          )}
        </button>

        {hayFiltros && (
          <button
            onClick={limpiarFiltros}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={13} aria-hidden="true" /> Limpiar filtros
          </button>
        )}
      </div>

      {/* ── Contador de resultados ── */}
      {!cargando && (
        <p className="text-xs text-muted-foreground">
          {filtrados.length === totalTelares
            ? `${totalTelares} telares`
            : `${filtrados.length} de ${totalTelares} telares`}
        </p>
      )}

      {/* ── Lista de telares ── */}
      {cargando ? (
        <div className="space-y-4" aria-busy="true" aria-label="Cargando telares">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-64 bg-muted animate-pulse rounded-2xl" />
          ))}
        </div>
      ) : filtrados.length === 0 ? (
        <div className="text-center py-14 space-y-3">
          <p className="text-3xl">🔍</p>
          <p className="text-muted-foreground text-sm">
            {busqueda
              ? `Sin resultados para "${busqueda}".`
              : soloFavoritos
                ? "Todavía no tenés favoritos guardados."
                : "No hay telares que coincidan con estos filtros."}
          </p>
          {hayFiltros && (
            <button onClick={limpiarFiltros} className="text-sm text-primary hover:underline font-medium">
              Ver todos los telares
            </button>
          )}
        </div>
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