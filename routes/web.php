<?php

use App\Http\Controllers\AkademikController;
use App\Http\Controllers\BeritaController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\KesiswaanController;
use App\Http\Controllers\KontakController;
use App\Http\Controllers\ProdukController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProfilController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
| Halaman publik yang bisa diakses tanpa login.
*/

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/profil', [ProfilController::class, 'index'])->name('profil');
Route::get('/akademik', [AkademikController::class, 'index'])->name('akademik.index');
Route::get('/kesiswaan', [KesiswaanController::class, 'index'])->name('kesiswaan.index');
Route::get('/berita', [BeritaController::class, 'index'])->name('berita.index');
Route::get('/kontak', [KontakController::class, 'index'])->name('kontak.index');
Route::post('/kontak', [KontakController::class, 'store'])->name('kontak.store');
Route::get('/produk', [ProdukController::class, 'index'])->name('produk.index');

/*
|--------------------------------------------------------------------------
| Authenticated Routes
|--------------------------------------------------------------------------
| Halaman yang membutuhkan pengguna login.
*/

Route::middleware('auth')->group(function () {

    // Profil Akun Pengguna
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Grup Halaman Admin
    Route::prefix('admin')->name('admin.')->group(function () {

        // Dashboard Admin
        Route::get('/dashboard', function () {
            return inertia('Admin/Dashboard');
        })->name('dashboard');

        // Kelola Berita & Kegiatan
        Route::get('/news', [BeritaController::class, 'adminIndex'])->name('news.index');
        Route::post('/news', [BeritaController::class, 'store'])->name('news.store');
        Route::put('/news/{news}', [BeritaController::class, 'update'])->name('news.update');
        Route::delete('/news/{news}', [BeritaController::class, 'destroy'])->name('news.destroy');

    });
});

require __DIR__.'/auth.php';