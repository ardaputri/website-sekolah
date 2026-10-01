<?php

namespace App\Http\Controllers;

use App\Models\ContactMessage;
use App\Models\ContactReview;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class KontakController extends Controller
{
    /**
     * Halaman Kontak: kartu info (alamat, telepon, jam kerja, email),
     * form kirim pesan, peta lokasi, serta rating & komentar pengunjung.
     * Info diambil dari pengaturan situs.
     */
    public function index(): Response
    {
        $reviews = ContactReview::approved()
            ->latest()
            ->limit(20)
            ->get()
            ->map(fn ($r) => [
                'id' => $r->id,
                'name' => $r->name,
                'rating' => $r->rating,
                'comment' => $r->comment,
                'created_at' => $r->created_at->diffForHumans(),
            ]);

        $stats = [
            'average' => ContactReview::averageRating(),
            'total' => ContactReview::totalReviews(),
            'distribution' => [
                5 => ContactReview::approved()->where('rating', 5)->count(),
                4 => ContactReview::approved()->where('rating', 4)->count(),
                3 => ContactReview::approved()->where('rating', 3)->count(),
                2 => ContactReview::approved()->where('rating', 2)->count(),
                1 => ContactReview::approved()->where('rating', 1)->count(),
            ],
        ];

        return Inertia::render('Kontak', [
            'reviews' => $reviews,
            'reviewStats' => $stats,
        ]);
    }

    /**
     * Simpan pesan dari form kontak, lalu kembali dengan pesan sukses.
     * Pesan dapat dibaca pengelola di menu admin (fase berikutnya).
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:100'],
            'email' => ['required', 'email', 'max:150'],
            'subject' => ['required', 'string', 'max:150'],
            'message' => ['required', 'string', 'max:2000'],
        ]);

        ContactMessage::create($validated);

        return back()->with('success', 'Terima kasih! Pesan Anda sudah kami terima dan akan segera ditindaklanjuti.');
    }

    /**
     * Simpan rating & komentar pengunjung dari halaman Kontak.
     */
    public function storeReview(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:100'],
            'email' => ['nullable', 'email', 'max:150'],
            'rating' => ['required', 'integer', 'min:1', 'max:5'],
            'comment' => ['required', 'string', 'max:1000'],
        ]);

        ContactReview::create($validated);

        return back()->with('reviewSuccess', 'Terima kasih! Rating dan ulasan Anda sudah tersimpan.');
    }
}
