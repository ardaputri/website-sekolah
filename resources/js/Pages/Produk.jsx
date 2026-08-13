import PublicLayout from '@/Layouts/PublicLayout';
import { to } from '@/lib/nav';
import { Head, usePage } from '@inertiajs/react';
import { useMemo, useState } from 'react';

/* Placeholder SVG (dipakai bila gambar asli belum diunggah) */
const ph = (label, w = 400, h = 300) =>
    `data:image/svg+xml;utf8,${encodeURIComponent(
        `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}'><rect width='100%' height='100%' fill='%23e5e7eb'/><text x='50%' y='50%' font-family='sans-serif' font-size='16' fill='%239ca3af' text-anchor='middle' dominant-baseline='middle'>${label}</text></svg>`,
    )}`;

const KATEGORI = ['Semua', 'Proyek Siswa', 'Produk digital'];

export default function Produk() {
    const { settings } = usePage().props;
    const siteName = settings?.site_name ?? 'SMKN 4 Bogor';

    const fallbackTo = (label, w, h) => (e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = ph(label, w, h);
    };

    /* Data contoh (nanti diganti data nyata dari database saat CRUD Produk). */
    const semuaProduk = Array.from({ length: 9 }, (_, i) => ({
        title: 'Pembuat Web',
        desc: 'Website berbagi inovasi web yang dirancang dan dikembangkan oleh siswa sebagai wujud kreativitas, keterampilan, dan penerapan teknologi dalam menciptakan solusi digital yang bermanfaat.',
        kategori: i % 2 === 0 ? 'Proyek Siswa' : 'Produk digital',
        maker: ['Kelas XII PPLG', 'Kelas XI PPLG', 'Kelas X PPLG'][i % 3],
        status: 'Tersedia',
        image: `/images/produk-${i + 1}.jpg`,
    }));

    const [kategori, setKategori] = useState('Semua');
    const [cari, setCari] = useState('');

    const hasil = useMemo(() => {
        const q = cari.trim().toLowerCase();
        return semuaProduk.filter((p) => {
            const cocokKategori = kategori === 'Semua' || p.kategori === kategori;
            const cocokCari =
                q === '' ||
                p.title.toLowerCase().includes(q) ||
                p.desc.toLowerCase().includes(q);
            return cocokKategori && cocokCari;
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [kategori, cari]);

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

                    <div className="flex flex-wrap gap-2">
                        {KATEGORI.map((k) => (
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
                </div>
            </section>

            {/* ===== GRID PRODUK ===== */}
            <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {hasil.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-gray-200 py-20 text-center text-gray-400">
                        Tidak ada produk yang cocok dengan pencarian Anda.
                    </div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {hasil.map((p, i) => (
                            <article
                                key={i}
                                className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md"
                            >
                                <img
                                    src={p.image}
                                    onError={fallbackTo('Produk', 640, 400)}
                                    alt={p.title}
                                    className="h-40 w-full object-cover"
                                />
                                <div className="flex flex-1 flex-col p-5">
                                    <h3 className="font-bold text-gray-900 group-hover:text-[#1E2A5E]">{p.title}</h3>
                                    <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600 line-clamp-3">
                                        {p.desc}
                                    </p>

                                    <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
                                        <div>
                                            <div className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">Dibuat oleh</div>
                                            <div className="text-sm font-medium text-gray-700">{p.maker}</div>
                                        </div>
                                        <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-700">
                                            {p.status}
                                        </span>
                                    </div>

                                    <a
                                        href={to('produk.index') ?? '#'}
                                        className="mt-4 block rounded-lg border border-gray-200 py-2 text-center text-sm font-semibold text-[#1E2A5E] transition hover:bg-gray-50"
                                    >
                                        Lihat Detail →
                                    </a>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </section>
        </PublicLayout>
    );
}
