import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Index({ berita = [] }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [deleteItem, setDeleteItem] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [imagePreview, setImagePreview] = useState(null);

    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        _method: 'POST',
        title: '',
        category: 'PRESTASI',
        status: 'PUBLISHED',
        content: '',
        image: null,
    });

    // Cleanup object URL untuk mencegah memory leak
    useEffect(() => {
        return () => {
            if (imagePreview && imagePreview.startsWith('blob:')) {
                URL.revokeObjectURL(imagePreview);
            }
        };
    }, [imagePreview]);

    const handleOpenCreateModal = () => {
        setEditItem(null);
        if (imagePreview && imagePreview.startsWith('blob:')) {
            URL.revokeObjectURL(imagePreview);
        }
        setImagePreview(null);
        reset();
        clearErrors();
        setData((prev) => ({ ...prev, _method: 'POST', image: null }));
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (item) => {
        setEditItem(item);
        clearErrors();
        
        if (imagePreview && imagePreview.startsWith('blob:')) {
            URL.revokeObjectURL(imagePreview);
        }
        
        setImagePreview(item.image ? `/storage/${item.image}` : null);
        
        setData({
            _method: 'PUT',
            title: item.title || '',
            category: item.category || 'PRESTASI',
            status: item.status || 'PUBLISHED',
            content: item.content || '',
            image: null,
        });
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditItem(null);
        if (imagePreview && imagePreview.startsWith('blob:')) {
            URL.revokeObjectURL(imagePreview);
        }
        setImagePreview(null);
        reset();
        clearErrors();
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('image', file);
            if (imagePreview && imagePreview.startsWith('blob:')) {
                URL.revokeObjectURL(imagePreview);
            }
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Menggunakan POST untuk KEDUA aksi (Create & Update) 
        // karena Laravel membutuhkan POST + _method: 'PUT' untuk pengiriman FormData (file)
        const targetRoute = editItem 
            ? route('admin.news.update', editItem.id) 
            : route('admin.news.store');

        post(targetRoute, {
            forceFormData: true,
            onSuccess: () => handleCloseModal(),
        });
    };

    const handleDelete = () => {
        if (!deleteItem) return;

        router.delete(route('admin.news.destroy', deleteItem.id), {
            onSuccess: () => setDeleteItem(null),
        });
    };

    // Statistik
    const totalKegiatan = berita.length;
    const totalPublished = berita.filter((item) => item.status === 'PUBLISHED').length;
    const totalDrafts = berita.filter((item) => item.status === 'DRAFT').length;

    // Filter Pencarian
    const filteredBerita = berita.filter((item) =>
        item.title?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <AdminLayout header="Kelola Berita">
            <Head title="Kelola Berita - SMKN 4 Bogor" />

            <div className="space-y-6 text-gray-800">
                {/* Search Bar & Header Toolbar */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="relative w-full max-w-xs">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </span>
                        <input
                            type="text"
                            placeholder="Cari Kegiatan..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full rounded-full border-0 bg-gray-200/60 py-2 pl-9 pr-4 text-xs font-medium text-gray-700 placeholder-gray-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4">
                        <div className="flex items-center gap-3 text-gray-600">
                            <button type="button" className="p-1 hover:text-indigo-600">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                            </button>
                            <div className="h-4 w-[1px] bg-gray-300"></div>
                            <span className="text-xs font-semibold text-gray-700">Admin Profile</span>
                        </div>
                    </div>
                </div>

                {/* Header Judul */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-extrabold text-gray-900">Kelola Berita</h1>
                        <p className="text-xs text-gray-500 font-medium mt-0.5">
                            Manajemen konten Kegiatan dan Berita SMKN 4 Bogor
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={handleOpenCreateModal}
                        className="inline-flex items-center gap-2 rounded-lg bg-[#1E1B4B] px-4 py-2.5 text-xs font-semibold text-white shadow transition hover:bg-[#15133c]"
                    >
                        <span className="text-sm font-bold">+</span> Tambah Kegiatan Baru
                    </button>
                </div>

                {/* Kartu Ringkasan Statistik */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                        <p className="text-[10px] font-bold tracking-wider text-gray-500 uppercase">Total Kegiatan</p>
                        <h3 className="text-2xl font-extrabold text-gray-900 mt-1">{totalKegiatan}</h3>
                    </div>
                    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                        <p className="text-[10px] font-bold tracking-wider text-gray-500 uppercase">PUBLISHED</p>
                        <h3 className="text-2xl font-extrabold text-gray-900 mt-1">{totalPublished}</h3>
                    </div>
                    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                        <p className="text-[10px] font-bold tracking-wider text-gray-500 uppercase">DRAFTS</p>
                        <h3 className="text-2xl font-extrabold text-gray-900 mt-1">{totalDrafts}</h3>
                    </div>
                    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                        <p className="text-[10px] font-bold tracking-wider text-gray-500 uppercase">VIEWS BULAN INI</p>
                        <h3 className="text-2xl font-extrabold text-gray-900 mt-1">1.2K</h3>
                    </div>
                </div>

                {/* Tabel Data Berita */}
                <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                    <div className="p-5 border-b border-gray-100">
                        <h2 className="text-base font-bold text-gray-900">Daftar Kegiatan</h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead className="bg-gray-100 text-[11px] font-extrabold uppercase text-gray-500">
                                <tr>
                                    <th className="px-6 py-3">Judul Kegiatan</th>
                                    <th className="px-6 py-3">Tanggal</th>
                                    <th className="px-6 py-3">Kategori</th>
                                    <th className="px-6 py-3">Status</th>
                                    <th className="px-6 py-3 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                                {filteredBerita.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-8 text-center text-gray-400">
                                            Belum ada data kegiatan/berita.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredBerita.map((item) => (
                                        <tr key={item.id} className="hover:bg-gray-50 transition">
                                            <td className="px-6 py-3.5">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-10 w-10 shrink-0 overflow-hidden rounded-md border bg-gray-100">
                                                        {item.image ? (
                                                            <img
                                                                src={`/storage/${item.image}`}
                                                                alt={item.title}
                                                                className="h-full w-full object-cover"
                                                            />
                                                        ) : (
                                                            <div className="flex h-full w-full items-center justify-center font-bold text-gray-400">
                                                                {item.title?.charAt(0) || '-'}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <span className="font-bold text-gray-800 line-clamp-2 max-w-xs">
                                                        {item.title}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-3.5 whitespace-nowrap text-gray-500">
                                                {item.created_at
                                                    ? new Date(item.created_at).toLocaleDateString('id-ID', {
                                                          day: '2-digit',
                                                          month: 'short',
                                                          year: 'numeric',
                                                      })
                                                    : '-'}
                                            </td>
                                            <td className="px-6 py-3.5">
                                                <span className="rounded bg-indigo-50 px-2 py-1 text-[10px] font-bold text-indigo-700">
                                                    {item.category}
                                                </span>
                                            </td>
                                            <td className="px-6 py-3.5">
                                                <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                                                    item.status === 'PUBLISHED' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-3.5 text-right whitespace-nowrap">
                                                <button
                                                    type="button"
                                                    onClick={() => handleOpenEditModal(item)}
                                                    className="p-1 text-gray-600 hover:text-indigo-600 mr-2 font-semibold"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setDeleteItem(item)}
                                                    className="p-1 text-red-500 hover:text-red-700 font-semibold"
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
            </div>

            {/* Modal Tambah / Edit */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
                        <h3 className="text-base font-bold text-gray-900 border-b pb-3">
                            {editItem ? 'Edit Kegiatan' : 'Tambah Kegiatan Baru'}
                        </h3>

                        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-700">Judul Kegiatan</label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-xs focus:border-indigo-500 focus:outline-none"
                                />
                                {errors.title && <p className="mt-1 text-[10px] text-red-500">{errors.title}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700">Kategori</label>
                                    <select
                                        value={data.category}
                                        onChange={(e) => setData('category', e.target.value)}
                                        className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-xs focus:border-indigo-500 focus:outline-none"
                                    >
                                        <option value="PRESTASI">PRESTASI</option>
                                        <option value="KEGIATAN">KEGIATAN</option>
                                        <option value="PENGUMUMAN">PENGUMUMAN</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700">Status</label>
                                    <select
                                        value={data.status}
                                        onChange={(e) => setData('status', e.target.value)}
                                        className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-xs focus:border-indigo-500 focus:outline-none"
                                    >
                                        <option value="PUBLISHED">PUBLISHED</option>
                                        <option value="DRAFT">DRAFT</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-700">Isi Konten</label>
                                <textarea
                                    rows="4"
                                    value={data.content}
                                    onChange={(e) => setData('content', e.target.value)}
                                    className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-xs focus:border-indigo-500 focus:outline-none"
                                />
                                {errors.content && <p className="mt-1 text-[10px] text-red-500">{errors.content}</p>}
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-700">Gambar Thumbnail</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="mt-1 w-full text-xs text-gray-500"
                                />
                                {imagePreview && (
                                    <div className="mt-2">
                                        <img src={imagePreview} alt="Preview" className="h-20 w-20 rounded object-cover border" />
                                    </div>
                                )}
                                {errors.image && <p className="mt-1 text-[10px] text-red-500">{errors.image}</p>}
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="rounded-lg px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="rounded-lg bg-[#1E1B4B] px-4 py-2 text-xs font-semibold text-white hover:bg-[#15133c] disabled:opacity-50"
                                >
                                    {processing ? 'Menyimpan...' : 'Simpan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal Hapus */}
            {deleteItem && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl">
                        <h3 className="text-sm font-bold text-gray-900">Konfirmasi Hapus</h3>
                        <p className="mt-2 text-xs text-gray-600">
                            Yakin ingin menghapus <span className="font-bold text-gray-800">"{deleteItem.title}"</span>?
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