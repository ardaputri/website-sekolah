import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';

/* Bintang readonly */
function Stars({ value, size = 'h-4 w-4' }) {
    return (
        <div className="flex items-center gap-0.5 text-amber-400">
            {[1, 2, 3, 4, 5].map((n) => (
                <svg key={n} className={size} fill={n <= value ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.563.563 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                </svg>
            ))}
        </div>
    );
}

export default function Index({ messages = { data: [] }, filters = {}, stats = {}, reviews = [], reviewStats = {} }) {
    const { flash } = usePage().props;
    const [activeTab, setActiveTab] = useState('messages');

    const [selectedMessage, setSelectedMessage] = useState(null);
    const [deleteItem, setDeleteItem] = useState(null);
    const [deleteReview, setDeleteReview] = useState(null);
    const [editingReview, setEditingReview] = useState(null);
    const [searchQuery, setSearchQuery] = useState(filters.search || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || '');

    /* Form edit ulasan */
    const {
        data: reviewData,
        setData: setReviewData,
        put: putReview,
        processing: processingReview,
        errors: reviewErrors,
        reset: resetReview,
    } = useForm({
        name: '',
        email: '',
        rating: 5,
        comment: '',
        is_approved: true,
    });

    const openEditReview = (review) => {
        setEditingReview(review);
        setReviewData({
            name: review.name || '',
            email: review.email || '',
            rating: review.rating || 5,
            comment: review.comment || '',
            is_approved: !!review.is_approved,
        });
    };

    const submitEditReview = (e) => {
        e.preventDefault();
        putReview(route('admin.reviews.update', editingReview.id), {
            preserveScroll: true,
            onSuccess: () => setEditingReview(null),
        });
    };

    const toggleReviewApproved = (review) => {
        router.put(route('admin.reviews.update', review.id), {
            name: review.name,
            email: review.email,
            rating: review.rating,
            comment: review.comment,
            is_approved: !review.is_approved,
        }, { preserveScroll: true });
    };

    const handleDeleteReview = () => {
        if (!deleteReview) return;
        router.delete(route('admin.reviews.destroy', deleteReview.id), {
            preserveScroll: true,
            onSuccess: () => setDeleteReview(null),
        });
    };

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
    const reviewList = Array.isArray(reviews) ? reviews : (reviews.data || []);
    const isReviews = activeTab === 'reviews';

    return (
        <AdminLayout header="Pesan Masuk">
            <Head title="Pesan Masuk - SMKN 4 Bogor" />

            <div className="space-y-6 text-gray-800">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-extrabold text-gray-900">Pesan Masuk</h1>
                        <p className="text-xs text-gray-500 font-medium mt-0.5">
                            Kelola pesan & ulasan dari halaman kontak pengunjung website
                        </p>
                    </div>
                </div>

                {/* Tab Pesan | Ulasan */}
                <div className="flex gap-2 border-b border-gray-200">
                    {[
                        { key: 'messages', label: 'Pesan', count: stats.total || 0 },
                        { key: 'reviews', label: 'Ulasan & Rating', count: reviewStats.total || 0 },
                    ].map((tab) => (
                        <button
                            key={tab.key}
                            type="button"
                            onClick={() => setActiveTab(tab.key)}
                            className={`-mb-px border-b-2 px-4 py-2.5 text-xs font-bold transition ${
                                activeTab === tab.key
                                    ? 'border-[#1E1B4B] text-[#1E1B4B]'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            {tab.label}
                            <span className={`ml-2 rounded-full px-2 py-0.5 text-[10px] ${
                                activeTab === tab.key ? 'bg-[#1E1B4B] text-white' : 'bg-gray-100 text-gray-500'
                            }`}>
                                {tab.count}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Flash message */}
                {flash?.success && (
                    <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs font-semibold text-emerald-700">
                        {flash.success}
                    </div>
                )}

                {/* ============ TAB: PESAN ============ */}
                {!isReviews && (
                    <>
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
                    </>
                )}

                {/* ============ TAB: ULASAN ============ */}
                {isReviews && (
                    <>
                        {/* Statistik Ulasan */}
                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                            <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                                <p className="text-[10px] font-bold tracking-wider text-gray-500 uppercase">Total Ulasan</p>
                                <h3 className="text-2xl font-extrabold text-gray-900 mt-1">{reviewStats.total || 0}</h3>
                            </div>
                            <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                                <p className="text-[10px] font-bold tracking-wider text-gray-500 uppercase">Tampil di Publik</p>
                                <h3 className="text-2xl font-extrabold text-emerald-600 mt-1">{reviewStats.shown || 0}</h3>
                            </div>
                            <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                                <p className="text-[10px] font-bold tracking-wider text-gray-500 uppercase">Disembunyikan</p>
                                <h3 className="text-2xl font-extrabold text-amber-600 mt-1">{reviewStats.hidden || 0}</h3>
                            </div>
                            <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                                <p className="text-[10px] font-bold tracking-wider text-gray-500 uppercase">Rata-rata Rating</p>
                                <div className="mt-1 flex items-center gap-2">
                                    <h3 className="text-2xl font-extrabold text-gray-900">{reviewStats.average ?? 0}</h3>
                                    <Stars value={Math.round(reviewStats.average || 0)} />
                                </div>
                            </div>
                        </div>

                        {/* Tabel Ulasan */}
                        <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-xs">
                                    <thead className="bg-gray-100 text-[11px] font-extrabold uppercase text-gray-500">
                                        <tr>
                                            <th className="px-6 py-3">Pengulas</th>
                                            <th className="px-6 py-3">Rating</th>
                                            <th className="px-6 py-3">Ulasan</th>
                                            <th className="px-6 py-3">Tanggal</th>
                                            <th className="px-6 py-3">Status</th>
                                            <th className="px-6 py-3 text-right">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                                        {reviewList.length === 0 ? (
                                            <tr>
                                                <td colSpan="6" className="px-6 py-8 text-center text-gray-400">
                                                    Belum ada ulasan masuk.
                                                </td>
                                            </tr>
                                        ) : (
                                            reviewList.map((review) => (
                                                <tr key={review.id} className="hover:bg-gray-50 transition">
                                                    <td className="px-6 py-3.5">
                                                        <div className="flex items-center gap-3">
                                                            <div className="h-8 w-8 shrink-0 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-[10px]">
                                                                {review.name?.charAt(0) || '?'}
                                                            </div>
                                                            <div>
                                                                <p className="font-bold text-gray-800">{review.name}</p>
                                                                <p className="text-[10px] text-gray-400">{review.email || '-'}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-3.5">
                                                        <Stars value={review.rating} />
                                                    </td>
                                                    <td className="px-6 py-3.5 text-gray-500 max-w-sm">
                                                        <p className="line-clamp-2">{review.comment}</p>
                                                    </td>
                                                    <td className="px-6 py-3.5 whitespace-nowrap text-gray-500 text-[11px]">
                                                        {formatDate(review.created_at)}
                                                    </td>
                                                    <td className="px-6 py-3.5">
                                                        <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                                                            review.is_approved
                                                                ? 'bg-emerald-100 text-emerald-700'
                                                                : 'bg-amber-100 text-amber-700'
                                                        }`}>
                                                            {review.is_approved ? 'Tampil' : 'Disembunyikan'}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-3.5 text-right whitespace-nowrap">
                                                        <button
                                                            type="button"
                                                            onClick={() => openEditReview(review)}
                                                            className="p-1 text-gray-600 hover:text-indigo-600 mr-2 font-semibold text-[10px]"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => toggleReviewApproved(review)}
                                                            className="p-1 text-amber-600 hover:text-amber-800 mr-2 font-semibold text-[10px]"
                                                        >
                                                            {review.is_approved ? 'Sembunyikan' : 'Tampilkan'}
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => setDeleteReview(review)}
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
                        </div>
                    </>
                )}
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

            {/* Modal Edit Ulasan */}
            {editingReview && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <form onSubmit={submitEditReview} className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl max-h-[85vh] overflow-y-auto">
                        <div className="flex items-center justify-between border-b pb-3">
                            <h3 className="text-base font-bold text-gray-900">Edit Ulasan</h3>
                            <button
                                type="button"
                                onClick={() => setEditingReview(null)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="mt-4 space-y-4">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="mb-1 block text-xs font-bold text-gray-600">Nama</label>
                                    <input
                                        type="text"
                                        value={reviewData.name}
                                        onChange={(e) => setReviewData('name', e.target.value)}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                                    />
                                    {reviewErrors.name && <p className="mt-1 text-xs text-red-600">{reviewErrors.name}</p>}
                                </div>
                                <div>
                                    <label className="mb-1 block text-xs font-bold text-gray-600">Email (opsional)</label>
                                    <input
                                        type="email"
                                        value={reviewData.email}
                                        onChange={(e) => setReviewData('email', e.target.value)}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                                    />
                                    {reviewErrors.email && <p className="mt-1 text-xs text-red-600">{reviewErrors.email}</p>}
                                </div>
                            </div>

                            <div>
                                <label className="mb-1.5 block text-xs font-bold text-gray-600">Rating</label>
                                <div className="flex items-center gap-1">
                                    {[1, 2, 3, 4, 5].map((n) => (
                                        <button
                                            key={n}
                                            type="button"
                                            onClick={() => setReviewData('rating', n)}
                                            className={`transition-transform hover:scale-110 ${
                                                n <= reviewData.rating ? 'text-amber-400' : 'text-gray-300'
                                            }`}
                                        >
                                            <svg className="h-7 w-7" fill={n <= reviewData.rating ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.563.563 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                            </svg>
                                        </button>
                                    ))}
                                    <span className="ml-2 text-xs font-semibold text-gray-500">{reviewData.rating}/5</span>
                                </div>
                                {reviewErrors.rating && <p className="mt-1 text-xs text-red-600">{reviewErrors.rating}</p>}
                            </div>

                            <div>
                                <label className="mb-1 block text-xs font-bold text-gray-600">Komentar</label>
                                <textarea
                                    rows={4}
                                    value={reviewData.comment}
                                    onChange={(e) => setReviewData('comment', e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 resize-none"
                                />
                                {reviewErrors.comment && <p className="mt-1 text-xs text-red-600">{reviewErrors.comment}</p>}
                            </div>

                            <label className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                                <input
                                    type="checkbox"
                                    checked={reviewData.is_approved}
                                    onChange={(e) => setReviewData('is_approved', e.target.checked)}
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                Tampilkan di halaman publik
                            </label>
                        </div>

                        <div className="flex justify-end gap-3 pt-4 mt-4 border-t">
                            <button
                                type="button"
                                onClick={() => setEditingReview(null)}
                                className="rounded-lg px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100"
                            >
                                Batal
                            </button>
                            <button
                                type="submit"
                                disabled={processingReview}
                                className="rounded-lg bg-[#1E1B4B] px-4 py-2 text-xs font-semibold text-white hover:bg-[#15133c] disabled:opacity-60"
                            >
                                {processingReview ? 'Menyimpan…' : 'Simpan Perubahan'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Modal Hapus Pesan */}
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

            {/* Modal Hapus Ulasan */}
            {deleteReview && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl">
                        <h3 className="text-sm font-bold text-gray-900">Konfirmasi Hapus</h3>
                        <p className="mt-2 text-xs text-gray-600">
                            Yakin ingin menghapus ulasan dari <span className="font-bold text-gray-800">"{deleteReview.name}"</span>?
                        </p>
                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                type="button"
                                onClick={() => setDeleteReview(null)}
                                className="rounded-lg px-3 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-100"
                            >
                                Batal
                            </button>
                            <button
                                type="button"
                                onClick={handleDeleteReview}
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
