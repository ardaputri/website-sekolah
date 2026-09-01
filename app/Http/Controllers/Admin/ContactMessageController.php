<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactMessageController extends Controller
{
    /**
     * Tampilkan daftar pesan masuk.
     */
    public function index(Request $request)
    {
        $query = ContactMessage::query()->latest();

        // Filter status baca
        if ($request->filled('status')) {
            if ($request->status === 'unread') {
                $query->where('is_read', false);
            } elseif ($request->status === 'read') {
                $query->where('is_read', true);
            }
        }

        // Pencarian
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('subject', 'like', "%{$search}%")
                  ->orWhere('message', 'like', "%{$search}%");
            });
        }

        $messages = $query->paginate(15)->withQueryString();

        $stats = [
            'total' => ContactMessage::count(),
            'unread' => ContactMessage::where('is_read', false)->count(),
            'read' => ContactMessage::where('is_read', true)->count(),
        ];

        return Inertia::render('Admin/Messages/Index', [
            'messages' => $messages,
            'filters' => [
                'search' => $request->search,
                'status' => $request->status,
            ],
            'stats' => $stats,
        ]);
    }

    /**
     * Tandai pesan sudah dibaca.
     */
    public function markRead(ContactMessage $message)
    {
        $message->update(['is_read' => true]);

        return back()->with('success', 'Pesan ditandai sudah dibaca.');
    }

    /**
     * Tandai pesan belum dibaca.
     */
    public function markUnread(ContactMessage $message)
    {
        $message->update(['is_read' => false]);

        return back()->with('success', 'Pesan ditandai belum dibaca.');
    }

    /**
     * Hapus pesan.
     */
    public function destroy(ContactMessage $message)
    {
        $message->delete();

        return back()->with('success', 'Pesan berhasil dihapus.');
    }
}
