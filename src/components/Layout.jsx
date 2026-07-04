import React, { useState, useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Home, BookOpen, Layers, AlertTriangle, Package, User, Moon, Sun } from "lucide-react";

const navItems = [
  { to: "/", icon: Home, label: "Inicio" },
  { to: "/telares", icon: Layers, label: "Telares" },
  { to: "/proyectos", icon: BookOpen, label: "Proyectos" },
  { to: "/errores", icon: AlertTriangle, label: "Errores" },
  { to: "/materiales", icon: Package, label: "Materiales" },
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
      <header className="hidden md:flex items-center justify-between px-8 py-4 border-b border-border bg-card sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🧶</span>
          <span className="font-heading text-xl font-semibold text-foreground tracking-tight">Guía de Telares</span>
        </div>
        <nav className="flex items-center gap-1">
          {navItems.map(({ to, icon: Icon, label }) => {
            const active = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
              >
                <Icon size={16} />
                {label}
              </Link>
            );
          })}
        </nav>
        <button
          onClick={() => setDark(!dark)}
          className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
          aria-label="Cambiar modo"
        >
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </header>

      {/* Mobile header */}
      <header className="md:hidden flex items-center justify-between px-4 py-3 border-b border-border bg-card sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <span className="text-xl">🧶</span>
          <span className="font-heading text-lg font-semibold">Guía de Telares</span>
        </div>
        <button
          onClick={() => setDark(!dark)}
          className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground"
          aria-label="Cambiar modo"
        >
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </header>

      {/* Main */}
      <main className="flex-1 pb-20 md:pb-0">
        <Outlet />
      </main>

      {/* Bottom nav mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-40 flex">
        {navItems.map(({ to, icon: Icon, label }) => {
          const active = location.pathname === to;
          return (
            <Link
              key={to}
              to={to}
              className={`flex-1 flex flex-col items-center justify-center py-2 gap-0.5 transition-colors
                ${active ? "text-primary" : "text-muted-foreground"}`}
            >
              <Icon size={20} />
              <span className="text-[10px] font-medium">{label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}