import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Organization({ organizations = [] }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [deleteItem, setDeleteItem] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [imagePreview, setImagePreview] = useState(null);

    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        _method: 'POST',
        name: '',
        description: '',
        vision: '',
        mission: '',
        period: '',
        image: null,
    });

    useEffect(() => {
        return () => {
            if (imagePreview && imagePreview.startsWith('blob:')) {
                URL.revokeObjectURL(imagePreview);
            }
        };
    }, [imagePreview]);

    const handleOpenCreateModal = () => {
        setEditItem(null);
        if (imagePreview && imagePreview.startsWith('blob:')) URL.revokeObjectURL(imagePreview);
        setImagePreview(null);
        reset();
        clearErrors();
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (item) => {
        setEditItem(item);
        clearErrors();
        if (imagePreview && imagePreview.startsWith('blob:')) URL.revokeObjectURL(imagePreview);
        setImagePreview(item.image ? `/storage/${item.image}` : null);
        setData({
            _method: 'PUT',
            name: item.name || '',
            description: item.description || '',
            vision: item.vision || '',
            mission: item.mission || '',
            period: item.period || '',
            image: null,
        });
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditItem(null);
        if (imagePreview && imagePreview.startsWith('blob:')) URL.revokeObjectURL(imagePreview);
        setImagePreview(null);
        reset();
        clearErrors();
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('image', file);
            if (imagePreview && imagePreview.startsWith('blob:')) URL.revokeObjectURL(imagePreview);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const targetRoute = editItem
            ? route('admin.kesiswaan.organization.update', editItem.id)
            : route('admin.kesiswaan.organization.store');

        post(targetRoute, {
            forceFormData: true,
            onSuccess: () => handleCloseModal(),
        });
    };

    const handleDelete = () => {
        if (!deleteItem) return;
        router.delete(route('admin.kesiswaan.organization.destroy', deleteItem.id), {
            onSuccess: () => setDeleteItem(null),
        });
    };

    const filtered = organizations.filter((item) =>
        item.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <AdminLayout header="Kelola Organisasi">
            <Head title="Kelola Organisasi - SMKN 4 Bogor" />

            <div className="space-y-6 text-gray-800">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="relative w-full max-w-xs">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </span>
                        <input
                            type="text"
                            placeholder="Cari organisasi..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full rounded-full border-0 bg-gray-200/60 py-2 pl-9 pr-4 text-xs font-medium text-gray-700 placeholder-gray-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <button
                        onClick={handleOpenCreateModal}
                        className="inline-flex items-center gap-2 rounded-lg bg-[#1E1B4B] px-4 py-2.5 text-xs font-semibold text-white shadow transition hover:bg-[#15133c]"
                    >
                        <span className="text-sm font-bold">+</span> Tambah Organisasi
                    </button>
                </div>

                <div>
                    <h1 className="text-2xl font-extrabold text-gray-900">Kelola Organisasi</h1>
                    <p className="text-xs text-gray-500 font-medium mt-0.5">Manajemen organisasi siswa (OSIS, MPK, dll)</p>
                </div>

                {/* Grid Organisasi */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filtered.length === 0 ? (
                        <div className="sm:col-span-2 lg:col-span-3 rounded-2xl border border-dashed border-gray-200 py-16 text-center text-gray-400">
                            Belum ada data organisasi.
                        </div>
                    ) : (
                        filtered.map((item) => (
                            <div key={item.id} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                                            {item.image ? (
                                                <img src={`/storage/${item.image}`} alt={item.name} className="h-full w-full object-cover" />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center font-bold text-gray-400 text-sm">
                                                    {item.name?.charAt(0)}
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900">{item.name}</h3>
                                            {item.period && <p className="text-[10px] text-gray-400">Periode: {item.period}</p>}
                                        </div>
                                    </div>
                                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${item.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>
                                        {item.is_active ? 'Aktif' : 'Nonaktif'}
                                    </span>
                                </div>
                                {item.description && (
                                    <p className="mt-3 text-xs text-gray-600 line-clamp-2">{item.description}</p>
                                )}
                                <div className="mt-4 flex gap-2">
                                    <button onClick={() => handleOpenEditModal(item)} className="rounded-lg bg-gray-100 px-3 py-1.5 text-[10px] font-semibold text-gray-700 hover:bg-gray-200">
                                        Edit
                                    </button>
                                    <button onClick={() => setDeleteItem(item)} className="rounded-lg bg-red-50 px-3 py-1.5 text-[10px] font-semibold text-red-600 hover:bg-red-100">
                                        Hapus
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Modal Tambah / Edit */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl max-h-[90vh] overflow-y-auto">
                        <h3 className="text-base font-bold text-gray-900 border-b pb-3">
                            {editItem ? 'Edit Organisasi' : 'Tambah Organisasi Baru'}
                        </h3>
                        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-700">Nama Organisasi</label>
                                <input type="text" value={data.name} onChange={(e) => setData('name', e.target.value)}
                                    className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-xs focus:border-indigo-500 focus:outline-none" />
                                {errors.name && <p className="mt-1 text-[10px] text-red-500">{errors.name}</p>}
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-700">Deskripsi</label>
                                <textarea rows="3" value={data.description} onChange={(e) => setData('description', e.target.value)}
                                    className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-xs focus:border-indigo-500 focus:outline-none" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-700">Visi</label>
                                <input type="text" value={data.vision} onChange={(e) => setData('vision', e.target.value)}
                                    className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-xs focus:border-indigo-500 focus:outline-none" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-700">Misi</label>
                                <textarea rows="3" value={data.mission} onChange={(e) => setData('mission', e.target.value)}
                                    className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-xs focus:border-indigo-500 focus:outline-none" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-700">Periode</label>
                                <input type="text" value={data.period} onChange={(e) => setData('period', e.target.value)} placeholder="2026/2027"
                                    className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-xs focus:border-indigo-500 focus:outline-none" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-700">Logo / Gambar</label>
                                <input type="file" accept="image/*" onChange={handleImageChange} className="mt-1 w-full text-xs text-gray-500" />
                                {imagePreview && <img src={imagePreview} alt="Preview" className="mt-2 h-20 w-20 rounded object-cover border" />}
                            </div>
                            <div className="flex justify-end gap-3 pt-4 border-t">
                                <button type="button" onClick={handleCloseModal} className="rounded-lg px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100">Batal</button>
                                <button type="submit" disabled={processing} className="rounded-lg bg-[#1E1B4B] px-4 py-2 text-xs font-semibold text-white hover:bg-[#15133c] disabled:opacity-50">
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
                        <p className="mt-2 text-xs text-gray-600">Yakin ingin menghapus <span className="font-bold text-gray-800">"{deleteItem.name}"</span>?</p>
                        <div className="flex justify-end gap-3 mt-6">
                            <button onClick={() => setDeleteItem(null)} className="rounded-lg px-3 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-100">Batal</button>
                            <button onClick={handleDelete} className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-700">Hapus</button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
