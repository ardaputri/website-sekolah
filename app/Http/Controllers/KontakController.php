<?php

namespace App\Http\Controllers;

use App\Models\ContactMessage;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class KontakController extends Controller
{
    /**
     * Halaman Kontak: kartu info (alamat, telepon, jam kerja, email),
     * form kirim pesan, dan peta lokasi. Info diambil dari pengaturan situs.
     */
    public function index(): Response
    {
        return Inertia::render('Kontak');
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
}
