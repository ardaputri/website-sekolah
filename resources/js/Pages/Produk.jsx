import PublicLayout from '@/Layouts/PublicLayout';
import { to } from '@/lib/nav';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { useMemo, useState } from 'react';

/* Placeholder SVG */
const ph = (label, w = 400, h = 300) =>
    `data:image/svg+xml;utf8,${encodeURIComponent(
        `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}'><rect width='100%' height='100%' fill='%23e5e7eb'/><text x='50%' y='50%' font-family='sans-serif' font-size='16' fill='%239ca3af' text-anchor='middle' dominant-baseline='middle'>${label}</text></svg>`,
    )}`;

export default function Produk({ produkList = [], kategoriList = [], kompetensiList = [] }) {
    const { settings } = usePage().props;
    const siteName = settings?.site_name ?? 'SMKN 4 Bogor';

    const fallbackTo = (label, w, h) => (e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = ph(label, w, h);
    };

    const getImageUrl = (img) => {
        if (!img) return ph('Produk', 640, 400);
        if (img.startsWith('http') || img.startsWith('/images/')) return img;
        return `/storage/${img}`;
    };

    /* Filter state */
    const [kategori, setKategori] = useState('Semua');
    const [kompetensi, setKompetensi] = useState('Semua');
    const [cari, setCari] = useState('');

    const semuaKategori = ['Semua', ...kategoriList];
    const semuaKompetensi = ['Semua', ...kompetensiList];

    const hasil = useMemo(() => {
        const q = cari.trim().toLowerCase();
        return produkList.filter((p) => {
            const cocokKategori = kategori === 'Semua' || p.category === kategori;
            const cocokKompetensi = kompetensi === 'Semua' || p.kompetensi === kompetensi;
            const cocokCari =
                q === '' ||
                p.name.toLowerCase().includes(q) ||
                (p.description || '').toLowerCase().includes(q) ||
                (p.maker || '').toLowerCase().includes(q);
            return cocokKategori && cocokKompetensi && cocokCari;
        });
    }, [produkList, kategori, kompetensi, cari]);

    const statusLabel = {
        available: 'Tersedia',
        coming_soon: 'Segera Hadir',
        sold_out: 'Terjual',
    };

    const statusColor = {
        available: 'bg-emerald-100 text-emerald-700',
        coming_soon: 'bg-yellow-100 text-yellow-700',
        sold_out: 'bg-red-100 text-red-700',
    };

    return (
        <PublicLayout>
            <Head title={`Produk — ${siteName}`} />

            {/* ===== HERO ===== */}
            <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
                <div className="rounded-3xl bg-gray-50 p-6 md:p-10">
                    <div className="grid items-center gap-8 md:grid-cols-2">
                        <div>
                            <h1 className="text-3xl font-extrabold leading-tight text-[#1E2A5E] sm:text-4xl">
                                Produk Inovasi Siswa
                            </h1>
                            <p className="mt-4 leading-relaxed text-gray-600">
                                Jelajahi karya kreatif, proyek teknis, dan produk unggulan yang
                                dikembangkan oleh siswa-siswi berbakat {siteName}. Etalase inovasi
                                kebanggaan sekolah kami.
                            </p>
                            <a
                                href="#katalog"
                                className="mt-6 inline-block rounded-lg bg-[#1E2A5E] px-6 py-3 text-sm font-semibold text-white shadow transition hover:bg-[#18224d]"
                            >
                                Lihat Katalog Lengkap
                            </a>
                        </div>
                        <div>
                            <img
                                src="/images/produk-hero.jpg"
                                onError={fallbackTo('Produk Siswa', 800, 600)}
                                alt="Produk inovasi siswa"
                                className="h-64 w-full rounded-2xl object-cover shadow-lg"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== PENCARIAN + FILTER ===== */}
            <section id="katalog" className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="relative w-full lg:max-w-md">
                        <svg className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
                        </svg>
                        <input
                            type="text"
                            value={cari}
                            onChange={(e) => setCari(e.target.value)}
                            placeholder="Cari produk inovasi…"
                            className="w-full rounded-xl border border-gray-200 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-[#1E2A5E] focus:ring-2 focus:ring-[#1E2A5E]/20"
                        />
                    </div>

                    <div className="flex flex-wrap gap-4">
                        {/* Filter Kategori */}
                        <div className="flex flex-wrap gap-2">
                            {semuaKategori.map((k) => (
                                <button
                                    key={k}
                                    onClick={() => setKategori(k)}
                                    className={
                                        'rounded-lg px-4 py-2 text-sm font-semibold transition ' +
                                        (kategori === k
                                            ? 'bg-[#1E2A5E] text-white shadow'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200')
                                    }
                                >
                                    {k}
                                </button>
                            ))}
                        </div>
                        {/* Filter Kompetensi Keahlian */}
                        <div className="flex flex-wrap gap-2">
                            {semuaKompetensi.map((k) => (
                                <button
                                    key={k}
                                    onClick={() => setKompetensi(k)}
                                    className={
                                        'rounded-lg px-3 py-1.5 text-xs font-semibold transition ' +
                                        (kompetensi === k
                                            ? 'bg-yellow-400 text-[#1E2A5E] shadow'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200')
                                    }
                                >
                                    {k}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== GRID PRODUK ===== */}
            <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {hasil.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-gray-200 py-20 text-center text-gray-400">
                        {produkList.length === 0
                            ? 'Belum ada produk. Tambahkan produk melalui admin panel.'
                            : 'Tidak ada produk yang cocok dengan pencarian Anda.'}
                    </div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {hasil.map((p) => (
                            <article
                                key={p.id}
                                className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md"
                            >
                                <img
                                    src={getImageUrl(p.image)}
                                    onError={fallbackTo('Produk', 640, 400)}
                                    alt={p.name}
                                    className="h-40 w-full object-cover"
                                />
                                <div className="flex flex-1 flex-col p-5">
                                    <h3 className="font-bold text-gray-900 group-hover:text-[#1E2A5E]">{p.name}</h3>
                                    <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600 line-clamp-3">
                                        {p.short_description || p.description || ''}
                                    </p>

                                    <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
                                        <div>
                                            <div className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">Dibuat oleh</div>
                                            <div className="text-sm font-medium text-gray-700">{p.maker || '-'}</div>
                                        </div>
                                        <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${statusColor[p.status] || 'bg-gray-100 text-gray-600'}`}>
                                            {statusLabel[p.status] || p.status}
                                        </span>
                                    </div>

                                    <Link
                                        href={`/produk/${p.id}`}
                                        className="mt-4 block rounded-lg border border-gray-200 py-2 text-center text-sm font-semibold text-[#1E2A5E] transition hover:bg-gray-50"
                                    >
                                        Lihat Detail →
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </section>
        </PublicLayout>
    );
}
