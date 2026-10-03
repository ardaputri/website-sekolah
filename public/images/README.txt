DAFTAR FOTO STATIS — Website SMKN 4 Bogor
==========================================

Semua file di folder ini ikut ter-deploy (bukan bagian dari database),
jadi cukup menaruh file di sini dan foto akan langsung tampil.

PENTING: gunakan HURUF KECIL semua untuk nama file dan ekstensi (.jpg),
karena server hosting (Linux) membedakan huruf besar/kecil.
Contoh: "Hero-Lapangan.JPG" TIDAK akan ditemukan; gunakan "hero-lapangan.jpg".

Bila sebuah file belum ada, aplikasi otomatis menampilkan gambar
placeholder (kotak abu-abu) — halaman tidak akan rusak.


===========================================================
1. HALAMAN BERANDA (Home.jsx)
===========================================================

   hero-lapangan.jpg      -> foto utama Hero (landscape, mis. 1600x900)
   kepala-sekolah.jpg     -> foto Kepala Sekolah (potret, mis. 600x700)
   berita-technoupdate.jpg-> poster Juara 2 Technoupdate X HIMPACT 2025
   berita-uiux-lp3i.jpg   -> poster Juara 1 UI/UX Design LP3i Depok 2025


===========================================================
2. HALAMAN PROFIL (Profil.jsx)
===========================================================

   kepala-sekolah.jpg     -> dipakai ulang dari daftar di atas
   profil-sejarah.jpg     -> foto Sejarah Sekolah (landscape, mis. 800x600)


===========================================================
3. HALAMAN AKADEMIK (Akademik.jsx)
===========================================================

   akademik-pplg.jpg      -> program Pengembangan Perangkat Lunak dan Gim
   akademik-tjkt.jpg      -> program Teknik Jaringan Komputer & Telekomunikasi
   akademik-to.jpg        -> program Teknik Otomotif
   akademik-tp.jpg        -> program Teknik Pengelasan
   akademik-cta.jpg       -> foto ajakan "Kegiatan Belajar" di bagian bawah
   login-bg.jpg           -> latar halaman Login


===========================================================
4. HALAMAN KESISWAAN (Kesiswaan.jsx)
===========================================================

   kesiswaan-hero.jpg     -> foto besar Hero (landscape, mis. 800x600)
   kesiswaan-galeri-1.jpg -> Galeri Aktivitas 1
   kesiswaan-galeri-2.jpg -> Galeri Aktivitas 2
   kesiswaan-galeri-3.jpg -> Galeri Aktivitas 3


===========================================================
5. ORGANISASI SISWA (KesiswaanSeeder)
===========================================================

   organisasi-osis.jpg    -> kartu Organisasi OSIS
   organisasi-mpk.jpg     -> kartu Organisasi MPK


===========================================================
6. EKSTRAKURIKULER (KesiswaanSeeder)
===========================================================

   ekskul-pmr.jpg         -> Palang Merah Remaja
   ekskul-pramuka.jpg     -> Pramuka
   ekskul-rohis.jpg       -> Kerohanian Islam
   ekskul-paskibra.jpg    -> Paskibra
   ekskul-paduan-suara.jpg-> Paduan Suara
   ekskul-band-sekolah.jpg-> Band Sekolah


===========================================================
7. HALAMAN PRODUK (Produk.jsx / ProductSeeder)
===========================================================

   produk-hero.jpg        -> foto Hero halaman Produk
   produk-1.jpg           -> Website Portfolio Siswa
   produk-2.jpg           -> Aplikasi Manajemen Inventaris
   produk-3.jpg           -> Miniatur Jaringan Komputer
   produk-4.jpg           -> Sistem Informasi Akademik
   produk-5.jpg           -> Service Kit Otomotif Custom
   produk-6.jpg           -> Mobile App E-Library
   produk-7.jpg           -> Rak Server Mini
   produk-8.jpg           -> Dashboard Monitoring Jaringan
   produk-9.jpg           -> Karya Las Ornament Dekoratif


===========================================================
8. FOTO BERITA (NewsSeeder)
===========================================================
Foto untuk berita contoh yang otomatis dibuat seeder. Boleh diganti
dengan foto asli kegiatan; cukup pakai nama file yang sama.

   berita-technoupdate.jpg -> Juara 2 Technoupdate X HIMPACT 2025
   berita-uiux-lp3i.jpg    -> Juara 1 UI/UX Design LP3i Depok 2025
   berita-lks.jpg          -> Juara Umum LKS Kota Bogor
   berita-mpls.jpg         -> MPLS 2026
   berita-pancasila.jpg    -> Peringatan Hari Lahir Pancasila
   berita-qurban.jpg       -> Peringatan Idul Adha
   berita-bersih.jpg       -> Aksi Bersih-Bersih Lingkungan
   berita-saga.jpg         -> Peringatan Hari Sumpah Pemuda
   berita-penghargaan.jpg  -> Penghargaan Siswa Berprestasi
   berita-guru-digital.jpg -> Pelatihan Literasi Digital Guru
   berita-satyalencana.jpg -> Pengumuman PPDB 2027


===========================================================
CATATAN
===========================================================

- Foto yang di-unggah lewat Admin (Produk/Berita/Ekstrakurikuler) disimpan
  ke folder storage, BUKAN ke public/images. Di hosting, folder storage
  disimpan pada volume agar tidak hilang saat deploy.
- Setelah menambah file di sini, cukup refresh halaman (tidak perlu build
  ulang), karena file statis dibaca langsung dari folder public.
