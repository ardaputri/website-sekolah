<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\ContactMessageController;
use App\Http\Controllers\Admin\KesiswaanController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\TeacherController;
use App\Http\Controllers\Admin\AcademicController as AdminAcademicController;
use App\Http\Controllers\Admin\AcademicProgramController;
use App\Http\Controllers\BeritaController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Admin Routes (CMS)
|--------------------------------------------------------------------------
| Semua route di sini prefix "/admin", nama "admin.*",
| diproteksi: harus login + role admin/super-admin.
*/

Route::prefix('admin')
    ->name('admin.')
    ->middleware(['auth', 'verified', 'role:admin|super-admin'])
    ->group(function () {

        // ── Dashboard ──
        Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

        // ── Berita ──
        Route::get('/news', [BeritaController::class, 'adminIndex'])->name('news.index');
        Route::post('/news', [BeritaController::class, 'store'])->name('news.store');
        Route::put('/news/{id}', [BeritaController::class, 'update'])->name('news.update');
        Route::delete('/news/{id}', [BeritaController::class, 'destroy'])->name('news.destroy');

        // ── Pesan Masuk ──
        Route::get('/messages', [ContactMessageController::class, 'index'])->name('messages.index');
        Route::post('/messages/{message}/read', [ContactMessageController::class, 'markRead'])->name('messages.mark-read');
        Route::post('/messages/{message}/unread', [ContactMessageController::class, 'markUnread'])->name('messages.mark-unread');
        Route::delete('/messages/{message}', [ContactMessageController::class, 'destroy'])->name('messages.destroy');

        // ── Ulasan / Rating Kontak ──
        Route::put('/reviews/{review}', [ContactMessageController::class, 'updateReview'])->name('reviews.update');
        Route::delete('/reviews/{review}', [ContactMessageController::class, 'destroyReview'])->name('reviews.destroy');

        // ── Akademik (Jadwal Pelajaran) ──
        Route::get('/academic', [AdminAcademicController::class, 'index'])->name('academic.index');
        Route::post('/academic', [AdminAcademicController::class, 'store'])->name('academic.store');
        Route::put('/academic/{academic}', [AdminAcademicController::class, 'update'])->name('academic.update');
        Route::delete('/academic/{academic}', [AdminAcademicController::class, 'destroy'])->name('academic.destroy');

        // ── Kesiswaan — Organisasi ──
        Route::get('/kesiswaan/organizations', [KesiswaanController::class, 'organizationIndex'])->name('kesiswaan.organization.index');
        Route::post('/kesiswaan/organizations', [KesiswaanController::class, 'organizationStore'])->name('kesiswaan.organization.store');
        Route::put('/kesiswaan/organizations/{organization}', [KesiswaanController::class, 'organizationUpdate'])->name('kesiswaan.organization.update');
        Route::delete('/kesiswaan/organizations/{organization}', [KesiswaanController::class, 'organizationDestroy'])->name('kesiswaan.organization.destroy');

        // ── Kesiswaan — Ekstrakurikuler ──
        Route::get('/kesiswaan/extracurriculars', [KesiswaanController::class, 'extracurricularIndex'])->name('kesiswaan.extracurricular.index');
        Route::post('/kesiswaan/extracurriculars', [KesiswaanController::class, 'extracurricularStore'])->name('kesiswaan.extracurricular.store');
        Route::put('/kesiswaan/extracurriculars/{extracurricular}', [KesiswaanController::class, 'extracurricularUpdate'])->name('kesiswaan.extracurricular.update');
        Route::delete('/kesiswaan/extracurriculars/{extracurricular}', [KesiswaanController::class, 'extracurricularDestroy'])->name('kesiswaan.extracurricular.destroy');

        // ── Produk ──
        Route::get('/products', [ProductController::class, 'index'])->name('products.index');
        Route::post('/products', [ProductController::class, 'store'])->name('products.store');
        Route::put('/products/{product}', [ProductController::class, 'update'])->name('products.update');
        Route::delete('/products/{product}', [ProductController::class, 'destroy'])->name('products.destroy');

        // ── Kompetensi Keahlian ──
        Route::get('/academic-programs', [AcademicProgramController::class, 'index'])->name('academic-programs.index');
        Route::post('/academic-programs', [AcademicProgramController::class, 'store'])->name('academic-programs.store');
        Route::put('/academic-programs/{academicProgram}', [AcademicProgramController::class, 'update'])->name('academic-programs.update');
        Route::delete('/academic-programs/{academicProgram}', [AcademicProgramController::class, 'destroy'])->name('academic-programs.destroy');

        // ── Tenaga Pendidik ──
        Route::get('/teachers', [TeacherController::class, 'index'])->name('teachers.index');
        Route::post('/teachers', [TeacherController::class, 'store'])->name('teachers.store');
        Route::put('/teachers/{teacher}', [TeacherController::class, 'update'])->name('teachers.update');
        Route::delete('/teachers/{teacher}', [TeacherController::class, 'destroy'])->name('teachers.destroy');

        // ── Profile ──
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    });
