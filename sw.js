/* ============================================
   Service Worker — Cache-first strategy
   Caches all pages, CSS, JS, and audio
   ============================================ */

const CACHE_NAME = 'vcquiz-v3';

/* Base path — auto-detect from SW scope */
const BASE = self.registration.scope;

/* Core assets cached on install (relative to scope) */
const CORE_ASSETS = [
  '',
  'index.html',
  'holding.html',
  'unlock.html',
  'instructions.html',
  'question.html',
  'css/style.css',
  'js/app.js',
  'js/data.js',
  'js/preload.js',
  'js/question.js',
  'js/unlock.js',
  'round-intro.html',
].map(p => BASE + p);

/* Install — cache core assets */
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(CORE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

/* Activate — clean old caches */
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

/* Fetch strategy:
   - Audio files: cache-first (large, rarely change)
   - Everything else: network-first (so updates deploy immediately) */
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;

  const url = e.request.url;

  if (isAudioFile(url)) {
    // Cache-first for audio
    e.respondWith(
      caches.match(e.request).then(cached => {
        if (cached) return cached;
        return fetch(e.request).then(resp => {
          if (resp.ok) {
            const clone = resp.clone();
            caches.open(CACHE_NAME).then(c => c.put(e.request, clone));
          }
          return resp;
        });
      }).catch(() => caches.match(e.request))
    );
  } else {
    // Network-first for pages, CSS, JS
    e.respondWith(
      fetch(e.request).then(resp => {
        if (resp.ok) {
          const clone = resp.clone();
          caches.open(CACHE_NAME).then(c => c.put(e.request, clone));
        }
        return resp;
      }).catch(() => {
        return caches.match(e.request).then(cached => {
          if (cached) return cached;
          if (e.request.mode === 'navigate') {
            return caches.match(BASE + 'index.html');
          }
        });
      })
    );
  }
});

/* Check if URL is an audio file */
function isAudioFile(url) {
  return url.endsWith('.mp3') || url.endsWith('.wav') || url.endsWith('.ogg');
}

/* Message handler — preload audio files on demand */
self.addEventListener('message', (e) => {
  if (e.data && e.data.type === 'PRELOAD_AUDIO') {
    const urls = e.data.urls || [];
    e.waitUntil(
      caches.open(CACHE_NAME).then(cache =>
        Promise.allSettled(
          urls.map(url =>
            cache.match(url).then(existing => {
              if (existing) return; // Already cached
              return fetch(url).then(resp => {
                if (resp.ok) return cache.put(url, resp);
              });
            })
          )
        ).then(results => {
          // Report back to page
          e.source.postMessage({
            type: 'PRELOAD_COMPLETE',
            total: urls.length,
            cached: results.filter(r => r.status === 'fulfilled').length,
          });
        })
      )
    );
  }
});
