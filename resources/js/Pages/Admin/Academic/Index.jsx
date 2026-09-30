import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { useState, useMemo } from 'react';

const HARI_LIST = ['senin', 'selasa', 'rabu', 'kamis', 'jumat'];
const HARI_LABEL = { senin: 'Senin', selasa: 'Selasa', rabu: 'Rabu', kamis: 'Kamis', jumat: 'Jumat' };
const HARI_SHORT = { senin: 'Sen', selasa: 'Sel', rabu: 'Rab', kamis: 'Kam', jumat: 'Jum' };
const KELAS_OPTIONS = ['X', 'XI', 'XII'];
const JURUSAN_OPTIONS = ['PPLG', 'TJKT', 'TO', 'TP'];

const COLORS = [
    'bg-blue-50 border-blue-200 text-blue-800',
    'bg-emerald-50 border-emerald-200 text-emerald-800',
    'bg-amber-50 border-amber-200 text-amber-800',
    'bg-purple-50 border-purple-200 text-purple-800',
    'bg-rose-50 border-rose-200 text-rose-800',
    'bg-cyan-50 border-cyan-200 text-cyan-800',
    'bg-indigo-50 border-indigo-200 text-indigo-800',
    'bg-teal-50 border-teal-200 text-teal-800',
];

function getColor(index) {
    return COLORS[index % COLORS.length];
}

export default function Index({ academics = [], rombels = [], jurusanList = [], hariList = [], filters = {} }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [filterRombel, setFilterRombel] = useState(filters.rombel || '');
    const [filterJurusan, setFilterJurusan] = useState(filters.jurusan || '');
    const [filterHari, setFilterHari] = useState(filters.hari || '');

    const { data, setData, post, put, delete: destroy, processing, reset, errors, clearErrors } = useForm({
        kelas: 'X', jurusan: 'PPLG', rombel: '', hari: 'senin',
        mata_pelajaran: '', jam_mulai: '07:00', jam_selesai: '09:00', guru: '', ruang: '',
    });

    const rombelGroups = useMemo(() => {
        const groups = {};
        academics.forEach((item) => {
            if (!groups[item.rombel]) groups[item.rombel] = [];
            groups[item.rombel].push(item);
        });
        return groups;
    }, [academics]);

    const availableRombels = useMemo(() => [...new Set(academics.map((a) => a.rombel))].sort(), [academics]);

    const applyFilters = (key, value) => {
        const params = { ...filters, [key]: value || undefined };
        if (!value) delete params[key];
        router.get(route('admin.academic.index'), params, { preserveState: true, replace: true });
    };

    const closeModal = () => { setIsModalOpen(false); setEditingItem(null); reset(); clearErrors(); };

    const openCreateModal = (prefill = {}) => {
        setEditingItem(null); reset(); clearErrors();
        if (prefill.hari) setData('hari', prefill.hari);
        if (prefill.rombel) setData('rombel', prefill.rombel);
        if (prefill.jurusan) setData('jurusan', prefill.jurusan);
        if (prefill.kelas) setData('kelas', prefill.kelas);
        setIsModalOpen(true);
    };

    const openEditModal = (item) => {
        setEditingItem(item); clearErrors();
        setData({
            kelas: item.kelas || 'X', jurusan: item.jurusan || 'PPLG', rombel: item.rombel || '',
            hari: item.hari || 'senin', mata_pelajaran: item.mata_pelajaran || '',
            jam_mulai: item.jam_mulai || '07:00', jam_selesai: item.jam_selesai || '09:00',
            guru: item.guru || '', ruang: item.ruang || '',
        });
        setIsModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingItem) {
            put(route('admin.academic.update', editingItem.id), { onSuccess: () => closeModal() });
        } else {
            post(route('admin.academic.store'), { onSuccess: () => closeModal() });
        }
    };

    const handleDelete = (id) => {
        if (confirm('Yakin ingin menghapus jadwal ini?')) destroy(route('admin.academic.destroy', id));
    };

    return (
        <AdminLayout header="Jadwal Pelajaran">
            <Head title="Admin - Jadwal Pelajaran" />
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-extrabold text-gray-900">Jadwal Pelajaran</h1>
                        <p className="text-sm text-gray-500 mt-1">Kelola jadwal pelajaran per rombel, hari, dan jam.</p>
                    </div>
                    <button onClick={() => openCreateModal({ rombel: filterRombel, jurusan: filterJurusan })} className="inline-flex items-center gap-2 rounded-lg bg-[#141B66] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#0f144a] transition">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                        Tambah Jadwal
                    </button>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap items-center gap-3 rounded-xl bg-white p-4 border border-gray-200 shadow-sm">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Filter:</span>
                    <select value={filterRombel} onChange={(e) => { setFilterRombel(e.target.value); applyFilters('rombel', e.target.value); }} className="rounded-lg border-gray-300 text-sm focus:border-[#141B66] focus:ring-[#141B66]">
                        <option value="">Semua Rombel</option>
                        {availableRombels.map((r) => <option key={r} value={r}>{r}</option>)}
                    </select>
                    <select value={filterJurusan} onChange={(e) => { setFilterJurusan(e.target.value); applyFilters('jurusan', e.target.value); }} className="rounded-lg border-gray-300 text-sm focus:border-[#141B66] focus:ring-[#141B66]">
                        <option value="">Semua Jurusan</option>
                        {JURUSAN_OPTIONS.map((j) => <option key={j} value={j}>{j}</option>)}
                    </select>
                    <select value={filterHari} onChange={(e) => { setFilterHari(e.target.value); applyFilters('hari', e.target.value); }} className="rounded-lg border-gray-300 text-sm focus:border-[#141B66] focus:ring-[#141B66]">
                        <option value="">Semua Hari</option>
                        {HARI_LIST.map((h) => <option key={h} value={h}>{HARI_LABEL[h]}</option>)}
                    </select>
                    {(filterRombel || filterJurusan || filterHari) && (
                        <button onClick={() => { setFilterRombel(''); setFilterJurusan(''); setFilterHari(''); router.get(route('admin.academic.index'), {}, { preserveState: true, replace: true }); }} className="text-xs font-medium text-red-500 hover:text-red-700">✕ Reset</button>
                    )}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="rounded-xl bg-white p-4 border border-gray-200 shadow-sm">
                        <div className="text-xs font-semibold text-gray-500 uppercase">Total Jadwal</div>
                        <div className="text-2xl font-bold text-gray-900 mt-1">{academics.length}</div>
                    </div>
                    <div className="rounded-xl bg-white p-4 border border-gray-200 shadow-sm">
                        <div className="text-xs font-semibold text-gray-500 uppercase">Rombel</div>
                        <div className="text-2xl font-bold text-[#141B66] mt-1">{availableRombels.length}</div>
                    </div>
                    <div className="rounded-xl bg-white p-4 border border-gray-200 shadow-sm">
                        <div className="text-xs font-semibold text-gray-500 uppercase">Hari Aktif</div>
                        <div className="text-2xl font-bold text-emerald-600 mt-1">{new Set(academics.map(a => a.hari)).size}</div>
                    </div>
                    <div className="rounded-xl bg-white p-4 border border-gray-200 shadow-sm">
                        <div className="text-xs font-semibold text-gray-500 uppercase">Mata Pelajaran</div>
                        <div className="text-2xl font-bold text-amber-600 mt-1">{new Set(academics.map(a => a.mata_pelajaran)).size}</div>
                    </div>
                </div>

                {/* Schedule per Rombel */}
                {Object.keys(rombelGroups).length > 0 ? (
                    Object.entries(rombelGroups).map(([rombel, items]) => {
                        const jurusan = items[0]?.jurusan || '';
                        const kelas = items[0]?.kelas || '';
                        const allSlots = [];
                        const seenSlots = new Set();
                        items.forEach((item) => {
                            const key = `${item.jam_mulai}-${item.jam_selesai}`;
                            if (!seenSlots.has(key)) { seenSlots.add(key); allSlots.push({ start: item.jam_mulai, end: item.jam_selesai }); }
                        });
                        allSlots.sort((a, b) => a.start.localeCompare(b.start));

                        return (
                            <div key={rombel} className="rounded-2xl bg-white border border-gray-200 shadow-sm overflow-hidden">
                                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-gray-50/80">
                                    <div className="flex items-center gap-3">
                                        <span className="inline-flex items-center rounded-lg bg-[#141B66] px-3 py-1 text-xs font-bold text-white">{rombel}</span>
                                        <div className="text-xs text-gray-500"><span className="font-semibold text-gray-700">{kelas}</span> • {jurusan}</div>
                                    </div>
                                    <button onClick={() => openCreateModal({ rombel, jurusan, kelas })} className="inline-flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition">
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                                        Tambah
                                    </button>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-xs">
                                        <thead>
                                            <tr className="border-b border-gray-100">
                                                <th className="w-20 px-3 py-2.5 text-left font-bold text-gray-400 uppercase tracking-wider bg-gray-50/50">Jam</th>
                                                {HARI_LIST.map((h) => (<th key={h} className="px-3 py-2.5 text-left font-bold text-gray-400 uppercase tracking-wider bg-gray-50/50 min-w-[140px]">{HARI_LABEL[h]}</th>))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {allSlots.length > 0 ? allSlots.map((slot, idx) => (
                                                <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50/50 transition">
                                                    <td className="px-3 py-2.5 font-bold text-gray-600 whitespace-nowrap align-top pt-3">
                                                        <div className="text-[11px]">{slot.start}</div>
                                                        <div className="text-[10px] text-gray-400">{slot.end}</div>
                                                    </td>
                                                    {HARI_LIST.map((h) => {
                                                        const match = items.filter((item) => item.hari === h && item.jam_mulai === slot.start && item.jam_selesai === slot.end);
                                                        return (
                                                            <td key={h} className="px-2 py-2 align-top">
                                                                {match.length > 0 ? match.map((m) => (
                                                                    <div key={m.id} className={`rounded-lg border p-2.5 mb-1 ${getColor(academics.indexOf(m))} group relative`}>
                                                                        <div className="font-bold text-xs leading-tight">{m.mata_pelajaran}</div>
                                                                        {m.guru && <div className="text-[10px] mt-0.5 opacity-75">👤 {m.guru}</div>}
                                                                        {m.ruang && <div className="text-[10px] opacity-75">📍 {m.ruang}</div>}
                                                                        <div className="absolute top-1.5 right-1.5 hidden group-hover:flex items-center gap-1">
                                                                            <button onClick={() => openEditModal(m)} className="p-0.5 rounded bg-white/80 hover:bg-white shadow-sm" title="Edit">
                                                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                                                            </button>
                                                                            <button onClick={() => handleDelete(m.id)} className="p-0.5 rounded bg-white/80 hover:bg-white shadow-sm text-red-500" title="Hapus">
                                                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                )) : (
                                                                    <button onClick={() => openCreateModal({ rombel, jurusan, kelas, hari: h })} className="w-full rounded-lg border border-dashed border-gray-200 p-3 text-center text-gray-300 hover:border-[#141B66] hover:text-[#141B66] hover:bg-indigo-50/50 transition">
                                                                        <svg className="w-4 h-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                                                                    </button>
                                                                )}
                                                            </td>
                                                        );
                                                    })}
                                                </tr>
                                            )) : (
                                                <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-400">Belum ada jadwal. Klik "Tambah" untuk menambahkan.</td></tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="rounded-2xl bg-white border border-gray-200 shadow-sm p-12 text-center">
                        <div className="mx-auto w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                            <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        </div>
                        <p className="text-sm font-medium text-gray-500">Belum ada data jadwal pelajaran.</p>
                        <button onClick={() => openCreateModal()} className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#141B66] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0f144a] transition">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                            Tambah Jadwal Pertama
                        </button>
                    </div>
                )}
            </div>

            {/* Modal Form */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm p-4">
                    <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl max-h-[90vh] overflow-y-auto border border-gray-200">
                        <div className="flex items-center justify-between mb-5 pb-3 border-b border-gray-100">
                            <h3 className="text-lg font-bold text-gray-900">{editingItem ? 'Edit Jadwal Pelajaran' : 'Tambah Jadwal Pelajaran'}</h3>
                            <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 rounded-lg p-1 text-lg font-bold">✕</button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-3 gap-3">
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 mb-1">Kelas</label>
                                    <select value={data.kelas} onChange={(e) => setData('kelas', e.target.value)} className="w-full rounded-lg border-gray-300 text-sm focus:border-[#141B66] focus:ring-[#141B66]">
                                        {KELAS_OPTIONS.map((k) => <option key={k} value={k}>Kelas {k}</option>)}
                                    </select>
                                    {errors.kelas && <p className="mt-1 text-[10px] text-red-500">{errors.kelas}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 mb-1">Jurusan</label>
                                    <select value={data.jurusan} onChange={(e) => setData('jurusan', e.target.value)} className="w-full rounded-lg border-gray-300 text-sm focus:border-[#141B66] focus:ring-[#141B66]">
                                        {JURUSAN_OPTIONS.map((j) => <option key={j} value={j}>{j}</option>)}
                                    </select>
                                    {errors.jurusan && <p className="mt-1 text-[10px] text-red-500">{errors.jurusan}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 mb-1">Rombel</label>
                                    <input type="text" placeholder="PPLG 1" value={data.rombel} onChange={(e) => setData('rombel', e.target.value)} className="w-full rounded-lg border-gray-300 text-sm focus:border-[#141B66] focus:ring-[#141B66]" required />
                                    {errors.rombel && <p className="mt-1 text-[10px] text-red-500">{errors.rombel}</p>}
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1">Hari</label>
                                <div className="flex gap-2">
                                    {HARI_LIST.map((h) => (
                                        <button key={h} type="button" onClick={() => setData('hari', h)} className={`flex-1 rounded-lg py-2 text-xs font-semibold transition border ${data.hari === h ? 'bg-[#141B66] text-white border-[#141B66]' : 'bg-white text-gray-600 border-gray-200 hover:border-[#141B66]'}`}>
                                            {HARI_SHORT[h]}
                                        </button>
                                    ))}
                                </div>
                                {errors.hari && <p className="mt-1 text-[10px] text-red-500">{errors.hari}</p>}
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1">Mata Pelajaran</label>
                                <input type="text" placeholder="Contoh: Matematika" value={data.mata_pelajaran} onChange={(e) => setData('mata_pelajaran', e.target.value)} className="w-full rounded-lg border-gray-300 text-sm focus:border-[#141B66] focus:ring-[#141B66]" required />
                                {errors.mata_pelajaran && <p className="mt-1 text-[10px] text-red-500">{errors.mata_pelajaran}</p>}
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 mb-1">Jam Mulai</label>
                                    <input type="time" value={data.jam_mulai} onChange={(e) => setData('jam_mulai', e.target.value)} className="w-full rounded-lg border-gray-300 text-sm focus:border-[#141B66] focus:ring-[#141B66]" required />
                                    {errors.jam_mulai && <p className="mt-1 text-[10px] text-red-500">{errors.jam_mulai}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 mb-1">Jam Selesai</label>
                                    <input type="time" value={data.jam_selesai} onChange={(e) => setData('jam_selesai', e.target.value)} className="w-full rounded-lg border-gray-300 text-sm focus:border-[#141B66] focus:ring-[#141B66]" required />
                                    {errors.jam_selesai && <p className="mt-1 text-[10px] text-red-500">{errors.jam_selesai}</p>}
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 mb-1">Guru Pengajar</label>
                                    <input type="text" placeholder="Nama guru (opsional)" value={data.guru} onChange={(e) => setData('guru', e.target.value)} className="w-full rounded-lg border-gray-300 text-sm focus:border-[#141B66] focus:ring-[#141B66]" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 mb-1">Ruang</label>
                                    <input type="text" placeholder="Ruang kelas (opsional)" value={data.ruang} onChange={(e) => setData('ruang', e.target.value)} className="w-full rounded-lg border-gray-300 text-sm focus:border-[#141B66] focus:ring-[#141B66]" />
                                </div>
                            </div>
                            <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end gap-3">
                                <button type="button" onClick={closeModal} className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition">Batal</button>
                                <button type="submit" disabled={processing} className="rounded-lg bg-[#141B66] px-5 py-2 text-sm font-semibold text-white hover:bg-[#0f144a] disabled:opacity-50 transition">
                                    {processing ? 'Menyimpan...' : editingItem ? 'Simpan Perubahan' : 'Tambah Jadwal'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
