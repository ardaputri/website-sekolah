import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Index({ teachers = { data: [] }, programs = [], filters = {} }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [deleteItem, setDeleteItem] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        _method: 'POST',
        name: '',
        nip: '',
        position: '',
        subject: '',
        academic_program_id: '',
        phone: '',
        email: '',
        bio: '',
        photo: null,
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
        setImagePreview(item.photo ? `/storage/${item.photo}` : null);
        setData({
            _method: 'PUT',
            name: item.name || '',
            nip: item.nip || '',
            position: item.position || '',
            subject: item.subject || '',
            academic_program_id: item.academic_program_id || '',
            phone: item.phone || '',
            email: item.email || '',
            bio: item.bio || '',
            photo: null,
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
            setData('photo', file);
            if (imagePreview?.startsWith('blob:')) URL.revokeObjectURL(imagePreview);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const targetRoute = editItem
            ? route('admin.teachers.update', editItem.id)
            : route('admin.teachers.store');
        post(targetRoute, { forceFormData: true, onSuccess: () => handleCloseModal() });
    };

    const handleDelete = () => {
        if (!deleteItem) return;
        router.delete(route('admin.teachers.destroy', deleteItem.id), { onSuccess: () => setDeleteItem(null) });
    };

    const applyFilter = (key, value) => {
        router.get(route('admin.teachers.index'), { ...filters, [key]: value }, { preserveState: true, replace: true });
    };

    const list = teachers.data || [];

    return (
        <AdminLayout header="Kelola Tenaga Pendidik">
            <Head title="Kelola Tenaga Pendidik - SMKN 4 Bogor" />

            <div className="space-y-6 text-gray-800">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="relative w-full max-w-xs">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </span>
                        <input type="text" placeholder="Cari guru..." value={filters.search || ''}
                            onChange={(e) => applyFilter('search', e.target.value)}
                            className="w-full rounded-full border-0 bg-gray-200/60 py-2 pl-9 pr-4 text-xs font-medium text-gray-700 placeholder-gray-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    </div>
                    <div className="flex gap-3">
                        <select onChange={(e) => applyFilter('program_id', e.target.value)} value={filters.program_id || ''} className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-700">
                            <option value="">Semua Kompetensi</option>
                            {programs.map((p) => <option key={p.id} value={p.id}>{p.short_code}</option>)}
                        </select>
                        <button onClick={handleOpenCreateModal} className="inline-flex items-center gap-2 rounded-lg bg-[#1E1B4B] px-4 py-2.5 text-xs font-semibold text-white shadow transition hover:bg-[#15133c]">
                            <span className="text-sm font-bold">+</span> Tambah Guru
                        </button>
                    </div>
                </div>

                <div>
                    <h1 className="text-2xl font-extrabold text-gray-900">Kelola Tenaga Pendidik</h1>
                    <p className="text-xs text-gray-500 font-medium mt-0.5">Manajemen data guru dan tenaga pengajar</p>
                </div>

                {/* Tabel Guru */}
                <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead className="bg-gray-100 text-[11px] font-extrabold uppercase text-gray-500">
                                <tr>
                                    <th className="px-6 py-3">Guru</th>
                                    <th className="px-6 py-3">NIP</th>
                                    <th className="px-6 py-3">Mata Pelajaran</th>
                                    <th className="px-6 py-3">Kompetensi</th>
                                    <th className="px-6 py-3">Kontak</th>
                                    <th className="px-6 py-3 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                                {list.length === 0 ? (
                                    <tr><td colSpan="6" className="px-6 py-8 text-center text-gray-400">Belum ada data guru.</td></tr>
                                ) : list.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50 transition">
                                        <td className="px-6 py-3.5">
                                            <div className="flex items-center gap-3">
                                                <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full bg-gray-100">
                                                    {item.photo ? (
                                                        <img src={`/storage/${item.photo}`} alt={item.name} className="h-full w-full object-cover" />
                                                    ) : (
                                                        <div className="flex h-full w-full items-center justify-center font-bold text-gray-400 text-[10px]">{item.name?.charAt(0)}</div>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-800">{item.name}</p>
                                                    {item.position && <p className="text-[10px] text-gray-400">{item.position}</p>}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-3.5 text-gray-500">{item.nip || '-'}</td>
                                        <td className="px-6 py-3.5 font-semibold text-gray-800">{item.subject || '-'}</td>
                                        <td className="px-6 py-3.5">
                                            {item.academic_program ? (
                                                <span className="rounded bg-indigo-50 px-2 py-1 text-[10px] font-bold text-indigo-700">{item.academic_program.short_code}</span>
                                            ) : '-'}
                                        </td>
                                        <td className="px-6 py-3.5 text-gray-500 text-[11px]">
                                            {item.phone && <div>📱 {item.phone}</div>}
                                            {item.email && <div>✉️ {item.email}</div>}
                                        </td>
                                        <td className="px-6 py-3.5 text-right whitespace-nowrap">
                                            <button onClick={() => handleOpenEditModal(item)} className="p-1 text-gray-600 hover:text-indigo-600 mr-2 font-semibold">Edit</button>
                                            <button onClick={() => setDeleteItem(item)} className="p-1 text-red-500 hover:text-red-700 font-semibold">Hapus</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {teachers.last_page > 1 && (
                        <div className="border-t border-gray-100 px-6 py-4 flex justify-center gap-1">
                            {teachers.links.map((link, i) => (
                                <button key={i} onClick={() => link.url && router.get(link.url)} disabled={!link.url}
                                    className={`px-3 py-1 rounded text-xs font-semibold ${link.active ? 'bg-[#1E1B4B] text-white' : link.url ? 'bg-gray-100 text-gray-600 hover:bg-gray-200' : 'bg-gray-50 text-gray-300'}`}
                                    dangerouslySetInnerHTML={{ __html: link.label }} />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Modal Tambah / Edit */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl max-h-[90vh] overflow-y-auto">
                        <h3 className="text-base font-bold text-gray-900 border-b pb-3">{editItem ? 'Edit Data Guru' : 'Tambah Guru Baru'}</h3>
                        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700">Nama Lengkap</label>
                                    <input type="text" value={data.name} onChange={(e) => setData('name', e.target.value)} className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-xs focus:border-indigo-500 focus:outline-none" />
                                    {errors.name && <p className="mt-1 text-[10px] text-red-500">{errors.name}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700">NIP</label>
                                    <input type="text" value={data.nip} onChange={(e) => setData('nip', e.target.value)} className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-xs focus:border-indigo-500 focus:outline-none" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700">Jabatan</label>
                                    <input type="text" value={data.position} onChange={(e) => setData('position', e.target.value)} placeholder="Guru Mata Pelajaran" className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-xs focus:border-indigo-500 focus:outline-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700">Mata Pelajaran</label>
                                    <input type="text" value={data.subject} onChange={(e) => setData('subject', e.target.value)} className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-xs focus:border-indigo-500 focus:outline-none" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-700">Kompetensi Keahlian</label>
                                <select value={data.academic_program_id} onChange={(e) => setData('academic_program_id', e.target.value)} className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-xs focus:border-indigo-500 focus:outline-none">
                                    <option value="">Pilih Kompetensi</option>
                                    {programs.map((p) => <option key={p.id} value={p.id}>{p.short_code} - {p.name}</option>)}
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700">Telepon</label>
                                    <input type="text" value={data.phone} onChange={(e) => setData('phone', e.target.value)} className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-xs focus:border-indigo-500 focus:outline-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700">Email</label>
                                    <input type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-xs focus:border-indigo-500 focus:outline-none" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-700">Bio Singkat</label>
                                <textarea rows="3" value={data.bio} onChange={(e) => setData('bio', e.target.value)} className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-xs focus:border-indigo-500 focus:outline-none" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-700">Foto</label>
                                <input type="file" accept="image/*" onChange={handleImageChange} className="mt-1 w-full text-xs text-gray-500" />
                                {imagePreview && <img src={imagePreview} alt="Preview" className="mt-2 h-20 w-20 rounded-full object-cover border" />}
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
                        <p className="mt-2 text-xs text-gray-600">Yakin ingin menghapus data <span className="font-bold text-gray-800">"{deleteItem.name}"</span>?</p>
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
