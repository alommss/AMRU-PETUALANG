// Service worker sederhana (cache-first). Naikkan VERSION tiap rilis supaya cache ter-update.
const VERSION = 'v1';
const CACHE = 'amru-' + VERSION;
const FILES = [
  './', './index.html', './manifest.json', './css/style.css',
  './js/main.js', './js/state.js', './js/config.js', './js/dialog.js', './js/audio.js',
  './js/player.js', './js/npc.js', './js/gfx.js', './js/character.js', './js/world.js',
  './js/scene.js', './js/game.js', './js/input.js',
  './icons/icon-192.png', './icons/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
