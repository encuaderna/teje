import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { Clock, ChevronDown, ChevronUp, CheckCircle2, Plus, Layers } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const nivelColor = {
  Principiante: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400",
  Intermedio: "bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400",
  Avanzado: "bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-rose-400",
};

function ProyectoCard({ proyecto, progresos, onAgregar }) {
  const [expandido, setExpandido] = useState(false);
  const progreso = proyecto;

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden">
      {proyecto.imagen_url && (
        <img src={proyecto.imagen_url} alt={proyecto.titulo} className="w-full h-40 object-cover" />
      )}
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h2 className="font-heading text-lg font-semibold">{proyecto.titulo}</h2>
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full flex-shrink-0 ${nivelColor[proyecto.nivel]}`}>
            {proyecto.nivel}
          </span>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed">{proyecto.descripcion}</p>

        <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
          {proyecto.tiempo_estimado && (
            <span className="flex items-center gap-1"><Clock size={12} /> {proyecto.tiempo_estimado}</span>
          )}
          {proyecto.telar_recomendado && (
            <span className="flex items-center gap-1"><Layers size={12} /> {proyecto.telar_recomendado}</span>
          )}
        </div>

        {/* Estado progreso */}
        {proyecto.estado ? (
          <div className={`flex items-center gap-2 text-xs font-medium px-3 py-2 rounded-xl
            ${proyecto.estado === "Completado" ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400" :
              "bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400"}`}>
            <CheckCircle2 size={14} />
            {proyecto.estado}
          </div>
        ) : (
          <button
            onClick={() => onAgregar(proyecto)}
            className="flex items-center gap-2 text-xs font-medium px-3 py-2 rounded-xl bg-muted hover:bg-muted/70 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Plus size={14} />
            Iniciar proyecto
          </button>
        )}

        <button
          onClick={() => setExpandido(!expandido)}
          className="flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
        >
          {expandido ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          {expandido ? "Ocultar instrucciones" : "Ver instrucciones"}
        </button>

        {expandido && (
          <div className="space-y-4 pt-2 border-t border-border">
            {proyecto.materiales_necesarios?.length > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Materiales</p>
                <ul className="space-y-1">
                  {proyecto.materiales_necesarios.map((m, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="text-muted-foreground">•</span><span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {proyecto.pasos?.length > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Pasos</p>
                <ol className="space-y-3">
                  {proyecto.pasos.map((paso, i) => (
                    <li key={i} className="flex gap-3 text-sm">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">{i + 1}</span>
                      <span className="pt-0.5 leading-relaxed">{paso}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Proyectos() {
  const [proyectos, setProyectos] = useState([]);
  const [progresos, setProgresos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [nivel, setNivel] = useState("Todos");
  const { toast } = useToast();

  useEffect(() => {
    base44.entities.Proyecto.list().then(p => { setProyectos(p); setProgresos(p); setCargando(false); });
  }, []);

  const niveles = ["Todos", "Principiante", "Intermedio", "Avanzado"];
  const filtrados = nivel === "Todos" ? proyectos : proyectos.filter(p => p.nivel === nivel);

  const handleAgregar = async (proyecto) => {
    try {
      const actualizado = await base44.entities.Proyecto.update(proyecto.id, {
        estado: "En progreso",
        fecha_inicio: new Date().toISOString().split("T")[0],
      });
      setProyectos(prev => prev.map(p => p.id === proyecto.id ? actualizado : p));
      setProgresos(prev => prev.map(p => p.id === proyecto.id ? actualizado : p));
      toast({ title: "¡Iniciado!", description: `"${proyecto.titulo}" está en tu lista de progreso.` });
    } catch (e) {
      toast({ title: "Error", description: "No se pudo actualizar el proyecto.", variant: "destructive" });
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold">Proyectos</h1>
        <p className="text-muted-foreground text-sm mt-1">Elige un proyecto según tu nivel y sigue los pasos.</p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {niveles.map(n => (
          <button
            key={n}
            onClick={() => setNivel(n)}
            className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors
              ${nivel === n ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}
          >
            {n}
          </button>
        ))}
      </div>

      {cargando ? (
        <div className="space-y-4">{[1, 2, 3].map(i => <div key={i} className="h-48 bg-muted animate-pulse rounded-2xl" />)}</div>
      ) : (
        <div className="space-y-4">
          {filtrados.map(p => (
            <ProyectoCard key={p.id} proyecto={p} progresos={progresos} onAgregar={handleAgregar} />
          ))}
        </div>
      )}
    </div>
  );
}