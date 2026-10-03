# Deploy ke Railway — Website SMKN 4 Bogor

Panduan lengkap dari audit kesiapan proyek sampai situs live di Railway.

---

## 0. Cara Membaca Panduan Ini

Setiap perintah diawali label yang menunjukkan **di terminal mana** perintah itu dijalankan:

| Label | Arti | Contoh |
|---|---|---|
| 🖥️ **Terminal lokal (CMD/PowerShell)** | Dijalankan di komputer Anda, di folder proyek `C:\xampp\htdocs\website-sekolah` | `php artisan ...`, `git ...`, `composer ...` |
| ☁️ **Railway Dashboard** | Dilakukan dengan klik di situs **https://railway.com** (bukan terminal) | Add MySQL, Generate Domain, isi Variables |
| 🚂 **Railway CLI (terminal lokal)** | Dijalankan di terminal lokal setelah memasang CLI, untuk memerintah server Railway | `railway run ...`, `railway logs` |
| 🌐 **Browser** | Buka sebuah URL | cek `/up`, buka beranda |

> ⚠️ **Catatan penting untuk CMD:** jangan memakai tanda `\` untuk menyambung baris — CMD tidak mengenalnya.
> Semua perintah di panduan ini sudah ditulis **satu baris penuh** agar bisa di-copy-paste langsung ke CMD
> maupun PowerShell. Bila ada beberapa file, tulis semuanya dalam satu baris `git add ...`.

---

## 1. Hasil Audit Kesiapan Hosting

| Bagian | Status | Keterangan |
|---|---|---|
| `composer.json` | ✅ Siap | Laravel 12, PHP 8.2+, semua dependency di `require` (bukan dev) |
| Migrasi | ✅ Siap | 21 migrasi diuji `migrate:fresh` di MySQL bersih → semua sukses |
| Seeder | ✅ Diperbaiki | Lihat catatan di bawah |
| Build frontend | ✅ Siap | `npm run build` sukses; `public/build` **tidak** di-commit, jadi dibangun ulang di Railway |
| Aset statis | ✅ Siap | 30 file di `public/images` ikut ter-commit |
| Upload gambar | ⚠️ Perlu volume | Railway memakai disk ephemeral → wajib volume (langkah 10) |
| `public/storage` | ✅ Aman | Symlink lokal ke XAMPP tidak ikut ter-commit; dibuat ulang otomatis |
| `.env` | ✅ Aman | Ter-gitignore, tidak akan ter-push |
| Log | ✅ Diatur | Disarankan `LOG_CHANNEL=stderr` |
| Queue | ✅ Siap | Tidak ada job yang di-dispatch → `QUEUE_CONNECTION=sync` |

### Yang diperbaiki agar hosting aman

1. **`AcademicScheduleSeeder` menduplikasi data.** Sebelumnya memakai `Academic::create()`, sehingga
   setiap kali seeder dijalankan ulang jadwal menjadi 21 → 42 → 63. Sudah diubah ke `updateOrCreate`.
2. **`AdminUserSeeder` me-reset password admin.** Sebelumnya `updateOrCreate` + `Hash::make('password')`,
   artinya setiap deploy password super admin kembali menjadi `password`. Sudah diubah ke `firstOrCreate`
   supaya password yang sudah diganti tidak pernah tertimpa.
3. **`config/app.php`** — timezone sekarang bisa diatur lewat `APP_TIMEZONE` (diset `Asia/Jakarta`).
4. **`.env.example`** — disesuaikan untuk MySQL + kebutuhan hosting (ada contoh referensi variabel Railway).
5. **Sisa file uji** `storage/app/test-review-crud.php` dihapus.
6. **`.gitignore`** — dirapikan supaya `git add .` hanya mengambil file yang memang perlu di-commit.

### Catatan: 6 test bawaan gagal (bukan penghalang deploy)

`php artisan test` menghasilkan **17 passed, 6 failed**. Kegagalannya adalah sisa scaffolding Breeze
pada commit pertama, bukan akibat perubahan hosting:

- `Tests\Feature\ProfileTest` (5 test) — `routes/auth.php` tidak lagi mendaftarkan route `profile.*`.
- `Tests\Feature\ExampleTest` — memanggil `/` tanpa `RefreshDatabase`/data, sedangkan beranda butuh data dari DB.

Railway **tidak** menjalankan test saat deploy, jadi ini tidak menghalangi hosting.

### Bukti pengujian (dilakukan di database uji terpisah, bukan database asli)

- `php artisan migrate --seed` di database MySQL kosong → 21/21 migrasi **DONE**, 9 seeder **DONE**.
- `php artisan db:seed --force` dijalankan **dua kali** → jumlah data tetap `academics=21 users=2 reviews=6 products=9`.
- Password admin diubah lalu seeder dijalankan ulang → password baru tetap berlaku (`password_default=NO`).

---

## 2. File Konfigurasi Railway

| File | Fungsi |
|---|---|
| `railway.json` | Menentukan build command, pre-deploy, start command, dan healthcheck |
| `railway/init-app.sh` | Pre-deploy: migrasi, seeder (hanya saat DB kosong), `storage:link`, cache config/route/view |
| `railway/start-app.sh` | Start: pastikan symlink storage lalu jalankan server di `$PORT` |

---

## 3. Persiapan di Komputer

Pastikan `git`, `php`, `composer`, dan `node` tersedia.

🖥️ **Terminal lokal (CMD/PowerShell)** — jalankan satu per satu di dalam folder proyek:

```bat
cd C:\xampp\htdocs\website-sekolah

:: 1. Hapus file penanda Vite dev server (kalau ada).
del public\hot

:: 2. Buat APP_KEY untuk Railway. SIMPAN hasilnya untuk langkah 7.
php artisan key:generate --show

:: 3. (Opsional) Uji build seperti yang akan dilakukan Railway.
composer install --no-dev --optimize-autoloader
npm ci
npm run build
```

> Output langkah 2 seperti `base64:AbCdEf...=` — **catat/salin** nilai itu, akan dipakai sebagai `APP_KEY` di Railway.
>
> `public/build` sengaja di-gitignore. Railway akan menjalankan `npm run build` sendiri saat build,
> jadi jangan khawatir folder itu tidak ada di GitHub.

---

## 4. Upload ke GitHub

Repository sudah terhubung: **https://github.com/ardaputri/website-sekolah.git** (branch `main`).

`.gitignore` sudah diatur, jadi **`git add .` aman** — hanya file sumber yang ikut, sedangkan
`.env`, `vendor/`, `node_modules/`, `public/build`, `public/hot`, `public/storage`, `storage/`, dan
`.freebuff/` otomatis dilewati.

🖥️ **Terminal lokal (CMD/PowerShell)**:

```bat
cd C:\xampp\htdocs\website-sekolah

:: Tampilkan dulu apa yang AKAN di-commit (untuk memastikan hanya file yang diinginkan).
git status

:: Tambahkan semua perubahan yang relevan.
git add .

:: Commit.
git commit -m "Siapkan konfigurasi deploy Railway"

:: Kirim ke GitHub.
git push origin main
```

File yang akan ter-commit (dan memang seharusnya):

```text
 M .gitignore
 M .env.example
 M config/app.php
 M database/seeders/AcademicScheduleSeeder.php
 M database/seeders/AdminUserSeeder.php
?? docs/DEPLOY_RAILWAY.md
?? railway.json
?? railway/
```

> ⚠️ **Jangan** pernah commit file `.env`. File itu sudah ada di `.gitignore`, jadi `git add .` tidak akan
> menyentuhnya.

---

## 5. Buat Proyek di Railway

☁️ **Railway Dashboard**:

1. Buka **https://railway.com** dan login dengan akun GitHub (Authorize Railway).
2. Klik **New Project** → **Deploy from GitHub repo**.
3. Pilih repo **`ardaputri/website-sekolah`**. Kalau repo tidak muncul, klik
   *Configure GitHub App* lalu beri akses ke repo tersebut.
4. Railway akan mulai mendeploy. **Jangan tunggu** — lanjut ke langkah berikutnya dulu
   karena aplikasi belum punya database dan env var.

---

## 6. Tambah Database MySQL

☁️ **Railway Dashboard**:

1. Di dalam proyek, klik **Create** (atau tombol **+**) → **Database** → **Add MySQL**.
2. Tunggu sampai service MySQL berstatus aktif. Namanya default **`MySQL`**
   (kalau diubah, sesuaikan nama pada referensi variabel di langkah 7).

---

## 7. Set Variabel Environment (Lengkap)

☁️ **Railway Dashboard**:

1. Klik service **aplikasi** (service Laravel, **bukan** MySQL) → tab **Variables**.
2. Klik **Raw Editor**, tempel blok di bawah, lalu **Save**.
3. Ganti `APP_KEY` dengan hasil `php artisan key:generate --show` dari langkah 3.
4. `APP_URL` diisi belakangan setelah domain dibuat (langkah 8).

```env
APP_NAME="SMKN 4 Bogor"
APP_ENV=production
APP_DEBUG=false
APP_KEY=base64:GANTI_DENGAN_HASIL_KEY_GENERATE
APP_URL=http://localhost
APP_LOCALE=id
APP_FALLBACK_LOCALE=en
APP_TIMEZONE=Asia/Jakarta
APP_MAINTENANCE_DRIVER=file

LOG_CHANNEL=stderr
LOG_LEVEL=error

DB_CONNECTION=mysql
DB_HOST=${{MySQL.MYSQLHOST}}
DB_PORT=${{MySQL.MYSQLPORT}}
DB_DATABASE=${{MySQL.MYSQLDATABASE}}
DB_USERNAME=${{MySQL.MYSQLUSER}}
DB_PASSWORD=${{MySQL.MYSQLPASSWORD}}

SESSION_DRIVER=database
SESSION_LIFETIME=120
SESSION_ENCRYPT=false
SESSION_SECURE_COOKIE=true
CACHE_STORE=database
QUEUE_CONNECTION=sync
FILESYSTEM_DISK=local
PHP_CLI_SERVER_WORKERS=4
```

### Penjelasan tiap variabel

| Variabel | Nilai | Keterangan |
|---|---|---|
| `APP_NAME` | `"SMKN 4 Bogor"` | Nama situs, tampil di judul & email |
| `APP_ENV` | `production` | Mode produksi |
| `APP_DEBUG` | `false` | **Wajib false** di live agar error tak bocor ke publik |
| `APP_KEY` | hasil `key:generate --show` | Kunci enkripsi session/cookie. **Wajib**, sekali saja |
| `APP_URL` | `https://${{RAILWAY_PUBLIC_DOMAIN}}` | Diisi di langkah 8 (butuh domain dulu) |
| `APP_LOCALE` / `APP_FALLBACK_LOCALE` | `id` / `en` | Bahasa aplikasi |
| `APP_TIMEZONE` | `Asia/Jakarta` | Dipakai `config/app.php` |
| `APP_MAINTENANCE_DRIVER` | `file` | Driver mode maintenance |
| `LOG_CHANNEL` | `stderr` | Filesystem Railway sementara → log ke stdout agar tampil di Railway Logs |
| `LOG_LEVEL` | `error` | Hanya catat error supaya log tidak penuh |
| `DB_CONNECTION` | `mysql` | Sesuai service MySQL Railway |
| `DB_HOST` | `${{MySQL.MYSQLHOST}}` | Referensi ke service MySQL |
| `DB_PORT` | `${{MySQL.MYSQLPORT}}` | Referensi |
| `DB_DATABASE` | `${{MySQL.MYSQLDATABASE}}` | Referensi |
| `DB_USERNAME` | `${{MySQL.MYSQLUSER}}` | Referensi |
| `DB_PASSWORD` | `${{MySQL.MYSQLPASSWORD}}` | Referensi (tidak di-hardcode, aman) |
| `SESSION_DRIVER` | `database` | Session disimpan di tabel `sessions` |
| `SESSION_LIFETIME` | `120` | Umur session (menit) |
| `SESSION_ENCRYPT` | `false` | Session tidak dienkripsi (session driver database) |
| `SESSION_SECURE_COOKIE` | `true` | Cookie hanya lewat HTTPS — aman setelah domain aktif |
| `CACHE_STORE` | `database` | Cache di DB (tidak hilang saat redeploy) |
| `QUEUE_CONNECTION` | `sync` | Proyek tidak pakai queue worker |
| `FILESYSTEM_DISK` | `local` | Disk upload default; isinya dipindah ke volume (langkah 10) |
| `PHP_CLI_SERVER_WORKERS` | `4` | 4 worker untuk server bawaan PHP agar tidak lambat |

> `${{MySQL.MYSQLHOST}}` adalah *reference variable* Railway, yang otomatis mengambil nilai dari service
> database. **Jika service database Anda diberi nama lain** dari `MySQL`, ganti kata `MySQL` pada tiap
> referensi sesuai nama service tersebut (mis. `${{db-sekolah.MYSQLHOST}}`).

---

## 8. Generate Domain / URL Publik

☁️ **Railway Dashboard**:

1. Klik service aplikasi → tab **Settings** → bagian **Networking**.
2. Klik **Generate Domain**. Anda akan mendapat URL seperti
   `website-sekolah-production.up.railway.app`.
3. Balik ke tab **Variables**, ubah baris `APP_URL` menjadi:

```env
APP_URL=https://${{RAILWAY_PUBLIC_DOMAIN}}
```

Railway akan mendeploy ulang otomatis setelah perubahan variabel disimpan.

---

## 9. Deploy Pertama & Verifikasi

Saat deploy, Railway menjalankan (lihat `railway.json`):

1. **Build** (`railway.json`) — `composer install --no-dev` lalu `npm run build`.
   *Railpack sudah memasang dependency npm sendiri di tahap install, jadi build command
   **tidak boleh** memuat `npm ci`/`npm install` (lihat troubleshooting `EBUSY`).*
2. **Pre-deploy** (`railway/init-app.sh`) — `migrate --force`, lalu seeder
   **hanya jika tabel `users` masih kosong**, lalu `storage:link`, lalu cache config/route/view.
3. **Start** — `railway/start-app.sh` → server di `$PORT`.
4. **Healthcheck** — `/up` harus mengembalikan `200`.

🌐 **Browser** — verifikasi:

- [ ] Buka `https://<domain-anda>/up` → tampil halaman "OK" / status 200.
- [ ] Buka `/` (beranda) → tampil normal tanpa error.
- [ ] Login `/login` dengan `superadmin@sekolah.test` / `password`, lalu **langsung ganti password**.
- [ ] Cek **Logs** di Railway (tab Deploy Logs): tidak ada error `SQLSTATE`, `APP_KEY`,
      atau `Vite manifest not found`.

### Alur seeder otomatis (aman)

- Deploy pertama: database kosong → seeder dijalankan → akun admin + data contoh dibuat.
- Deploy berikutnya: `users` sudah ada → seeder **dilewati**, sehingga perubahan data
  dari admin (produk, berita, ulasan, jadwal) tidak tertimpa.

🚂 **Railway CLI (terminal lokal)** — hanya kalau perlu seed ulang manual:

```bat
:: Sekali saja di komputer:
npm install -g @railway/cli
railway login
railway link

:: Jalankan seeder di server Railway:
railway run php artisan db:seed --force
```

Melihat log langsung dari terminal lokal:

```bat
railway logs
```

---

## 10. Volume untuk Gambar Upload (Penting)

Tanpa volume, semua gambar yang di-upload lewat admin akan **hilang setiap deploy**
karena filesystem Railway bersifat sementara.

☁️ **Railway Dashboard**:

1. **Klik kanan** service aplikasi di canvas (atau tombol **⋮**) → **Attach Volume**.
2. Set **Mount path**: `/app/storage/app/public`
3. Klik **Attach**.

Karena `railway/start-app.sh` menjalankan `php artisan storage:link` setiap kali
container menyala, gambar otomatis dapat diakses lewat `/storage/...`.

> Gambar bawaan di `public/images` (logo, foto berita, dll.) sudah ikut ter-deploy
> dan tidak terpengaruh volume.

### ⚠️ Catatan gambar produk

`ProductSeeder` menyimpan nama file seperti `produk-1.jpg` → aplikasi memanggil
`/storage/produk-1.jpg`. File tersebut tidak ada di repo maupun di `storage/app/public`,
jadi gambar produk contoh akan tampil kosong. Solusinya salah satu:

- Upload gambar produk lewat **Admin → Produk** (disimpan ke volume, permanen), atau
- Taruh `produk-1.jpg` … `produk-9.jpg` di `public/images/` — tapi data DB perlu disesuaikan
  menjadi `/images/produk-1.jpg` (path yang diawali `/images/` dibiarkan apa adanya oleh aplikasi).

---

## 11. Checklist Setelah Live

- [ ] Ganti password `superadmin@sekolah.test` dan `admin@sekolah.test`.
- [ ] Isi identitas sekolah di **Admin → Pengaturan** (nama, alamat, email, telp).
- [ ] Uji kirim **Pesan Kontak** dan **Ulasan** dari halaman publik, lalu moderasi di
      **Admin → Pesan Masuk**.
- [ ] Uji upload gambar (berita/produk) **setelah** volume terpasang, lalu deploy ulang
      sekali untuk memastikan gambar masih ada (bukti volume bekerja).
- [ ] Aktifkan **Backup** pada service MySQL di Railway.
- [ ] (Opsional) Tambahkan custom domain di **Settings → Networking → Custom Domain**.

---

## 12. Troubleshooting

Setiap perintah perbaikan di bawah sudah diberi label tempat menjalankannya.

| Gejala | Penyebab & Solusi |
|---|---|
| `Vite manifest not found at /app/public/build/manifest.json` | Build frontend gagal. Cek log build; pastikan `npm run build` ada di `railway.json` dan `package.json` punya script `build`. |
| `npm error code EBUSY` / `EBUSY: resource busy or locked, rmdir '/app/node_modules/.cache'` | Build command memuat `npm ci`/`npm install`. Railpack sudah memasang dependency di tahap install, dan `node_modules/.cache` sedang ter-mount sehingga tidak bisa dihapus. Solusi: hapus `npm ci` dari `railway.json` → tinggalkan `npm run build`. |
| `No application encryption key has been specified` | `APP_KEY` belum diisi / salah. Jalankan `php artisan key:generate --show` di terminal lokal lalu set ulang di Railway. |
| `SQLSTATE[HY000] [2002] Connection refused` | Variabel `DB_*` belum menunjuk ke MySQL. Pastikan referensi `${{MySQL.MYSQLHOST}}` namanya cocok dengan nama service database. |
| Halaman 502 / container restart terus | Cek **Deploy Logs**. Sering karena `php artisan config:cache` gagal atau `APP_URL`/port salah. |
| `/up` OK tapi beranda error 500 | Kemungkinan seeder belum jalan / tabel kosong. |

🧹 **Perbaikan cepat dari terminal lokal** (butuh Railway CLI, lihat langkah 9):

```bat
railway run php artisan migrate --force
railway run php artisan db:seed --force
railway run php artisan optimize:clear
railway run php artisan storage:link
```

🖥️ **Terminal lokal (CMD/PowerShell)** — membersihkan file yang tidak sengaja terlacak:

```bat
git rm --cached public/hot
git rm --cached -r public/build
```

| Gejala lanjutan | Solusi |
|---|---|
| Gambar upload hilang setelah deploy | Volume belum di-attach pada `/app/storage/app/public` (langkah 10). |
| Gambar `/storage/...` 404 | `storage:link` gagal. Jalankan `railway run php artisan storage:link`, dan pastikan `railway/start-app.sh` dipakai sebagai start command. |
| CSS/JS tidak ter-style, tampilan polos | `public/hot` ikut ter-push. Jalankan `git rm --cached public/hot` lalu push ulang (file ini sudah ada di `.gitignore`). |
| Perubahan data admin hilang tiap deploy | Seeder seharusnya dilewati. Pastikan `railway/init-app.sh` versi terbaru yang dipakai (cek log "seeder dilewati"). |

---

## 13. Opsional: Queue Worker & Scheduler

Proyek ini belum memakai queue/scheduler, jadi cukup satu service.
Kalau nanti dibutuhkan (mis. kirim email notifikasi):

☁️ **Railway Dashboard**:

1. Buat service baru dari repo yang sama, ubah namanya menjadi `worker`.
2. **Settings → Deploy → Custom Start Command**: `php artisan queue:work --tries=3`
3. Salin seluruh variabel environment dari service aplikasi (kecuali `PORT` dan domain),
   dan ubah `QUEUE_CONNECTION=database`.

Untuk scheduler, buat service `cron` dengan start command:

```bash
while true; do php artisan schedule:run --verbose --no-interaction; sleep 60; done
```

Kedua service tambahan **tidak perlu** domain publik.
