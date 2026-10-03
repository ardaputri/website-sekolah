#!/bin/bash
#
# Start command untuk Railway.
# Filesystem Railway bersifat ephemeral, jadi symlink storage & cache
# perlu dipastikan ulang setiap kali container dinyalakan.

set -e

echo "==> Memastikan symlink storage tersedia..."
php artisan storage:link || true

echo "==> Menjalankan server di port ${PORT:-8080}..."
exec php artisan serve --host=0.0.0.0 --port="${PORT:-8080}"
