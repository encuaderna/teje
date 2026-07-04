import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Layers, BookOpen, AlertTriangle, Package, ArrowRight } from "lucide-react";

const tips = [
  "La tensión uniforme es el secreto de un tejido perfecto. Practica en trozos pequeños antes de un proyecto grande.",
  "Antes de cortar el hilo, deja siempre una cola de 10 cm para rematar sin problemas.",
  "Empieza con hilos gruesos: son más fáciles de ver y de manipular.",
  "Un telar bien construido hace la mitad del trabajo. Revisa que los clavos estén parejos.",
  "No hay errores en el tejido, solo texturas inesperadas. ¡Aprende de cada pasada!",
];

const secciones = [
  {
    to: "/telares",
    icon: Layers,
    titulo: "Tipos de Telares",
    desc: "Conoce los distintos telares y cómo fabricarlos",
    emoji: "🪡",
    bg: "bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800 hover:bg-amber-100 dark:hover:bg-amber-950/40",
    iconColor: "text-amber-700 dark:text-amber-400",
  },
  {
    to: "/proyectos",
    icon: BookOpen,
    titulo: "Proyectos",
    desc: "Paso a paso: principiante a avanzado",
    emoji: "📖",
    bg: "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-950/40",
    iconColor: "text-emerald-700 dark:text-emerald-400",
  },
  {
    to: "/errores",
    icon: AlertTriangle,
    titulo: "Errores Frecuentes",
    desc: "Aprende qué evitar y cómo corregir",
    emoji: "⚠️",
    bg: "bg-rose-50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800 hover:bg-rose-100 dark:hover:bg-rose-950/40",
    iconColor: "text-rose-700 dark:text-rose-400",
  },
  {
    to: "/materiales",
    icon: Package,
    titulo: "Materiales",
    desc: "Guía de hilos, lanas y fibras",
    emoji: "🎨",
    bg: "bg-violet-50 dark:bg-violet-950/20 border-violet-200 dark:border-violet-800 hover:bg-violet-100 dark:hover:bg-violet-950/40",
    iconColor: "text-violet-700 dark:text-violet-400",
  },
];

export default function Inicio() {
  const [progresos, setProgresos] = useState([]);
  const [tip] = useState(() => tips[Math.floor(Math.random() * tips.length)]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    base44.auth.me().then(setUser).catch(() => {});
    base44.entities.Proyecto.filter({}).then(setProgresos).catch(() => {});
  }, []);

  const completados = progresos.filter(p => p.estado === "Completado").length;
  const enProgreso = progresos.filter(p => p.estado === "En progreso").length;

  return (
    <div className="max-w-xl mx-auto px-4 py-8 space-y-8">

      {/* Bienvenida */}
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground font-medium">
          Bienvenida/o{user?.full_name ? `, ${user.full_name.split(" ")[0]}` : ""} 👋
        </p>
        <h1 className="font-heading text-3xl font-semibold text-foreground leading-tight">
          Guía de Telares<br />y Tejidos
        </h1>
        <p className="text-muted-foreground text-sm mt-1 leading-relaxed">
          Tu guía paso a paso para aprender el arte del tejido artesanal.
        </p>
      </div>

      {/* Tip del día */}
      <div className="bg-accent border border-amber-200 dark:border-amber-800 rounded-2xl p-5">
        <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">💡 Consejo del día</p>
        <p className="text-sm text-foreground leading-relaxed">{tip}</p>
      </div>

      {/* Resumen progreso */}
      {progresos.length > 0 && (
        <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-base font-semibold">Mi avance</h2>
            <Link
              to="/perfil"
              className="text-xs text-primary hover:text-primary/80 font-medium flex items-center gap-1 underline-offset-2 hover:underline"
            >
              Ver todo <ArrowRight size={12} aria-hidden="true" />
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-muted/60 rounded-xl p-3">
              <p className="text-2xl font-bold font-heading text-foreground">{progresos.length}</p>
              <p className="text-xs text-muted-foreground mt-0.5">Total</p>
            </div>
            <div className="bg-emerald-50 dark:bg-emerald-950/30 rounded-xl p-3">
              <p className="text-2xl font-bold font-heading text-emerald-700 dark:text-emerald-400">{completados}</p>
              <p className="text-xs text-muted-foreground mt-0.5">Completados</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-950/30 rounded-xl p-3">
              <p className="text-2xl font-bold font-heading text-blue-700 dark:text-blue-400">{enProgreso}</p>
              <p className="text-xs text-muted-foreground mt-0.5">En progreso</p>
            </div>
          </div>
        </div>
      )}

      {/* Secciones principales */}
      <div className="space-y-3">
        <h2 className="font-heading text-base font-semibold text-foreground">¿Qué querés aprender hoy?</h2>
        <div className="grid grid-cols-1 gap-3">
          {secciones.map(({ to, icon: Icon, titulo, desc, emoji, bg, iconColor }) => (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-4 p-4 rounded-2xl border transition-all active:scale-[0.98] ${bg}`}
            >
              <div className="text-2xl w-10 text-center flex-shrink-0" aria-hidden="true">{emoji}</div>
              <div className="flex-1 min-w-0">
                <p className={`font-semibold text-sm ${iconColor}`}>{titulo}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
              </div>
              <ArrowRight size={16} className="text-muted-foreground flex-shrink-0" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}