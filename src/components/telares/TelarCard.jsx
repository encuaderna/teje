import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronDown, ChevronUp, Wrench, Package, Heart, Eye,
  ArrowRight, ThumbsUp, ThumbsDown, Clock, Lightbulb, AlertTriangle, ListOrdered
} from "lucide-react";

// Datos pedagógicos estáticos por nombre de telar
const DATOS_EXTRA = {
  "Telar de Cartón": {
    tiempo_estimado: "30–60 min",
    ventajas: ["Sin costo o muy bajo", "Material casero (caja de pizza)", "Perfecto para niños", "No necesita herramientas especiales"],
    limitaciones: ["Solo piezas pequeñas", "El cartón se desgasta con el uso", "Urdimbre limitada en cantidad de hilos"],
    consejo_inicial: "Empieza con lana gruesa y colores llamativos para ver el tejido más fácilmente.",
  },
  "Telar de Bastidor": {
    tiempo_estimado: "2–4 horas (fabricación)",
    ventajas: ["Muy versátil para tapices y telas", "Se puede fabricar en cualquier tamaño", "Resistente y duradero"],
    limitaciones: ["Requiere herramientas básicas de carpintería", "Necesita más inversión inicial de tiempo"],
    consejo_inicial: "Verifica con escuadra que el marco quede en 90° exactos antes de clavar los clavos.",
  },
  "Telar Circular o Redondo": {
    tiempo_estimado: "15–30 min (tejido simple)",
    ventajas: ["Portátil y económico", "Produce formas circulares únicas", "Ideal para mandalas y apliques"],
    limitaciones: ["Solo produce piezas redondas", "Tamaño fijo según el aro", "Difícil escalar el tamaño del proyecto"],
    consejo_inicial: "Usa siempre un número impar de radios para que el patrón alternado funcione sin interrupciones.",
  },
  "Telar de Peine Rígido": {
    tiempo_estimado: "1–3 horas (bufanda completa)",
    ventajas: ["Ultra portátil", "Produce tela continua rápido", "Ideal para proyectos lineales largos"],
    limitaciones: ["Ancho de tela limitado al peine", "Solo una calada por vez", "Diseños de tejido simples"],
    consejo_inicial: "Fija siempre la urdimbre a dos puntos fijos (silla + cintura) para mantener tensión uniforme.",
  },
  "Telar María": {
    tiempo_estimado: "4–8 horas (fabricación)",
    ventajas: ["Produce telas más anchas que el bastidor", "Mayor control del diseño", "Muy usado en talleres artesanales"],
    limitaciones: ["Fabricación más compleja", "Requiere espacio mayor", "Curva de aprendizaje en los lizos"],
    consejo_inicial: "Cuida que los lizos queden todos a la misma altura y con igual tensión antes de empezar.",
  },
  "Telar Mapuche": {
    tiempo_estimado: "Semanas a meses (pieza completa)",
    ventajas: ["Produce textiles de altísima calidad", "Permite diseños geométricos complejos", "Patrimonio cultural inmaterial"],
    limitaciones: ["Técnica de aprendizaje muy lento", "Requiere espacio y materiales específicos", "No apto para principiantes sin guía"],
    consejo_inicial: "Aprende primero los tejidos básicos en un telar más simple antes de acercarte a esta técnica.",
  },
  "Telar Vikingo": {
    tiempo_estimado: "2–5 horas (cinta decorativa)",
    ventajas: ["Produce cintas y trenzas únicas", "Técnica histórica fascinante", "Portátil y sin estructura fija"],
    limitaciones: ["Coordinación de tablillas requiere práctica", "Solo produce piezas estrechas", "Difícil de dominar sin práctica previa"],
    consejo_inicial: "Numera tus tablillas con lápiz antes de comenzar para no perder la secuencia de giro.",
  },
  "Telar de Clavijas para Mantas": {
    tiempo_estimado: "2–6 horas (manta grande)",
    ventajas: ["Permite piezas grandes con lana gruesa", "Muy rápido y vistoso", "Fácil de aprender aunque sea grande"],
    limitaciones: ["Solo para lanas o hebras muy gruesas", "El tejido es menos denso y firme", "Difícil de usar para prendas de vestir"],
    consejo_inicial: "Usa una lana súper gruesa o doble hebra para que el proyecto avance rápido y se vea voluminoso.",
  },
  "Telar Huck Weaving (Brioche)": {
    tiempo_estimado: "Horas a días (pieza mediana)",
    ventajas: ["Produce texturas tridimensionales únicas", "Tejido estructurado muy estético", "Excelente para prendas premium"],
    limitaciones: ["Técnica compleja de enhebrado", "Requiere mucha concentración", "No recomendable sin experiencia previa"],
    consejo_inicial: "Diseña el patrón en papel cuadriculado antes de enhebrar — así evitás errores costosos en el tejido.",
  },
  "Telar Circular para Calcetines": {
    tiempo_estimado: "3–6 horas (par de calcetines)",
    ventajas: ["Produce calcetines en tubo sin costuras", "Muy eficiente para producción en serie", "Fascinante mecánica circular"],
    limitaciones: ["De mayor inversión que otros telares", "Requiere ajuste preciso de agujas", "Curva de aprendizaje técnico inicial"],
    consejo_inicial: "Haz siempre algunas vueltas de prueba con lana de descarte antes de empezar el proyecto real.",
  },
};

const nivelConfig = {
  Principiante: { cls: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300", emoji: "🌱" },
  Intermedio:   { cls: "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300",   emoji: "🌿" },
  Avanzado:     { cls: "bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300",        emoji: "🌺" },
};

function InfoRow({ icon: Icon, label, children, color = "text-muted-foreground" }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-1.5">
        <Icon size={13} className={color} aria-hidden="true" />
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{label}</p>
      </div>
      {children}
    </div>
  );
}

export default function TelarCard({ telar, favoritos, onToggleFav, vistos, onVisto }) {
  const [expandido, setExpandido] = useState(false);
  const nivel = nivelConfig[telar.nivel_dificultad] || nivelConfig.Principiante;
  const esFav = favoritos.includes(telar.id);
  const visto = vistos.includes(telar.id);
  const extra = DATOS_EXTRA[telar.nombre] || {};

  const handleExpand = () => {
    const nuevo = !expandido;
    setExpandido(nuevo);
    if (nuevo) {
      onVisto(telar.id);
    }
  };

  return (
    <article className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">

      {/* Imagen + badges superpuestos */}
      <div className="relative">
        {telar.imagen_url ? (
          <img
            src={telar.imagen_url}
            alt={`Imagen de ${telar.nombre}`}
            className="w-full h-44 object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-20 bg-muted flex items-center justify-center">
            <span className="text-3xl">🧶</span>
          </div>
        )}

        {/* Favorito */}
        <button
          onClick={(e) => { e.stopPropagation(); onToggleFav(telar.id); }}
          aria-label={esFav ? "Quitar de favoritos" : "Guardar en favoritos"}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center shadow-lg transition-all
            ${esFav ? "bg-rose-500 text-white" : "bg-black/40 text-white hover:bg-rose-500"}`}
        >
          <Heart size={16} fill={esFav ? "currentColor" : "none"} />
        </button>

        {/* Visto */}
        {visto && (
          <div className="absolute top-3 left-3 bg-emerald-500/90 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
            <Eye size={11} aria-hidden="true" /> Estudiado
          </div>
        )}

        {/* Nivel en imagen si hay foto */}
        {telar.imagen_url && (
          <div className="absolute bottom-3 left-3">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 ${nivel.cls} shadow`}>
              <span aria-hidden="true">{nivel.emoji}</span> {telar.nivel_dificultad}
            </span>
          </div>
        )}
      </div>

      <div className="p-5 space-y-4">

        {/* Encabezado */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h2 className="font-heading text-xl font-semibold text-foreground leading-tight">{telar.nombre}</h2>
            {telar.tipo && (
              <p className="text-xs text-muted-foreground mt-0.5 italic">{telar.tipo}</p>
            )}
          </div>
          {/* Nivel solo si no hay imagen (sino ya está en foto) */}
          {!telar.imagen_url && (
            <span className={`text-xs font-semibold px-3 py-1 rounded-full flex-shrink-0 flex items-center gap-1 ${nivel.cls}`}>
              <span aria-hidden="true">{nivel.emoji}</span> {telar.nivel_dificultad}
            </span>
          )}
        </div>

        {/* Descripción */}
        <p className="text-sm text-foreground/80 leading-relaxed">{telar.descripcion}</p>

        {/* Tiempo + usos — info clave escaneable */}
        <div className="flex flex-wrap gap-2 items-center">
          {extra.tiempo_estimado && (
            <span className="flex items-center gap-1.5 text-xs bg-muted px-2.5 py-1 rounded-full text-muted-foreground">
              <Clock size={11} aria-hidden="true" /> {extra.tiempo_estimado}
            </span>
          )}
          {telar.usos_recomendados?.slice(0, 3).map((uso, i) => (
            <span key={i} className="text-xs bg-muted px-2.5 py-1 rounded-full text-muted-foreground">{uso}</span>
          ))}
          {telar.usos_recomendados?.length > 3 && (
            <span className="text-xs text-muted-foreground">+{telar.usos_recomendados.length - 3} más</span>
          )}
        </div>

        {/* Ventajas / limitaciones — visible siempre */}
        {(extra.ventajas || extra.limitaciones) && (
          <div className="grid grid-cols-2 gap-2">
            {extra.ventajas && (
              <div className="bg-emerald-50 dark:bg-emerald-950/20 rounded-xl p-3 space-y-1.5">
                <div className="flex items-center gap-1">
                  <ThumbsUp size={12} className="text-emerald-600 dark:text-emerald-400" />
                  <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">Ventajas</p>
                </div>
                <ul className="space-y-0.5">
                  {extra.ventajas.slice(0, 2).map((v, i) => (
                    <li key={i} className="text-xs text-foreground/80 flex items-start gap-1">
                      <span className="text-emerald-500 mt-0.5 flex-shrink-0">•</span>{v}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {extra.limitaciones && (
              <div className="bg-amber-50 dark:bg-amber-950/20 rounded-xl p-3 space-y-1.5">
                <div className="flex items-center gap-1">
                  <ThumbsDown size={12} className="text-amber-600 dark:text-amber-400" />
                  <p className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">Limitaciones</p>
                </div>
                <ul className="space-y-0.5">
                  {extra.limitaciones.slice(0, 2).map((l, i) => (
                    <li key={i} className="text-xs text-foreground/80 flex items-start gap-1">
                      <span className="text-amber-500 mt-0.5 flex-shrink-0">•</span>{l}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Botón expandir */}
        <button
          onClick={handleExpand}
          aria-expanded={expandido}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary font-semibold text-sm transition-colors border border-primary/20 active:scale-[0.98]"
        >
          {expandido
            ? <><ChevronUp size={16} aria-hidden="true" /> Ocultar instrucciones</>
            : <><ChevronDown size={16} aria-hidden="true" /> Cómo fabricar este telar</>}
        </button>

        {/* Panel expandido */}
        {expandido && (
          <div className="space-y-5 pt-1 border-t border-border">

            {/* Consejo inicial */}
            {extra.consejo_inicial && (
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <Lightbulb size={13} className="text-primary" aria-hidden="true" />
                  <p className="text-xs font-bold text-primary uppercase tracking-wider">Consejo inicial</p>
                </div>
                <p className="text-sm text-foreground leading-relaxed">{extra.consejo_inicial}</p>
              </div>
            )}

            {/* Materiales */}
            {telar.materiales_necesarios?.length > 0 && (
              <InfoRow icon={Package} label="Materiales necesarios" color="text-amber-600 dark:text-amber-400">
                <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900 rounded-xl p-4">
                  <ul className="space-y-1.5" role="list">
                    {telar.materiales_necesarios.map((m, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                        <span className="text-amber-500 font-bold mt-0.5" aria-hidden="true">•</span>
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </InfoRow>
            )}

            {/* Herramientas */}
            {telar.herramientas_necesarias?.length > 0 && (
              <InfoRow icon={Wrench} label="Herramientas" color="text-muted-foreground">
                <div className="bg-muted/60 rounded-xl p-4">
                  <ul className="space-y-1.5" role="list">
                    {telar.herramientas_necesarias.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                        <span className="text-muted-foreground font-bold mt-0.5" aria-hidden="true">•</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </InfoRow>
            )}

            {/* Pasos */}
            {telar.pasos_fabricacion?.length > 0 && (
              <InfoRow icon={ListOrdered} label="Pasos de fabricación" color="text-primary">
                <ol className="space-y-3" role="list">
                  {telar.pasos_fabricacion.map((paso, i) => (
                    <li key={i} className="flex gap-3">
                      <span
                        className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold"
                        aria-label={`Paso ${i + 1}`}
                      >
                        {i + 1}
                      </span>
                      <p className="text-sm text-foreground leading-relaxed pt-0.5">{paso}</p>
                    </li>
                  ))}
                </ol>
              </InfoRow>
            )}

            {/* Consejo de armado */}
            {telar.consejos_armado && (
              <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900 rounded-xl p-4">
                <p className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider mb-1.5">💡 Consejo de armado</p>
                <p className="text-sm text-foreground leading-relaxed">{telar.consejos_armado}</p>
              </div>
            )}

            {/* Error frecuente principal */}
            {telar.errores_frecuentes && (
              <div className="bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900 rounded-xl p-4">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <AlertTriangle size={13} className="text-rose-600 dark:text-rose-400" aria-hidden="true" />
                  <p className="text-xs font-bold text-rose-800 dark:text-rose-300 uppercase tracking-wider">Error frecuente a evitar</p>
                </div>
                <p className="text-sm text-foreground leading-relaxed">{telar.errores_frecuentes}</p>
              </div>
            )}

            {/* Ventajas completas si hay más de 2 */}
            {extra.ventajas?.length > 2 && (
              <InfoRow icon={ThumbsUp} label="Todas las ventajas" color="text-emerald-600">
                <ul className="space-y-1">
                  {extra.ventajas.map((v, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                      <span className="text-emerald-500 mt-0.5">•</span>{v}
                    </li>
                  ))}
                </ul>
              </InfoRow>
            )}

            {/* Todos los usos */}
            {telar.usos_recomendados?.length > 0 && (
              <InfoRow icon={Package} label="Proyectos posibles" color="text-violet-600">
                <div className="flex flex-wrap gap-1.5">
                  {telar.usos_recomendados.map((uso, i) => (
                    <span key={i} className="text-xs bg-violet-50 dark:bg-violet-950/30 border border-violet-100 dark:border-violet-900 text-violet-700 dark:text-violet-300 px-2.5 py-1 rounded-full">{uso}</span>
                  ))}
                </div>
              </InfoRow>
            )}

            {/* CTA Proyectos */}
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold text-primary uppercase tracking-wider mb-0.5">¿Qué sigue?</p>
                <p className="text-sm text-foreground">Buscá un proyecto para practicar con este telar.</p>
              </div>
              <Link
                to="/proyectos"
                className="flex-shrink-0 flex items-center gap-1 text-primary font-semibold text-sm hover:underline"
              >
                Ver <ArrowRight size={13} aria-hidden="true" />
              </Link>
            </div>

          </div>
        )}
      </div>
    </article>
  );
}