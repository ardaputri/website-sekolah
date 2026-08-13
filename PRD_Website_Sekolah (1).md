# **PRODUCT REQUIREMENTS DOCUMENT (PRD) Website Profil & Informasi Sekolah** 

Berbasis Laravel 12, React, dan MySQL 

_Dokumen Perencanaan Implementasi & Pengembangan Berkelanjutan_ 

|**Atribut**|**Keterangan**|
|---|---|
|Nama Proyek|Website Sekolah (Company/School Profle System)|
|Versi Dokumen|1.1 (Revisi berdasarkan review mockup UI/UX)|
|Tanggal|08 Agustus 2026|
|Status|Draf untuk Review|
|Nama Sekolah (Referensi Desain)|SMKN 4 Bogor|
|Tech Stack|Laravel 12 (Backend/API), React (Frontend), MySQL (Database)|
|Disusun Untuk|Tim Pengembang / Pemilik Proyek|



PRD – Website Sekolah (Laravel 12 + React + MySQL) 

## **Daftar Isi** 

Halaman 2 dari 15 

PRD – Website Sekolah (Laravel 12 + React + MySQL) 

## **1. Ringkasan Eksekutif** 

Dokumen ini merupakan Product Requirements Document (PRD) untuk pembangunan Website Sekolah yang berfungsi sebagai profil resmi, media informasi akademik dan kesiswaan, kanal 

berita/pengumuman, katalog produk, serta sistem manajemen konten melalui halaman admin. Website dibangun menggunakan arsitektur decoupled: Laravel 12 sebagai REST API/backend, React sebagai antarmuka pengguna (SPA/hybrid), dan MySQL sebagai basis data relasional. 

Tujuan utama dokumen ini adalah menyamakan pemahaman antara pemilik proyek dan tim pengembang mengenai ruang lingkup fitur, kebutuhan teknis, alur kerja, serta roadmap pengembangan lanjutan, sehingga proses implementasi dapat berjalan terarah, terukur, dan mudah dikembangkan di masa depan. 

#### **Nilai Utama Proyek** 

• Menjadi etalase digital resmi sekolah yang informatif dan mudah diakses publik. 

• Mempermudah pengelolaan konten (berita, akademik, kesiswaan) tanpa perlu keahlian teknis. 

• Membangun fondasi teknis yang skalabel untuk pengembangan fitur di masa depan (PPDB online, e- learning, dsb). 

## **2. Latar Belakang & Tujuan** 

### **2.1 Latar Belakang** 

Sekolah membutuhkan kanal digital resmi yang mampu menampilkan profil, kegiatan akademik, kegiatan kesiswaan, berita/prestasi, serta produk/layanan sekolah secara terpusat. Saat ini pengelolaan informasi kemungkinan masih tersebar atau manual, sehingga menyulitkan pembaruan konten secara berkala dan konsisten. 

### **2.2 Tujuan Proyek** 

1. Menyediakan platform informasi resmi sekolah yang profesional, responsif, dan mudah diakses dari berbagai perangkat. 

2. Memberikan kemudahan bagi admin/staf sekolah untuk mengelola konten (berita, akademik, kesiswaan, produk) secara mandiri melalui halaman admin. 

3. Meningkatkan citra dan kredibilitas sekolah di mata calon siswa, orang tua, dan masyarakat umum. 

4. Membangun arsitektur teknis yang modern, aman, dan siap dikembangkan untuk kebutuhan jangka panjang (contoh: PPDB online, LMS, portal alumni). 

### **2.3 Target Pengguna** 

|**Pengguna**|**Kebutuhan Utama**|
|---|---|
|Calon Siswa & Orang Tua|Informasi akademik, kesiswaan, berita, dan kontak sekolah|
|Siswa & Alumni|Informasi kegiatan, prestasi, organisasi/ekstrakurikuler|
|Masyarakat Umum / Mitra|Profl sekolah, produk/layanan, kontak|



Halaman 3 dari 15 

PRD – Website Sekolah (Laravel 12 + React + MySQL) 

|**Pengguna**|**Kebutuhan Utama**|
|---|---|
|Admin / Staf Tata Usaha|Mengelola konten website (CRUD berita, akademik, produk, dll)|
|Kepala Sekolah / Pimpinan|Memantau informasi yang tayang, laporan pesan masuk|



## **3. Ruang Lingkup Proyek** 

### **3.1 Dalam Lingkup (In-Scope) – Rilis Pertama (MVP)** 

- ●Halaman Beranda (landing page dengan highlight informasi). 

- ●Halaman Akademik (kompetensi keahlian, kurikulum, tenaga pendidik, jadwal, kalender akademik, sarana & prasarana). 

- ●Halaman Kesiswaan (Organisasi Siswa & Ekstrakurikuler). 

- ●Halaman Berita dengan kategori: Semua, Prestasi, Kegiatan, Pengumuman, termasuk halaman Detail Berita. 

- ●Halaman Kontak (Alamat, Telepon, Jam Kerja, Email, Form Kirim Pesan). 

- ●Halaman Produk (katalog produk/layanan sekolah, misal hasil karya siswa, unit usaha, atau brosur PPDB), termasuk halaman Detail Produk. 

- ●Sistem Login (autentikasi untuk admin/staf, termasuk opsi Google SSO khusus domain sekolah). 

- ●Halaman Admin (dashboard manajemen seluruh konten di atas, termasuk manajemen pesan masuk dari halaman Kontak). 

#### **Pembaruan v1.1 — Hasil Review Mockup UI/UX** 

• Mockup desain (SMKN 4 Bogor) telah direview dan sebagian besar sejalan dengan ruang lingkup PRD versi 1.0. 

• Ditambahkan secara eksplisit: halaman Detail Berita dan Detail Produk (sebelumnya implisit, kini menjadi kebutuhan wajib karena mockup mengarahkan tombol 'Lihat Detail' ke halaman ini). 

• Ditambahkan cakupan admin yang sebelumnya belum tervisualisasikan di mockup: Kelola Kesiswaan, Kelola Produk, dan Kelola Pesan Masuk — ketiganya tetap bagian dari fitur wajib dan kini ditegaskan agar tidak terlewat saat implementasi. 

• Detail lengkap hasil review per halaman ada pada dokumen terpisah 'Review Mockup UI/UX — Website SMKN 4 Bogor'. 

### **3.2 Luar Lingkup (Out of Scope) – Tidak termasuk rilis pertama** 

- ●Sistem PPDB (Penerimaan Peserta Didik Baru) online dengan pembayaran. 

- ●Learning Management System (LMS) / e-learning. 

- ●Aplikasi mobile native (Android/iOS). 

- ●Integrasi payment gateway. 

Catatan: item-item ini direkomendasikan sebagai fitur pengembangan lanjutan pada Bagian 9 (Roadmap Pengembangan). 

Halaman 4 dari 15 

PRD – Website Sekolah (Laravel 12 + React + MySQL) 

## **4. Tumpukan Teknologi (Tech Stack) & Arsitektur** 

### **4.1 Ringkasan Teknologi** 

|**Layer**|**Teknologi**|**Keterangan**|
|---|---|---|
|Backend / API|Laravel 12 (PHP 8.3+)|REST API, autentkasi, business logic,<br>query builder/Eloquent ORM|
|Frontend|React (Vite) + Tailwind CSS|SPA/hybrid, konsumsi REST API,<br>komponen reusable|
|Database|MySQL 8.x|Penyimpanan data relasional|
|Autentkasi|Laravel Sanctum|Token-based auth untuk SPA React &<br>proteksi API admin|
|Storage|Laravel Storage (lokal / S3-compatble)|Penyimpanan gambar berita, dokumen,<br>foto produk|
|Web Server|Nginx / Apache + PHP-FPM|Produksi|
|Cache & Queue|Redis (opsional)|Cache halaman, notfkasi email antrian|
|Version Control|Git (GitHub/GitLab)|Kolaborasi tm & CI/CD|



### **4.2 Pola Arsitektur** 

Aplikasi menggunakan pola decoupled/headless: Laravel 12 berperan sebagai API backend yang menyediakan endpoint REST (JSON), sedangkan React menjadi Single Page Application (atau hybrid dengan SSR/Inertia jika dibutuhkan SEO lebih baik) yang mengonsumsi API tersebut. Komunikasi antar layer menggunakan format JSON dengan autentikasi berbasis token (Sanctum) untuk area admin. 

#### **Rekomendasi Teknis** 

• Pertimbangkan Inertia.js atau Next.js jika SEO (mesin pencari) menjadi prioritas tinggi, karena React murni (CSR) kurang optimal untuk SEO tanpa SSR/prerendering. 

• Gunakan Laravel Sanctum (bukan Passport) karena lebih ringan untuk kasus SPA + API sederhana seperti ini. 

• Terapkan API Resource (Laravel API Resources) agar response JSON konsisten dan mudah di-maintain. 

## **5. Peran Pengguna & Hak Akses (User Roles)** 

|**Peran**|**Hak Akses**|
|---|---|
|Pengunjung (Guest)|Melihat seluruh halaman publik, mengirim pesan lewat form kontak|
|Admin|Login ke dashboard, CRUD berita/akademik/kesiswaan/produk, kelola pesan<br>masuk|
|Super Admin|Semua hak Admin + kelola akun pengguna admin lain, kelola pengaturan situs<br>(setng global)|



Halaman 5 dari 15 

PRD – Website Sekolah (Laravel 12 + React + MySQL) 

_Rekomendasi: siapkan struktur role & permission (misal menggunakan package spatie/laravelpermission) sejak awal, walau saat ini hanya 2 role, agar mudah menambah peran baru (contoh: Editor Berita, Operator Akademik) di kemudian hari tanpa refactor besar._ 

## **6. Kebutuhan Fungsional (Functional Requirements)** 

Bagian ini merinci setiap fitur wajib beserta sub-fitur, deskripsi, dan tingkat prioritas. 

#### **6.1  Beranda** 

Halaman utama yang menjadi pintu masuk pengunjung, menampilkan ringkasan informasi terpenting sekolah secara menarik. 

|**Sub-Fitur**|**Deskripsi**|**Prioritas**|
|---|---|---|
|Hero Banner|Slider/banner utama berisi info unggulan, PPDB, atau visi<br>sekolah|Wajib (Must Have)|
|Sambutan<br>Kepala<br>Sekolah|Foto & kutpan singkat sambutan|Opsional (Nice to Have)|
|Statstk<br>Singkat|Jumlah siswa, guru, prestasi, tahun berdiri (angka berjalan)|Pentng (Should Have)|
|Badge<br>Akreditasi|Status akreditasi resmi sekolah (mis. Terakreditasi A/Unggul<br>BAN-SM) sebagai trust signal|Pentng (Should Have)|
|Ringkasan<br>Kompetensi<br>Keahlian|Card singkat 4 jurusan/kompetensi keahlian sebagai entry<br>point cepat ke halaman Akademik|Pentng (Should Have)|
|Berita Terbaru|3–4 berita terbaru dengan tautan ke halaman Berita|Wajib (Must Have)|
|Highlight<br>Ekstrakurikule<br>r|Cuplikan kegiatan kesiswaan populer|Pentng (Should Have)|
|Testmoni<br>Alumni|Kutpan/kisah sukses alumni di dunia kerja atau wirausaha,<br>dengan foto & data asli (bukan data duplikat)|Opsional (Nice to Have)|
|Logo Mitra<br>DUDI|Deretan logo mitra Dunia Usaha/Dunia Industri atau tempat<br>magang untuk memperkuat citra keterserapan kerja|Opsional (Nice to Have)|
|Call to Acton|Tombol menuju Kontak/PPDB/Produk|Wajib (Must Have)|



#### **6.2  Akademik** 

Menyajikan informasi seputar proses belajar-mengajar, kurikulum, dan jenjang/program yang tersedia. 

|**Sub-Fitur**|**Deskripsi**|**Prioritas**|
|---|---|---|
|Profl<br>Kurikulum|Deskripsi kurikulum yang digunakan (mis. Kurikulum<br>Merdeka), termasuk badge sertfkasi kompetensi (BNSP,|Wajib (Must Have)|



Halaman 6 dari 15 

PRD – Website Sekolah (Laravel 12 + React + MySQL) 

|**Sub-Fitur**|**Deskripsi**|**Prioritas**|
|---|---|---|
||dsb)||
|Kompetensi<br>Keahlian|Dafar kompetensi keahlian/jurusan beserta deskripsi singkat|Wajib (Must Have)|
|Detail<br>Kompetensi<br>Keahlian|Halaman detail per jurusan: kurikulum spesifk, mata<br>pelajaran, prospek karier, alat/lab yang dipakai|Wajib (Must Have)|
|Jadwal<br>Pelajaran|Tabel jadwal per kelas/kompetensi keahlian, dapat diflter<br>berdasarkan kelas|Wajib (Must Have)|
|Kalender<br>Akademik|Jadwal tahun ajaran & agenda ujian (terpisah dari jadwal<br>pelajaran mingguan), unduh fle PDF|Pentng (Should Have)|
|Tenaga<br>Pendidik|Dafar guru/tenaga pengajar dengan foto asli,<br>dikelompokkan per kompetensi keahlian|Pentng (Should Have)|
|Sarana &<br>Prasarana|Galeri fasilitas: laboratorium, perpustakaan, sarana<br>pendukung per jurusan|Pentng (Should Have)|
|Struktur<br>Organisasi<br>Sekolah|Bagan struktur kelembagaan sekolah untuk transparansi|Opsional (Nice to Have)|
|**6.3  Kesiswaan (**<br>Menampilkan w<br>**Sub-Fitur**|**Organisasi & Ekstrakurikuler)**<br>adah pengembangan minat, bakat, dan kepemimpinan siswa.<br>**Deskripsi**|**Prioritas**|
|Organisasi<br>Siswa|Profl OSIS/organisasi siswa, struktur kepengurusan terbaru<br>lengkap dengan foto, program kerja|Wajib (Must Have)|
|Dafar<br>Ekstrakurikule<br>r|List ekskul dengan deskripsi unik per ekskul (bukan hasil<br>copy-paste antar ekskul), jadwal lathan, dan nama pembina|Wajib (Must Have)|
|Alur<br>Pendafaran|Informasi cara mendafar ekskul/organisasi, khususnya untuk<br>siswa baru|Pentng (Should Have)|
|Galeri<br>Kegiatan|Foto/dokumentasi kegiatan tap ekskul/organisasi (mult-<br>foto/carousel, bukan hanya 1 gambar)|Pentng (Should Have)|
|Prestasi<br>Terkait|Tautan otomats ke berita kategori Prestasi yang relevan per<br>ekskul|Opsional (Nice to Have)|



#### **6.3  Kesiswaan (Organisasi & Ekstrakurikuler)** 

Menampilkan wadah pengembangan minat, bakat, dan kepemimpinan siswa. 

#### **6.4  Berita** 

Kanal informasi resmi sekolah dengan sistem kategori agar pengunjung dapat menyaring konten sesuai minat. 

Halaman 7 dari 15 

PRD – Website Sekolah (Laravel 12 + React + MySQL) 

|**Sub-Fitur**|**Deskripsi**|**Prioritas**|
|---|---|---|
|Semua Berita|Listng seluruh berita dengan paginasi & pencarian|Wajib (Must Have)|
|Kategori:<br>Prestasi|Filter berita prestasi siswa/sekolah|Wajib (Must Have)|
|Kategori:<br>Kegiatan|Filter berita kegiatan sekolah (acara, kunjungan, dll)|Wajib (Must Have)|
|Kategori:<br>Pengumuman|Filter pengumuman resmi (libur, jadwal ujian, dll)|Wajib (Must Have)|
|Detail Berita|Halaman detail dengan gambar, isi, tanggal, penulis, share ke<br>medsos|Wajib (Must Have)|
|Pencarian &<br>Tag|Cari berita berdasarkan kata kunci/tag|Pentng (Should Have)|
|Komentar|Kolom komentar pembaca (dengan moderasi)|Opsional (Nice to Have)|



#### **6.5  Kontak** 

Memudahkan komunikasi dua arah antara pengunjung dan pihak sekolah. 

|**Sub-Fitur**|**Deskripsi**|**Prioritas**|
|---|---|---|
|Alamat|Alamat lengkap + peta lokasi (Google Maps embed)|Wajib (Must Have)|
|Telepon|Nomor telepon/WhatsApp sekolah (klik untuk hubungi)|Wajib (Must Have)|
|Jam Kerja|Jadwal operasional (hari & jam layanan)|Wajib (Must Have)|
|Email|Alamat email resmi sekolah|Wajib (Must Have)|
|Form Kirim<br>Pesan|Form nama, email, subjek, pesan → tersimpan di admin &<br>kirim notfkasi email|Wajib (Must Have)|
|Media Sosial|Tautan ke Instagram/Facebook/YouTube sekolah|Pentng (Should Have)|



#### **6.6  Produk** 

Katalog produk atau layanan sekolah, misalnya hasil karya siswa (unit produksi), merchandise, atau brosur/paket informasi. 

|**Sub-Fitur**|**Deskripsi**|**Prioritas**|
|---|---|---|
|Listng Produk|Grid produk dengan gambar, nama, harga (jika relevan),<br>status (Tersedia/Segera Hadir/Terjual)|Wajib (Must Have)|
|Detail Produk|Halaman deskripsi lengkap per produk: galeri foto,<br>spesifkasi, kelas/kompetensi keahlian pembuat|Wajib (Must Have)|
|Filter<br>Kompetensi|Filter produk berdasarkan jurusan pembuat (mis. PPLG, TKJ,<br>Otomotf, Pemesinan), selain flter jenis produk|Pentng (Should Have)|



Halaman 8 dari 15 

PRD – Website Sekolah (Laravel 12 + React + MySQL) 

|**Sub-Fitur**|**Deskripsi**|**Prioritas**|
|---|---|---|
|Keahlian|||
|Kategori<br>Produk|Pengelompokan produk (misal: Merchandise, Karya Siswa,<br>Unit Usaha)|Pentng (Should Have)|
|Kontak<br>Pemesanan|Tombol hubungi via WhatsApp/email untuk pemesanan<br>(tanpa checkout online)|Pentng (Should Have)|



#### **6.7  Login & Autentikasi** 

Mekanisme masuk bagi admin/staf untuk mengakses halaman admin secara aman. 

|**Sub-Fitur**|**Deskripsi**|**Prioritas**|
|---|---|---|
|Form Login|Email/username + password dengan validasi|Wajib (Must Have)|
|Lupa<br>Password|Reset password via email|Wajib (Must Have)|
|Proteksi<br>Brute-force|Rate limitng percobaan login|Wajib (Must Have)|
|Session/Token<br>Management|Menggunakan Laravel Sanctum, auto-logout saat token<br>kedaluwarsa|Wajib (Must Have)|
|Two-Factor<br>Authentcato<br>n|Lapisan keamanan tambahan untuk akun admin|Opsional (Nice to Have)|



#### **6.8  Halaman Admin (Dashboard CMS)** 

Panel manajemen terpusat bagi admin untuk mengelola seluruh konten website tanpa menyentuh kode. 

|**Sub-Fitur**|**Deskripsi**|**Prioritas**|
|---|---|---|
|Dashboard<br>Ringkasan|Statstk jumlah berita, pesan masuk belum dibaca, produk<br>aktf, grafk tren pengunjung website|Wajib (Must Have)|
|Manajemen<br>Berita|CRUD berita + kategori, upload gambar, status<br>publish/draf/terjadwal, flter & pencarian, aksi massal|Wajib (Must Have)|
|Manajemen<br>Akademik|CRUD kompetensi keahlian, kurikulum, jadwal pelajaran<br>(dengan flter kelas)|Wajib (Must Have)|
|Manajemen<br>Tenaga<br>Pendidik|CRUD data guru/tenaga pengajar: foto, nama, bidang ajar,<br>kompetensi keahlian terkait|Wajib (Must Have)|
|Manajemen<br>Kalender<br>Akademik|CRUD agenda tahun ajaran & jadwal ujian, terpisah dari<br>jadwal pelajaran mingguan|Pentng (Should Have)|
|Manajemen|CRUD galeri fasilitas/laboratorium per kompetensi keahlian|Pentng (Should Have)|



Halaman 9 dari 15 

PRD – Website Sekolah (Laravel 12 + React + MySQL) 

|**Sub-Fitur**|**Deskripsi**|**Prioritas**|
|---|---|---|
|Sarana &<br>Prasarana|||
|Manajemen<br>Kesiswaan|CRUD organisasi & ekstrakurikuler beserta galeri, jadwal<br>lathan, dan data pembina|Wajib (Must Have)|
|Manajemen<br>Produk|CRUD produk, kategori, dan flter kompetensi keahlian<br>pembuat|Wajib (Must Have)|
|Manajemen<br>Pesan Masuk|Lihat, balas (via email), tandai status baca/belum dibaca<br>pesan dari form Kontak|Wajib (Must Have)|
|Manajemen<br>Pengguna<br>Admin|Tambah/edit/nonaktfan akun admin (khusus Super Admin)|Pentng (Should Have)|
|Pengaturan<br>Situs (Setngs)|Kelola data kontak, sosial media, SEO meta, logo, badge<br>akreditasi — dari 1 tempat|Pentng (Should Have)|
|Log Aktvitas|Riwayat perubahan konten oleh admin (audit trail)|Opsional (Nice to Have)|



## **7. Kebutuhan Non-Fungsional** 

|**Aspek**|**Kebutuhan**|
|---|---|
|Performa|Waktu muat halaman < 3 detk pada koneksi standar; gunakan lazy-loading<br>gambar & caching|
|Keamanan|Validasi input, proteksi CSRF/XSS/SQL Injecton, HTTPS wajib, hashing password<br>(bcrypt/argon2)|
|Skalabilitas|Struktur API modular agar mudah menambah ftur baru tanpa mengubah ftur<br>lama|
|Responsif|Tampilan optmal di desktop, tablet, dan mobile (mobile-frst design)|
|SEO|Meta ttle/descripton dinamis per halaman, sitemap.xml, struktur URL ramah<br>SEO|
|Aksesibilitas|Kontras warna memadai, alt-text gambar, navigasi ramah keyboard|
|Ketersediaan (Uptme)|Target uptme hostng minimal 99%|
|Backup|Backup database otomats harian/mingguan|
|Maintainability|Kode mengikut standar PSR-12 (PHP) & ESLint (React), dokumentasi API<br>(Swagger/Postman)|



## **8. Gambaran Struktur Basis Data (High-Level)** 

Berikut daftar entitas utama yang direkomendasikan sebagai titik awal perancangan skema database MySQL. Detail kolom dapat dikembangkan lebih lanjut pada tahap desain teknis. 

Halaman 10 dari 15 

PRD – Website Sekolah (Laravel 12 + React + MySQL) 

|**Tabel**|**Deskripsi Singkat**|
|---|---|
|users|Data akun admin/super admin (nama, email, password, role)|
|roles & permissions|Pengelolaan hak akses (jika memakai spate/laravel-permission)|
|news (berita)|Judul, slug, isi, gambar, status, tanggal publish|
|news_categories|Kategori berita: Prestasi, Kegiatan, Pengumuman|
|news_category_pivot|Relasi many-to-many berita ↔ kategori|
|academic_programs|Data program/jurusan/jenjang akademik|
|academic_calendar|Item kalender akademik (nama kegiatan, tanggal, fle lampiran)|
|organizatons|Data organisasi siswa (OSIS, dsb)|
|extracurriculars|Data ekstrakurikuler (nama, deskripsi, jadwal, pembina)|
|gallery|Foto kegiatan (relasi ke organisasi/ekskul/berita)|
|products|Data produk (nama, deskripsi, harga, gambar, kategori)|
|product_categories|Kategori produk|
|contact_messages|Pesan masuk dari form kontak (nama, email, subjek, isi, status baca)|
|site_setngs|Pengaturan umum situs (alamat, telepon, jam kerja, email, sosial media,<br>dsb) berbentuk key-value|
|actvity_logs|Log aktvitas admin (opsional, untuk audit trail)|



## **9. Roadmap Pengembangan** 

Pengembangan disarankan dilakukan bertahap agar cepat menghasilkan produk yang dapat digunakan (MVP), lalu disempurnakan secara iteratif. 

### **Fase 1 — MVP (Minimum Viable Product)** 

- ●Setup arsitektur Laravel 12 (API) + React + MySQL, autentikasi Sanctum. 

- ●Implementasi 8 fitur wajib: Beranda, Akademik, Kesiswaan, Berita, Kontak, Produk, Login, Halaman Admin. 

- ●Desain UI/UX responsif dasar mengikuti identitas visual sekolah (logo, warna, tipografi). 

- ●Deployment awal ke server staging untuk uji coba internal. 

### **Fase 2 — Penyempurnaan & Optimasi** 

- ●Optimasi SEO (meta tag dinamis, sitemap, Open Graph untuk share media sosial). 

- ●Penambahan sistem pencarian global (search across berita, produk, akademik). 

- ●Integrasi Google Analytics untuk memantau trafik pengunjung. 

- ●Penambahan multi-bahasa (Indonesia/Inggris) jika target audiens internasional. 

Halaman 11 dari 15 

PRD – Website Sekolah (Laravel 12 + React + MySQL) 

- ●Peningkatan keamanan: reCAPTCHA, rate limiting, 2FA untuk admin. 

### **Fase 3 — Pengembangan Fitur Lanjutan** 

- ●PPDB Online: pendaftaran siswa baru dengan upload dokumen & tracking status. 

- ●Portal Alumni: database alumni & forum komunikasi. 

- ●E-Learning ringan / LMS sederhana (materi, tugas, pengumuman kelas). 

- ●Integrasi pembayaran (contoh: pembelian produk/merchandise, biaya PPDB) via payment gateway (Midtrans/Xendit). 

- ●Aplikasi mobile companion (opsional, menggunakan React Native agar reuse logic dari React). 

- ●Notifikasi push/email untuk berita & pengumuman terbaru (newsletter subscriber). 

- ●Dashboard analitik konten (berita paling banyak dibaca, produk paling diminati, dll). 

## **10. Saran & Rekomendasi Pengembangan** 

Berikut sejumlah masukan tambahan di luar fitur wajib yang dapat meningkatkan kualitas dan daya saing website: 

### **10.1 Dari Sisi Produk & Konten** 

- ●Tambahkan halaman 'Tentang Kami' terpisah (Visi Misi, Sejarah, Struktur Organisasi Sekolah) agar Beranda tidak terlalu padat. 

- ●Sediakan halaman 'FAQ' untuk pertanyaan umum calon siswa/orang tua (biaya, jadwal, syarat pendaftaran). 

- ●Buat halaman khusus 'PPDB/Pendaftaran' meski masih berupa informasi statis di Fase 1, sebagai persiapan Fase 3. 

- ●Sertakan testimoni dari orang tua/siswa/alumni untuk membangun kepercayaan. 

### **10.2 Dari Sisi UX/UI** 

- ●Gunakan desain mobile-first karena mayoritas pengunjung website sekolah mengakses dari HP. 

- ●Konsisten gunakan skeleton loading / spinner saat data dari API sedang dimuat agar terasa responsif. 

- ●Sediakan mode pencarian cepat (search bar) di navbar untuk berita dan produk. 

- ●Pastikan navigasi (menu) sederhana, maksimal 2 level, agar mudah dijelajahi. 

### **10.3 Dari Sisi Teknis** 

- ●Terapkan CI/CD sederhana (GitHub Actions) untuk otomatisasi testing & deployment. 

- ●Gunakan environment terpisah: local, staging, production, agar perubahan tidak langsung berdampak ke pengunjung. 

- ●Tulis automated testing minimal untuk fitur kritikal: login, form kontak, CRUD berita (PHPUnit/Pest untuk backend, Jest/Vitest untuk frontend). 

- ●Gunakan image optimization (WebP, resize otomatis saat upload) agar halaman tetap ringan. 

Halaman 12 dari 15 

PRD – Website Sekolah (Laravel 12 + React + MySQL) 

- ●Pertimbangkan CDN (Cloudflare) untuk mempercepat akses aset statis dan menambah lapisan keamanan (WAF, DDoS protection). 

- ●Dokumentasikan API dengan Postman Collection atau Swagger/OpenAPI agar frontend-backend development bisa paralel. 

### **10.4 Dari Sisi Keamanan & Kepatuhan** 

- ●Terapkan kebijakan privasi (Privacy Policy) khususnya terkait data pengunjung yang mengisi form kontak/PPDB. 

- ●Enkripsi data sensitif dan batasi akses admin sesuai prinsip least privilege. 

- ●Lakukan backup rutin dan simpan di lokasi terpisah dari server utama (off-site backup). 

### **10.5 Dari Sisi Pengelolaan Proyek** 

- ●Gunakan metodologi Agile/Scrum dengan sprint mingguan/dua-mingguan agar progres terukur. 

- ●Siapkan Style Guide/Design System (warna, komponen UI) sejak awal agar tampilan konsisten di semua halaman. 

- ●Lakukan User Acceptance Testing (UAT) bersama pihak sekolah sebelum go-live untuk memastikan alur admin mudah dipahami staf non-teknis. 

- ●Siapkan panduan penggunaan (manual book/video tutorial) halaman admin untuk staf sekolah. 

## **11. Risiko & Mitigasi** 

|**Risiko**|**Mitgasi**|
|---|---|
|SEO kurang optmal karena React CSR|Gunakan SSR/prerendering (Inerta.js/Next.js) atau meta tag dinamis +<br>prerender service|
|Admin non-teknis kesulitan mengisi<br>konten|Desain dashboard admin sederhana + sediakan panduan/tutorial|
|Spam pada form kontak|Terapkan reCAPTCHA & rate limitng|
|Kebocoran data/keamanan|Terapkan best practce keamanan Laravel, audit berkala, backup rutn|
|Perubahan kebutuhan di tengah jalan|Terapkan pendekatan iteratf (Agile) dan validasi kebutuhan tap sprint|



## **12. Kriteria Keberhasilan (Success Metrics)** 

- ●Seluruh 8 fitur wajib berfungsi tanpa bug kritikal saat go-live. 

- ●Waktu muat halaman rata-rata di bawah 3 detik. 

- ●Admin dapat menambah/mengubah konten (berita, produk, dll) tanpa bantuan developer. 

- ●Website dapat diakses dengan baik di perangkat mobile (skor mobile-friendly Google > 90). 

- ●Tidak ada insiden keamanan (data breach) dalam 6 bulan pertama setelah peluncuran. 

Halaman 13 dari 15 

PRD – Website Sekolah (Laravel 12 + React + MySQL) 

## **13. Penyesuaian Berdasarkan Review Mockup UI/UX** 

Setelah PRD versi 1.0 disusun, tim telah menerima dan mereview mockup desain UI/UX (referensi: SMKN 4 Bogor, 20 halaman) yang mencakup Panel Admin, Halaman Publik, dan Autentikasi. Bagian ini merangkum kesesuaian mockup terhadap PRD serta penyesuaian yang telah dimasukkan ke dalam dokumen versi 1.1 ini. Detail pembahasan per halaman tersedia pada dokumen terpisah 'Review Mockup UI/UX — Website SMKN 4 Bogor'. 

### **13.1 Kesimpulan Kesesuaian** 

Secara umum, struktur informasi pada mockup sudah sejalan dengan 8 fitur wajib pada PRD dan mencerminkan karakter SMK dengan baik (istilah kompetensi keahlian, showcase produk siswa, data keterserapan kerja). Beberapa penyesuaian tetap diperlukan sebagaimana dirangkum pada tabel berikut. 

|**Area**|**Temuan dari Mockup**|**Tindak Lanjut pada PRD v1.1**|
|---|---|---|
|Halaman Detail|Tombol 'Lihat Detail' pada Berita & Produk<br>belum memiliki halaman tujuan di mockup|Ditambahkan sebagai sub-ftur wajib:<br>Detail Berita (6.4) dan Detail Produk (6.6)|
|Menu Admin|Sidebar admin pada mockup baru mencakup<br>Dashboard, Berita, Akademik, Kesiswaan,<br>Produk|Ditegaskan kebutuhan menu tambahan:<br>Tenaga Pendidik, Kalender Akademik,<br>Sarana & Prasarana, Pesan Masuk (6.8)|
|Konsistensi Istlah|Istlah 'Jurusan' dan 'Kompetensi Keahlian'<br>tertukar di beberapa halaman|Ditetapkan istlah baku 'Kompetensi<br>Keahlian' di seluruh ftur Akademik &<br>Produk|
|Elemen Kredibilitas|Belum ada badge akreditasi & logo mitra<br>DUDI pada Beranda|Ditambahkan sebagai sub-ftur Beranda<br>(6.1): Badge Akreditasi & Logo Mitra DUDI|
|Konten Duplikat|Deskripsi ekstrakurikuler & testmoni alumni<br>pada mockup masih identk antar-item<br>(indikasi data dummy)|Ditambahkan catatan eksplisit pada ftur<br>Kesiswaan (6.3) & Beranda (6.1) agar<br>konten produksi bersifat unik per item|
|Filter Produk|Filter produk pada mockup hanya 'Proyek<br>Siswa vs Produk Digital'|Ditambahkan flter berdasarkan<br>Kompetensi Keahlian pembuat pada ftur<br>Produk (6.6)|



### **13.2 Rekomendasi Sebelum Masuk Tahap Development** 

- ●Lengkapi wireframe/desain untuk 2 halaman yang belum tersedia di mockup: Detail Berita dan Detail Produk. 

- ●Perbarui sidebar admin pada desain agar mencantumkan seluruh menu yang tercantum pada fitur 6.8, termasuk Pesan Masuk yang saat ini belum terlihat namun wajib ada. 

- ●Siapkan pedoman konten (content guideline) singkat bagi admin/staf pengisi data, terutama terkait keharusan data unik (foto, deskripsi, testimoni) agar tidak terulang seperti pada mockup. 

- ●Lakukan review desain lanjutan (UI review round 2) khusus untuk halaman Detail Berita & Detail Produk setelah dirancang, sebelum development dimulai. 

Halaman 14 dari 15 

PRD – Website Sekolah (Laravel 12 + React + MySQL) 

## **14. Lampiran** 

### **14.1 Glosarium** 

|**Istlah**|**Keterangan**|
|---|---|
|CRUD|Create, Read, Update, Delete — operasi dasar pengelolaan data|
|SPA|Single Page Applicaton|
|API|Applicaton Programming Interface — jembatan komunikasi backend & frontend|
|SSR|Server-Side Rendering|
|MVP|Minimum Viable Product — versi awal produk dengan ftur int|
|PPDB|Penerimaan Peserta Didik Baru|
|DUDI|Dunia Usaha dan Dunia Industri — mitra kerja sama/magang SMK|
|Kompetensi Keahlian|Istlah resmi untuk program/jurusan pada jenjang SMK|



### **14.2 Riwayat Dokumen** 

|**Versi**|**Tanggal**|**Perubahan**|
|---|---|---|
|1.0|08 Agustus 2026|Draf awal PRD disusun berdasarkan kebutuhan ftur awal|
|1.1|08 Agustus 2026|Revisi berdasarkan hasil review mockup UI/UX (20 halaman,<br>referensi SMKN 4 Bogor): penambahan halaman Detail<br>Berita & Detail Produk, penambahan sub-menu admin<br>(Tenaga Pendidik, Kalender Akademik, Sarana & Prasarana,<br>Pesan Masuk), penambahan elemen kredibilitas pada<br>Beranda, konsistensi istlah Kompetensi Keahlian, dan<br>penambahan Bagian 13 (Penyesuaian Berdasarkan Review<br>Mockup UI/UX).|



Halaman 15 dari 15 

