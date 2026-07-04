import React, { useState, useEffect } from "react";
import { Plus, Trash2, Save, ChevronDown, ChevronUp } from "lucide-react";

const STORAGE_KEY = "telares_notas";

function getNow() {
  return new Date().toLocaleDateString("es-CL", { day: "2-digit", month: "short", year: "numeric" });
}

function loadNotas() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); } catch { return []; }
}

function saveNotas(notas) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notas));
}

function NotaCard({ nota, onDelete, onSave }) {
  const [expandida, setExpandida] = useState(false);
  const [texto, setTexto] = useState(nota.texto);

  const handleSave = () => {
    onSave(nota.id, texto);
    setExpandida(false);
  };

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden">
      <button
        onClick={() => setExpandida(!expandida)}
        className="w-full flex items-center justify-between gap-3 p-4 text-left"
      >
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm text-foreground truncate">{nota.titulo}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{nota.fecha}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(nota.id); }}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
            aria-label="Eliminar nota"
          >
            <Trash2 size={14} />
          </button>
          {expandida ? <ChevronUp size={16} className="text-muted-foreground" /> : <ChevronDown size={16} className="text-muted-foreground" />}
        </div>
      </button>

      {expandida && (
        <div className="px-4 pb-4 space-y-3 border-t border-border pt-3">
          <textarea
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            rows={6}
            placeholder="Escribe tus notas, patrones o avances aquí…"
            className="w-full text-sm bg-muted rounded-xl px-3 py-2.5 text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors"
          >
            <Save size={14} /> Guardar
          </button>
        </div>
      )}
    </div>
  );
}

export default function Notas() {
  const [notas, setNotas] = useState(loadNotas);
  const [nuevoTitulo, setNuevoTitulo] = useState("");
  const [creando, setCreando] = useState(false);

  const handleCrear = () => {
    if (!nuevoTitulo.trim()) return;
    const nueva = { id: Date.now().toString(), titulo: nuevoTitulo.trim(), texto: "", fecha: getNow() };
    const actualizadas = [nueva, ...notas];
    setNotas(actualizadas);
    saveNotas(actualizadas);
    setNuevoTitulo("");
    setCreando(false);
  };

  const handleDelete = (id) => {
    const actualizadas = notas.filter(n => n.id !== id);
    setNotas(actualizadas);
    saveNotas(actualizadas);
  };

  const handleSave = (id, texto) => {
    const actualizadas = notas.map(n => n.id === id ? { ...n, texto } : n);
    setNotas(actualizadas);
    saveNotas(actualizadas);
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-8 space-y-6">
      <div>
        <h1 className="font-heading text-3xl font-semibold text-foreground">Mis Notas</h1>
        <p className="text-muted-foreground text-sm mt-1">Guardá patrones, avances y apuntes. Se guardan en tu dispositivo.</p>
      </div>

      {/* Nueva nota */}
      {creando ? (
        <div className="bg-card border border-primary/30 rounded-2xl p-4 space-y-3">
          <input
            type="text"
            autoFocus
            placeholder="Título de la nota…"
            value={nuevoTitulo}
            onChange={e => setNuevoTitulo(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") handleCrear(); if (e.key === "Escape") setCreando(false); }}
            className="w-full text-sm bg-muted rounded-xl px-3 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <div className="flex gap-2">
            <button onClick={handleCrear} className="flex-1 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">Crear</button>
            <button onClick={() => setCreando(false)} className="flex-1 py-2 rounded-xl bg-muted text-muted-foreground text-sm font-semibold hover:bg-muted/70 transition-colors">Cancelar</button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setCreando(true)}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl border-2 border-dashed border-border hover:border-primary/40 text-muted-foreground hover:text-primary text-sm font-semibold transition-colors"
        >
          <Plus size={18} /> Nueva nota
        </button>
      )}

      {notas.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground text-sm">
          Todavía no tenés notas. ¡Creá una para empezar!
        </div>
      ) : (
        <div className="space-y-3">
          {notas.map(nota => (
            <NotaCard key={nota.id} nota={nota} onDelete={handleDelete} onSave={handleSave} />
          ))}
        </div>
      )}
    </div>
  );
}