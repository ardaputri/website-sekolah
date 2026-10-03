#!/bin/bash
#
# Start command untuk Railway.
#
# Railway tidak selalu menjalankan pre-deploy command, sehingga inisialisasi
# (migrasi, seeder saat database kosong, storage:link, cache) DIJALANKAN DI SINI
# juga. Semua langkah aman diulang (idempotent), jadi aplikasi selalu siap pakai
# walau pre-deploy dilewati. Tanpa ini, database baru tetap kosong dan semua
# halaman akan membalas HTTP 500.

set -e

# Filesystem Railway bersifat ephemeral, jadi direktori yang dibutuhkan Laravel
# dibuat ulang setiap kali container menyala. Kalau tidak ada, Laravel melempar
# "Please provide a valid cache path" -> HTTP 500.
echo "==> Memastikan direktori storage tersedia..."
mkdir -p storage/framework/sessions \
         storage/framework/views \
         storage/framework/cache/data \
         storage/logs \
         storage/app/public \
         bootstrap/cache

echo "==> Menjalankan inisialisasi aplikasi (migrasi, seeder, storage:link, cache)..."
if ! sh ./railway/init-app.sh; then
    echo "WARN: inisialisasi gagal — server tetap dinyalakan agar bisa didiagnosa."
    echo "WARN: cek pesan error di atas (biasanya masalah koneksi DB / variabel env)."
fi

echo "==> Menjalankan server di port ${PORT:-8080}..."
exec php artisan serve --host=0.0.0.0 --port="${PORT:-8080}"
