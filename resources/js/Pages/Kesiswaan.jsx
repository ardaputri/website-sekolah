import PublicLayout from '@/Layouts/PublicLayout';
import { Head, usePage } from '@inertiajs/react';

/* Placeholder SVG (dipakai bila gambar asli belum diunggah) */
const ph = (label, w = 400, h = 300) =>
    `data:image/svg+xml;utf8,${encodeURIComponent(
        `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}'><rect width='100%' height='100%' fill='%23e5e7eb'/><text x='50%' y='50%' font-family='sans-serif' font-size='16' fill='%239ca3af' text-anchor='middle' dominant-baseline='middle'>${label}</text></svg>`,
    )}`;

export default function Kesiswaan() {
    const { settings } = usePage().props;
    const siteName = settings?.site_name ?? 'SMKN 4 Bogor';

    /* Foto statis (disimpan di public/images/). Jika belum ada,
       otomatis diganti placeholder abu-abu lewat onError. */
    const img = {
        hero: '/images/kesiswaan-hero.jpg',
        galeri: [
            '/images/kesiswaan-galeri-1.jpg',
            '/images/kesiswaan-galeri-2.jpg',
            '/images/kesiswaan-galeri-3.jpg',
        ],
    };
    const fallbackTo = (label, w, h) => (e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = ph(label, w, h);
    };

    /* Data ekstrakurikuler (nanti bisa dijadikan dinamis dari database) */
    const ekskul = [
        {
            name: 'PMR',
            desc: 'Palang Merah Remaja melatih siswa dalam bidang kesehatan, pertolongan pertama, dan kepedulian sosial kepada sesama.',
        },
        {
            name: 'Pramuka',
            desc: 'Membangun kemandirian, kedisiplinan, dan kepemimpinan melalui kegiatan kepramukaan serta kecintaan terhadap alam.',
        },
        {
            name: 'Rohis',
            desc: 'Kerohanian Islam sebagai wadah pembinaan akhlak, kegiatan keagamaan, dan penguatan nilai spiritual siswa.',
        },
        {
            name: 'Paskibra',
            desc: 'Pasukan Pengibar Bendera melatih kedisiplinan, baris-berbaris, jiwa kepemimpinan, dan rasa nasionalisme.',
        },
        {
            name: 'Paduan Suara',
            desc: 'Mengembangkan bakat olah vokal dan harmoni musik untuk tampil di berbagai kegiatan sekolah maupun lomba.',
        },
        {
            name: 'Band',
            desc: 'Wadah ekspresi musik siswa untuk mengasah kreativitas dan tampil percaya diri di berbagai acara sekolah.',
        },
    ];

    /* Statistik capaian (angka contoh, bisa diganti data nyata) */
    const capaian = [
        { value: '1.2K', label: 'Siswa Aktif' },
        { value: '6', label: 'Eskul' },
        { value: '100+', label: 'Prestasi' },
        { value: '92%', label: 'Partisipasi' },
    ];

    return (
        <PublicLayout>
            <Head title={`Kesiswaan — ${siteName}`} />

            {/* ===== HERO ===== */}
            <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
                <div className="overflow-hidden rounded-3xl bg-[#1E2A5E]">
                    <div className="grid items-center gap-8 p-8 md:grid-cols-2 md:p-12">
                        <div>
                            <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/20">
                                Kesiswaan
                            </span>
                            <h1 className="mt-4 text-3xl font-extrabold leading-tight text-white sm:text-4xl">
                                Membangun <span className="text-yellow-400">Karakter</span>, Prestasi dan Kepemimpinan Siswa
                            </h1>
                            <p className="mt-4 leading-relaxed text-indigo-100">
                                Kesiswaan {siteName} berfokus pada pengembangan karakter, kedisiplinan,
                                dan potensi diri siswa melalui beragam organisasi serta kegiatan
                                ekstrakurikuler.
                            </p>
                        </div>
                        <div>
                            <img
                                src={img.hero}
                                onError={fallbackTo('Foto Kesiswaan', 800, 600)}
                                alt="Kegiatan kesiswaan"
                                className="h-64 w-full rounded-2xl object-cover shadow-lg md:h-72"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== ORGANISASI & EKSTRAKURIKULER ===== */}
            <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900">Organisasi &amp; Ekstrakurikuler</h2>
                    <div className="mx-auto mt-2 h-1 w-16 rounded-full bg-yellow-400" />
                    <p className="mx-auto mt-3 max-w-2xl text-gray-500">
                        Wadah pengembangan minat, bakat, dan karakter siswa di luar jam pelajaran formal.
                    </p>
                </div>

                <div className="mt-10 grid gap-6 md:grid-cols-2">
                    {ekskul.map((e) => (
                        <div
                            key={e.name}
                            className="rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm transition hover:shadow-md"
                        >
                            <h3 className="text-lg font-bold text-[#1E2A5E]">{e.name}</h3>
                            <div className="mx-auto mt-2 h-0.5 w-10 rounded-full bg-yellow-400" />
                            <p className="mt-3 text-sm leading-relaxed text-gray-600">{e.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ===== CAPAIAN KESISWAAN ===== */}
            <section className="bg-gray-50 py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h2 className="text-center text-2xl font-bold text-gray-900">Capaian Kesiswaan</h2>
                    <div className="mx-auto mt-2 h-1 w-16 rounded-full bg-yellow-400" />
                    <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
                        {capaian.map((c) => (
                            <div
                                key={c.label}
                                className="rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm"
                            >
                                <div className="text-3xl font-extrabold text-[#1E2A5E]">{c.value}</div>
                                <div className="mt-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
                                    {c.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== GALERI AKTIVITAS ===== */}
            <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <h2 className="text-center text-2xl font-bold text-gray-900">Galeri Aktivitas</h2>
                <div className="mx-auto mt-2 h-1 w-16 rounded-full bg-yellow-400" />
                <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {img.galeri.map((src, i) => (
                        <img
                            key={i}
                            src={src}
                            onError={fallbackTo(`Galeri ${i + 1}`, 640, 420)}
                            alt={`Galeri aktivitas ${i + 1}`}
                            className="h-56 w-full rounded-2xl object-cover shadow-sm"
                        />
                    ))}
                </div>
            </section>
        </PublicLayout>
    );
}
