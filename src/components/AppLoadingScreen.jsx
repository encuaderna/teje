import React, { useState, useEffect } from "react";

export default function AppLoadingScreen() {
  const [progress, setProgress] = useState(10);

  useEffect(() => {
    // Simula progreso que avanza rápido al inicio y se frena antes del 90%
    const intervals = [
      { delay: 100, value: 30 },
      { delay: 400, value: 55 },
      { delay: 900, value: 72 },
      { delay: 1600, value: 85 },
      { delay: 2800, value: 90 },
    ];
    const timers = intervals.map(({ delay, value }) =>
      setTimeout(() => setProgress(value), delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="fixed inset-0 bg-background flex flex-col items-center justify-center px-8 gap-10">
      {/* Logo + título */}
      <div className="flex flex-col items-center gap-3">
        <span className="text-5xl animate-bounce" role="img" aria-label="telar">🧶</span>
        <h1 className="font-heading text-2xl font-semibold text-foreground tracking-tight">Guía de Telares</h1>
      </div>

      {/* Barra de progreso */}
      <div className="w-full max-w-xs space-y-2">
        <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground text-center">Preparando tu guía…</p>
      </div>

      {/* Skeleton cards */}
      <div className="w-full max-w-xs space-y-3">
        {[80, 60, 70].map((w, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-muted animate-pulse flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-3 rounded-full bg-muted animate-pulse" style={{ width: `${w}%` }} />
              <div className="h-2.5 rounded-full bg-muted/60 animate-pulse" style={{ width: `${w - 20}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}