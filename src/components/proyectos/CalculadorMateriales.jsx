import React, { useState, useMemo } from "react";
import { Calculator } from "lucide-react";

// Factores de escala por tipo de proyecto (metros de hilo por cm² de tejido)
// urdimbre: m/cm de ancho por cm de largo | trama: m/cm de largo por cm de ancho
const FACTORES_BASE = {
  default:      { urdimbre: 0.12, trama: 0.10, unidad: "m de hilo total" },
  bufanda:      { urdimbre: 0.14, trama: 0.12, unidad: "m de lana" },
  tapiz:        { urdimbre: 0.10, trama: 0.15, unidad: "m de hilo" },
  posavasos:    { urdimbre: 0.18, trama: 0.18, unidad: "m de hilo" },
  bolso:        { urdimbre: 0.13, trama: 0.13, unidad: "m de hilo" },
  manta:        { urdimbre: 0.16, trama: 0.14, unidad: "m de lana gruesa" },
  tapete:       { urdimbre: 0.12, trama: 0.14, unidad: "m de hilo" },
  camino:       { urdimbre: 0.11, trama: 0.13, unidad: "m de hilo" },
  marcapaginas: { urdimbre: 0.20, trama: 0.20, unidad: "m de hilo fino" },
  calcetines:   { urdimbre: 0.00, trama: 0.28, unidad: "m de lana para calcetines" },
  cinta:        { urdimbre: 0.30, trama: 0.18, unidad: "m de hilo fino" },
};

// Detecta el tipo según el título del proyecto
function detectarTipo(titulo) {
  const t = titulo?.toLowerCase() || "";
  if (t.includes("bufanda")) return "bufanda";
  if (t.includes("tapiz")) return "tapiz";
  if (t.includes("posavasos")) return "posavasos";
  if (t.includes("bolso")) return "bolso";
  if (t.includes("manta")) return "manta";
  if (t.includes("tapete") || t.includes("alfombra")) return "tapete";
  if (t.includes("camino")) return "camino";
  if (t.includes("marcapáginas") || t.includes("marcapaginas")) return "marcapaginas";
  if (t.includes("calcetín") || t.includes("calcetin")) return "calcetines";
  if (t.includes("cinta") || t.includes("vikingo")) return "cinta";
  return "default";
}

// Tamaños predefinidos sugeridos por tipo
const TAMAÑOS_SUGERIDOS = {
  bufanda:      [{ label: "Infantil", ancho: 12, largo: 80 }, { label: "Adulto estándar", ancho: 18, largo: 150 }, { label: "Extra largo", ancho: 22, largo: 200 }],
  tapiz:        [{ label: "Mini decorativo", ancho: 20, largo: 30 }, { label: "Mediano", ancho: 40, largo: 60 }, { label: "Grande", ancho: 60, largo: 90 }],
  posavasos:    [{ label: "Pequeño", ancho: 10, largo: 10 }, { label: "Estándar", ancho: 12, largo: 12 }, { label: "Grande", ancho: 15, largo: 15 }],
  bolso:        [{ label: "Cartera mini", ancho: 20, largo: 15 }, { label: "Bolso mediano", ancho: 30, largo: 25 }, { label: "Bolso grande", ancho: 40, largo: 35 }],
  manta:        [{ label: "Bebé", ancho: 60, largo: 80 }, { label: "Individual", ancho: 130, largo: 180 }, { label: "Matrimonial", ancho: 180, largo: 220 }],
  tapete:       [{ label: "Pequeño", ancho: 30, largo: 45 }, { label: "Mediano", ancho: 50, largo: 80 }, { label: "Grande", ancho: 80, largo: 120 }],
  camino:       [{ label: "Corto", ancho: 30, largo: 80 }, { label: "Estándar", ancho: 35, largo: 140 }, { label: "Largo", ancho: 40, largo: 200 }],
  marcapaginas: [{ label: "Estándar", ancho: 5, largo: 18 }, { label: "Ancho", ancho: 7, largo: 20 }],
  calcetines:   [{ label: "Bebé", ancho: 6, largo: 12 }, { label: "Niño/a", ancho: 8, largo: 18 }, { label: "Adulto", ancho: 10, largo: 24 }],
  cinta:        [{ label: "Pulsera", ancho: 2, largo: 20 }, { label: "Cinta decorativa", ancho: 3, largo: 100 }, { label: "Cinturón", ancho: 4, largo: 90 }],
  default:      [{ label: "Pequeño", ancho: 20, largo: 20 }, { label: "Mediano", ancho: 40, largo: 40 }, { label: "Grande", ancho: 60, largo: 60 }],
};

function fmt(n) {
  return n >= 1000 ? `${(n / 1000).toFixed(1)} kg` : `${Math.round(n)} g`;
}

export default function CalculadorMateriales({ proyecto }) {
  const tipo = detectarTipo(proyecto.titulo);
  const factores = FACTORES_BASE[tipo];
  const sugeridos = TAMAÑOS_SUGERIDOS[tipo] || TAMAÑOS_SUGERIDOS.default;

  const [ancho, setAncho] = useState(sugeridos[0].ancho);
  const [largo, setLargo] = useState(sugeridos[0].largo);
  const [abierto, setAbierto] = useState(false);

  const resultado = useMemo(() => {
    const a = parseFloat(ancho) || 0;
    const l = parseFloat(largo) || 0;
    const metrosUrdimbre = factores.urdimbre * a * l;
    const metrosTrama = factores.trama * a * l;
    const total = metrosUrdimbre + metrosTrama;

    // Estimación de gramos: ~3.5 g/m hilo fino, ~6 g/m lana estándar, ~10 g/m lana gruesa
    const gxm = tipo === "manta" ? 10 : tipo === "calcetines" ? 4 : 6;
    const gramos = total * gxm;
    const ovillos = Math.ceil(gramos / 100); // ovillos de ~100g

    // Hilos de urdimbre (cada hilo va y vuelve = 2 * largo + margen 20 cm)
    const separacion = tipo === "cinta" ? 0.3 : tipo === "marcapaginas" ? 0.2 : 0.5; // cm entre hilos
    const numHilos = Math.round(a / separacion);
    const largoUrdimbre = l + 40; // cm (+ 20cm cada extremo para nudos)

    return { total: total.toFixed(1), gramos: Math.round(gramos), ovillos, numHilos, largoUrdimbre, ancho: a, largo: l };
  }, [ancho, largo, factores, tipo]);

  return (
    <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-2xl overflow-hidden">
      <button
        onClick={() => setAbierto(!abierto)}
        className="w-full flex items-center gap-3 p-4 text-left hover:bg-blue-100 dark:hover:bg-blue-950/30 transition-colors"
        aria-expanded={abierto}
      >
        <Calculator size={18} className="text-blue-600 dark:text-blue-400 flex-shrink-0" />
        <div className="flex-1">
          <p className="text-sm font-semibold text-blue-800 dark:text-blue-300">Calculador de materiales</p>
          <p className="text-xs text-blue-600 dark:text-blue-400">Ingresá las medidas de tu pieza</p>
        </div>
        <span className="text-blue-500 text-lg">{abierto ? "▲" : "▼"}</span>
      </button>

      {abierto && (
        <div className="px-4 pb-5 space-y-4 border-t border-blue-200 dark:border-blue-800">

          {/* Tamaños sugeridos */}
          <div className="pt-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-blue-700 dark:text-blue-400 mb-2">Tamaños sugeridos</p>
            <div className="flex flex-wrap gap-2">
              {sugeridos.map((s, i) => (
                <button
                  key={i}
                  onClick={() => { setAncho(s.ancho); setLargo(s.largo); }}
                  className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-colors
                    ${ancho === s.ancho && largo === s.largo
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-700 hover:bg-blue-100"}`}
                >
                  {s.label} ({s.ancho}×{s.largo} cm)
                </button>
              ))}
            </div>
          </div>

          {/* Inputs personalizados */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-blue-700 dark:text-blue-400 mb-2">O ingresá tus medidas</p>
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="text-xs text-blue-600 dark:text-blue-400 mb-1 block">Ancho (cm)</label>
                <input
                  type="number"
                  min="1"
                  max="300"
                  value={ancho}
                  onChange={e => setAncho(e.target.value)}
                  className="w-full text-sm rounded-lg border border-blue-300 dark:border-blue-700 bg-white dark:bg-blue-950/40 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-foreground"
                />
              </div>
              <div className="flex-1">
                <label className="text-xs text-blue-600 dark:text-blue-400 mb-1 block">Largo (cm)</label>
                <input
                  type="number"
                  min="1"
                  max="500"
                  value={largo}
                  onChange={e => setLargo(e.target.value)}
                  className="w-full text-sm rounded-lg border border-blue-300 dark:border-blue-700 bg-white dark:bg-blue-950/40 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-foreground"
                />
              </div>
            </div>
          </div>

          {/* Resultados */}
          {resultado.ancho > 0 && resultado.largo > 0 && (
            <div className="bg-white dark:bg-blue-950/40 rounded-xl p-4 space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400">
                Estimación para {resultado.ancho} × {resultado.largo} cm
              </p>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold font-heading text-blue-700 dark:text-blue-300">{resultado.total}</p>
                  <p className="text-xs text-blue-600 dark:text-blue-400 mt-0.5">{factores.unidad}</p>
                </div>
                <div className="bg-amber-50 dark:bg-amber-900/30 rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold font-heading text-amber-700 dark:text-amber-300">{resultado.ovillos}</p>
                  <p className="text-xs text-amber-600 dark:text-amber-400 mt-0.5">ovillos de ~100 g</p>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-blue-700 dark:text-blue-300">
                <div className="flex justify-between">
                  <span className="text-blue-500">Peso estimado</span>
                  <span className="font-semibold">{fmt(resultado.gramos)}</span>
                </div>
                {factores.urdimbre > 0 && (
                  <div className="flex justify-between">
                    <span className="text-blue-500">Hilos de urdimbre</span>
                    <span className="font-semibold">~{resultado.numHilos} hilos</span>
                  </div>
                )}
                {factores.urdimbre > 0 && (
                  <div className="flex justify-between">
                    <span className="text-blue-500">Largo por hilo de urdimbre</span>
                    <span className="font-semibold">{resultado.largoUrdimbre} cm</span>
                  </div>
                )}
              </div>

              <p className="text-xs text-blue-500 dark:text-blue-500 leading-relaxed pt-1 border-t border-blue-100 dark:border-blue-800">
                * Estimación orientativa. Añadí un 10–15% extra por nudos, flecos y errores.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}