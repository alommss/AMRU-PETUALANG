// Mode tampilan: 'home' | 'intro' | 'play' | 'end'
// Disimpan di atribut data-mode pada <body>, dipakai CSS untuk
// menampilkan/menyembunyikan home screen dan tombol kontrol.
export function setMode(m) {
  document.body.dataset.mode = m;
}
