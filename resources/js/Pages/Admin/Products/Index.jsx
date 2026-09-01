import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Index({ products = { data: [] }, categories = [], programs = [], filters = {}, stats = {} }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [deleteItem, setDeleteItem] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        _method: 'POST',
        name: '',
        description: '',
        short_description: '',
        price: '',
        status: 'available',
        product_category_id: '',
        academic_program_id: '',
        maker: '',
        image: null,
    });

    useEffect(() => {
        return () => { if (imagePreview?.startsWith('blob:')) URL.revokeObjectURL(imagePreview); };
    }, [imagePreview]);

    const handleOpenCreateModal = () => {
        setEditItem(null);
        if (imagePreview?.startsWith('blob:')) URL.revokeObjectURL(imagePreview);
        setImagePreview(null);
        reset();
        clearErrors();
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (item) => {
        setEditItem(item);
        clearErrors();
        if (imagePreview?.startsWith('blob:')) URL.revokeObjectURL(imagePreview);
        setImagePreview(item.image ? `/storage/${item.image}` : null);
        setData({
            _method: 'PUT',
            name: item.name || '',
            description: item.description || '',
            short_description: item.short_description || '',
            price: item.price || '',
            status: item.status || 'available',
            product_category_id: item.product_category_id || '',
            academic_program_id: item.academic_program_id || '',
            maker: item.maker || '',
            image: null,
        });
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditItem(null);
        if (imagePreview?.startsWith('blob:')) URL.revokeObjectURL(imagePreview);
        setImagePreview(null);
        reset();
        clearErrors();
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('image', file);
            if (imagePreview?.startsWith('blob:')) URL.revokeObjectURL(imagePreview);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const targetRoute = editItem
            ? route('admin.products.update', editItem.id)
            : route('admin.products.store');
        post(targetRoute, { forceFormData: true, onSuccess: () => handleCloseModal() });
    };

    const handleDelete = () => {
        if (!deleteItem) return;
        router.delete(route('admin.products.destroy', deleteItem.id), { onSuccess: () => setDeleteItem(null) });
    };

    const applyFilter = (key, value) => {
        router.get(route('admin.products.index'), { ...filters, [key]: value }, { preserveState: true, replace: true });
    };

    const statusColor = {
        available: 'bg-emerald-100 text-emerald-700',
        coming_soon: 'bg-yellow-100 text-yellow-700',
        sold_out: 'bg-red-100 text-red-700',
    };

    const statusLabel = { available: 'Tersedia', coming_soon: 'Segera Hadir', sold_out: 'Terjual' };
    const list = products.data || [];

    return (
        <AdminLayout header="Kelola Produk">
            <Head title="Kelola Produk - SMKN 4 Bogor" />

            <div className="space-y-6 text-gray-800">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-extrabold text-gray-900">Kelola Produk</h1>
                        <p className="text-xs text-gray-500 font-medium mt-0.5">Manajemen produk & karya siswa</p>
                    </div>
                    <button onClick={handleOpenCreateModal} className="inline-flex items-center gap-2 rounded-lg bg-[#1E1B4B] px-4 py-2.5 text-xs font-semibold text-white shadow transition hover:bg-[#15133c]">
                        <span className="text-sm font-bold">+</span> Tambah Produk
                    </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                        <p className="text-[10px] font-bold tracking-wider text-gray-500 uppercase">Total</p>
                        <h3 className="text-2xl font-extrabold text-gray-900 mt-1">{stats.total || 0}</h3>
                    </div>
                    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                        <p className="text-[10px] font-bold tracking-wider text-gray-500 uppercase">Tersedia</p>
                        <h3 className="text-2xl font-extrabold text-emerald-600 mt-1">{stats.available || 0}</h3>
                    </div>
                    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                        <p className="text-[10px] font-bold tracking-wider text-gray-500 uppercase">Segera Hadir</p>
                        <h3 className="text-2xl font-extrabold text-yellow-600 mt-1">{stats.coming_soon || 0}</h3>
                    </div>
                    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                        <p className="text-[10px] font-bold tracking-wider text-gray-500 uppercase">Terjual</p>
                        <h3 className="text-2xl font-extrabold text-red-600 mt-1">{stats.sold_out || 0}</h3>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-3">
                    <select onChange={(e) => applyFilter('category_id', e.target.value)} value={filters.category_id || ''} className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-700">
                        <option value="">Semua Kategori</option>
                        {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                    <select onChange={(e) => applyFilter('program_id', e.target.value)} value={filters.program_id || ''} className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-700">
                        <option value="">Semua Kompetensi</option>
                        {programs.map((p) => <option key={p.id} value={p.id}>{p.short_code} - {p.name}</option>)}
                    </select>
                    <select onChange={(e) => applyFilter('status', e.target.value)} value={filters.status || ''} className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-700">
                        <option value="">Semua Status</option>
                        <option value="available">Tersedia</option>
                        <option value="coming_soon">Segera Hadir</option>
                        <option value="sold_out">Terjual</option>
                    </select>
                </div>

                {/* Grid Produk */}
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {list.length === 0 ? (
                        <div className="sm:col-span-2 lg:col-span-3 xl:col-span-4 rounded-2xl border border-dashed border-gray-200 py-16 text-center text-gray-400">
                            Belum ada produk.
                        </div>
                    ) : list.map((item) => (
                        <div key={item.id} className="rounded-2xl border border-gray-100 bg-white overflow-hidden shadow-sm">
                            <div className="h-40 overflow-hidden bg-gray-100">
                                {item.image ? (
                                    <img src={`/storage/${item.image}`} alt={item.name} className="h-full w-full object-cover" />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-gray-300">{item.name?.charAt(0)}</div>
                                )}
                            </div>
                            <div className="p-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-bold text-gray-900 text-sm line-clamp-1">{item.name}</h3>
                                    <span className={`shrink-0 rounded-full px-2 py-0.5 text-[9px] font-bold ${statusColor[item.status] || 'bg-gray-100 text-gray-600'}`}>
                                        {statusLabel[item.status] || item.status}
                                    </span>
                                </div>
                                {item.category && <p className="mt-1 text-[10px] text-gray-400">Kategori: {item.category.name}</p>}
                                {item.maker && <p className="text-[10px] text-gray-400">Pembuat: {item.maker}</p>}
                                {item.price && <p className="mt-1 text-sm font-extrabold text-[#1E1B4B]">Rp {Number(item.price).toLocaleString('id-ID')}</p>}
                                <div className="mt-3 flex gap-2">
                                    <button onClick={() => handleOpenEditModal(item)} className="rounded-lg bg-gray-100 px-3 py-1.5 text-[10px] font-semibold text-gray-700 hover:bg-gray-200">Edit</button>
                                    <button onClick={() => setDeleteItem(item)} className="rounded-lg bg-red-50 px-3 py-1.5 text-[10px] font-semibold text-red-600 hover:bg-red-100">Hapus</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                {products.last_page > 1 && (
                    <div className="flex items-center justify-center gap-1">
                        {products.links.map((link, i) => (
                            <button key={i} onClick={() => link.url && router.get(link.url)} disabled={!link.url}
                                className={`px-3 py-1 rounded text-xs font-semibold ${link.active ? 'bg-[#1E1B4B] text-white' : link.url ? 'bg-gray-100 text-gray-600 hover:bg-gray-200' : 'bg-gray-50 text-gray-300'}`}
                                dangerouslySetInnerHTML={{ __html: link.label }} />
                        ))}
                    </div>
                )}
            </div>

            {/* Modal Tambah / Edit */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl max-h-[90vh] overflow-y-auto">
                        <h3 className="text-base font-bold text-gray-900 border-b pb-3">{editItem ? 'Edit Produk' : 'Tambah Produk Baru'}</h3>
                        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-700">Nama Produk</label>
                                <input type="text" value={data.name} onChange={(e) => setData('name', e.target.value)} className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-xs focus:border-indigo-500 focus:outline-none" />
                                {errors.name && <p className="mt-1 text-[10px] text-red-500">{errors.name}</p>}
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-700">Deskripsi Singkat</label>
                                <input type="text" value={data.short_description} onChange={(e) => setData('short_description', e.target.value)} className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-xs focus:border-indigo-500 focus:outline-none" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-700">Deskripsi Lengkap</label>
                                <textarea rows="4" value={data.description} onChange={(e) => setData('description', e.target.value)} className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-xs focus:border-indigo-500 focus:outline-none" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700">Harga (Rp)</label>
                                    <input type="number" value={data.price} onChange={(e) => setData('price', e.target.value)} placeholder="Kosongkan jika tidak dijual" className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-xs focus:border-indigo-500 focus:outline-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700">Status</label>
                                    <select value={data.status} onChange={(e) => setData('status', e.target.value)} className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-xs focus:border-indigo-500 focus:outline-none">
                                        <option value="available">Tersedia</option>
                                        <option value="coming_soon">Segera Hadir</option>
                                        <option value="sold_out">Terjual</option>
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700">Kategori</label>
                                    <select value={data.product_category_id} onChange={(e) => setData('product_category_id', e.target.value)} className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-xs focus:border-indigo-500 focus:outline-none">
                                        <option value="">Pilih Kategori</option>
                                        {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700">Kompetensi Keahlian</label>
                                    <select value={data.academic_program_id} onChange={(e) => setData('academic_program_id', e.target.value)} className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-xs focus:border-indigo-500 focus:outline-none">
                                        <option value="">Pilih Kompetensi</option>
                                        {programs.map((p) => <option key={p.id} value={p.id}>{p.short_code}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-700">Pembuat</label>
                                <input type="text" value={data.maker} onChange={(e) => setData('maker', e.target.value)} placeholder="Kelas XII PPLG" className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-xs focus:border-indigo-500 focus:outline-none" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-700">Gambar Produk</label>
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
