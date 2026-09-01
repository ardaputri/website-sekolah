import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link, usePage } from '@inertiajs/react';

/* Placeholder SVG (dipakai bila gambar asli belum diunggah) */
const ph = (label, w = 400, h = 300) =>
    `data:image/svg+xml;utf8,${encodeURIComponent(
        `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}'><rect width='100%' height='100%' fill='%23e5e7eb'/><text x='50%' y='50%' font-family='sans-serif' font-size='16' fill='%239ca3af' text-anchor='middle' dominant-baseline='middle'>${label}</text></svg>`,
    )}`;

export default function Kesiswaan({ organizations = [], extracurriculars = [] }) {
    const { settings } = usePage().props;
    const siteName = settings?.site_name ?? 'SMKN 4 Bogor';

    /* Fallback data statis jika DB kosong */
    const fallbackEkskul = [
        { id: 'f1', slug: 'pmr', name: 'PMR', description: 'Palang Merah Remaja melatih siswa dalam bidang kesehatan, pertolongan pertama, dan kepedulian sosial kepada sesama.' },
        { id: 'f2', slug: 'pramuka', name: 'Pramuka', description: 'Membangun kemandirian, kedisiplinan, dan kepemimpinan melalui kegiatan kepramukaan serta kecintaan terhadap alam.' },
        { id: 'f3', slug: 'rohis', name: 'Rohis', description: 'Kerohanian Islam sebagai wadah pembinaan akhlak, kegiatan keagamaan, dan penguatan nilai spiritual siswa.' },
        { id: 'f4', slug: 'paskibra', name: 'Paskibra', description: 'Pasukan Pengibar Bendera melatih kedisiplinan, baris-berbaris, jiwa kepemimpinan, dan rasa nasionalisme.' },
        { id: 'f5', slug: 'paduan-suara', name: 'Paduan Suara', description: 'Mengembangkan bakat olah vokal dan harmoni musik untuk tampil di berbagai kegiatan sekolah maupun lomba.' },
        { id: 'f6', slug: 'band', name: 'Band', description: 'Wadah ekspresi musik siswa untuk mengasah kreativitas dan tampil percaya diri di berbagai acara sekolah.' },
    ];

    const fallbackOrganisasi = [
        { id: 'fo1', slug: 'osis', name: 'OSIS', description: 'Organisasi Siswa Intra Sekolah sebagai wadah aspirasi, pengembangan diri, dan kepemimpinan siswa.' },
        { id: 'fo2', slug: 'mpk', name: 'MPK', description: 'Majelis Perwakilan Kelas sebagai lembaga legislatif siswa yang mengawasi dan menampung aspirasi.' },
    ];

    const listEkskul = extracurriculars.length > 0 ? extracurriculars : fallbackEkskul;
    const listOrganisasi = organizations.length > 0 ? organizations : fallbackOrganisasi;

    const fallbackTo = (label, w, h) => (e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = ph(label, w, h);
    };

    /* Statistik capaian */
    const capaian = [
        { value: settings?.stat_students || '1.2K', label: 'Siswa Aktif' },
        { value: String(listEkskul.length || 6), label: 'Eskul' },
        { value: settings?.stat_achievements || '100+', label: 'Prestasi' },
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
                                src="/images/kesiswaan-hero.jpg"
                                onError={fallbackTo('Foto Kesiswaan', 800, 600)}
                                alt="Kegiatan kesiswaan"
                                className="h-64 w-full rounded-2xl object-cover shadow-lg md:h-72"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== ORGANISASI ===== */}
            {listOrganisasi.length > 0 && (
                <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-900">Organisasi Siswa</h2>
                        <div className="mx-auto mt-2 h-1 w-16 rounded-full bg-yellow-400" />
                        <p className="mx-auto mt-3 max-w-2xl text-gray-500">
                            Wadah aspirasi, kepemimpinan, dan pengembangan diri siswa di lingkungan sekolah.
                        </p>
                    </div>

                    <div className="mt-10 grid gap-6 sm:grid-cols-2">
                        {listOrganisasi.map((o) => (
                            <Link
                                key={o.id}
                                href={`/kesiswaan/organisasi/${o.slug}`}
                                className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-md"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                                        {o.image ? (
                                            <img src={o.image.startsWith('http') || o.image.startsWith('/images/') ? o.image : `/storage/${o.image}`} alt={o.name} className="h-full w-full object-cover" />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center text-lg font-bold text-[#1E2A5E]">{o.name?.charAt(0)}</div>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-bold text-[#1E2A5E] group-hover:text-yellow-600">{o.name}</h3>
                                        {o.period && <p className="text-[10px] text-gray-400">Periode: {o.period}</p>}
                                        <p className="mt-2 text-sm leading-relaxed text-gray-600 line-clamp-2">{o.description}</p>
                                        <span className="mt-3 inline-block text-sm font-semibold text-[#1E2A5E] group-hover:text-yellow-600">
                                            Lihat Detail →
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {/* ===== EKSTRAKURIKULER ===== */}
            <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900">Ekstrakurikuler</h2>
                    <div className="mx-auto mt-2 h-1 w-16 rounded-full bg-yellow-400" />
                    <p className="mx-auto mt-3 max-w-2xl text-gray-500">
                        Wadah pengembangan minat, bakat, dan karakter siswa di luar jam pelajaran formal.
                    </p>
                </div>

                <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {listEkskul.map((e) => (
                        <Link
                            key={e.id}
                            href={`/kesiswaan/ekskul/${e.slug}`}
                            className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md"
                        >
                            <div className="h-40 overflow-hidden bg-gray-100">
                                {e.image ? (
                                    <img
                                        src={e.image.startsWith('http') || e.image.startsWith('/images/') ? e.image : `/storage/${e.image}`}
                                        onError={fallbackTo(e.name, 640, 400)}
                                        alt={e.name}
                                        className="h-full w-full object-cover transition group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-gray-300">
                                        {e.name?.charAt(0)}
                                    </div>
                                )}
                            </div>
                            <div className="p-5">
                                <h3 className="text-lg font-bold text-[#1E2A5E] group-hover:text-yellow-600">{e.name}</h3>
                                <div className="mx-auto mt-2 h-0.5 w-10 rounded-full bg-yellow-400" />
                                <p className="mt-3 text-sm leading-relaxed text-gray-600 line-clamp-2">
                                    {e.description}
                                </p>
                                <span className="mt-3 inline-block text-sm font-semibold text-[#1E2A5E] group-hover:text-yellow-600">
                                    Lihat Detail →
                                </span>
                            </div>
                        </Link>
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
                    {['/images/kesiswaan-galeri-1.jpg', '/images/kesiswaan-galeri-2.jpg', '/images/kesiswaan-galeri-3.jpg'].map((src, i) => (
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
