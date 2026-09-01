<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProdukController extends Controller
{
    /**
     * Halaman Produk / Etalase karya siswa.
     * Konten masih statis (data contoh); dijadikan dinamis dari database
     * pada fase CRUD Produk berikutnya.
     */
    public function index(): Response
    {
        return Inertia::render('Produk');
    }

    /**
     * Halaman Detail Produk.
     * Saat ini menggunakan data statis; akan diganti dari DB saat CRUD Produk.
     */
    public function show($id)
    {
        // Data statis sementara — nanti diganti dengan Product::findOrFail($id)
        $semuaProduk = collect([
            [
                'id' => 1,
                'name' => 'Pembuat Web Portfolio',
                'description' => 'Website portofolio personal yang dirancang dan dikembangkan oleh siswa sebagai wujud kreativitas, keterampilan, dan penerapan teknologi dalam menciptakan solusi digital yang bermanfaat. Website ini dilengkapi dengan fitur responsif, animasi modern, dan sistem manajemen konten yang mudah digunakan.',
                'category' => 'Proyek Siswa',
                'maker' => 'Kelas XII PPLG',
                'status' => 'Tersedia',
                'image' => '/images/produk-1.jpg',
                'price' => null,
                'kompetensi_keahlian' => 'PPLG',
            ],
            [
                'id' => 2,
                'name' => 'Aplikasi Manajemen Inventaris',
                'description' => 'Aplikasi berbasis web untuk manajemen inventaris sekolah yang memudahkan pengelolaan data barang, pelacakan stok, dan pelaporan secara real-time. Dibangun menggunakan framework modern dengan antarmuka yang intuitif.',
                'category' => 'Produk digital',
                'maker' => 'Kelas XI PPLG',
                'status' => 'Tersedia',
                'image' => '/images/produk-2.jpg',
                'price' => null,
                'kompetensi_keahlian' => 'PPLG',
            ],
            [
                'id' => 3,
                'name' => 'Miniatur Jaringan Komputer',
                'description' => 'Model skala kecil infrastruktur jaringan komputer yang menampilkan topologi jaringan, perangkat active (router, switch, access point), dan kabelisasi struktural. Cocok untuk pembelajaran dan presentasi.',
                'category' => 'Proyek Siswa',
                'maker' => 'Kelas XII TJKT',
                'status' => 'Tersedia',
                'image' => '/images/produk-3.jpg',
                'price' => 150000,
                'kompetensi_keahlian' => 'TJKT',
            ],
        ]);

        $produk = $semuaProduk->firstWhere('id', $id);

        if (!$produk) {
            abort(404, 'Produk tidak ditemukan');
        }

        $produkLain = $semuaProduk->where('id', '!=', $id)->take(3)->values();

        return Inertia::render('Produk/Show', [
            'produk' => $produk,
            'produkLain' => $produkLain,
        ]);
    }
}
