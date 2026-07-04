import React, { useState, useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Home, BookOpen, Layers, AlertTriangle, Package, User, Moon, Sun, NotebookPen, Heart, Scale, BookMarked } from "lucide-react";

const navItems = [
  { to: "/", icon: Home, label: "Inicio" },
  { to: "/telares", icon: Layers, label: "Telares" },
  { to: "/proyectos", icon: BookOpen, label: "Proyectos" },
  { to: "/materiales", icon: Package, label: "Materiales" },
  { to: "/mis-telares", icon: Heart, label: "Mis Telares" },
  { to: "/glosario", icon: BookMarked, label: "Glosario" },
  { to: "/perfil", icon: User, label: "Perfil" },
];

export default function Layout() {
  const location = useLocation();
  const [dark, setDark] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("tema") === "oscuro" ||
        (!localStorage.getItem("tema") && window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
    return false;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("tema", dark ? "oscuro" : "claro");
  }, [dark]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">

      {/* Header desktop */}
      <header className="hidden md:flex items-center justify-between px-8 py-3 border-b border-border bg-card sticky top-0 z-40 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="text-2xl" role="img" aria-label="telar">🧶</span>
          <span className="font-heading text-xl font-semibold text-foreground tracking-tight">Guía de Telares</span>
        </div>
        <nav aria-label="Navegación principal" className="flex items-center gap-1">
          {navItems.map(({ to, icon: Icon, label }) => {
            const active = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                aria-current={active ? "page" : undefined}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all
                  ${active
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"}`}
              >
                <Icon size={16} aria-hidden="true" />
                {label}
              </Link>
            );
          })}
        </nav>
        <button
          onClick={() => setDark(!dark)}
          className="p-2.5 rounded-xl hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
          aria-label={dark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
        >
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </header>

      {/* Mobile header */}
      <header className="md:hidden flex items-center justify-between px-4 py-3 border-b border-border bg-card sticky top-0 z-40 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-xl" role="img" aria-label="telar">🧶</span>
          <span className="font-heading text-base font-semibold">Guía de Telares</span>
        </div>
        <button
          onClick={() => setDark(!dark)}
          className="p-2.5 rounded-xl hover:bg-muted transition-colors text-muted-foreground"
          aria-label={dark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
        >
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </header>

      {/* Main */}
      <main className="flex-1 pb-24 md:pb-8" id="main-content">
        <Outlet />
      </main>

      {/* Bottom nav mobile */}
      <nav
        aria-label="Navegación móvil"
        className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-40 flex safe-area-pb"
      >
        {navItems.map(({ to, icon: Icon, label }) => {
          const active = location.pathname === to;
          return (
            <Link
              key={to}
              to={to}
              aria-current={active ? "page" : undefined}
              className={`flex-1 flex flex-col items-center justify-center py-2.5 gap-1 transition-colors min-h-[56px]
                ${active ? "text-primary" : "text-muted-foreground"}`}
            >
              <Icon size={22} aria-hidden="true" />
              <span className="text-[10px] font-medium leading-none">{label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}