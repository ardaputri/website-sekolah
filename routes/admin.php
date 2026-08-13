<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\BeritaController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Admin Routes (CMS)
|--------------------------------------------------------------------------
| Semua route di sini otomatis prefix "/admin", bernama "admin.*",
| dan diproteksi: harus login, verified, serta punya role admin/super-admin.
*/

Route::prefix('admin')
    ->name('admin.')
    ->middleware(['auth', 'verified', 'role:admin|super-admin'])
    ->group(function () {
        // Dashboard Admin
        Route::get('/', [DashboardController::class, 'index'])
            ->name('dashboard');

        // Admin Berita (Routing CRUD Lengkap)
        Route::get('/news', [BeritaController::class, 'adminIndex'])->name('news.index');
        Route::post('/news', [BeritaController::class, 'store'])->name('news.store');
        Route::put('/news/{id}', [BeritaController::class, 'update'])->name('news.update');
        Route::delete('/news/{id}', [BeritaController::class, 'destroy'])->name('news.destroy');
    });