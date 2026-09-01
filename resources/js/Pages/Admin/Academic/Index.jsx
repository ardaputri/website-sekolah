import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ academics = [] }) {
    const [editingItem, setEditingItem] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Logic CRUD Inertia (TETAP & TIDAK DIUBAH)
    const { data, setData, post, put, delete: destroy, processing, reset, errors, clearErrors } = useForm({
        kelas: 'XII',
        jurusan: 'PPLG',
        rombel: 'PPLG 1',
        waktu: '',
        senin: '',
        selasa: '',
        rabu: '',
        kamis: '',
        jumat: '',
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
            kelas: item.kelas || 'XII',
            jurusan: item.jurusan || 'PPLG',
            rombel: item.rombel || '',
            waktu: item.waktu || '',
            senin: item.senin || '',
            selasa: item.selasa || '',
            rabu: item.rabu || '',
            kamis: item.kamis || '',
            jumat: item.jumat || '',
        });
        setIsModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editingItem) {
            put(route('admin.academic.update', editingItem.id), {
                onSuccess: () => closeModal(),
            });
        } else {
            post(route('admin.academic.store'), {
                onSuccess: () => closeModal(),
            });
        }
    };

    const handleDelete = (id) => {
        if (confirm('Apakah kamu yakin ingin menghapus data jadwal ini?')) {
            destroy(route('admin.academic.destroy', id));
        }
    };

    return (
        <AdminLayout header="Kelola Data Akademik">
            <Head title="Admin - Kelola Data Akademik" />

            <div className="space-y-6 pb-12">
                {/* Header Title & Tombol Aksi Utama */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Kelola Data Akademik</h1>
                        <p className="text-sm text-gray-500 mt-1">Atur Kurikulum, jadwal pelajaran, dan kompetensi keahlian.</p>
                    </div>
                    <button
                        type="button"
                        onClick={openCreateModal}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-white border border-gray-200 px-4 py-2.5 text-xs font-bold text-gray-800 shadow-sm transition hover:bg-gray-50"
                    >
                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Update Jadwal Pelajaran
                    </button>
                </div>

                {/* Main Content Layout Grid */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    
                    {/* Column Kiri & Tengah (Daftar Jurusan & Tabel Utama) */}
                    <div className="lg:col-span-2 space-y-6">
                        
                        {/* Card Top: Daftar Kompetensi Keahlian (Sesuai Desain Gambar) */}
                        <div className="rounded-2xl bg-white p-6 border border-gray-200/80 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-base font-bold text-gray-900">Daftar Kompetensi Keahlian</h2>
                                <a href="#" className="text-xs font-semibold text-gray-600 hover:text-gray-900 flex items-center gap-1">
                                    Lihat Semua <span>→</span>
                                </a>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="rounded-xl border border-gray-200 bg-gray-50/50 p-4">
                                    <div className="w-8 h-8 rounded-lg bg-[#141B66] mb-3"></div>
                                    <h3 className="text-xs font-bold text-gray-900">Pengembangan perangkat lunak dan Gim</h3>
                                    <p className="text-[11px] text-gray-500 mt-1 leading-snug">
                                        Fokus pada rekayasa perangkat lunak, coding, dan pembuatan aplikasi game modern.
                                    </p>
                                </div>
                                <div className="rounded-xl border border-gray-200 bg-gray-50/50 p-4">
                                    <div className="w-8 h-8 rounded-lg bg-[#141B66] mb-3"></div>
                                    <h3 className="text-xs font-bold text-gray-900">Teknik Jaringan Komputer dan Telekomunikasi</h3>
                                    <p className="text-[11px] text-gray-500 mt-1 leading-snug">
                                        Mempelajari instansi jaringan, administrasi server, dan sistem telekomunikasi digital.
                                    </p>
                                </div>
                                <div className="rounded-xl border border-gray-200 bg-gray-50/50 p-4">
                                    <div className="w-8 h-8 rounded-lg bg-[#141B66] mb-3"></div>
                                    <h3 className="text-xs font-bold text-gray-900">Teknik Otomotif</h3>
                                    <p className="text-[11px] text-gray-500 mt-1 leading-snug">
                                        Spesialisasi pada perbaikan kendaraan bermotor, sistem kelistrikan, mesin, dan sasis.
                                    </p>
                                </div>
                                <div className="rounded-xl border border-gray-200 bg-gray-50/50 p-4">
                                    <div className="w-8 h-8 rounded-lg bg-[#141B66] mb-3"></div>
                                    <h3 className="text-xs font-bold text-gray-900">Teknik Pemesinan</h3>
                                    <p className="text-[11px] text-gray-500 mt-1 leading-snug">
                                        Pengoperasian mesin perkakas, bubut, milling, dan teknik manufaktur industri presisi.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Card Bottom: Manajemen Jadwal Pelajaran (Tabel Data CRUD) */}
                        <div className="rounded-2xl bg-white border border-gray-200/80 shadow-sm overflow-hidden">
                            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                                <h2 className="text-base font-bold text-gray-900">Manajemen Jadwal Pelajaran</h2>
                                <button
                                    type="button"
                                    onClick={openCreateModal}
                                    className="px-3 py-1.5 bg-[#141B66] text-white text-xs font-semibold rounded-lg hover:bg-[#0f144a] transition"
                                >
                                    + Tambah Data
                                </button>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-xs">
                                    <thead className="bg-gray-50 border-b border-gray-100 text-[11px] font-bold uppercase tracking-wider text-gray-400">
                                        <tr>
                                            <th className="px-4 py-3.5">Waktu</th>
                                            <th className="px-4 py-3.5">Rombel</th>
                                            <th className="px-3 py-3.5">Senin</th>
                                            <th className="px-3 py-3.5">Selasa</th>
                                            <th className="px-3 py-3.5">Rabu</th>
                                            <th className="px-3 py-3.5">Kamis</th>
                                            <th className="px-3 py-3.5">Jumat</th>
                                            <th className="px-4 py-3.5 text-center">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                                        {academics.length > 0 ? (
                                            academics.map((item) => (
                                                <tr key={item.id} className="hover:bg-gray-50/70 transition-colors">
                                                    <td className="px-4 py-3.5 font-bold text-gray-900 whitespace-nowrap">
                                                        {item.waktu}
                                                    </td>
                                                    <td className="px-4 py-3.5 font-semibold text-gray-800 whitespace-nowrap">
                                                        {item.kelas} {item.rombel}
                                                    </td>
                                                    <td className="px-3 py-3.5 text-gray-900 font-semibold">{item.senin || '-'}</td>
                                                    <td className="px-3 py-3.5">{item.selasa || '-'}</td>
                                                    <td className="px-3 py-3.5">{item.rabu || '-'}</td>
                                                    <td className="px-3 py-3.5">{item.kamis || '-'}</td>
                                                    <td className="px-3 py-3.5">{item.jumat || '-'}</td>
                                                    <td className="px-4 py-3.5 text-center whitespace-nowrap">
                                                        <div className="flex items-center justify-center gap-2">
                                                            {/* Icon Pensil Edit Sesuai Gambar */}
                                                            <button
                                                                type="button"
                                                                onClick={() => openEditModal(item)}
                                                                className="p-1.5 text-gray-700 hover:text-[#141B66] hover:bg-gray-100 rounded-md transition"
                                                                title="Edit"
                                                            >
                                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                                </svg>
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => handleDelete(item.id)}
                                                                className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-md transition"
                                                                title="Hapus"
                                                            >
                                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="8" className="py-8 text-center text-gray-400 font-normal">
                                                    Belum ada data jadwal pelajaran.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>

                    {/* Column Kanan (Banner Preview & Widget Aksi Cepat) */}
                    <div className="space-y-6">
                        
                        {/* Banner Card Preview (Sesuai Gambar) */}
                        <div className="relative overflow-hidden rounded-2xl bg-[#141B66] p-6 text-white shadow-sm min-h-[300px] flex flex-col justify-end">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />
                            {/* Placeholder Banner Image */}
                            <div className="absolute inset-0 bg-indigo-900 opacity-50 mix-blend-multiply" />
                            
                            <div className="relative z-20 space-y-2">
                                <h3 className="text-lg font-bold">SMKN 4 Bogor</h3>
                                <p className="text-xs text-gray-200 leading-snug">
                                    Eksplorasi keunggulan akademik Berbasis Teknologi dan karakter Berakhlak Mulia.
                                </p>
                            </div>
                        </div>

                        {/* Widget Aksi Cepat (Sesuai Gambar) */}
                        <div className="rounded-2xl bg-white p-6 border border-gray-200/80 shadow-sm">
                            <h3 className="text-sm font-bold text-gray-900 mb-4">Aksi Cepat</h3>
                            <div className="space-y-2">
                                <button
                                    type="button"
                                    className="w-full flex items-center justify-between py-2.5 px-1 text-xs font-bold text-gray-700 hover:text-[#141B66] border-b border-gray-100 transition"
                                >
                                    <span>Import Kurikulum</span>
                                    <span className="text-gray-400">&gt;</span>
                                </button>
                                <button
                                    type="button"
                                    className="w-full flex items-center justify-between py-2.5 px-1 text-xs font-bold text-gray-700 hover:text-[#141B66] border-b border-gray-100 transition"
                                >
                                    <span>Export Jadwal (PDF)</span>
                                    <span className="text-gray-400">&gt;</span>
                                </button>
                                <button
                                    type="button"
                                    className="w-full flex items-center justify-between py-2.5 px-1 text-xs font-bold text-gray-700 hover:text-[#141B66] transition"
                                >
                                    <span>Laporan Mingguan</span>
                                    <span className="text-gray-400">&gt;</span>
                                </button>
                            </div>
                        </div>

                        {/* Accent Card Kuning (Sesuai Gambar) */}
                        <div className="h-24 rounded-2xl bg-amber-400/90 shadow-sm"></div>

                    </div>

                </div>
            </div>

            {/* Modal Form Tambah / Edit (CRUD Logic Tetap Utuh) */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm p-4">
                    <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl max-h-[90vh] overflow-y-auto border border-gray-200">
                        <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                            <h3 className="text-base font-bold text-gray-900">
                                {editingItem ? 'Edit Jadwal Pelajaran' : 'Tambah Jadwal Pelajaran'}
                            </h3>
                            <button 
                                onClick={closeModal}
                                className="text-gray-400 hover:text-gray-600 rounded-lg p-1 text-sm font-bold"
                            >
                                ✕
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-3 gap-3">
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 mb-1">Kelas</label>
                                    <select
                                        value={data.kelas}
                                        onChange={(e) => setData('kelas', e.target.value)}
                                        className="w-full rounded-xl border border-gray-200 p-2 text-xs focus:border-[#141B66] focus:ring-[#141B66]"
                                    >
                                        <option value="X">Kelas X</option>
                                        <option value="XI">Kelas XI</option>
                                        <option value="XII">Kelas XII</option>
                                    </select>
                                    {errors.kelas && <p className="mt-1 text-[10px] text-rose-500">{errors.kelas}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 mb-1">Jurusan</label>
                                    <select
                                        value={data.jurusan}
                                        onChange={(e) => setData('jurusan', e.target.value)}
                                        className="w-full rounded-xl border border-gray-200 p-2 text-xs focus:border-[#141B66] focus:ring-[#141B66]"
                                    >
                                        <option value="PPLG">PPLG</option>
                                        <option value="TJKT">TJKT</option>
                                        <option value="TO">TO</option>
                                        <option value="TP">TP</option>
                                    </select>
                                    {errors.jurusan && <p className="mt-1 text-[10px] text-rose-500">{errors.jurusan}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 mb-1">Rombel</label>
                                    <input
                                        type="text"
                                        placeholder="PPLG 1"
                                        value={data.rombel}
                                        onChange={(e) => setData('rombel', e.target.value)}
                                        className="w-full rounded-xl border border-gray-200 p-2 text-xs focus:border-[#141B66] focus:ring-[#141B66]"
                                        required
                                    />
                                    {errors.rombel && <p className="mt-1 text-[10px] text-rose-500">{errors.rombel}</p>}
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1">Rentang Waktu</label>
                                <input
                                    type="text"
                                    placeholder="07.00 - 08.30"
                                    value={data.waktu}
                                    onChange={(e) => setData('waktu', e.target.value)}
                                    className="w-full rounded-xl border border-gray-200 p-2 text-xs focus:border-[#141B66] focus:ring-[#141B66]"
                                    required
                                />
                                {errors.waktu && <p className="mt-1 text-[10px] text-rose-500">{errors.waktu}</p>}
                            </div>

                            <div className="pt-2">
                                <p className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-2">Mata Pelajaran Per Hari</p>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-[11px] text-gray-500 mb-1">Senin</label>
                                        <input
                                            type="text"
                                            placeholder="MTK"
                                            value={data.senin}
                                            onChange={(e) => setData('senin', e.target.value)}
                                            className="w-full rounded-xl border border-gray-200 p-2 text-xs focus:border-[#141B66] focus:ring-[#141B66]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] text-gray-500 mb-1">Selasa</label>
                                        <input
                                            type="text"
                                            placeholder="Bahasa Indonesia"
                                            value={data.selasa}
                                            onChange={(e) => setData('selasa', e.target.value)}
                                            className="w-full rounded-xl border border-gray-200 p-2 text-xs focus:border-[#141B66] focus:ring-[#141B66]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] text-gray-500 mb-1">Rabu</label>
                                        <input
                                            type="text"
                                            placeholder="Pemrograman Dasar"
                                            value={data.rabu}
                                            onChange={(e) => setData('rabu', e.target.value)}
                                            className="w-full rounded-xl border border-gray-200 p-2 text-xs focus:border-[#141B66] focus:ring-[#141B66]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] text-gray-500 mb-1">Kamis</label>
                                        <input
                                            type="text"
                                            placeholder="Bahasa Sunda"
                                            value={data.kamis}
                                            onChange={(e) => setData('kamis', e.target.value)}
                                            className="w-full rounded-xl border border-gray-200 p-2 text-xs focus:border-[#141B66] focus:ring-[#141B66]"
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block text-[11px] text-gray-500 mb-1">Jumat</label>
                                        <input
                                            type="text"
                                            placeholder="Pendidikan Agama"
                                            value={data.jumat}
                                            onChange={(e) => setData('jumat', e.target.value)}
                                            className="w-full rounded-xl border border-gray-200 p-2 text-xs focus:border-[#141B66] focus:ring-[#141B66]"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="rounded-xl border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-50 transition"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="rounded-xl bg-[#141B66] px-5 py-2 text-xs font-semibold text-white hover:bg-[#0f144a] disabled:opacity-50 transition"
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