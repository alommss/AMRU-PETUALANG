// Service worker: network-first (selalu ambil versi terbaru, cache hanya cadangan offline).
// Naikkan VERSION tiap rilis supaya cache lama dibersihkan.
const VERSION = 'v3';
const CACHE = 'amru-' + VERSION;
const FILES = [
  './', './index.html', './manifest.json', './style.css',
  './main.js', './state.js', './config.js', './dialog.js', './audio.js',
  './player.js', './npc.js', './gfx.js', './character.js', './world.js',
  './scene.js', './game.js', './input.js', './ui.js',
  './icon-192.png', './icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES.map(u => new Request(u, { cache: 'reload' })))));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request).then(res => {
      if (res.ok || res.type === 'opaque') {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy));
      }
      return res;
    }).catch(() => caches.match(e.request))
  );
});
