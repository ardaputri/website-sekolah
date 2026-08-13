<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\News;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;

class NewsController extends Controller
{
    /**
     * Menampilkan daftar berita di Admin.
     */
    public function index(Request $request)
    {
        $query = News::query()
            ->with('author')
            ->latest();

        // Pencarian berita
        if ($request->filled('search')) {
            $search = $request->search;

            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('content', 'like', "%{$search}%");
            });
        }

        // Filter kategori
        if ($request->filled('category')) {
            $query->where('category', $request->category);
        }

        // Filter status
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        $news = $query
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/News/Index', [
            'news' => $news,
            'filters' => [
                'search' => $request->search,
                'category' => $request->category,
                'status' => $request->status,
            ],
            'stats' => [
                'total' => News::count(),
                'published' => News::where('status', 'published')->count(),
                'drafts' => News::where('status', 'draft')->count(),
                'views' => News::sum('views'),
            ],
        ]);
    }

    /**
     * Menampilkan form tambah berita.
     */
    public function create()
    {
        return Inertia::render('Admin/News/Create');
    }

    /**
     * Menyimpan berita baru.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'excerpt' => ['nullable', 'string'],
            'content' => ['required', 'string'],
            'image' => ['nullable', 'image', 'max:5120'],
            'category' => ['nullable', 'string', 'max:100'],
            'status' => ['required', 'in:draft,published,scheduled'],
            'published_at' => ['nullable', 'date'],
        ]);

        $slug = Str::slug($validated['title']);

        $originalSlug = $slug;
        $counter = 1;

        while (News::where('slug', $slug)->exists()) {
            $slug = $originalSlug . '-' . $counter;
            $counter++;
        }

        if ($request->hasFile('image')) {
            $validated['image'] = $request
                ->file('image')
                ->store('news', 'public');
        }

        $validated['slug'] = $slug;
        $validated['author_id'] = Auth::id();

        News::create($validated);

        return redirect()
            ->route('admin.news.index')
            ->with('success', 'Berita berhasil ditambahkan.');
    }

    /**
     * Menampilkan form edit berita.
     */
    public function edit(News $news)
    {
        return Inertia::render('Admin/News/Edit', [
            'news' => $news,
        ]);
    }

    /**
     * Memperbarui berita.
     */
    public function update(Request $request, News $news)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'excerpt' => ['nullable', 'string'],
            'content' => ['required', 'string'],
            'image' => ['nullable', 'image', 'max:5120'],
            'category' => ['nullable', 'string', 'max:100'],
            'status' => ['required', 'in:draft,published,scheduled'],
            'published_at' => ['nullable', 'date'],
        ]);

        if ($news->title !== $validated['title']) {
            $slug = Str::slug($validated['title']);

            $originalSlug = $slug;
            $counter = 1;

            while (
                News::where('slug', $slug)
                    ->where('id', '!=', $news->id)
                    ->exists()
            ) {
                $slug = $originalSlug . '-' . $counter;
                $counter++;
            }

            $validated['slug'] = $slug;
        }

        if ($request->hasFile('image')) {
            $validated['image'] = $request
                ->file('image')
                ->store('news', 'public');
        }

        $news->update($validated);

        return redirect()
            ->route('admin.news.index')
            ->with('success', 'Berita berhasil diperbarui.');
    }

    /**
     * Menghapus berita.
     */
    public function destroy(News $news)
    {
        $news->delete();

        return redirect()
            ->route('admin.news.index')
            ->with('success', 'Berita berhasil dihapus.');
    }
}