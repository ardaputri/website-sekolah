import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Index({ programs = [] }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [deleteItem, setDeleteItem] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        _method: 'POST',
        name: '',
        short_code: '',
        description: '',
        curriculum: '',
        subjects: '',
        career_prospects: '',
        facilities: '',
        certifications: '',
        image: null,
        is_active: true,
        sort_order: 0,
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
        setImagePreview(item.image ? (item.image.startsWith('/') ? item.image : `/storage/${item.image}`) : null);
        setData({
            _method: 'PUT',
            name: item.name || '',
            short_code: item.short_code || '',
            description: item.description || '',
            curriculum: item.curriculum || '',
            // Send arrays as newline-separated text for easier form handling
            subjects: (item.subjects || []).join('\n'),
            career_prospects: (item.career_prospects || []).join('\n'),
            facilities: (item.facilities || []).join('\n'),
            certifications: (item.certifications || []).join('\n'),
            image: null,
            is_active: item.is_active ?? true,
            sort_order: item.sort_order ?? 0,
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
            ? route('admin.academic-programs.update', editItem.id)
            : route('admin.academic-programs.store');
        post(targetRoute, { forceFormData: true, onSuccess: () => handleCloseModal() });
    };

    const handleDelete = () => {
        if (!deleteItem) return;
        router.delete(route('admin.academic-programs.destroy', deleteItem.id), {
            onSuccess: () => setDeleteItem(null),
        });
    };

    const toggleActive = (item) => {
        const formData = new FormData();
        formData.append('_method', 'PUT');
        formData.append('name', item.name);
        formData.append('short_code', item.short_code);
        formData.append('description', item.description || '');
        formData.append('curriculum', item.curriculum || '');
        formData.append('is_active', item.is_active ? '0' : '1');
        formData.append('sort_order', item.sort_order || 0);
        (item.subjects || []).forEach((s, i) => formData.append(`subjects[${i}]`, s));
        (item.career_prospects || []).forEach((s, i) => formData.append(`career_prospects[${i}]`, s));
        (item.facilities || []).forEach((s, i) => formData.append(`facilities[${i}]`, s));
        (item.certifications || []).forEach((s, i) => formData.append(`certifications[${i}]`, s));

        router.post(route('admin.academic-programs.update', item.id), formData, { preserveState: true });
    };

    const ph = (label, w = 400, h = 300) =>
        `data:image/svg+xml;utf8,${encodeURIComponent(
            `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><rect width="100%" height="100%" fill="#e5e7eb"/><text x="50%" y="50%" font-family="sans-serif" font-size="14" fill="#9ca3af" text-anchor="middle" dominant-baseline="middle">${label}</text></svg>`,
        )}`;

    const getImageUrl = (item) => {
        if (!item?.image) return null;
        if (item.image.startsWith('http') || item.image.startsWith('/')) return item.image;
        return `/storage/${item.image}`;
    };

    // Stats
    const totalActive = programs.filter(p => p.is_active).length;
    const totalSubjects = programs.reduce((acc, p) => acc + (p.subjects?.length || 0), 0);

    return (
        <AdminLayout header="Kompetensi Keahlian">
            <Head title="Kompetensi Keahlian — Admin" />

            <div className="space-y-6 text-gray-800">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-extrabold text-gray-900">Kompetensi Keahlian</h1>
                        <p className="text-xs text-gray-500 font-medium mt-0.5">Kelola program keahlian yang ditampilkan di halaman akademik</p>
                    </div>
                    <button onClick={handleOpenCreateModal}
                        className="inline-flex items-center gap-2 rounded-lg bg-[#1E1B4B] px-4 py-2.5 text-xs font-semibold text-white shadow transition hover:bg-[#15133c]">
                        <span className="text-sm font-bold">+</span> Tambah Program
                    </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                        <p className="text-[10px] font-bold tracking-wider text-gray-500 uppercase">Total Program</p>
                        <h3 className="text-2xl font-extrabold text-gray-900 mt-1">{programs.length}</h3>
                    </div>
                    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                        <p className="text-[10px] font-bold tracking-wider text-gray-500 uppercase">Aktif</p>
                        <h3 className="text-2xl font-extrabold text-emerald-600 mt-1">{totalActive}</h3>
                    </div>
                    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                        <p className="text-[10px] font-bold tracking-wider text-gray-500 uppercase">Total Mata Pelajaran</p>
                        <h3 className="text-2xl font-extrabold text-indigo-600 mt-1">{totalSubjects}</h3>
                    </div>
                    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                        <p className="text-[10px] font-bold tracking-wider text-gray-500 uppercase">Nonaktif</p>
                        <h3 className="text-2xl font-extrabold text-red-500 mt-1">{programs.length - totalActive}</h3>
                    </div>
                </div>

                {/* Grid Cards */}
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                    {programs.map((item) => (
                        <div key={item.id} className="rounded-2xl border border-gray-100 bg-white overflow-hidden shadow-sm">
                            <div className="h-40 overflow-hidden bg-gray-100 relative">
                                {getImageUrl(item) ? (
                                    <img src={getImageUrl(item)} alt={item.name}
                                        onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = ph(item.short_code, 400, 300); }}
                                        className="h-full w-full object-cover" />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-indigo-100 to-blue-100">
                                        <span className="text-3xl font-bold text-indigo-300">{item.short_code}</span>
                                    </div>
                                )}
                                <div className="absolute top-2 right-2">
                                    <span className={`inline-block rounded-full px-2 py-0.5 text-[9px] font-bold ${item.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-200 text-gray-500'}`}>
                                        {item.is_active ? 'Aktif' : 'Nonaktif'}
                                    </span>
                                </div>
                                <div className="absolute bottom-2 left-2">
                                    <span className="inline-block rounded-full bg-yellow-400 px-2 py-0.5 text-[9px] font-bold text-[#1E2A5E]">
                                        {item.short_code}
                                    </span>
                                </div>
                            </div>

                            <div className="p-4">
                                <h3 className="font-bold text-gray-900 text-sm line-clamp-2 leading-snug">{item.name}</h3>
                                <p className="mt-1 text-[10px] text-gray-400 line-clamp-2">{item.description || 'Tidak ada deskripsi'}</p>

                                <div className="mt-2 flex flex-wrap gap-1">
                                    {(item.subjects || []).slice(0, 2).map((s, i) => (
                                        <span key={i} className="rounded-full bg-indigo-50 px-2 py-0.5 text-[9px] font-medium text-indigo-700 line-clamp-1">{s}</span>
                                    ))}
                                    {(item.subjects || []).length > 2 && (
                                        <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[9px] font-medium text-gray-500">+{item.subjects.length - 2}</span>
                                    )}
                                </div>

                                <div className="mt-3 flex gap-2">
                                    <button onClick={() => handleOpenEditModal(item)}
                                        className="rounded-lg bg-gray-100 px-3 py-1.5 text-[10px] font-semibold text-gray-700 hover:bg-gray-200 transition">
                                        Edit
                                    </button>
                                    <button onClick={() => toggleActive(item)}
                                        className={`rounded-lg px-3 py-1.5 text-[10px] font-semibold transition ${item.is_active ? 'bg-amber-50 text-amber-700 hover:bg-amber-100' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'}`}>
                                        {item.is_active ? 'Nonaktif' : 'Aktifkan'}
                                    </button>
                                    <button onClick={() => setDeleteItem(item)}
                                        className="rounded-lg bg-red-50 px-3 py-1.5 text-[10px] font-semibold text-red-600 hover:bg-red-100 transition ml-auto">
                                        Hapus
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    {programs.length === 0 && (
                        <div className="sm:col-span-2 lg:col-span-3 xl:col-span-4 rounded-2xl border border-dashed border-gray-200 py-16 text-center text-gray-400">
                            Belum ada program keahlian.
                        </div>
                    )}
                </div>
            </div>

            {/* ===== MODAL TAMBAH / EDIT ===== */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 pt-10 pb-10">
                    <div className="relative w-full max-w-2xl rounded-xl bg-white shadow-xl">
                        <div className="sticky top-0 flex items-center justify-between border-b border-gray-100 bg-white rounded-t-xl px-6 py-4">
                            <h3 className="text-base font-bold text-gray-900">{editItem ? 'Edit Program Keahlian' : 'Tambah Program Keahlian'}</h3>
                            <button onClick={handleCloseModal} className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="block text-[11px] font-semibold text-gray-600 mb-1">Nama Program *</label>
                                    <input type="text" value={data.name} onChange={(e) => setData('name', e.target.value)}
                                        className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-xs focus:border-indigo-500 focus:outline-none"
                                        placeholder="Pengembangan Perangkat Lunak dan Gim" required />
                                    {errors.name && <p className="mt-1 text-[10px] text-red-500">{errors.name}</p>}
                                </div>
                                <div>
                                    <label className="block text-[11px] font-semibold text-gray-600 mb-1">Kode Singkat *</label>
                                    <input type="text" value={data.short_code} onChange={(e) => setData('short_code', e.target.value.toUpperCase())}
                                        className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-xs uppercase focus:border-indigo-500 focus:outline-none"
                                        placeholder="PPLG" required />
                                    {errors.short_code && <p className="mt-1 text-[10px] text-red-500">{errors.short_code}</p>}
                                </div>
                            </div>

                            <div>
                                <label className="block text-[11px] font-semibold text-gray-600 mb-1">Deskripsi</label>
                                <textarea value={data.description} onChange={(e) => setData('description', e.target.value)} rows={3}
                                    className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-xs focus:border-indigo-500 focus:outline-none"
                                    placeholder="Deskripsi program keahlian..." />
                            </div>

                            <div>
                                <label className="block text-[11px] font-semibold text-gray-600 mb-1">Kurikulum</label>
                                <textarea value={data.curriculum} onChange={(e) => setData('curriculum', e.target.value)} rows={2}
                                    className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-xs focus:border-indigo-500 focus:outline-none"
                                    placeholder="Profil kurikulum yang digunakan..." />
                            </div>

                            <div>
                                <label className="block text-[11px] font-semibold text-gray-600 mb-1">Mata Pelajaran <span className="text-gray-400">(satu per baris)</span></label>
                                <textarea value={data.subjects} onChange={(e) => setData('subjects', e.target.value)} rows={4}
                                    className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-xs focus:border-indigo-500 focus:outline-none"
                                    placeholder={"Pemrograman Web\nBasis Data\nDesain UI/UX"} />
                                {errors.subjects && <p className="mt-1 text-[10px] text-red-500">{errors.subjects}</p>}
                            </div>

                            <div>
                                <label className="block text-[11px] font-semibold text-gray-600 mb-1">Prospek Karier <span className="text-gray-400">(satu per baris)</span></label>
                                <textarea value={data.career_prospects} onChange={(e) => setData('career_prospects', e.target.value)} rows={4}
                                    className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-xs focus:border-indigo-500 focus:outline-none"
                                    placeholder={"Web Developer\nMobile App Developer\nUI/UX Designer"} />
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="block text-[11px] font-semibold text-gray-600 mb-1">Fasilitas <span className="text-gray-400">(satu per baris)</span></label>
                                    <textarea value={data.facilities} onChange={(e) => setData('facilities', e.target.value)} rows={3}
                                        className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-xs focus:border-indigo-500 focus:outline-none"
                                        placeholder={"Laboratorium Komputer\nLaboratorium Jaringan"} />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-semibold text-gray-600 mb-1">Sertifikasi <span className="text-gray-400">(satu per baris)</span></label>
                                    <textarea value={data.certifications} onChange={(e) => setData('certifications', e.target.value)} rows={3}
                                        className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-xs focus:border-indigo-500 focus:outline-none"
                                        placeholder={"Junior Web Programmer (BNSP)\nMobile App Developer (BNSP)"} />
                                </div>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="block text-[11px] font-semibold text-gray-600 mb-1">Gambar</label>
                                    <input type="file" accept="image/*" onChange={handleImageChange}
                                        className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-xs file:mr-3 file:rounded-lg file:border-0 file:bg-indigo-50 file:px-3 file:py-1 file:text-[10px] file:font-semibold file:text-indigo-700 hover:file:bg-indigo-100" />
                                    {imagePreview && (
                                        <img src={imagePreview} alt="Preview" className="mt-2 h-16 rounded-lg object-cover" />
                                    )}
                                    {!imagePreview && editItem?.image && (
                                        <img src={getImageUrl(editItem)} alt="Current" className="mt-2 h-16 rounded-lg object-cover" />
                                    )}
                                    {errors.image && <p className="mt-1 text-[10px] text-red-500">{errors.image}</p>}
                                </div>
                                <div className="flex flex-col gap-3">
                                    <div>
                                        <label className="block text-[11px] font-semibold text-gray-600 mb-1">Urutan Tampil</label>
                                        <input type="number" min="0" value={data.sort_order}
                                            onChange={(e) => setData('sort_order', parseInt(e.target.value) || 0)}
                                            className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-xs focus:border-indigo-500 focus:outline-none" />
                                    </div>
                                    <label className="flex items-center gap-2 text-[11px] font-semibold text-gray-600 mt-2">
                                        <input type="checkbox" checked={data.is_active}
                                            onChange={(e) => setData('is_active', e.target.checked)}
                                            className="h-3.5 w-3.5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                        Aktif
                                    </label>
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 border-t border-gray-100 pt-4">
                                <button type="button" onClick={handleCloseModal}
                                    className="rounded-lg border border-gray-300 px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition">
                                    Batal
                                </button>
                                <button type="submit" disabled={processing}
                                    className="rounded-lg bg-[#1E1B4B] px-5 py-2 text-xs font-semibold text-white shadow hover:bg-[#15133c] disabled:opacity-50 transition">
                                    {processing ? 'Menyimpan...' : editItem ? 'Update' : 'Simpan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ===== HAPUS CONFIRM ===== */}
            {deleteItem && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="mx-4 w-full max-w-sm rounded-xl bg-white p-6 shadow-xl">
                        <div className="text-center">
                            <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-red-100">
                                <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                </svg>
                            </div>
                            <h3 className="mt-3 text-lg font-bold text-gray-900">Hapus Program?</h3>
                            <p className="mt-2 text-sm text-gray-500">
                                <strong>{deleteItem.name}</strong> ({deleteItem.short_code}) akan dihapus permanen.
                            </p>
                        </div>
                        <div className="mt-5 flex gap-3">
                            <button onClick={() => setDeleteItem(null)}
                                className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition">
                                Batal
                            </button>
                            <button onClick={handleDelete}
                                className="flex-1 rounded-lg bg-red-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-red-700 transition">
                                Ya, Hapus
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
