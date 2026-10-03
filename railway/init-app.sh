#!/bin/bash
#
# Pre-deploy script untuk Railway.
# Dijalankan otomatis sebelum container aplikasi dinyalakan
# (lihat "preDeployCommand" di railway.json).
#
# Aman dijalankan berulang kali: seeder hanya berjalan saat database masih kosong,
# sehingga data yang sudah diubah admin tidak tertimpa setiap deploy.

set -e

echo "==> Menyiapkan direktori storage..."
mkdir -p storage/framework/sessions \
         storage/framework/views \
         storage/framework/cache/data \
         storage/logs \
         bootstrap/cache

echo "==> Menjalankan migrasi database..."
php artisan migrate --force

echo "==> Mengecek apakah database masih kosong..."
USER_COUNT=$(php artisan tinker --execute="echo \App\Models\User::count();" 2>/dev/null | tr -dc '0-9' || true)
USER_COUNT=${USER_COUNT:-0}

if [ "$USER_COUNT" = "0" ]; then
    echo "==> Database kosong, menjalankan seeder awal..."
    php artisan db:seed --force
else
    echo "==> Database sudah terisi ($USER_COUNT user), seeder dilewati."
fi

echo "==> Membuat symlink storage (untuk gambar upload)..."
php artisan storage:link || true

echo "==> Membangun cache konfigurasi, route, dan view..."
php artisan optimize:clear
php artisan config:cache
php artisan route:cache
php artisan view:cache

echo "==> Pre-deploy selesai."
