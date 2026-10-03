<?php

namespace App\Http\Controllers;

use App\Models\News;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class BeritaController extends Controller
{
    // --- METHOD UNTUK HALAMAN USER ---
    public function index()
    {
        // Ambil berita yang statusnya PUBLISHED untuk ditampilkan ke user
        $berita = News::with('author')->where('status', 'published')->latest()->get();

        return Inertia::render('Berita', [
            'berita' => $berita,
        ]);
    }

    // --- METHOD UNTUK HALAMAN DETAIL BERITA ---
    public function show($slug)
    {
        $berita = News::with('author')
            ->where('slug', $slug)
            ->where('status', 'published')
            ->firstOrFail();

        // Increment views
        $berita->increment('views');

        // Ambil 3 berita lainnya untuk section 'Berita Lainnya'
        $beritaLain = News::with('author')
            ->where('status', 'published')
            ->where('id', '!=', $berita->id)
            ->latest()
            ->take(3)
            ->get();

        return Inertia::render('Berita/Show', [
            'berita' => $berita,
            'beritaLain' => $beritaLain,
        ]);
    }

    // --- METHOD UNTUK HALAMAN ADMIN ---
    public function adminIndex()
    {
        return Inertia::render('Admin/News/Index', [
            'berita' => News::with('author')->latest()->get(),
        ]);
    }

    // --- METHOD UNTUK SIMPAN DATA BARU ---
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'    => 'required|string|max:255',
            'content'  => 'required|string',
            'status'   => 'required|string',
            'category' => 'required|string',
            'image'    => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        $validated['slug'] = Str::slug($request->title) . '-' . time();
        $validated['excerpt'] = Str::limit(strip_tags($request->content), 150);
        $validated['author_id'] = Auth::id() ?? 1; // Fallback ke ID 1 jika auth belum diset

        if (strtolower((string) $request->status) === 'published') {
            $validated['published_at'] = now();
        }

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('news-images', 'public');
        }

        News::create($validated);

        return redirect()->back()->with('message', 'Kegiatan berhasil ditambahkan!');
    }

    // --- METHOD UNTUK UPDATE DATA ---
    public function update(Request $request, $id)
    {
        $news = News::findOrFail($id);

        $validated = $request->validate([
            'title'    => 'required|string|max:255',
            'content'  => 'required|string',
            'status'   => 'required|string',
            'category' => 'required|string',
            'image'    => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        // Perbarui slug dan excerpt jika judul berubah
        if ($news->title !== $request->title) {
            $validated['slug'] = Str::slug($request->title) . '-' . time();
        }
        
        $validated['excerpt'] = Str::limit(strip_tags($request->content), 150);

        // Atur published_at jika status diubah ke PUBLISHED
        if (strtolower((string) $request->status) === 'published' && !$news->published_at) {
            $validated['published_at'] = now();
        }

        // Kelola penggantian gambar
        if ($request->hasFile('image')) {
            if ($news->image && Storage::disk('public')->exists($news->image)) {
                Storage::disk('public')->delete($news->image);
            }
            $validated['image'] = $request->file('image')->store('news-images', 'public');
        }

        $news->update($validated);

        return redirect()->back()->with('message', 'Kegiatan berhasil diperbarui!');
    }

    // --- METHOD UNTUK HAPUS DATA ---
    public function destroy($id)
    {
        $news = News::findOrFail($id);

        // Hapus file gambar jika ada
        if ($news->image && Storage::disk('public')->exists($news->image)) {
            Storage::disk('public')->delete($news->image);
        }

        $news->delete();

        return redirect()->back()->with('message', 'Kegiatan berhasil dihapus!');
    }
}