import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { CheckCircle2, Clock, Circle, BookOpen } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";

const estadoConfig = {
  "Completado": { icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800" },
  "En progreso": { icon: Clock, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800" },
  "Pendiente": { icon: Circle, color: "text-muted-foreground", bg: "bg-muted/50 border-border" },
};

export default function Perfil() {
  const [user, setUser] = useState(null);
  const [proyectos, setProyectos] = useState([]);
  const [perfil, setPerfil] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [filtro, setFiltro] = useState("Todos");
  const { toast } = useToast();

  useEffect(() => {
    base44.auth.me().then(u => {
      setUser(u);
      return Promise.all([
        base44.entities.Proyecto.filter({ created_by_id: u.id }),
        base44.entities.UsuarioPerfil.filter({ created_by_id: u.id }),
      ]);
    }).then(([p, up]) => {
      setProyectos(p);
      setPerfil(up[0] || null);
      setCargando(false);
    }).catch(() => setCargando(false));
  }, []);

  const handleEstado = async (proyecto, nuevoEstado) => {
    const actualizado = await base44.entities.Proyecto.update(proyecto.id, {
      estado: nuevoEstado,
      ...(nuevoEstado === "Completado" ? { fecha_finalizacion: new Date().toISOString().split("T")[0] } : {})
    });
    setProyectos(prev => prev.map(p => p.id === proyecto.id ? actualizado : p));
    toast({ title: "Estado actualizado", description: `Proyecto marcado como ${nuevoEstado}.` });
  };

  const conEstado = proyectos.filter(p => p.estado);
  const completados = conEstado.filter(p => p.estado === "Completado").length;
  const enProgreso = conEstado.filter(p => p.estado === "En progreso").length;

  const filtrados = filtro === "Todos"
    ? conEstado
    : conEstado.filter(p => p.estado === filtro);

  return (
    <div className="max-w-xl mx-auto px-4 py-8 space-y-6">
      {/* Header usuario */}
      <div className="bg-card border border-border rounded-2xl p-5 flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-2xl">
          🧶
        </div>
        <div>
          <h1 className="font-heading text-xl font-semibold">{user?.full_name || "Tejedora/Tejedor"}</h1>
          <p className="text-sm text-muted-foreground">{user?.email || "—"}</p>
          {perfil?.nivel_actual && (
            <span className="mt-1 inline-block text-xs font-medium bg-muted px-2.5 py-0.5 rounded-full">{perfil.nivel_actual}</span>
          )}
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-card border border-border rounded-2xl p-3 text-center">
          <p className="text-2xl font-bold font-heading">{conEstado.length}</p>
          <p className="text-xs text-muted-foreground">En lista</p>
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

      {/* Lista de proyectos con estado */}
      <div className="space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h2 className="font-heading text-lg font-semibold">Mis proyectos</h2>
          <div className="flex gap-1.5">
            {["Todos", "En progreso", "Completado"].map(f => (
              <button
                key={f}
                onClick={() => setFiltro(f)}
                aria-pressed={filtro === f}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors
                  ${filtro === f ? "bg-primary text-primary-foreground shadow-sm" : "bg-muted text-muted-foreground hover:text-foreground"}`}
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
            <p className="text-muted-foreground text-sm">Todavía no tienes proyectos iniciados.</p>
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
                  <div className="flex items-start gap-2.5">
                    <Icon size={18} className={`flex-shrink-0 mt-0.5 ${cfg.color}`} />
                    <div>
                      <p className="font-medium text-sm">{p.titulo}</p>
                      {p.fecha_inicio && <p className="text-xs text-muted-foreground">Inicio: {p.fecha_inicio}</p>}
                      {p.fecha_finalizacion && <p className="text-xs text-muted-foreground">Fin: {p.fecha_finalizacion}</p>}
                    </div>
                  </div>
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