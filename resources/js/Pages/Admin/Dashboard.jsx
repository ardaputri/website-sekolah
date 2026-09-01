import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ 
    stats = {},
    beritaTerbaru = [],
    pesanTerbaru = [],
}) {
    const listBerita = beritaTerbaru.length > 0 ? beritaTerbaru : [];

    return (
        <AdminLayout header="Dashboard Utama">
            <Head title="Dashboard Admin - SMKN 4 Bogor" />

            <div className="space-y-6 text-gray-800">
                {/* 1. Ringkasan Statistik */}
                <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Ringkasan Statistik</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Total Berita */}
                        <div className="relative rounded-2xl bg-white p-5 shadow-sm border border-gray-100 flex flex-col justify-between h-36">
                            <div className="flex justify-between items-start">
                                <div className="p-3 bg-[#1E1B4B] rounded-xl text-white">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                                    </svg>
                                </div>
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-gray-500">Total Berita</p>
                                <p className="text-3xl font-extrabold text-gray-900 mt-1">{stats.totalBerita || 0}</p>
                            </div>
                        </div>

                        {/* Total Guru */}
                        <div className="relative rounded-2xl bg-white p-5 shadow-sm border border-gray-100 flex flex-col justify-between h-36">
                            <div className="flex justify-between items-start">
                                <div className="p-3 bg-[#1E1B4B] rounded-xl text-white">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                                    </svg>
                                </div>
                                <span className="px-2.5 py-0.5 bg-gray-200 text-gray-700 text-[10px] font-bold rounded">Tetap</span>
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-gray-500">Total Guru</p>
                                <p className="text-3xl font-extrabold text-gray-900 mt-1">{stats.totalGuru || 0}</p>
                            </div>
                        </div>

                        {/* Total Produk */}
                        <div className="relative rounded-2xl bg-white p-5 shadow-sm border border-gray-100 flex flex-col justify-between h-36">
                            <div className="flex justify-between items-start">
                                <div className="p-3 bg-[#1E1B4B] rounded-xl text-white">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                                    </svg>
                                </div>
                                <span className="px-2.5 py-0.5 bg-emerald-500 text-white text-[9px] font-bold rounded">Tersedia: {stats.available || 0}</span>
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-gray-500">Total Produk</p>
                                <p className="text-3xl font-extrabold text-gray-900 mt-1">{stats.totalProduk || 0}</p>
                            </div>
                        </div>

                        {/* Pesan Masuk */}
                        <div className="relative rounded-2xl bg-white p-5 shadow-sm border border-gray-100 flex flex-col justify-between h-36">
                            <div className="flex justify-between items-start">
                                <div className="p-3 bg-[#1E1B4B] rounded-xl text-white">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                                    </svg>
                                </div>
                                {stats.pesanBelumDibaca > 0 && (
                                    <span className="px-2 py-0.5 bg-red-500 text-white text-[9px] font-bold rounded">Baru: {stats.pesanBelumDibaca}</span>
                                )}
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-gray-500">Pesan Masuk</p>
                                <p className="text-3xl font-extrabold text-gray-900 mt-1">{stats.totalPesan || 0}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Tombol Aksi Cepat */}
                <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-3">Aksi Cepat</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                        <Link 
                            href={route('admin.news.index')} 
                            className="flex items-center justify-center gap-2 bg-[#1E1B4B] text-white py-3 px-4 rounded-xl font-bold text-xs shadow hover:bg-opacity-90 transition"
                        >
                            <span className="text-lg leading-none">+</span> Tambah Berita
                        </Link>
                        <Link href={route('admin.messages.index')} className="flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-800 py-3 px-4 rounded-xl font-bold text-xs hover:bg-gray-50 transition shadow-sm">
                            📨 Pesan Masuk {(stats.pesanBelumDibaca || 0) > 0 && <span className="bg-red-500 text-white text-[9px] px-1.5 py-0.5 rounded-full">{stats.pesanBelumDibaca}</span>}
                        </Link>
                        <Link href={route('admin.products.index')} className="flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-800 py-3 px-4 rounded-xl font-bold text-xs hover:bg-gray-50 transition shadow-sm">
                            📦 Kelola Produk
                        </Link>
                        <Link href={route('admin.teachers.index')} className="flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-800 py-3 px-4 rounded-xl font-bold text-xs hover:bg-gray-50 transition shadow-sm">
                            👨‍🏫 Kelola Guru
                        </Link>
                        <Link href={route('admin.academic.index')} className="flex items-center justify-center gap-2 bg-amber-400 text-indigo-950 py-3 px-4 rounded-xl font-bold text-xs hover:bg-amber-500 transition shadow-sm">
                            📚 Kelola Akademik
                        </Link>
                    </div>
                </div>

                {/* 3. Grid Konten Utama (Tabel Berita, Pengumuman & Aktivitas Admin) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* Kolom Kiri & Tengah (Berita & Pengumuman) */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Berita Terbaru Table */}
                        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-base font-bold text-gray-900">Berita Terbaru</h3>
                                <Link href={route('admin.news.index')} className="text-[10px] font-bold text-gray-600 bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200">
                                    Kelola Semua
                                </Link>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse text-xs">
                                    <thead>
                                        <tr className="bg-gray-100 text-gray-500 font-extrabold uppercase text-[10px]">
                                            <th className="py-2.5 px-3">Judul Berita</th>
                                            <th className="py-2.5 px-3">TANGGAL</th>
                                            <th className="py-2.5 px-3">KATEGORI</th>
                                            <th className="py-2.5 px-3">STATUS</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 font-medium">
                                        {listBerita.map((item) => (
                                            <tr key={item.id} className="hover:bg-gray-50">
                                                <td className="py-3 px-3 text-gray-800 font-bold max-w-xs leading-relaxed">
                                                    {item.title}
                                                </td>
                                                <td className="py-3 px-3 text-gray-500 whitespace-nowrap text-[11px]">
                                                    {item.date}
                                                </td>
                                                <td className="py-3 px-3 text-gray-600 font-semibold text-[11px]">
                                                    {item.category}
                                                </td>
                                                <td className="py-3 px-3">
                                                    <span className="bg-emerald-600 text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                                                        {item.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Pesan Masuk Terbaru */}
                        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                            <div className="flex justify-between items-center mb-3">
                                <h3 className="text-base font-bold text-gray-900">Pesan Masuk Terbaru</h3>
                                <Link href={route('admin.messages.index')} className="text-[10px] font-bold text-gray-500 hover:text-gray-800">
                                    Lihat Semua
                                </Link>
                            </div>

                            <div className="space-y-3">
                                {pesanTerbaru.length > 0 ? pesanTerbaru.map((p) => (
                                    <div key={p.id} className={`p-4 rounded-xl border-l-4 ${p.is_read ? 'bg-gray-50 border-gray-300' : 'bg-blue-50/50 border-blue-400'}`}>
                                        <div className="flex items-center justify-between">
                                            <p className="text-xs font-bold text-gray-800">{p.name}</p>
                                            {!p.is_read && <span className="h-2 w-2 rounded-full bg-blue-500"></span>}
                                        </div>
                                        <p className="text-[10px] text-gray-500 mt-0.5">{p.subject}</p>
                                        <p className="text-[10px] text-gray-400 mt-1">{p.date}</p>
                                    </div>
                                )) : (
                                    <div className="text-center py-6 text-gray-400 text-xs">
                                        Belum ada pesan masuk.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Kolom Kanan (Statistik Ringkas) */}
                    <div className="space-y-6">
                        <div className="bg-gray-100/80 rounded-2xl p-5 border border-gray-200/80">
                            <h3 className="text-base font-bold text-gray-900 mb-4">Ringkasan Data</h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between rounded-xl bg-white p-4 border border-gray-100">
                                    <span className="text-xs font-semibold text-gray-600">Program Akademik</span>
                                    <span className="text-lg font-extrabold text-[#1E1B4B]">{stats.totalProgramAkademik || 0}</span>
                                </div>
                                <div className="flex items-center justify-between rounded-xl bg-white p-4 border border-gray-100">
                                    <span className="text-xs font-semibold text-gray-600">Ekstrakurikuler</span>
                                    <span className="text-lg font-extrabold text-[#1E1B4B]">{stats.totalEkskul || 0}</span>
                                </div>
                                <div className="flex items-center justify-between rounded-xl bg-white p-4 border border-gray-100">
                                    <span className="text-xs font-semibold text-gray-600">Organisasi</span>
                                    <span className="text-lg font-extrabold text-[#1E1B4B]">{stats.totalOrganisasi || 0}</span>
                                </div>
                                <div className="flex items-center justify-between rounded-xl bg-white p-4 border border-gray-100">
                                    <span className="text-xs font-semibold text-gray-600">Total Admin</span>
                                    <span className="text-lg font-extrabold text-[#1E1B4B]">{stats.totalAdmin || 0}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </AdminLayout>
    );
}