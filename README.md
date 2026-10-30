# 🧢 Amru Petualang

Game platformer 2D sederhana yang dimainkan di HP (mode landscape). Dibuat dengan HTML5 Canvas + JavaScript murni, tanpa library.

## Cara main
- **HP**: miringkan layar, pakai tombol ◀ ▶ untuk jalan dan ▲ untuk lompat. Tap layar untuk lanjut dialog.
- **Komputer**: panah / `A` `D` untuk jalan, `W` / `↑` / `Spasi` untuk lompat, `Enter` untuk lanjut dialog.

## Jalankan lokal
Game memakai ES modules, jadi harus lewat server lokal (tidak bisa klik dua kali `index.html`):

```bash
python3 -m http.server 8000
# buka http://localhost:8000
```

## Deploy ke GitHub Pages
Settings → Pages → Source: `main` branch, folder `/ (root)`.

## Struktur
```
index.html        halaman utama
css/style.css     tampilan tombol & layar rotate
js/main.js        entry point & game loop
js/state.js       state bersama + canvas
js/game.js        logika update, reset, mulai
js/scene.js       render satu frame
js/character.js   gambar karakter
js/world.js       rumah & pohon
js/npc.js         daftar NPC
js/dialog.js      teks dialog
js/audio.js       efek suara
js/input.js       sentuh & keyboard
manifest.json     PWA (install ke HP)
sw.js             service worker (offline)
```

## Rencana
- [ ] Level lebih banyak (data level di `assets/levels/`)
- [ ] Musuh & rintangan
- [ ] Item / koin
- [ ] Save progress

## Lisensi
MIT, lihat [LICENSE](LICENSE).
