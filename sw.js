const VERSION = 'v1';
const CACHE = 'amru-' + VERSION;
const FILES = [
  './', './index.html', './manifest.json', './style.css',
  './main.js', './state.js', './config.js', './dialog.js', './audio.js',
  './player.js', './npc.js', './gfx.js', './character.js', './world.js',
  './scene.js', './game.js', './input.js',
  './icon-192.png', './icon-512.png'
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