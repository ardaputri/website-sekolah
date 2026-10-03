import PublicLayout from '@/Layouts/PublicLayout';
import { Head, usePage } from '@inertiajs/react';
import { useMemo, useState } from 'react';

/* Placeholder SVG (dipakai bila gambar asli belum diunggah atau error saat di-load) */
const ph = (label, w = 400, h = 300) =>
    `data:image/svg+xml;utf8,${encodeURIComponent(
        `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}'><rect width='100%' height='100%' fill='#e5e7eb'/><text x='50%' y='50%' font-family='sans-serif' font-size='16' fill='#9ca3af' text-anchor='middle' dominant-baseline='middle'>${label}</text></svg>`,
    )}`;

const KATEGORI = ['Semua', 'Prestasi', 'Kegiatan', 'Pengumuman'];
const PER_PAGE = 6;

// Menerima prop 'berita' yang dikirim dari BeritaController@index
export default function Berita({ berita = [] }) {
    const { settings } = usePage().props;
    const siteName = settings?.site_name ?? 'SMKN 4 Bogor';

    const fallbackTo = (label, w, h) => (e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = ph(label, w, h);
    };

    const [kategori, setKategori] = useState('Semua');
    const [cari, setCari] = useState('');
    const [page, setPage] = useState(1);

    /* Filter gabungan: Kategori + Kata Kunci Judul dari data database */
    const hasil = useMemo(() => {
        const q = cari.trim().toLowerCase();
        return berita.filter((b) => {
            const itemKategori = b.kategori || b.category || 'Kegiatan';
            const cocokKategori = kategori === 'Semua' || itemKategori.toLowerCase() === kategori.toLowerCase();
            const cocokCari = q === '' || b.title?.toLowerCase().includes(q);
            return cocokKategori && cocokCari;
        });
    }, [berita, kategori, cari]);

    const totalPage = Math.max(1, Math.ceil(hasil.length / PER_PAGE));
    const pageAman = Math.min(page, totalPage);
    const tampil = hasil.slice((pageAman - 1) * PER_PAGE, pageAman * PER_PAGE);

    const gantiKategori = (k) => {
        setKategori(k);
        setPage(1);
    };
    const gantiCari = (v) => {
        setCari(v);
        setPage(1);
    };

    const badgeColor = {
        Prestasi: 'bg-yellow-400 text-[#1E2A5E]',
        Kegiatan: 'bg-emerald-500 text-white',
        Pengumuman: 'bg-[#1E2A5E] text-white',
    };

    /* Helper untuk menentukan path gambar dari storage atau default */
    const getImageUrl = (item) => {
        if (!item.image) return ph(item.category || item.kategori || 'Berita', 640, 400);
        if (item.image.startsWith('http') || item.image.startsWith('/images/')) {
            return item.image;
        }
        return `/storage/${item.image}`;
    };

    /* Helper penformatan tanggal dari ISO database (created_at) ke string Indonesia */
    const formatDate = (dateString) => {
        if (!dateString) return '-';
        try {
            return new Date(dateString).toLocaleDateString('id-ID', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
            });
        } catch (e) {
            return dateString;
        }
    };

    return (
        <PublicLayout>
            <Head title={`Berita — ${siteName}`} />

            {/* ===== HERO ===== */}
            <section className="bg-[#1E2A5E]">
                <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
                    <h1 className="max-w-2xl text-3xl font-extrabold leading-tight text-white sm:text-4xl">
                        Berita &amp; Informasi Terbaru {siteName}
                    </h1>
                    <p className="mt-3 max-w-2xl leading-relaxed text-indigo-100">
                        Ikuti terus perkembangan terbaru mengenai kegiatan, prestasi, pengumuman,
                        dan agenda penting di {siteName}.
                    </p>
                </div>
            </section>

            {/* ===== FILTER + PENCARIAN ===== */}
            <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex flex-wrap gap-2">
                        {KATEGORI.map((k) => (
                            <button
                                key={k}
                                onClick={() => gantiKategori(k)}
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

                    <div className="relative w-full lg:w-72">
                        <svg className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
                        </svg>
                        <input
                            type="text"
                            value={cari}
                            onChange={(e) => gantiCari(e.target.value)}
                            placeholder="Cari berita…"
                            className="w-full rounded-lg border border-gray-200 py-2 pl-9 pr-3 text-sm outline-none focus:border-[#1E2A5E] focus:ring-2 focus:ring-[#1E2A5E]/20"
                        />
                    </div>
                </div>
            </section>

            {/* ===== GRID BERITA ===== */}
            <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {tampil.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-gray-200 py-20 text-center text-gray-400">
                        Tidak ada berita yang cocok dengan pencarian Anda.
                    </div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {tampil.map((b) => {
                            const itemCategory = b.category || b.kategori || 'Kegiatan';
                            return (
                                <article
                                    key={b.id || b.title}
                                    className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md"
                                >
                                    <div className="relative">
                                        <img
                                            src={getImageUrl(b)}
                                            onError={fallbackTo(itemCategory, 640, 400)}
                                            alt={b.title}
                                            className="h-44 w-full object-cover"
                                        />
                                        <span className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-bold ${badgeColor[itemCategory] ?? 'bg-gray-200 text-gray-700'}`}>
                                            {itemCategory}
                                        </span>
                                    </div>
                                    <div className="flex flex-1 flex-col p-5">
                                        <div className="flex items-center gap-1.5 text-xs text-gray-400">
                                            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            {formatDate(b.created_at || b.date)}
                                        </div>
                                        <h3 className="mt-2 font-bold leading-snug text-gray-900 group-hover:text-[#1E2A5E] line-clamp-2">
                                            {b.title}
                                        </h3>
                                        <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600 line-clamp-3">
                                            {b.excerpt || b.content}
                                        </p>
                                        <a
                                            href={`/berita/${b.slug || b.id}`}
                                            className="mt-4 inline-block text-sm font-semibold text-[#1E2A5E] hover:underline"
                                        >
                                            Baca selengkapnya →
                                        </a>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                )}

                {/* ===== PAGINATION ===== */}
                {totalPage > 1 && (
                    <div className="mt-10 flex items-center justify-center gap-2">
                        {Array.from({ length: totalPage }, (_, i) => i + 1).map((p) => (
                            <button
                                key={p}
                                onClick={() => setPage(p)}
                                className={
                                    'h-10 w-10 rounded-lg text-sm font-semibold transition ' +
                                    (p === pageAman
                                        ? 'bg-[#1E2A5E] text-white shadow'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200')
                                }
                            >
                                {p}
                            </button>
                        ))}
                    </div>
                )}
            </section>

            {/* ===== CTA LANGGANAN INFORMASI ===== */}
            <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
                <div className="rounded-2xl bg-gray-50 p-8 md:p-10">
                    <div className="grid items-center gap-6 md:grid-cols-2">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">Dapatkan Informasi Langsung</h2>
                            <p className="mt-2 text-sm leading-relaxed text-gray-600">
                                Berlangganan agar tidak ketinggalan kabar terbaru seputar kegiatan,
                                prestasi, dan pengumuman dari {siteName}.
                            </p>
                        </div>
                        <form
                            onSubmit={(e) => e.preventDefault()}
                            className="flex flex-col gap-3 sm:flex-row"
                        >
                            <input
                                type="email"
                                required
                                placeholder="Alamat Email Anda"
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#1E2A5E] focus:ring-2 focus:ring-[#1E2A5E]/20"
                            />
                            <button
                                type="submit"
                                className="shrink-0 rounded-lg bg-[#1E2A5E] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#18224d]"
                            >
                                Berlangganan
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}