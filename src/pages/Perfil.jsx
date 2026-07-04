import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { CheckCircle2, Clock, Circle, Trash2, BookOpen } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";

const estadoConfig = {
  "Completado": { icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800" },
  "En progreso": { icon: Clock, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800" },
  "Pendiente": { icon: Circle, color: "text-muted-foreground", bg: "bg-muted/50 border-border" },
};

export default function Perfil() {
  const [user, setUser] = useState(null);
  const [progresos, setProgresos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [filtro, setFiltro] = useState("Todos");
  const { toast } = useToast();

  useEffect(() => {
    Promise.all([
      base44.auth.me(),
      base44.entities.ProgresoUsuario.filter({})
    ]).then(([u, p]) => { setUser(u); setProgresos(p); setCargando(false); }).catch(() => setCargando(false));
  }, []);

  const handleEstado = async (progreso, nuevoEstado) => {
    const actualizado = await base44.entities.ProgresoUsuario.update(progreso.id, {
      estado: nuevoEstado,
      ...(nuevoEstado === "Completado" ? { fecha_finalizacion: new Date().toISOString().split("T")[0] } : {})
    });
    setProgresos(prev => prev.map(p => p.id === progreso.id ? actualizado : p));
    toast({ title: "Estado actualizado", description: `Proyecto marcado como ${nuevoEstado}.` });
  };

  const handleEliminar = async (id) => {
    await base44.entities.ProgresoUsuario.delete(id);
    setProgresos(prev => prev.filter(p => p.id !== id));
    toast({ title: "Eliminado", description: "Proyecto quitado de tu lista." });
  };

  const filtrados = filtro === "Todos" ? progresos : progresos.filter(p => p.estado === filtro);
  const completados = progresos.filter(p => p.estado === "Completado").length;
  const enProgreso = progresos.filter(p => p.estado === "En progreso").length;

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
      {/* Header usuario */}
      <div className="bg-card border border-border rounded-2xl p-5 flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-2xl">
          🧶
        </div>
        <div>
          <h1 className="font-heading text-xl font-semibold">{user?.full_name || "Tejedora/Tejedor"}</h1>
          <p className="text-sm text-muted-foreground">{user?.email || "—"}</p>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-card border border-border rounded-2xl p-3 text-center">
          <p className="text-2xl font-bold font-heading">{progresos.length}</p>
          <p className="text-xs text-muted-foreground">Total</p>
        </div>
        <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-3 text-center">
          <p className="text-2xl font-bold font-heading text-emerald-600 dark:text-emerald-400">{completados}</p>
          <p className="text-xs text-muted-foreground">Completados</p>
        </div>
        <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-2xl p-3 text-center">
          <p className="text-2xl font-bold font-heading text-blue-600 dark:text-blue-400">{enProgreso}</p>
          <p className="text-xs text-muted-foreground">En progreso</p>
        </div>
      </div>

      {/* Lista de proyectos */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-base font-semibold">Mis proyectos</h2>
          <div className="flex gap-1.5">
            {["Todos", "En progreso", "Completado"].map(f => (
              <button
                key={f}
                onClick={() => setFiltro(f)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors
                  ${filtro === f ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
              >
                {f === "Todos" ? "Todos" : f === "En progreso" ? "En curso" : "Hechos"}
              </button>
            ))}
          </div>
        </div>

        {cargando ? (
          <div className="space-y-3">{[1, 2].map(i => <div key={i} className="h-20 bg-muted animate-pulse rounded-2xl" />)}</div>
        ) : filtrados.length === 0 ? (
          <div className="text-center py-12 space-y-3">
            <BookOpen size={36} className="mx-auto text-muted-foreground/40" />
            <p className="text-muted-foreground text-sm">Todavía no tienes proyectos aquí.</p>
            <Link to="/proyectos" className="inline-block text-sm font-medium text-primary hover:underline">
              Explorar proyectos →
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {filtrados.map(p => {
              const cfg = estadoConfig[p.estado] || estadoConfig["Pendiente"];
              const Icon = cfg.icon;
              return (
                <div key={p.id} className={`border rounded-2xl p-4 space-y-3 ${cfg.bg}`}>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2.5">
                      <Icon size={18} className={`flex-shrink-0 mt-0.5 ${cfg.color}`} />
                      <div>
                        <p className="font-medium text-sm">{p.proyecto_titulo}</p>
                        {p.fecha_inicio && <p className="text-xs text-muted-foreground">Inicio: {p.fecha_inicio}</p>}
                        {p.fecha_finalizacion && <p className="text-xs text-muted-foreground">Fin: {p.fecha_finalizacion}</p>}
                      </div>
                    </div>
                    <button onClick={() => handleEliminar(p.id)} className="p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </div>

                  {/* Cambiar estado */}
                  {p.estado !== "Completado" && (
                    <div className="flex gap-2">
                      {p.estado === "Pendiente" && (
                        <button onClick={() => handleEstado(p, "En progreso")} className="flex-1 text-xs py-1.5 rounded-xl bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400 font-medium hover:opacity-80 transition-opacity">
                          Iniciar
                        </button>
                      )}
                      <button onClick={() => handleEstado(p, "Completado")} className="flex-1 text-xs py-1.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 font-medium hover:opacity-80 transition-opacity">
                        ✓ Completar
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}