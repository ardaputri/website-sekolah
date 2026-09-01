<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\AcademicProgram;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Tampilkan daftar produk.
     */
    public function index(Request $request)
    {
        $query = Product::with(['category', 'academicProgram', 'author'])->latest();

        // Filter kategori
        if ($request->filled('category_id')) {
            $query->where('product_category_id', $request->category_id);
        }

        // Filter kompetensi keahlian
        if ($request->filled('program_id')) {
            $query->where('academic_program_id', $request->program_id);
        }

        // Filter status
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        // Pencarian
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        $products = $query->paginate(12)->withQueryString();

        $categories = ProductCategory::active()->ordered()->get();
        $programs = AcademicProgram::active()->ordered()->get();

        $stats = [
            'total' => Product::count(),
            'available' => Product::where('status', 'available')->count(),
            'coming_soon' => Product::where('status', 'coming_soon')->count(),
            'sold_out' => Product::where('status', 'sold_out')->count(),
        ];

        return Inertia::render('Admin/Products/Index', [
            'products' => $products,
            'categories' => $categories,
            'programs' => $programs,
            'filters' => $request->only(['search', 'category_id', 'program_id', 'status']),
            'stats' => $stats,
        ]);
    }

    /**
     * Simpan produk baru.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'short_description' => 'nullable|string|max:500',
            'price' => 'nullable|integer|min:0',
            'status' => 'required|in:available,coming_soon,sold_out',
            'product_category_id' => 'nullable|exists:product_categories,id',
            'academic_program_id' => 'nullable|exists:academic_programs,id',
            'maker' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:5120',
        ]);

        $validated['slug'] = Str::slug($validated['name']);
        $originalSlug = $validated['slug'];
        $counter = 1;
        while (Product::where('slug', $validated['slug'])->exists()) {
            $validated['slug'] = $originalSlug . '-' . $counter;
            $counter++;
        }

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('products', 'public');
        }

        $validated['author_id'] = auth()->id();
        $validated['is_active'] = true;

        Product::create($validated);

        return redirect()->back()->with('success', 'Produk berhasil ditambahkan.');
    }

    /**
     * Perbarui produk.
     */
    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'short_description' => 'nullable|string|max:500',
            'price' => 'nullable|integer|min:0',
            'status' => 'required|in:available,coming_soon,sold_out',
            'product_category_id' => 'nullable|exists:product_categories,id',
            'academic_program_id' => 'nullable|exists:academic_programs,id',
            'maker' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:5120',
        ]);

        if ($product->name !== $validated['name']) {
            $validated['slug'] = Str::slug($validated['name']);
            $originalSlug = $validated['slug'];
            $counter = 1;
            while (Product::where('slug', $validated['slug'])->where('id', '!=', $product->id)->exists()) {
                $validated['slug'] = $originalSlug . '-' . $counter;
                $counter++;
            }
        }

        if ($request->hasFile('image')) {
            if ($product->image && Storage::disk('public')->exists($product->image)) {
                Storage::disk('public')->delete($product->image);
            }
            $validated['image'] = $request->file('image')->store('products', 'public');
        }

        $product->update($validated);

        return redirect()->back()->with('success', 'Produk berhasil diperbarui.');
    }

    /**
     * Hapus produk.
     */
    public function destroy(Product $product)
    {
        if ($product->image && Storage::disk('public')->exists($product->image)) {
            Storage::disk('public')->delete($product->image);
        }

        $product->delete();

        return redirect()->back()->with('success', 'Produk berhasil dihapus.');
    }
}
