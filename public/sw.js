const CACHE_NAME = 'telares-v1';

// Recursos del shell de la app a cachear en la instalación
const SHELL_URLS = [
  '/',
  '/telares',
  '/proyectos',
  '/materiales',
  '/errores',
  '/perfil',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(SHELL_URLS).catch(() => {});
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Solo manejar peticiones del mismo origen
  if (url.origin !== self.location.origin) return;

  // Estrategia: Network first, fallback a cache
  event.respondWith(
    fetch(request)
      .then((response) => {
        // Cachear respuestas exitosas de navegación y assets estáticos
        if (response.ok && (request.mode === 'navigate' || request.destination === 'script' || request.destination === 'style' || request.destination === 'font')) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
        }
        return response;
      })
      .catch(() => {
        // Sin red: devolver desde caché
        return caches.match(request).then((cached) => {
          if (cached) return cached;
          // Para navegación SPA, devolver el index
          if (request.mode === 'navigate') {
            return caches.match('/');
          }
        });
      })
  );
});
