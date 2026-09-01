import PublicLayout from '@/Layouts/PublicLayout';
import { to } from '@/lib/nav';
import { Head, Link, usePage } from '@inertiajs/react';

/* Placeholder SVG (dipakai bila gambar asli belum diunggah) */
const ph = (label, w = 400, h = 300) =>
    `data:image/svg+xml;utf8,${encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
            <rect width="100%" height="100%" fill="#e5e7eb"/>
            <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
                fill="#6b7280" font-family="Arial, sans-serif" font-size="18">
                ${label}
            </text>
        </svg>`,
    )}`;

export default function Home() {
    const { settings, auth } = usePage().props;
    const siteName = settings?.site_name ?? 'SMKN 4 Bogor';
    const user = auth?.user ?? null;
    const loginHref = route('login');
    const portalHref = user ? (to('admin.dashboard') ?? '/admin') : loginHref;

    /* Foto statis (disimpan di public/images/).
       Jika file belum ada, otomatis diganti placeholder. */
    const img = {
        hero: '/images/hero-lapangan.jpg',
        principal: '/images/kepala-sekolah.jpg',
        beritaTechnoupdate: '/images/berita-technoupdate.jpg',
        beritaUiux: '/images/berita-uiux-lp3i.jpg',
    };

    const fallbackTo = (label, w, h) => (e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = ph(label, w, h);
    };

    /* ── Data contoh ── */
    const berita = [
        {
            title: 'SMKN 4 Bogor Meraih Juara 2 — Technoupdate X HIMPACT 2025',
            excerpt:
                'Selamat & sukses kepada siswa Konsentrasi Keahlian PPLG atas prestasi meraih Juara 2 HMSI Tech & Creativity Competition (UI/UX Website) di Technoupdate X HIMPACT 2025.',
            image: img.beritaTechnoupdate,
            badge: 'Prestasi',
        },
        {
            title: 'SMKN 4 Bogor Meraih Juara 1 — UI/UX Design LP3i Depok 2025',
            excerpt:
                'Selamat & sukses kepada siswa Konsentrasi Keahlian PPLG atas prestasi meraih Juara 1 UI/UX Design LP3i Depok School Competition 2025.',
            image: img.beritaUiux,
            badge: 'Prestasi',
        },
    ];

    const agenda = [
        {
            title: 'Job Fair SMKN 4 Bogor 2024: Hubungan Alumni dengan Industri',
            date: '20 Juli 2024',
            place: 'Lapangan Utama',
        },
        {
            title: 'Aksi Ekologi Pancawalya - Bersih-Bersih Lingkungan',
            date: '22 Juli 2024',
            place: 'Lapangan Utama',
        },
    ];

    /* ── KOMPETENSI KEAHLIAN (Ringkasan Card untuk Beranda) ── */
    const keahlianRingkas = [
        { code: 'PPLG', name: 'Pengembangan Perangkat Lunak dan Gim', desc: 'Pemrograman web, mobile, dan gim', image: '/images/akademik-pplg.jpg' },
        { code: 'TJKT', name: 'Teknik Jaringan Komputer dan Telekomunikasi', desc: 'Jaringan, server, dan keamanan siber', image: '/images/akademik-tjkt.jpg' },
        { code: 'TO', name: 'Teknik Otomotif', desc: 'Perawatan & perbaikan kendaraan bermotor', image: '/images/akademik-to.jpg' },
        { code: 'TP', name: 'Teknik Pengelasan', desc: 'Pengelasan, fabrikasi, dan konstruksi baja', image: '/images/akademik-tp.jpg' },
    ];

    /* ── EKSTRAKURIKULER HIGHLIGHT ── */
    const ekskulHighlight = [
        { name: 'Pramuka', desc: 'Membangun kemandirian, kedisiplinan, dan kepemimpinan melalui kegiatan kepramukaan.', image: '/images/ekskul-pramuka.jpg' },
        { name: 'Paskibra', desc: 'Pasukan Pengibar Bendera melatih kedisiplinan, baris-berbaris, dan rasa nasionalisme.', image: '/images/ekskul-paskibra.jpg' },
        { name: 'PMR', desc: 'Palang Merah Remaja melatih siswa dalam bidang kesehatan dan kepedulian sosial.', image: '/images/ekskul-pmr.jpg' },
    ];

    /* ── DATA ALUMNI ── */
    const alumni = [
        {
            name: 'Bagas',
            role: 'Software Engineer di Tech Corp',
            desc: 'Fondasi pemrograman dari bantuan di bangku SMKN 4 Bogor membantu saya bersaing di industri teknologi nasional.',
            image: '/images/bagas.jpg',
        },
        {
            name: 'Cahaya',
            role: 'Creative Director di Creative Studio',
            desc: 'SMKN 4 Bogor tidak hanya mengajarkan keahlian teknis, tapi juga membentuk mentalitas wirausaha yang kuat.',
            image: '/images/cahaya.jpg',
        },
        {
            name: 'Andini',
            role: 'Senior Technical di PT Manufacturing Indonesia',
            desc: 'Kedisiplinan dan keahlian dari SMKN 4 Bogor membekali saya jadi teknisi andal di industri manufaktur.',
            image: '/images/andini.jpg',
        },
    ];

    return (
        <PublicLayout>
            <Head title={`Beranda — ${siteName}`} />

            {/* ===== HERO ===== */}
            <section className="relative">
                <div className="relative h-[520px] w-full overflow-hidden">
                    <img
                        src={
                            settings?.hero_image
                                ? `/storage/${settings.hero_image}`
                                : img.hero
                        }
                        onError={fallbackTo('Foto Sekolah', 1600, 900)}
                        alt={siteName}
                        className="absolute inset-0 h-full w-full object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-r from-[#1E2A5E]/90 via-[#1E2A5E]/60 to-transparent" />

                    <div className="relative mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
                        <div className="max-w-xl">
                            <span className="inline-block rounded-full bg-yellow-400 px-3 py-1 text-xs font-bold text-[#1E2A5E]">
                                {settings?.accreditation ?? 'Terakreditasi A'}
                            </span>

                            <h1 className="mt-4 text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
                                Mencetak Generasi Terampil, Berkarakter, dan Siap Bersaing di Dunia Kerja
                            </h1>

                            <p className="mt-4 text-base leading-relaxed text-indigo-100">
                                {settings?.site_tagline ??
                                    'SMKN 4 Bogor hadir dengan program keahlian unggulan dan kemitraan industri untuk menyiapkan lulusan yang kompeten.'}
                            </p>

                            <div className="mt-6 flex flex-wrap gap-3">
                                <a
                                    href={to('produk.index') ?? '#berita'}
                                    className="rounded-lg bg-yellow-400 px-5 py-2.5 text-sm font-semibold text-[#1E2A5E] shadow transition hover:bg-yellow-300"
                                >
                                    Jelajahi Produk
                                </a>

                                <Link
                                    href={portalHref}
                                    className="rounded-lg border border-white/40 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
                                >
                                    Portal Akademik
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Banner bawah hero */}
                <div className="bg-[#1E2A5E] py-3 text-center">
                    <p className="text-lg font-extrabold tracking-widest text-white">
                        {siteName.toUpperCase()} HEBAT
                    </p>
                </div>
            </section>

            {/* ===== SAMBUTAN KEPALA SEKOLAH ===== */}
            <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="grid items-center gap-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:grid-cols-3 md:p-10">
                    <div className="flex flex-col items-center text-center">
                        <img
                            src={
                                settings?.principal_photo
                                    ? `/storage/${settings.principal_photo}`
                                    : img.principal
                            }
                            onError={fallbackTo('Foto Kepsek', 300, 320)}
                            alt="Kepala Sekolah"
                            className="h-48 w-40 rounded-xl object-cover shadow"
                        />

                        <div className="mt-3">
                            <div className="font-bold text-gray-900">
                                {settings?.principal_name ?? ''}
                            </div>

                            <div className="text-sm text-gray-500">
                                Kepala Sekolah {siteName}
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-2">
                        <svg
                            className="h-8 w-8 text-yellow-400"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M7.17 6A5.17 5.17 0 002 11.17V18h6.83v-6.83H5.5A1.67 1.67 0 017.17 9.5V6zm9 0A5.17 5.17 0 0011 11.17V18h6.83v-6.83H14.5a1.67 1.67 0 011.67-1.67V6z" />
                        </svg>

                        <blockquote className="mt-2 text-xl font-bold leading-snug text-gray-900">
                            “Vokasi kuat, menguatkan Indonesia melalui keterampilan nyata.”
                        </blockquote>

                        <p className="mt-4 leading-relaxed text-gray-600">
                            Assalamualaikum Warahmatullahi Wabarakatuh. Selamat datang di {siteName}.
                            Sebagai salah satu SMK Pusat Keunggulan di Jawa Barat, kami berfokus pada
                            penyelarasan kurikulum dengan kebutuhan dunia usaha dan dunia industri
                            (DUDI), serta memberikan pengalaman praktik terbaik untuk masa depan siswa.
                        </p>
                    </div>
                </div>
            </section>

            {/* ===== INFORMASI & BERITA ===== */}
            <section
                id="berita"
                className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8"
            >
                <h2 className="text-2xl font-bold text-gray-900">
                    Informasi &amp; Berita Terkini
                </h2>

                <p className="mt-1 text-gray-500">
                    Update terbaru kegiatan sekolah, prestasi siswa, dan pengumuman akademik.
                </p>

                <div className="mt-6 grid gap-6 md:grid-cols-2">
                    {berita.map((b, i) => (
                        <a
                            key={i}
                            href={to('berita.index') ?? loginHref}
                            className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md"
                        >
                            <div className="relative">
                                <img
                                    src={b.image}
                                    onError={fallbackTo('Berita', 640, 360)}
                                    alt={b.title}
                                    className="h-52 w-full object-cover"
                                />

                                <span className="absolute left-3 top-3 rounded-full bg-yellow-400 px-3 py-1 text-xs font-bold text-[#1E2A5E]">
                                    {b.badge}
                                </span>
                            </div>

                            <div className="p-5">
                                <h3 className="font-bold text-gray-900 group-hover:text-[#1E2A5E]">
                                    {b.title}
                                </h3>

                                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                                    {b.excerpt}
                                </p>

                                <span className="mt-3 inline-block text-sm font-semibold text-[#1E2A5E]">
                                    Baca selengkapnya →
                                </span>
                            </div>
                        </a>
                    ))}
                </div>
            </section>

            {/* ===== AGENDA ===== */}
            <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
                <div className="grid gap-6 md:grid-cols-2">
                    {agenda.map((a, i) => (
                        <div
                            key={i}
                            className="flex items-start gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
                        >
                            <div className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-[#1E2A5E]/10 text-[#1E2A5E]">
                                <svg
                                    className="h-7 w-7"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                                    />
                                </svg>
                            </div>

                            <div>
                                <span className="text-xs font-semibold uppercase tracking-wide text-[#1E2A5E]">
                                    Agenda
                                </span>

                                <h3 className="mt-1 font-bold text-gray-900">
                                    {a.title}
                                </h3>

                                <p className="mt-1 text-sm text-gray-500">
                                    {a.date} · {a.place}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ===== RINGKASAN KOMPETENSI KEAHLIAN ===== */}
            <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900">Konsentrasi Keahlian</h2>
                    <div className="mx-auto mt-2 h-1 w-16 rounded-full bg-yellow-400" />
                    <p className="mx-auto mt-3 max-w-2xl text-gray-500">
                        Pilih bidang keahlian sesuai minat dan bakatmu untuk masa depan yang cerah.
                    </p>
                </div>

                <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {keahlianRingkas.map((k) => (
                        <Link
                            key={k.code}
                            href={`/akademik/${k.code}`}
                            className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md"
                        >
                            <div className="relative h-36 overflow-hidden">
                                <img
                                    src={k.image}
                                    onError={fallbackTo(k.code, 640, 300)}
                                    alt={k.name}
                                    className="h-full w-full object-cover transition group-hover:scale-105"
                                />
                                <span className="absolute left-3 top-3 rounded-full bg-yellow-400 px-2.5 py-0.5 text-[10px] font-bold text-[#1E2A5E]">
                                    {k.code}
                                </span>
                            </div>
                            <div className="p-4">
                                <h3 className="text-sm font-bold text-gray-900 group-hover:text-[#1E2A5E] leading-snug">
                                    {k.name}
                                </h3>
                                <p className="mt-1 text-xs text-gray-500">
                                    {k.desc}
                                </p>
                                <span className="mt-3 inline-block text-xs font-semibold text-[#1E2A5E]">
                                    Selengkapnya →
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="mt-8 text-center">
                    <Link
                        href={to('akademik.index') ?? '#'}
                        className="inline-block rounded-lg border border-gray-200 px-6 py-2.5 text-sm font-semibold text-[#1E2A5E] transition hover:bg-gray-50"
                    >
                        Lihat Semua Program Keahlian
                    </Link>
                </div>
            </section>

            {/* ===== HIGHLIGHT EKSTRAKURIKULER ===== */}
            <section className="bg-gray-50 py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-900">Kegiatan Ekstrakurikuler</h2>
                        <div className="mx-auto mt-2 h-1 w-16 rounded-full bg-yellow-400" />
                        <p className="mx-auto mt-3 max-w-2xl text-gray-500">
                            Wadah pengembangan minat, bakat, dan karakter siswa di luar jam pelajaran formal.
                        </p>
                    </div>

                    <div className="mt-10 grid gap-6 md:grid-cols-3">
                        {ekskulHighlight.map((e, i) => (
                            <div
                                key={i}
                                className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md"
                            >
                                <div className="h-44 overflow-hidden">
                                    <img
                                        src={e.image}
                                        onError={fallbackTo(e.name, 640, 400)}
                                        alt={e.name}
                                        className="h-full w-full object-cover transition group-hover:scale-105"
                                    />
                                </div>
                                <div className="p-5">
                                    <h3 className="font-bold text-gray-900 group-hover:text-[#1E2A5E]">{e.name}</h3>
                                    <p className="mt-2 text-sm leading-relaxed text-gray-600 line-clamp-2">
                                        {e.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 text-center">
                        <Link
                            href={to('kesiswaan.index') ?? '#'}
                            className="inline-block rounded-lg border border-gray-200 px-6 py-2.5 text-sm font-semibold text-[#1E2A5E] transition hover:bg-gray-50"
                        >
                            Lihat Semua Kegiatan Kesiswaan
                        </Link>
                    </div>
                </div>
            </section>

            {/* ===== INSPIRASI ALUMNI ===== */}
            <section className="bg-[#1E2A5E] py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                    <h2 className="text-center text-2xl font-extrabold text-white">
                        INSPIRASI ALUMNI
                    </h2>

                    <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-indigo-200">
                        Kesuksesan alumni {siteName} di dunia kerja dan wirausaha adalah bukti kualitas
                        pendidikan kami.
                    </p>

                    <div className="mt-10 grid gap-6 md:grid-cols-3">
                        {alumni.map((al, i) => (
                            <div
                                key={i}
                                className="rounded-2xl bg-white/5 p-6 text-center ring-1 ring-white/10"
                            >

                                {/* FOTO ALUMNI */}
                                <img
                                    src={al.image}
                                    alt={`Foto ${al.name}`}
                                    onError={fallbackTo(`Foto ${al.name}`, 120, 120)}
                                    className="mx-auto h-20 w-20 rounded-full object-cover ring-4 ring-white/20"
                                />

                                <h3 className="mt-4 text-lg font-bold text-yellow-400">
                                    {al.name}
                                </h3>

                                <p className="text-xs font-medium text-indigo-200">
                                    {al.role}
                                </p>

                                <p className="mt-3 text-sm leading-relaxed text-indigo-100">
                                    {al.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== CTA PPDB ===== */}
            <section className="bg-gray-50 py-16">
                <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">

                    <h2 className="text-2xl font-bold text-gray-900">
                        Ingin Bergabung dengan {siteName}?
                    </h2>

                    <p className="mt-2 text-gray-600">
                        Dapatkan informasi pendaftaran PPDB, brosur sekolah, dan jadwal seleksi
                        via email secara berkala.
                    </p>

                    <form
                        onSubmit={(e) => e.preventDefault()}
                        className="mx-auto mt-6 flex max-w-lg flex-col gap-3 sm:flex-row"
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
                            Dapatkan Info PPDB
                        </button>
                    </form>

                    <p className="mt-3 text-xs text-gray-400">
                        Kami menjaga privasi data Anda. Informasi tidak dibagikan secara berlebihan.
                    </p>
                </div>
            </section>
        </PublicLayout>
    );
}