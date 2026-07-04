import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Layers, BookOpen, AlertTriangle, Package, ArrowRight, CheckCircle2, Clock, Circle } from "lucide-react";

const tips = [
  "La tensión uniforme es el secreto de un tejido perfecto. Practica en pequeños trozos antes de un proyecto grande.",
  "Antes de cortar el hilo, deja siempre una cola de 10 cm para rematar sin problemas.",
  "Empieza con hilos gruesos: son más fáciles de ver y de manipular que los hilos delgados.",
  "Un telar bien construido hace la mitad del trabajo. Revisa que los clavos estén parejos.",
  "No hay errores en el tejido, solo texturas inesperadas. ¡Aprende de cada pasada!",
];

const secciones = [
  { to: "/telares", icon: Layers, titulo: "Tipos de Telares", desc: "Conoce los distintos telares y aprende a fabricarlos", color: "bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800" },
  { to: "/proyectos", icon: BookOpen, titulo: "Proyectos", desc: "Proyectos por nivel: principiante a avanzado", color: "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800" },
  { to: "/errores", icon: AlertTriangle, titulo: "Errores Frecuentes", desc: "Aprende qué evitar y cómo corregir problemas comunes", color: "bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800" },
  { to: "/materiales", icon: Package, titulo: "Materiales", desc: "Guía de hilos, lanas y fibras para tejer", color: "bg-violet-50 dark:bg-violet-950/30 border-violet-200 dark:border-violet-800" },
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
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-8">
      {/* Bienvenida */}
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground font-medium">Bienvenida/o{user?.full_name ? `, ${user.full_name.split(" ")[0]}` : ""} 👋</p>
        <h1 className="font-heading text-3xl font-semibold text-foreground leading-tight">Guía de Telares<br />y Tejidos</h1>
        <p className="text-muted-foreground text-sm mt-1">Tu guía paso a paso para aprender el arte del tejido artesanal.</p>
      </div>

      {/* Tip del día */}
      <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-2xl p-4">
        <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider mb-1">💡 Consejo del día</p>
        <p className="text-sm text-amber-900 dark:text-amber-200 leading-relaxed">{tip}</p>
      </div>

      {/* Resumen progreso */}
      {progresos.length > 0 && (
        <div className="bg-card border border-border rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-base font-semibold">Mi avance</h2>
            <Link to="/perfil" className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">Ver todo <ArrowRight size={12} /></Link>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-muted/50 rounded-xl p-3">
              <p className="text-2xl font-bold font-heading">{progresos.length}</p>
              <p className="text-xs text-muted-foreground">Total</p>
            </div>
            <div className="bg-emerald-50 dark:bg-emerald-950/30 rounded-xl p-3">
              <p className="text-2xl font-bold font-heading text-emerald-600 dark:text-emerald-400">{completados}</p>
              <p className="text-xs text-muted-foreground">Completados</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-950/30 rounded-xl p-3">
              <p className="text-2xl font-bold font-heading text-blue-600 dark:text-blue-400">{enProgreso}</p>
              <p className="text-xs text-muted-foreground">En progreso</p>
            </div>
          </div>
        </div>
      )}

      {/* Secciones */}
      <div className="space-y-2">
        <h2 className="font-heading text-base font-semibold">¿Qué quieres aprender hoy?</h2>
        <div className="grid grid-cols-1 gap-3">
          {secciones.map(({ to, icon: Icon, titulo, desc, color }) => (
            <Link key={to} to={to} className={`flex items-center gap-4 p-4 rounded-2xl border transition-all hover:scale-[1.01] active:scale-[0.99] ${color}`}>
              <div className="p-2.5 bg-white/60 dark:bg-white/10 rounded-xl">
                <Icon size={22} className="text-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-foreground">{titulo}</p>
                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{desc}</p>
              </div>
              <ArrowRight size={16} className="text-muted-foreground flex-shrink-0" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}