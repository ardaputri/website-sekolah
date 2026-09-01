import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ messages = { data: [] }, filters = {}, stats = {} }) {
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [deleteItem, setDeleteItem] = useState(null);
    const [searchQuery, setSearchQuery] = useState(filters.search || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || '');

    const handleSearch = (value) => {
        setSearchQuery(value);
        router.get(route('admin.messages.index'), {
            search: value,
            status: statusFilter,
        }, {
            preserveState: true,
            replace: true,
        });
    };

    const handleStatusFilter = (status) => {
        setStatusFilter(status);
        router.get(route('admin.messages.index'), {
            search: searchQuery,
            status: status,
        }, {
            preserveState: true,
            replace: true,
        });
    };

    const handleMarkRead = (id) => {
        router.post(route('admin.messages.mark-read', id), {}, {
            preserveScroll: true,
        });
    };

    const handleMarkUnread = (id) => {
        router.post(route('admin.messages.mark-unread', id), {}, {
            preserveScroll: true,
        });
    };

    const handleDelete = () => {
        if (!deleteItem) return;
        router.delete(route('admin.messages.destroy', deleteItem.id), {
            onSuccess: () => setDeleteItem(null),
        });
    };

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        try {
            return new Date(dateString).toLocaleDateString('id-ID', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            });
        } catch {
            return dateString;
        }
    };

    const list = messages.data || [];

    return (
        <AdminLayout header="Pesan Masuk">
            <Head title="Pesan Masuk - SMKN 4 Bogor" />

            <div className="space-y-6 text-gray-800">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-extrabold text-gray-900">Pesan Masuk</h1>
                        <p className="text-xs text-gray-500 font-medium mt-0.5">
                            Kelola pesan dari form kontak pengunjung website
                        </p>
                    </div>
                </div>

                {/* Statistik */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                        <p className="text-[10px] font-bold tracking-wider text-gray-500 uppercase">Total Pesan</p>
                        <h3 className="text-2xl font-extrabold text-gray-900 mt-1">{stats.total || 0}</h3>
                    </div>
                    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                        <p className="text-[10px] font-bold tracking-wider text-gray-500 uppercase">Belum Dibaca</p>
                        <h3 className="text-2xl font-extrabold text-red-600 mt-1">{stats.unread || 0}</h3>
                    </div>
                    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                        <p className="text-[10px] font-bold tracking-wider text-gray-500 uppercase">Sudah Dibaca</p>
                        <h3 className="text-2xl font-extrabold text-emerald-600 mt-1">{stats.read || 0}</h3>
                    </div>
                </div>

                {/* Search & Filter */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="relative w-full max-w-xs">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </span>
                        <input
                            type="text"
                            placeholder="Cari pesan..."
                            value={searchQuery}
                            onChange={(e) => handleSearch(e.target.value)}
                            className="w-full rounded-full border-0 bg-gray-200/60 py-2 pl-9 pr-4 text-xs font-medium text-gray-700 placeholder-gray-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div className="flex gap-2">
                        {['', 'unread', 'read'].map((s) => (
                            <button
                                key={s}
                                onClick={() => handleStatusFilter(s)}
                                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                                    statusFilter === s
                                        ? 'bg-[#1E1B4B] text-white'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                                {s === '' ? 'Semua' : s === 'unread' ? 'Belum Dibaca' : 'Sudah Dibaca'}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tabel Pesan */}
                <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead className="bg-gray-100 text-[11px] font-extrabold uppercase text-gray-500">
                                <tr>
                                    <th className="px-6 py-3">Pengirim</th>
                                    <th className="px-6 py-3">Subjek</th>
                                    <th className="px-6 py-3">Pesan</th>
                                    <th className="px-6 py-3">Tanggal</th>
                                    <th className="px-6 py-3">Status</th>
                                    <th className="px-6 py-3 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                                {list.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-8 text-center text-gray-400">
                                            Belum ada pesan masuk.
                                        </td>
                                    </tr>
                                ) : (
                                    list.map((item) => (
                                        <tr
                                            key={item.id}
                                            className={`hover:bg-gray-50 transition cursor-pointer ${
                                                !item.is_read ? 'bg-blue-50/30' : ''
                                            }`}
                                            onClick={() => setSelectedMessage(item)}
                                        >
                                            <td className="px-6 py-3.5">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-8 w-8 shrink-0 rounded-full bg-[#1E1B4B] text-white flex items-center justify-center font-bold text-[10px]">
                                                        {item.name?.charAt(0) || '?'}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-gray-800">{item.name}</p>
                                                        <p className="text-[10px] text-gray-400">{item.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-3.5 font-semibold text-gray-800">
                                                {item.subject}
                                            </td>
                                            <td className="px-6 py-3.5 text-gray-500 max-w-xs truncate">
                                                {item.message}
                                            </td>
                                            <td className="px-6 py-3.5 whitespace-nowrap text-gray-500 text-[11px]">
                                                {formatDate(item.created_at)}
                                            </td>
                                            <td className="px-6 py-3.5">
                                                <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                                                    item.is_read
                                                        ? 'bg-gray-100 text-gray-600'
                                                        : 'bg-blue-100 text-blue-700'
                                                }`}>
                                                    {item.is_read ? 'Dibaca' : 'Baru'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-3.5 text-right whitespace-nowrap">
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        item.is_read
                                                            ? handleMarkUnread(item.id)
                                                            : handleMarkRead(item.id);
                                                    }}
                                                    className="p-1 text-gray-600 hover:text-indigo-600 mr-2 font-semibold text-[10px]"
                                                >
                                                    {item.is_read ? 'Tandai Belum' : 'Tandai Dibaca'}
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setDeleteItem(item);
                                                    }}
                                                    className="p-1 text-red-500 hover:text-red-700 font-semibold text-[10px]"
                                                >
                                                    Hapus
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {messages.last_page > 1 && (
                        <div className="border-t border-gray-100 px-6 py-4">
                            <div className="flex items-center justify-between text-xs text-gray-500">
                                <span>
                                    Menampilkan {messages.from}-{messages.to} dari {messages.total} pesan
                                </span>
                                <div className="flex gap-1">
                                    {messages.links.map((link, i) => (
                                        <button
                                            key={i}
                                            onClick={() => link.url && router.get(link.url)}
                                            disabled={!link.url}
                                            className={`px-3 py-1 rounded text-xs font-semibold ${
                                                link.active
                                                    ? 'bg-[#1E1B4B] text-white'
                                                    : link.url
                                                    ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                    : 'bg-gray-50 text-gray-300'
                                            }`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal Detail Pesan */}
            {selectedMessage && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl max-h-[80vh] overflow-y-auto">
                        <div className="flex items-center justify-between border-b pb-3">
                            <h3 className="text-base font-bold text-gray-900">Detail Pesan</h3>
                            <button
                                onClick={() => {
                                    setSelectedMessage(null);
                                    if (!selectedMessage.is_read) {
                                        handleMarkRead(selectedMessage.id);
                                    }
                                }}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="mt-4 space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 shrink-0 rounded-full bg-[#1E1B4B] text-white flex items-center justify-center font-bold text-sm">
                                    {selectedMessage.name?.charAt(0) || '?'}
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900">{selectedMessage.name}</p>
                                    <p className="text-xs text-gray-500">{selectedMessage.email}</p>
                                </div>
                            </div>

                            <div>
                                <p className="text-[10px] font-bold text-gray-400 uppercase">Subjek</p>
                                <p className="text-sm font-semibold text-gray-800 mt-0.5">{selectedMessage.subject}</p>
                            </div>

                            <div>
                                <p className="text-[10px] font-bold text-gray-400 uppercase">Pesan</p>
                                <p className="text-sm text-gray-700 mt-0.5 whitespace-pre-wrap leading-relaxed">
                                    {selectedMessage.message}
                                </p>
                            </div>

                            <div>
                                <p className="text-[10px] font-bold text-gray-400 uppercase">Dikirim Pada</p>
                                <p className="text-xs text-gray-500 mt-0.5">{formatDate(selectedMessage.created_at)}</p>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-4 mt-4 border-t">
                            <a
                                href={`mailto:${selectedMessage.email}?subject=${encodeURIComponent(`Re: ${selectedMessage.subject}`)}`}
                                className="rounded-lg bg-[#1E1B4B] px-4 py-2 text-xs font-semibold text-white hover:bg-[#15133c]"
                            >
                                Balas via Email
                            </a>
                            <button
                                onClick={() => setSelectedMessage(null)}
                                className="rounded-lg px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100"
                            >
                                Tutup
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Hapus */}
            {deleteItem && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl">
                        <h3 className="text-sm font-bold text-gray-900">Konfirmasi Hapus</h3>
                        <p className="mt-2 text-xs text-gray-600">
                            Yakin ingin menghapus pesan dari <span className="font-bold text-gray-800">"{deleteItem.name}"</span>?
                        </p>
                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                type="button"
                                onClick={() => setDeleteItem(null)}
                                className="rounded-lg px-3 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-100"
                            >
                                Batal
                            </button>
                            <button
                                type="button"
                                onClick={handleDelete}
                                className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-700"
                            >
                                Hapus
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
