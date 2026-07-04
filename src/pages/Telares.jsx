import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { ChevronDown, ChevronUp, Clock, Wrench } from "lucide-react";

const nivelColor = {
  Principiante: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400",
  Intermedio: "bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400",
  Avanzado: "bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-rose-400",
};

function TelarCard({ telar }) {
  const [expandido, setExpandido] = useState(false);

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden transition-all">
      {telar.imagen_url && (
        <img src={telar.imagen_url} alt={telar.nombre} className="w-full h-44 object-cover" />
      )}
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h2 className="font-heading text-lg font-semibold text-foreground">{telar.nombre}</h2>
            {telar.tipo && <p className="text-xs text-muted-foreground">{telar.tipo}</p>}
          </div>
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full flex-shrink-0 ${nivelColor[telar.nivel_dificultad]}`}>
            {telar.nivel_dificultad}
          </span>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed">{telar.descripcion}</p>

        {telar.tiempo_estimado && (
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock size={13} />
            <span>Tiempo de fabricación: <strong className="text-foreground">{telar.tiempo_estimado}</strong></span>
          </div>
        )}

        <button
          onClick={() => setExpandido(!expandido)}
          className="flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
        >
          {expandido ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          {expandido ? "Ocultar instrucciones" : "Ver cómo fabricarlo"}
        </button>

        {expandido && (
          <div className="space-y-4 pt-2 border-t border-border">
            {telar.materiales_fabricacion?.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Wrench size={14} className="text-muted-foreground" />
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Materiales necesarios</p>
                </div>
                <ul className="space-y-1">
                  {telar.materiales_fabricacion.map((m, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="text-muted-foreground mt-0.5">•</span>
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {telar.pasos_fabricacion?.length > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Pasos de fabricación</p>
                <ol className="space-y-3">
                  {telar.pasos_fabricacion.map((paso, i) => (
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

export default function Telares() {
  const [telares, setTelares] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [filtro, setFiltro] = useState("Todos");

  useEffect(() => {
    base44.entities.Telar.list().then(data => { setTelares(data); setCargando(false); });
  }, []);

  const niveles = ["Todos", "Principiante", "Intermedio", "Avanzado"];
  const filtrados = filtro === "Todos" ? telares : telares.filter(t => t.nivel_dificultad === filtro);

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold">Tipos de Telares</h1>
        <p className="text-muted-foreground text-sm mt-1">Aprende sobre cada telar y cómo fabricarlo tú mismo.</p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {niveles.map(n => (
          <button
            key={n}
            onClick={() => setFiltro(n)}
            className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors
              ${filtro === n ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}
          >
            {n}
          </button>
        ))}
      </div>

      {cargando ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => <div key={i} className="h-48 bg-muted animate-pulse rounded-2xl" />)}
        </div>
      ) : (
        <div className="space-y-4">
          {filtrados.map(t => <TelarCard key={t.id} telar={t} />)}
        </div>
      )}
    </div>
  );
}