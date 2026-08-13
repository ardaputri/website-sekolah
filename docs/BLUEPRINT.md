# Blueprint Teknis — Website Sekolah (SMKN 4 Bogor)

> Rencana implementasi menyeluruh berdasarkan **PRD v1.1**, diselaraskan dengan stack yang **sudah terpasang** di repo: **Laravel 12 + Inertia.js + React 18 + Tailwind 3** (Laravel Breeze).
>
> Status: Draf blueprint • Acuan pengembangan MVP.

---

## 1. Keputusan Arsitektur

| Aspek | Keputusan | Alasan |
|---|---|---|
| Pola | **Monolitik Inertia.js** (bukan REST API + SPA terpisah) | Sudah terpasang via Breeze; sesuai rekomendasi PRD §4.2 & mitigasi SEO §11. Tidak perlu bangun API + fetch manual. |
| Auth | Session-based (Breeze) + **Sanctum** untuk proteksi | Sudah ada. Cukup untuk area admin. |
| Role/Permission | **spatie/laravel-permission** | Direkomendasikan PRD §5. Role: `super-admin`, `admin`. |
| Data ke React | Props Inertia via controller + shared props (`site_settings`, `auth`) | Konsisten, tanpa endpoint JSON terpisah. |
| Upload gambar | `Storage` disk `public` + `storage:link`. Optimasi via intervention/image (Fase 2). | Sesuai PRD (storage lokal/S3). |
| Slug | `spatie/laravel-sluggable` atau helper `Str::slug` | URL ramah SEO. |
| Database | **MySQL** `website-sekolah` (`.env` sudah diset) | Sesuai PRD. `database.sqlite` bawaan diabaikan. |

**Yang perlu diubah dari scaffolding Breeze:**
- Nonaktifkan **registrasi publik** (`routes/auth.php`) — admin dibuat via seeder/panel Super Admin.
- Ganti halaman default `Welcome`/`Dashboard` → `Home` publik + `Admin/Dashboard`.
- Tambah **PublicLayout** (navbar+footer) & **AdminLayout** (sidebar); `AuthenticatedLayout` existing dijadikan basis AdminLayout.

---

## 2. Skema Database

Konvensi: semua tabel `id` bigint PK, `timestamps`. Slug `unique`. Status pakai `enum`/`string`.

### 2.1 Auth & Akses
```
users            (ADA — extend)  + avatar (nullable), is_active (bool, default true)
                                  role dikelola spatie (bukan kolom)
roles / permissions / model_has_roles / ...   (dari spatie/laravel-permission)
```

### 2.2 Berita — PRD §6.4
```
news
  id, title, slug(unique), excerpt(text null), body(longtext),
  thumbnail(string null), status(enum: draft|published|scheduled, default draft),
  published_at(datetime null), author_id(FK users null on delete set null),
  views(uint default 0), meta_title(null), meta_description(null), timestamps

news_categories
  id, name, slug(unique)          // seed: Prestasi, Kegiatan, Pengumuman

category_news  (pivot M:N)
  news_id(FK cascade), news_category_id(FK cascade)
```

### 2.3 Akademik — PRD §6.2
```
academic_programs   (Kompetensi Keahlian)
  id, name, slug(unique), short_description(null), description(longtext null),
  thumbnail(null), career_prospects(text null), lab_tools(text null),
  order(uint default 0), is_active(bool default true), meta_title, meta_description

teachers            (Tenaga Pendidik)
  id, name, photo(null), subject(null), position(null),
  academic_program_id(FK null on delete set null), order(uint default 0)

class_schedules     (Jadwal Pelajaran — difilter per kelas)
  id, academic_program_id(FK cascade), grade(string: X/XI/XII),
  day_of_week(enum Senin..Jumat), start_time, end_time, subject, teacher_id(FK null)

academic_calendars  (Kalender Akademik)
  id, title, description(null), start_date, end_date(null),
  attachment(string null /* PDF */), type(string null)

facilities          (Sarana & Prasarana)
  id, name, description(null), academic_program_id(FK null), thumbnail(null), order
```
> Profil Kurikulum & Struktur Organisasi Sekolah → simpan di `site_settings` (konten statis) atau halaman `Profil`.

### 2.4 Kesiswaan — PRD §6.3
```
organizations       (OSIS dsb)
  id, name, slug(unique), description(longtext null),
  work_program(text null /* program kerja */), logo(null)

extracurriculars
  id, name, slug(unique), description(longtext null),
  schedule(string null /* jadwal latihan */), coach(string null /* pembina */),
  thumbnail(null), is_active(bool default true)
```

### 2.5 Produk — PRD §6.6
```
product_categories
  id, name, slug(unique)          // Merchandise, Karya Siswa, Unit Usaha

products
  id, name, slug(unique), description(longtext null), price(decimal null),
  status(enum: available|coming_soon|sold, default available),
  product_category_id(FK null), academic_program_id(FK null /* jurusan pembuat */),
  thumbnail(null), contact_wa(null), meta_title, meta_description
```

### 2.6 Kontak — PRD §6.5
```
contact_messages
  id, name, email, subject, message(text),
  is_read(bool default false), replied_at(datetime null), timestamps
```

### 2.7 Beranda — PRD §6.1
```
banners             (Hero)
  id, title(null), subtitle(null), image, link(null), order, is_active
testimonials        (Testimoni Alumni)
  id, name, role(null /* angkatan/pekerjaan */), photo(null), quote(text), order, is_active
partners            (Logo Mitra DUDI)
  id, name, logo, url(null), order, is_active
```
> Statistik singkat, Sambutan Kepsek, Badge Akreditasi → `site_settings`.

### 2.8 Umum
```
galleries           (Polymorphic — dipakai news/ekskul/organisasi/produk/fasilitas)
  id, galleryable_type, galleryable_id, image_path, caption(null), order

site_settings       (key-value)
  id, key(unique), value(longtext null), group(string), type(string default 'text')
  // group: contact | social | seo | homepage | branding | academic
```

### 2.9 Relasi Eloquent (ringkas)
```
News        belongsToMany Categories · belongsTo User(author) · morphMany Gallery
Category    belongsToMany News
AcademicProgram hasMany Teachers · hasMany ClassSchedules · hasMany Facilities · hasMany Products
Teacher     belongsTo AcademicProgram
Extracurricular / Organization  morphMany Gallery
Product     belongsTo ProductCategory · belongsTo AcademicProgram · morphMany Gallery
User        HasRoles (spatie) · hasMany News
```

---

## 3. Struktur Route

### 3.1 Publik (`routes/web.php`, Inertia, tanpa auth)
```
GET  /                                  Home
GET  /profil                            Profil (visi-misi, sejarah, struktur)
GET  /akademik                          Akademik/Index
GET  /akademik/kompetensi/{slug}        Akademik/ProgramDetail
GET  /akademik/tenaga-pendidik          Akademik/Teachers
GET  /akademik/jadwal                   Akademik/Schedule       (?grade= filter)
GET  /akademik/kalender                 Akademik/Calendar
GET  /akademik/sarana-prasarana         Akademik/Facilities
GET  /kesiswaan                         Kesiswaan/Index
GET  /kesiswaan/ekstrakurikuler/{slug}  Kesiswaan/ExtracurricularDetail
GET  /berita                            Berita/Index   (?kategori= &search= &page=)
GET  /berita/{slug}                     Berita/Show
GET  /produk                            Produk/Index   (?kategori= &kompetensi=)
GET  /produk/{slug}                     Produk/Show
GET  /kontak                            Kontak/Index
POST /kontak                            ContactMessageController@store  (throttle)
```

### 3.2 Admin (`routes/admin.php`, prefix `/admin`, middleware `['auth','verified','role:admin|super-admin']`)
```
GET   /admin                            Admin/Dashboard
resource  news, news-categories
resource  academic-programs, teachers, class-schedules, academic-calendars, facilities
resource  organizations, extracurriculars
resource  products, product-categories
resource  banners, testimonials, partners
GET   /admin/messages                   index      · GET .../{id} show
PATCH /admin/messages/{id}/read         markRead   · DELETE destroy
GET   /admin/settings                   edit       · PUT update
resource  users        (middleware role:super-admin)     // Manajemen Admin
```

### 3.3 Auth (existing — modifikasi)
- Hapus/nonaktifkan route `register` (guest). Sisanya (login, forgot/reset, verify) dipertahankan.

---

## 4. Struktur Frontend (React / Inertia)

```
resources/js/
  Layouts/
    PublicLayout.jsx        (BARU — Navbar + Footer publik)
    AdminLayout.jsx         (BARU — adaptasi AuthenticatedLayout: sidebar admin)
    GuestLayout.jsx         (ADA — halaman auth)
  Components/
    Public/  Navbar, Footer, HeroSlider, NewsCard, ProductCard, SectionTitle,
             StatCounter, TeacherCard, ExtracurricularCard, Breadcrumb, Pagination
    Admin/   Sidebar, DataTable, FormField, ImageUpload, StatusBadge, ConfirmDialog
    (ADA)    PrimaryButton, TextInput, InputError, Modal, Dropdown, ... (reuse)
  Pages/
    Home.jsx  Profil.jsx  Kontak/Index.jsx
    Akademik/ (Index, ProgramDetail, Teachers, Schedule, Calendar, Facilities)
    Kesiswaan/ (Index, ExtracurricularDetail)
    Berita/ (Index, Show)   Produk/ (Index, Show)
    Auth/ Profile/ (ADA)
    Admin/
      Dashboard.jsx
      News/ (Index, Create, Edit)     NewsCategories/ ...
      AcademicPrograms/  Teachers/  ClassSchedules/  Calendars/  Facilities/
      Organizations/  Extracurriculars/
      Products/  ProductCategories/
      Banners/  Testimonials/  Partners/
      Messages/ (Index, Show)   Settings/Edit.jsx   Users/ (Index, Create, Edit)
```

**Shared props** (di `HandleInertiaRequests@share`): tambah `settings` (site_settings ter-cache), `flash` (success/error). `auth.user` disertai `roles`/`permissions`.

---

## 5. Role & Permission (spatie)

- Roles: **super-admin**, **admin**.
- Permissions (contoh, granular): `news.manage`, `academic.manage`, `kesiswaan.manage`, `product.manage`, `message.manage`, `settings.manage`, `user.manage`.
- `super-admin` → semua. `admin` → semua kecuali `user.manage` & sebagian `settings`.
- Seeder: `RolePermissionSeeder` + `AdminUserSeeder` (buat 1 Super Admin default).
- Gunakan Gate/`can:` di route & `@can` equivalent (props `auth.permissions`) di React untuk sembunyikan menu.

---

## 6. Roadmap Implementasi (urut eksekusi)

### Fase 0 — Fondasi (Sprint 1)
1. `composer require spatie/laravel-permission`; publish + migrate.
2. Migration: extend `users`, `site_settings`, `galleries` (polymorphic).
3. Seeder role/permission + Super Admin. Nonaktifkan register publik.
4. `HandleInertiaRequests`: share `settings` + `flash`. Helper `setting('key')`.
5. `php artisan storage:link`. Struktur folder komponen.
6. **PublicLayout** (Navbar+Footer) & **AdminLayout** (Sidebar) + routing dasar.

### Fase 1 — Konten Inti (Sprint 2–4) — pola CRUD berulang
Urutan by nilai & ketergantungan:
1. **Berita** — jadi *template* CRUD (model, migration, kategori, admin CRUD, upload, public list+filter+detail, views).
2. **Produk** — mirip berita (+ kategori & filter kompetensi).
3. **Akademik** — programs → teachers → calendar → facilities → schedule.
4. **Kesiswaan** — organizations & extracurriculars (+ galeri).
5. **Kontak** — form publik + validasi + throttle + inbox admin + notifikasi email.
6. **Beranda** — banners, testimonials, partners, statistik; rakit semua section.

### Fase 2 — Admin & Penyempurnaan (Sprint 5–6)
- Dashboard ringkasan (statistik + grafik tren, mis. Recharts).
- Manajemen User (Super Admin) & Settings lengkap (kontak, sosmed, SEO, branding, akreditasi).
- SEO: meta dinamis per halaman, `sitemap.xml`, Open Graph.
- Pencarian global (berita+produk+akademik).
- Optimasi: image (WebP/resize), caching settings, skeleton loading, lazy-load.

### Fase 3 — (Out of MVP, PRD §9) 
PPDB online, Portal Alumni, LMS, payment gateway, komentar berita, 2FA, aktivitas log.

---

## 7. Kebutuhan Non-Fungsional (checklist implementasi)

- [ ] Validasi via Form Request; proteksi CSRF (bawaan), XSS (escape), SQL-inj (Eloquent).
- [ ] Rate limit login (`throttle`) & form kontak. reCAPTCHA (Fase 2).
- [ ] Mobile-first, kontras & alt-text (aksesibilitas).
- [ ] Pagination + skeleton/loading state.
- [ ] Backup DB (dokumentasi ops).
- [ ] Standar kode: Pint (PHP) + ESLint (opsional untuk React).

---

## 8. Risiko Teknis & Catatan

- **SEO** — Inertia = CSR; untuk crawler penting, pertimbangkan SSR Inertia (Fase 2) atau minimal meta tag dinamis + prerender.
- **Konten unik** — PRD menekankan data non-duplikat (ekskul, testimoni). Bukan isu kode, tapi siapkan field yang memadai + panduan konten admin.
- **Jadwal pelajaran** bisa kompleks; MVP cukup CRUD sederhana per (jurusan, kelas, hari).
- **Konsistensi istilah**: gunakan **"Kompetensi Keahlian"** (bukan "Jurusan") di UI, sesuai PRD §13.

---

*Dokumen ini acuan awal; kolom & detail teknis dapat diperhalus saat implementasi tiap fitur.*
