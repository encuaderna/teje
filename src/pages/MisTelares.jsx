import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { Heart, Clock, Star, Trash2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

// Favoritos y recientes guardados en localStorage
function getFavoritos() {
  try { return JSON.parse(localStorage.getItem("telares_favoritos") || "[]"); } catch { return []; }
}
function saveFavoritos(ids) {
  localStorage.setItem("telares_favoritos", JSON.stringify(ids));
}
function getRecientes() {
  try { return JSON.parse(localStorage.getItem("telares_recientes") || "[]"); } catch { return []; }
}

const nivelColor = {
  Principiante: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300",
  Intermedio: "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300",
  Avanzado: "bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300",
};

function TelarMini({ telar, onQuitarFav }) {
  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden flex gap-0 shadow-sm">
      {telar.imagen_url && (
        <img src={telar.imagen_url} alt={telar.nombre} className="w-24 h-24 object-cover flex-shrink-0" />
      )}
      <div className="p-4 flex-1 min-w-0 space-y-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-heading text-sm font-semibold text-foreground leading-tight line-clamp-2">{telar.nombre}</h3>
          {onQuitarFav && (
            <button onClick={() => onQuitarFav(telar.id)} className="text-muted-foreground hover:text-destructive transition-colors flex-shrink-0" aria-label="Quitar de favoritos">
              <Trash2 size={14} />
            </button>
          )}
        </div>
        {telar.nivel_dificultad && (
          <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full ${nivelColor[telar.nivel_dificultad]}`}>
            {telar.nivel_dificultad}
          </span>
        )}
        {telar.tipo && <p className="text-xs text-muted-foreground">{telar.tipo}</p>}
      </div>
    </div>
  );
}

export default function MisTelares() {
  const [telares, setTelares] = useState([]);
  const [favoritos, setFavoritos] = useState(getFavoritos);
  const [recientes, setRecientes] = useState(getRecientes);
  const [cargando, setCargando] = useState(true);
  const [tab, setTab] = useState("favoritos");

  useEffect(() => {
    base44.entities.Telar.list().then(data => {
      setTelares(data);
      setCargando(false);
    });
  }, []);

  const quitarFavorito = (id) => {
    const nuevos = favoritos.filter(f => f !== id);
    setFavoritos(nuevos);
    saveFavoritos(nuevos);
  };

  const telaresById = Object.fromEntries(telares.map(t => [t.id, t]));
  const favoritosData = favoritos.map(id => telaresById[id]).filter(Boolean);
  const recientesData = recientes.map(id => telaresById[id]).filter(Boolean);

  return (
    <div className="max-w-xl mx-auto px-4 py-8 space-y-6">
      <div>
        <h1 className="font-heading text-3xl font-semibold text-foreground">Mis Telares</h1>
        <p className="text-muted-foreground text-sm mt-1">Tus favoritos y los que visitaste recientemente.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-border">
        <button
          onClick={() => setTab("favoritos")}
          className={`flex items-center gap-2 pb-3 px-1 text-sm font-semibold border-b-2 transition-colors -mb-px
            ${tab === "favoritos" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
        >
          <Heart size={14} /> Favoritos
          {favoritosData.length > 0 && (
            <span className="bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">{favoritosData.length}</span>
          )}
        </button>
        <button
          onClick={() => setTab("recientes")}
          className={`flex items-center gap-2 pb-3 px-1 text-sm font-semibold border-b-2 transition-colors -mb-px
            ${tab === "recientes" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
        >
          <Clock size={14} /> Vistos recientemente
          {recientesData.length > 0 && (
            <span className="bg-muted text-muted-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">{recientesData.length}</span>
          )}
        </button>
      </div>

      {cargando ? (
        <div className="space-y-3">{[1, 2, 3].map(i => <div key={i} className="h-24 bg-muted animate-pulse rounded-2xl" />)}</div>
      ) : tab === "favoritos" ? (
        favoritosData.length === 0 ? (
          <div className="text-center py-16 border-2 border-dashed border-border rounded-2xl space-y-3">
            <Heart size={32} className="mx-auto text-muted-foreground/40" />
            <p className="text-muted-foreground text-sm">Aún no tenés favoritos.</p>
            <p className="text-muted-foreground text-xs">Tocá el ❤️ en cualquier ficha de telar para guardarlo aquí.</p>
            <Link to="/telares" className="inline-flex items-center gap-2 mt-2 text-sm text-primary font-semibold hover:underline">
              Explorar telares <ArrowRight size={13} />
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {favoritosData.map(t => <TelarMini key={t.id} telar={t} onQuitarFav={quitarFavorito} />)}
          </div>
        )
      ) : (
        recientesData.length === 0 ? (
          <div className="text-center py-16 border-2 border-dashed border-border rounded-2xl space-y-3">
            <Clock size={32} className="mx-auto text-muted-foreground/40" />
            <p className="text-muted-foreground text-sm">No hay telares visitados recientemente.</p>
            <Link to="/telares" className="inline-flex items-center gap-2 mt-2 text-sm text-primary font-semibold hover:underline">
              Explorar telares <ArrowRight size={13} />
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {recientesData.map(t => <TelarMini key={t.id} telar={t} />)}
          </div>
        )
      )}
    </div>
  );
}