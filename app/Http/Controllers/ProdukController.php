<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\AcademicProgram;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProdukController extends Controller
{
    /**
     * Halaman Produk / Etalase karya siswa — data dari database.
     */
    public function index(Request $request): Response
    {
        $query = Product::active()->with(['category', 'academicProgram'])->ordered();

        // Filter kategori
        if ($request->filled('kategori') && $request->kategori !== 'Semua') {
            $query->whereHas('category', function ($q) use ($request) {
                $q->where('name', $request->kategori);
            });
        }

        // Filter kompetensi keahlian
        if ($request->filled('kompetensi') && $request->kompetensi !== 'Semua') {
            $query->whereHas('academicProgram', function ($q) use ($request) {
                $q->where('short_code', $request->kompetensi);
            });
        }

        // Pencarian
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%")
                  ->orWhere('maker', 'like', "%{$search}%");
            });
        }

        $products = $query->get()->map(function ($product) {
            return [
                'id' => $product->id,
                'name' => $product->name,
                'slug' => $product->slug,
                'description' => $product->description,
                'short_description' => $product->short_description,
                'image' => $product->image,
                'price' => $product->price,
                'status' => $product->status,
                'maker' => $product->maker,
                'is_featured' => $product->is_featured,
                'category' => $product->category?->name,
                'kompetensi' => $product->academicProgram?->short_code,
            ];
        });

        $categories = ProductCategory::active()->ordered()->get()->pluck('name');
        $programs = AcademicProgram::active()->ordered()->get()->pluck('short_code');

        return Inertia::render('Produk', [
            'produkList' => $products,
            'kategoriList' => $categories,
            'kompetensiList' => $programs,
        ]);
    }

    /**
     * Halaman Detail Produk — data dari database.
     */
    public function show($id): Response
    {
        $product = Product::active()
            ->with(['category', 'academicProgram'])
            ->findOrFail($id);

        $produk = [
            'id' => $product->id,
            'name' => $product->name,
            'slug' => $product->slug,
            'description' => $product->description,
            'short_description' => $product->short_description,
            'image' => $product->image,
            'images' => $product->images ?? [],
            'price' => $product->price,
            'status' => $product->status,
            'maker' => $product->maker,
            'is_featured' => $product->is_featured,
            'category' => $product->category?->name,
            'kompetensi_keahlian' => $product->academicProgram?->short_code,
        ];

        $produkLain = Product::active()
            ->with(['category', 'academicProgram'])
            ->where('id', '!=', $product->id)
            ->inRandomOrder()
            ->limit(3)
            ->get()
            ->map(function ($p) {
                return [
                    'id' => $p->id,
                    'name' => $p->name,
                    'slug' => $p->slug,
                    'image' => $p->image,
                    'status' => $p->status,
                    'maker' => $p->maker,
                    'category' => $p->category?->name,
                ];
            });

        return Inertia::render('Produk/Show', [
            'produk' => $produk,
            'produkLain' => $produkLain,
        ]);
    }
}
