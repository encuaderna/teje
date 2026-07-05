import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { Clock, ChevronDown, ChevronUp, CheckCircle2, Circle, Plus, Layers, Target, Package, ListOrdered, AlertTriangle, Lightbulb, BarChart3, Search } from "lucide-react";
import ProyectoIcono from "@/components/proyectos/ProyectoIconos";
import { useToast } from "@/components/ui/use-toast";

const nivelColor = {
  Principiante: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300",
  Intermedio: "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300",
  Avanzado: "bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300",
};
const nivelEmoji = { Principiante: "🌱", Intermedio: "🌿", Avanzado: "🌺" };

function SeccionDetalle({ icon: Icon, titulo, color, children }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Icon size={13} className={color} />
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{titulo}</p>
      </div>
      {children}
    </div>
  );
}

// Devuelve las etapas completadas guardadas en localStorage
function getEtapasCompletadas(proyectoId) {
  try { return JSON.parse(localStorage.getItem(`etapas_${proyectoId}`) || "[]"); } catch { return []; }
}
function saveEtapasCompletadas(proyectoId, etapas) {
  localStorage.setItem(`etapas_${proyectoId}`, JSON.stringify(etapas));
}

function BarraProgreso({ porcentaje }) {
  const color = porcentaje === 100 ? "bg-emerald-500" : porcentaje >= 50 ? "bg-blue-500" : "bg-amber-400";
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Progreso por etapas</span>
        <span className="font-semibold text-foreground">{porcentaje}%</span>
      </div>
      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all duration-500 ${color}`} style={{ width: `${porcentaje}%` }} />
      </div>
    </div>
  );
}

function EtapasInteractivas({ proyecto, etapasCompletadas, onToggleEtapa }) {
  if (!proyecto.etapas_progreso?.length) return null;
  const total = proyecto.etapas_progreso.length;

  return (
    <SeccionDetalle icon={BarChart3} titulo="Etapas de progreso" color="text-violet-500">
      <ol className="space-y-2">
        {proyecto.etapas_progreso.map((etapa, i) => {
          const hecha = etapasCompletadas.includes(i);
          return (
            <li key={i}>
              <button
                onClick={() => onToggleEtapa(i)}
                className="flex items-start gap-3 text-left w-full group"
              >
                <span className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all mt-0.5
                  ${hecha
                    ? "bg-emerald-500 border-emerald-500 text-white"
                    : "border-muted-foreground/40 text-muted-foreground group-hover:border-violet-400"}`}>
                  {hecha ? <CheckCircle2 size={13} /> : <Circle size={11} />}
                </span>
                <span className={`text-sm pt-0.5 leading-relaxed transition-colors
                  ${hecha ? "line-through text-muted-foreground" : "text-foreground"}`}>
                  {etapa}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
      <p className="text-xs text-muted-foreground mt-1">Toca cada etapa para marcarla como completada.</p>
    </SeccionDetalle>
  );
}

function getNota(proyectoId) {
  try { return localStorage.getItem(`nota_${proyectoId}`) || ""; } catch { return ""; }
}

function ProyectoCard({ proyecto, onAgregar, onActualizar }) {
  const [expandido, setExpandido] = useState(false);
  const [etapasCompletadas, setEtapasCompletadas] = useState(() => getEtapasCompletadas(proyecto.id));
  const [nota, setNota] = useState(() => getNota(proyecto.id));
  const [editandoNota, setEditandoNota] = useState(false);

  const handleGuardarNota = (valor) => {
    setNota(valor);
    localStorage.setItem(`nota_${proyecto.id}`, valor);
  };

  const total = proyecto.etapas_progreso?.length || 0;
  // Solo contar etapas con índice válido para evitar porcentaje > 100
  const completadasValidas = etapasCompletadas.filter(i => i >= 0 && i < total);
  const porcentaje = total > 0 ? Math.min(100, Math.round((completadasValidas.length / total) * 100)) : 0;

  const handleToggleEtapa = (idx) => {
    const siguiente = etapasCompletadas.includes(idx)
      ? etapasCompletadas.filter(e => e !== idx)
      : [...new Set([...etapasCompletadas, idx])]; // dedup por si acaso
    setEtapasCompletadas(siguiente);
    saveEtapasCompletadas(proyecto.id, siguiente);

    // Auto-completar solo si se marcan TODAS las etapas válidas
    const completadasValidas = siguiente.filter(i => i >= 0 && i < total);
    if (completadasValidas.length === total && total > 0 && proyecto.estado === "En progreso") {
      onActualizar(proyecto.id, { estado: "Completado", fecha_finalizacion: new Date().toISOString().split("T")[0] });
    }
  };

  return (
    <article className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
      {proyecto.imagen_url ? (
        <img src={proyecto.imagen_url} alt={proyecto.titulo} className="w-full h-44 object-cover" />
      ) : (
        <div className="w-full h-36 bg-muted/60 flex items-center justify-center">
          <ProyectoIcono titulo={proyecto.titulo} size={88} stroke="hsl(var(--muted-foreground))" />
        </div>
      )}
      <div className="p-5 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <h2 className="font-heading text-xl font-semibold text-foreground leading-tight">{proyecto.titulo}</h2>
          <span className={`text-xs font-semibold px-3 py-1 rounded-full flex-shrink-0 flex items-center gap-1 ${nivelColor[proyecto.nivel]}`}>
            <span aria-hidden="true">{nivelEmoji[proyecto.nivel]}</span> {proyecto.nivel}
          </span>
        </div>

        <p className="text-sm text-foreground/80 leading-relaxed">{proyecto.descripcion}</p>

        {/* Meta info */}
        <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
          {proyecto.tiempo_estimado && (
            <span className="flex items-center gap-1"><Clock size={12} /> {proyecto.tiempo_estimado}</span>
          )}
          {proyecto.telar_recomendado && (
            <span className="flex items-center gap-1.5 bg-muted px-2 py-0.5 rounded-full">
              <Layers size={11} /> {proyecto.telar_recomendado}
            </span>
          )}
        </div>

        {/* Barra de progreso (solo si tiene estado y etapas) */}
        {proyecto.estado && total > 0 && (
          <BarraProgreso porcentaje={porcentaje} />
        )}

        {/* Estado / botón iniciar */}
        {proyecto.estado ? (
          <div className={`flex items-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-xl
            ${proyecto.estado === "Completado"
              ? "bg-emerald-50 text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
              : "bg-blue-50 text-blue-800 dark:bg-blue-950/30 dark:text-blue-300 border border-blue-200 dark:border-blue-800"}`}>
            <CheckCircle2 size={16} aria-hidden="true" />
            {proyecto.estado}
          </div>
        ) : (
          <button
            onClick={() => onAgregar(proyecto)}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors shadow-sm"
          >
            <Plus size={16} aria-hidden="true" />
            Iniciar proyecto
          </button>
        )}

        {/* Toggle detalle */}
        <button
          onClick={() => setExpandido(!expandido)}
          aria-expanded={expandido}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-muted hover:bg-muted/70 text-foreground font-semibold text-sm transition-colors"
        >
          {expandido ? <ChevronUp size={16} aria-hidden="true" /> : <ChevronDown size={16} aria-hidden="true" />}
          {expandido ? "Ocultar instrucciones" : "Ver instrucciones completas"}
        </button>

        {/* Detalle expandido */}
        {expandido && (
          <div className="space-y-5 pt-3 border-t border-border">

            {/* Imagen completa (infografía) cuando está expandido */}
            {proyecto.imagen_url && (
              <img
                src={proyecto.imagen_url}
                alt={`Infografía de ${proyecto.titulo}`}
                className="w-full rounded-xl object-contain"
              />
            )}

            {proyecto.objetivo && (
              <SeccionDetalle icon={Target} titulo="Objetivo" color="text-primary">
                <p className="text-sm leading-relaxed">{proyecto.objetivo}</p>
              </SeccionDetalle>
            )}

            {proyecto.materiales?.length > 0 && (
              <SeccionDetalle icon={Package} titulo="Materiales necesarios" color="text-amber-500">
                <ul className="space-y-1">
                  {proyecto.materiales.map((m, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="text-muted-foreground mt-0.5">•</span><span>{m}</span>
                    </li>
                  ))}
                </ul>
              </SeccionDetalle>
            )}

            {proyecto.pasos?.length > 0 && (
              <SeccionDetalle icon={ListOrdered} titulo="Pasos a seguir" color="text-blue-500">
                <ol className="space-y-2">
                  {proyecto.pasos.map((paso, i) => (
                    <li key={i} className="flex gap-3 text-sm">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">{i + 1}</span>
                      <span className="pt-0.5 leading-relaxed">{paso}</span>
                    </li>
                  ))}
                </ol>
              </SeccionDetalle>
            )}

            {proyecto.errores_comunes?.length > 0 && (
              <SeccionDetalle icon={AlertTriangle} titulo="Errores frecuentes" color="text-rose-500">
                <ul className="space-y-1">
                  {proyecto.errores_comunes.map((e, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-rose-700 dark:text-rose-400">
                      <span className="mt-0.5">⚠️</span><span>{e}</span>
                    </li>
                  ))}
                </ul>
              </SeccionDetalle>
            )}

            {proyecto.soluciones?.length > 0 && (
              <SeccionDetalle icon={Lightbulb} titulo="Soluciones y consejos" color="text-emerald-500">
                <ul className="space-y-1">
                  {proyecto.soluciones.map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-emerald-700 dark:text-emerald-400">
                      <span className="mt-0.5">💡</span><span>{s}</span>
                    </li>
                  ))}
                </ul>
              </SeccionDetalle>
            )}

            {/* Etapas interactivas con ticks */}
            <EtapasInteractivas
              proyecto={proyecto}
              etapasCompletadas={etapasCompletadas}
              onToggleEtapa={handleToggleEtapa}
            />

            {/* Notas personales */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">📝 Mis notas y trucos</p>
                {!editandoNota && (
                  <button
                    onClick={() => setEditandoNota(true)}
                    className="text-xs text-primary hover:underline font-medium"
                  >
                    {nota ? "Editar" : "+ Agregar nota"}
                  </button>
                )}
              </div>
              {editandoNota ? (
                <div className="space-y-2">
                  <textarea
                    autoFocus
                    value={nota}
                    onChange={e => handleGuardarNota(e.target.value)}
                    placeholder="Ej: Usé lana más gruesa, cambié el color en la fila 5, tensión media…"
                    rows={4}
                    className="w-full text-sm rounded-xl border border-border bg-card p-3 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none leading-relaxed"
                  />
                  <button
                    onClick={() => setEditandoNota(false)}
                    className="text-xs text-primary font-semibold hover:underline"
                  >
                    ✓ Listo
                  </button>
                </div>
              ) : nota ? (
                <div
                  onClick={() => setEditandoNota(true)}
                  className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-xl p-3 cursor-pointer hover:bg-amber-100 dark:hover:bg-amber-950/30 transition-colors"
                >
                  <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">{nota}</p>
                </div>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

export default function Proyectos() {
  const [proyectos, setProyectos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [nivel, setNivel] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    base44.entities.Proyecto.list().then(p => { setProyectos(p); setCargando(false); });
  }, []);

  const niveles = ["Todos", "Principiante", "Intermedio", "Avanzado"];
  const filtrados = proyectos
    .filter(p => nivel === "Todos" || p.nivel === nivel)
    .filter(p => {
      if (!busqueda.trim()) return true;
      const q = busqueda.toLowerCase();
      return p.titulo?.toLowerCase().includes(q) || p.descripcion?.toLowerCase().includes(q) || p.telar_recomendado?.toLowerCase().includes(q);
    });

  const handleAgregar = async (proyecto) => {
    const actualizado = await base44.entities.Proyecto.update(proyecto.id, {
      estado: "En progreso",
      fecha_inicio: new Date().toISOString().split("T")[0],
    });
    setProyectos(prev => prev.map(p => p.id === proyecto.id ? actualizado : p));
    toast({ title: "¡Iniciado!", description: `"${proyecto.titulo}" está en tu lista de progreso.` });
  };

  const handleActualizar = async (id, datos) => {
    const actualizado = await base44.entities.Proyecto.update(id, datos);
    setProyectos(prev => prev.map(p => p.id === id ? actualizado : p));
    if (datos.estado === "Completado") {
      toast({ title: "¡Proyecto completado! 🎉", description: "Terminaste todas las etapas. ¡Excelente trabajo!" });
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-8 space-y-6">
      <div>
        <h1 className="font-heading text-3xl font-semibold text-foreground">Proyectos</h1>
        <p className="text-muted-foreground text-sm mt-1">Elegí un proyecto según tu nivel y seguí los pasos.</p>
      </div>

      {/* Banner para zurdas/os */}
      <div className="bg-violet-50 dark:bg-violet-950/20 border border-violet-200 dark:border-violet-800 rounded-2xl p-4 flex items-start gap-3">
        <span className="text-xl flex-shrink-0">✋</span>
        <div>
          <p className="text-sm font-semibold text-violet-800 dark:text-violet-300">¿Sos zurda/o?</p>
          <p className="text-xs text-violet-700 dark:text-violet-400 mt-0.5 leading-relaxed">
            Todos los pasos de esta guía se pueden invertir: donde dice "de izquierda a derecha", leé "de derecha a izquierda". El resultado del tejido es idéntico para ambas manos dominantes.
          </p>
        </div>
      </div>

      {/* Barra de búsqueda */}
      <div className="relative">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" aria-hidden="true" />
        <input
          type="search"
          placeholder="Buscar por nombre, descripción o telar…"
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-card text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <div role="group" aria-label="Filtrar por nivel" className="flex gap-2 overflow-x-auto pb-1">
        {niveles.map(n => (
          <button
            key={n}
            onClick={() => setNivel(n)}
            aria-pressed={nivel === n}
            className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-semibold transition-colors
              ${nivel === n ? "bg-primary text-primary-foreground shadow-sm" : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"}`}
          >
            {n}
          </button>
        ))}
      </div>

      {cargando ? (
        <div className="space-y-4">{[1, 2, 3].map(i => <div key={i} className="h-48 bg-muted animate-pulse rounded-2xl" />)}</div>
      ) : filtrados.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground text-sm">
          {busqueda ? `Sin resultados para "${busqueda}".` : "No hay proyectos para este nivel todavía."}
        </div>
      ) : (
        <div className="space-y-4">
          {filtrados.map(p => (
            <ProyectoCard key={p.id} proyecto={p} onAgregar={handleAgregar} onActualizar={handleActualizar} />
          ))}
        </div>
      )}
    </div>
  );
}