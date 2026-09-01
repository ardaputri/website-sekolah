import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ academics = [] }) {
    const [editingItem, setEditingItem] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Form Inertia untuk Tambah / Edit Data
    const { data, setData, post, delete: destroy, processing, reset, errors, clearErrors } = useForm({
        title: '',
        category: 'Jadwal Pelajaran',
        description: '',
        file: null,
    });

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingItem(null);
        reset();
        clearErrors();
    };

    const openCreateModal = () => {
        setEditingItem(null);
        reset();
        clearErrors();
        setIsModalOpen(true);
    };

    const openEditModal = (item) => {
        setEditingItem(item);
        clearErrors();
        setData({
            title: item.title || '',
            category: item.category || 'Jadwal Pelajaran',
            description: item.description || '',
            file: null,
        });
        setIsModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editingItem) {
            // Gunakan router.post dengan _method: 'put' untuk mendukung upload file multipart/form-data
            router.post(route('admin.academic.update', editingItem.id), {
                _method: 'put',
                ...data,
            }, {
                onSuccess: () => closeModal(),
            });
        } else {
            post(route('admin.academic.store'), {
                onSuccess: () => closeModal(),
            });
        }
    };

    const handleDelete = (id) => {
        if (confirm('Apakah kamu yakin ingin menghapus data akademik ini?')) {
            destroy(route('admin.academic.destroy', id));
        }
    };

    return (
        <AdminLayout header="Kelola Data Akademik">
            <Head title="Admin - Kelola Akademik" />

            <div className="space-y-6">
                {/* Header & Tombol Tambah */}
                <div className="flex items-center justify-between rounded-xl bg-white p-6 shadow-sm">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">Kelola Data Akademik</h2>
                        <p className="text-sm text-gray-500">Atur kurikulum, jadwal pelajaran, dan kompetensi keahlian.</p>
                    </div>
                    <button
                        type="button"
                        onClick={openCreateModal}
                        className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
                    >
                        + Tambah Data
                    </button>
                </div>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Tabel Data */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="rounded-xl bg-white p-6 shadow-sm">
                            <h3 className="mb-4 text-lg font-bold text-gray-800">Daftar Data Akademik</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm text-gray-600">
                                    <thead className="bg-gray-50 text-xs uppercase text-gray-700">
                                        <tr>
                                            <th className="px-4 py-3">Judul / Mata Pelajaran</th>
                                            <th className="px-4 py-3">Kategori</th>
                                            <th className="px-4 py-3">Deskripsi</th>
                                            <th className="px-4 py-3 text-center">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {academics.length > 0 ? (
                                            academics.map((item) => (
                                                <tr key={item.id} className="hover:bg-gray-50">
                                                    <td className="px-4 py-3 font-medium text-gray-900">{item.title}</td>
                                                    <td className="px-4 py-3">
                                                        <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-600">
                                                            {item.category}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-3">{item.description || '-'}</td>
                                                    <td className="px-4 py-3 text-center">
                                                        <div className="flex justify-center gap-2">
                                                            <button
                                                                type="button"
                                                                onClick={() => openEditModal(item)}
                                                                className="text-indigo-600 hover:text-indigo-900 font-medium"
                                                            >
                                                                Edit
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => handleDelete(item.id)}
                                                                className="text-red-600 hover:text-red-900 font-medium"
                                                            >
                                                                Hapus
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="4" className="py-8 text-center text-gray-400">
                                                    Belum ada data akademik disimpan.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Widget Aksi Cepat */}
                    <div className="space-y-6">
                        <div className="rounded-xl bg-white p-6 shadow-sm">
                            <h3 className="mb-3 text-base font-bold text-gray-800">Aksi Cepat</h3>
                            <div className="space-y-2">
                                <button
                                    type="button"
                                    onClick={openCreateModal}
                                    className="w-full rounded-lg border border-gray-200 p-3 text-left text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    ➕ Tambah Data Akademik
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Form Tambah / Edit */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
                        <h3 className="mb-4 text-lg font-bold text-gray-800">
                            {editingItem ? 'Edit Data Akademik' : 'Tambah Data Akademik'}
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Judul / Mata Pelajaran</label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    className="mt-1 w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    required
                                />
                                {errors.title && <span className="mt-1 text-xs text-red-500 block">{errors.title}</span>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Kategori</label>
                                <select
                                    value={data.category}
                                    onChange={(e) => setData('category', e.target.value)}
                                    className="mt-1 w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                                >
                                    <option value="Jadwal Pelajaran">Jadwal Pelajaran</option>
                                    <option value="Kompetensi Keahlian">Kompetensi Keahlian</option>
                                    <option value="Kurikulum">Kurikulum</option>
                                </select>
                                {errors.category && <span className="mt-1 text-xs text-red-500 block">{errors.category}</span>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Deskripsi / Detail</label>
                                <textarea
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    className="mt-1 w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    rows="3"
                                ></textarea>
                                {errors.description && <span className="mt-1 text-xs text-red-500 block">{errors.description}</span>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Upload Berkas / Modul (Opsional)</label>
                                <input
                                    type="file"
                                    onChange={(e) => setData('file', e.target.files[0] || null)}
                                    className="mt-1 w-full text-sm text-gray-500 file:mr-4 file:rounded-lg file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-indigo-700 hover:file:bg-indigo-100"
                                />
                                {errors.file && <span className="mt-1 text-xs text-red-500 block">{errors.file}</span>}
                            </div>

                            <div className="mt-6 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
                                >
                                    {processing ? 'Menyimpan...' : editingItem ? 'Simpan Perubahan' : 'Tambah Data'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}