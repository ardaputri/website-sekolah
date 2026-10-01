<?php

// Controller Publik
use App\Http\Controllers\AcademicController;
use App\Http\Controllers\BeritaController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\KesiswaanController;
use App\Http\Controllers\KontakController;
use App\Http\Controllers\ProdukController;
use App\Http\Controllers\ProfilController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public Routes (Halaman Publik / User)
|--------------------------------------------------------------------------
*/
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/profil', [ProfilController::class, 'index'])->name('profil');
Route::get('/akademik', [AcademicController::class, 'index'])->name('akademik.index');
Route::get('/akademik/{kode}', [AcademicController::class, 'show'])->name('akademik.show');
Route::get('/kesiswaan', [KesiswaanController::class, 'index'])->name('kesiswaan.index');
Route::get('/kesiswaan/{type}/{slug}', [KesiswaanController::class, 'show'])->name('kesiswaan.show');
Route::get('/berita', [BeritaController::class, 'index'])->name('berita.index');
Route::get('/berita/{slug}', [BeritaController::class, 'show'])->name('berita.show');
Route::get('/kontak', [KontakController::class, 'index'])->name('kontak.index');
Route::post('/kontak', [KontakController::class, 'store'])->name('kontak.store');
Route::post('/kontak/review', [KontakController::class, 'storeReview'])->name('kontak.review');
Route::get('/produk', [ProdukController::class, 'index'])->name('produk.index');
Route::get('/produk/{id}', [ProdukController::class, 'show'])->name('produk.show');

/*
|--------------------------------------------------------------------------
| Authentication Routes (Login & Auth)
|--------------------------------------------------------------------------
*/
if (file_exists(__DIR__.'/auth.php')) {
    require __DIR__.'/auth.php';
} else {
    Route::get('/login', fn() => inertia('Auth/Login'))->name('login');
}

/*
|--------------------------------------------------------------------------
| Admin Routes — semua di-handle oleh routes/admin.php
|--------------------------------------------------------------------------
| admin.php dimuat otomatis via bootstrap/app.php → Route::middleware('web')
*/
