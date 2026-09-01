import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link, usePage } from '@inertiajs/react';

/* Placeholder SVG */
const ph = (label, w = 400, h = 300) =>
    `data:image/svg+xml;utf8,${encodeURIComponent(
        `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}'><rect width='100%' height='100%' fill='%23e5e7eb'/><text x='50%' y='50%' font-family='sans-serif' font-size='16' fill='%239ca3af' text-anchor='middle' dominant-baseline='middle'>${label}</text></svg>`,
    )}`;

/* Data detail kompetensi keahlian (akan diganti dari DB saat CRUD Academic Program) */
const KEAHLIAN_DETAIL = {
    PPLG: {
        name: 'Pengembangan Perangkat Lunak dan Gim',
        shortCode: 'PPLG',
        image: '/images/akademik-pplg.jpg',
        desc: 'Program keahlian yang membekali siswa dengan keterampilan komprehensif dalam pengembangan perangkat lunak, mulai dari perencanaan, desain,编码, pengujian, hingga pemeliharaan aplikasi. Siswa juga mempelajari pengembangan gim interaktif dan teknologi web modern.',
        kurikulum: 'Kurikulum Merdeka dengan penguatan Teaching Factory dan sertifikasi kompetensi BNSP.',
        mataPelajaran: [
            'Pemrograman Web (HTML, CSS, JavaScript, PHP)',
            'Pemrograman Aplikasi Mobile',
            'Basis Data & SQL',
            'Rekayasa Perangkat Lunak',
            'Pengembangan Gim (Unity, Godot)',
            'Jaringan Komputer Dasar',
            'Desain UI/UX',
            'Technopreneurship',
        ],
        prospekKarier: [
            'Web Developer (Frontend / Backend / Fullstack)',
            'Mobile App Developer',
            'Game Developer',
            'Software Quality Assurance (QA)',
            'UI/UX Designer',
            'IT Support & System Administrator',
            'Freelancer / Wirausaha Digital',
        ],
        fasilitas: [
            'Laboratorium Pemrograman (40 PC)',
            'Laboratorium Gim & Multimedia',
            'Server Local untuk Development',
            'Akses Platform Belajar Online',
        ],
        sertifikasi: ['Junior Web Programmer (BNSP)', 'Mobile App Developer (BNSP)'],
    },
    TJKT: {
        name: 'Teknik Jaringan Komputer dan Telekomunikasi',
        shortCode: 'TJKT',
        image: '/images/akademik-tjkt.jpg',
        desc: 'Program keahlian yang berfokus pada pemasangan, konfigurasi, dan pemeliharaan infrastruktur jaringan komputer serta sistem telekomunikasi. Siswa dibekali kemampuan administrasi server, keamanan siber, dan manajemen jaringan skala menengah hingga enterprise.',
        kurikulum: 'Kurikulum Merdeka dengan Teaching Factory berbasis proyek jaringan nyata dan sertifikasi kompetensi BNSP.',
        mataPelajaran: [
            'Konfigurasi Jaringan (Cisco, MikroTik)',
            'Administrasi Server (Linux & Windows)',
            'Keamanan Jaringan (Cybersecurity)',
            'Fiber Optik & Jaringan Nirkabel',
            'Sistem Telekomunikasi',
            'Cloud Computing Dasar',
            'Pemrograman Web Dasar',
            'Technopreneurship',
        ],
        prospekKarier: [
            'Network Administrator',
            'System Administrator',
            'Network Engineer',
            'Cybersecurity Analyst',
            'IT Support & Helpdesk',
            'Technician Fiber Optik',
            'Cloud Engineer ( Junior)',
        ],
        fasilitas: [
            'Laboratorium Jaringan Komputer (Cisco Packet Tracer & Perangkat Nyata)',
            'Laboratorium Server & Cloud',
            'Perangkat MikroTik & Cisco Router/Switch',
            'Fiber Optik Training Kit',
        ],
        sertifikasi: ['CCNA (Cisco Certified Network Associate)', 'MikroTik Certified Network Associate (MTCNA)'],
    },
    TO: {
        name: 'Teknik Otomotif',
        shortCode: 'TO',
        image: '/images/akademik-to.jpg',
        desc: 'Program keahlian yang membekali siswa dengan pengetahuan dan keterampilan dalam perawatan, perbaikan, serta diagnostic kendaraan bermotor. Siswa mempelajari sistem mesin, kelistrikan otomotif, sistem bahan bakar, rem, suspensi, dan teknologi kendaraan modern termasuk kendaraan listrik.',
        kurikulum: 'Kurikulum Merdeka dengan Teaching Factory berbasis bengkel produksi dan sertifikasi kompetensi BNSP.',
        mataPelajaran: [
            'Mesin Mobil (Bensin & Diesel)',
            'Kelistrikan Otomotif',
            'Sistem Injeksi & Pemeliharaan',
            'Sistem Rem & Suspensi',
            'Transmisi & Kopling',
            'Teknologi Kendaraan Listrik (EV)',
            'Diagnostic & Troubleshooting',
            'Technopreneurship',
        ],
        prospekKarier: [
            'Mekanik Otomotif Profesional',
            'Teknisi Service Dealer',
            'Diagnostic Specialist',
            'Foreman / Kepala Bengkel',
            'Wirausaha Bengkel Mandiri',
            'Teknisi Kendaraan Listrik (EV)',
        ],
        fasilitas: [
            'Bengkel Otomotif Lengkap (mesin, ban, kelistrikan)',
            'Mesin Cutaway untuk Pembelajaran',
            'Alat Diagnostic Scanner Modern',
            'Unit Kendaraan Latih (bensin & diesel)',
        ],
        sertifikasi: ['Kompetensi Teknik Kendaraan Ringan (BNSP)', 'Teknisi Otomotif Dasar (BNSP)'],
    },
    TP: {
        name: 'Teknik Pengelasan',
        shortCode: 'TP',
        image: '/images/akademik-tp.jpg',
        desc: 'Program keahlian yang berfokus pada teknik pengelasan logam (SMAW, GTAW, GMAW, FCAW), fabrikasi logam, pembacaan gambar teknik, penggunaan alat ukur presisi, dan penerapan standar keselamatan kerja industri. Siswa dibekali kemampuan kerja di industri manufaktur, galangan kapal, dan konstruksi baja.',
        kurikulum: 'Kurikulum Merdeka dengan Teaching Factory berbasis proyek fabrikasi nyata dan sertifikasi kompetensi BNSP.',
        mataPelajaran: [
            'Pengelasan SMAW (Shielded Metal Arc Welding)',
            'Pengelasan GTAW (TIG Welding)',
            'Pengelasan GMAW (MIG/MAG Welding)',
            'Pembacaan Gambar Teknik',
            'Pengukuran & Peralatan Industri',
            'Keselamatan & Kesehatan Kerja (K3)',
            'Fabrikasi & Pemrosesan Logam',
            'Technopreneurship',
        ],
        prospekKarier: [
            'Welder Profesional (Sertifikat AWS/ASME)',
            'Fabricator / Fabrikator Logam',
            'Quality Control Inspector',
            'Foreman Produksi',
            'Teknisi Konstruksi Baja',
            'Wirausaha Bidang Welding & Fabrikasi',
        ],
        fasilitas: [
            'Bengkel Pengelasan (SMAW, TIG, MIG, FCAW)',
            'Mesin Potong Plasma & Oxy-Acetylene',
            'Mesin Bubut & Frais',
            'Alat Ukur Presisi (Caliper, Micrometer)',
        ],
        sertifikasi: ['Welder SMAW 6G (BNSP)', 'Fabricator Welder (BNSP)'],
    },
};

export default function AkademikShow({ program }) {
    const { settings } = usePage().props;
    const siteName = settings?.site_name ?? 'SMKN 4 Bogor';

    /* Cari data program — dari props backend atau fallback ke data statis */
    const kode = program?.shortCode || program?.kode || '';
    const data = program ?? KEAHLIAN_DETAIL[kode] ?? null;

    if (!data) {
        return (
            <PublicLayout>
                <Head title={`Program Tidak Ditemukan — ${siteName}`} />
                <div className="mx-auto max-w-7xl px-4 py-20 text-center">
                    <h1 className="text-2xl font-bold text-gray-900">Program Tidak Ditemukan</h1>
                    <p className="mt-2 text-gray-500">Kompetensi keahlian yang Anda cari tidak tersedia.</p>
                    <Link href="/akademik" className="mt-6 inline-block rounded-lg bg-[#1E2A5E] px-6 py-3 text-sm font-semibold text-white hover:bg-[#18224d]">
                        Kembali ke Akademik
                    </Link>
                </div>
            </PublicLayout>
        );
    }

    const fallbackTo = (label, w, h) => (e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = ph(label, w, h);
    };

    return (
        <PublicLayout>
            <Head title={`${data.name} — ${siteName}`} />

            {/* ===== HERO ===== */}
            <section className="relative overflow-hidden">
                <div className="relative h-[320px] w-full">
                    <img
                        src={data.image?.startsWith('/') || data.image?.startsWith('http') ? data.image : `/storage/${data.image}`}
                        onError={fallbackTo(data.shortCode, 1600, 600)}
                        alt={data.name}
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#1E2A5E]/90 via-[#1E2A5E]/70 to-transparent" />
                    <div className="relative mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
                        <div>
                            <Link href="/akademik" className="inline-flex items-center gap-1 text-sm text-indigo-200 hover:text-white transition mb-4">
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                </svg>
                                Kembali ke Akademik
                            </Link>
                            <span className="inline-block rounded-full bg-yellow-400 px-3 py-1 text-xs font-bold text-[#1E2A5E]">
                                {data.shortCode}
                            </span>
                            <h1 className="mt-3 max-w-3xl text-2xl font-extrabold leading-tight text-white sm:text-3xl lg:text-4xl">
                                {data.name}
                            </h1>
                            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-indigo-100">
                                {data.desc}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== KONTEN DETAIL ===== */}
            <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid gap-10 lg:grid-cols-3">
                    {/* Kolom Utama (2/3) */}
                    <div className="space-y-8 lg:col-span-2">
                        {/* Kurikulum */}
                        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                            <div className="flex items-center gap-3">
                                <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#1E2A5E]/10 text-[#1E2A5E]">
                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                                    </svg>
                                </div>
                                <h2 className="text-lg font-bold text-gray-900">Profil Kurikulum</h2>
                            </div>
                            <p className="mt-4 text-sm leading-relaxed text-gray-600">{data.kurikulum}</p>
                        </div>

                        {/* Mata Pelajaran */}
                        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                            <div className="flex items-center gap-3">
                                <div className="grid h-10 w-10 place-items-center rounded-xl bg-yellow-400/20 text-yellow-600">
                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                                    </svg>
                                </div>
                                <h2 className="text-lg font-bold text-gray-900">Mata Pelajaran Utama</h2>
                            </div>
                            <div className="mt-4 grid gap-2 sm:grid-cols-2">
                                {data.mataPelajaran.map((mp, i) => (
                                    <div key={i} className="flex items-start gap-2 rounded-lg bg-gray-50 p-3">
                                        <span className="mt-0.5 h-5 w-5 shrink-0 rounded-full bg-[#1E2A5E] text-[10px] font-bold text-white flex items-center justify-center">
                                            {i + 1}
                                        </span>
                                        <span className="text-sm text-gray-700">{mp}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Prospek Karier */}
                        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                            <div className="flex items-center gap-3">
                                <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-500/10 text-emerald-600">
                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                                    </svg>
                                </div>
                                <h2 className="text-lg font-bold text-gray-900">Prospek Karier</h2>
                            </div>
                            <div className="mt-4 grid gap-2 sm:grid-cols-2">
                                {data.prospekKarier.map((pk, i) => (
                                    <div key={i} className="flex items-center gap-2 rounded-lg border border-gray-100 p-3">
                                        <svg className="h-4 w-4 shrink-0 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-sm text-gray-700">{pk}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Kolom Sidebar (1/3) */}
                    <div className="space-y-6">
                        {/* Sertifikasi */}
                        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                            <h3 className="text-sm font-bold text-gray-900">Sertifikasi Kompetensi</h3>
                            <div className="mt-3 space-y-2">
                                {data.sertifikasi.map((s, i) => (
                                    <div key={i} className="flex items-center gap-2 rounded-lg bg-yellow-50 p-3">
                                        <svg className="h-4 w-4 shrink-0 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-sm font-medium text-gray-700">{s}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Fasilitas */}
                        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                            <h3 className="text-sm font-bold text-gray-900">Sarana & Prasarana</h3>
                            <div className="mt-3 space-y-2">
                                {data.fasilitas.map((f, i) => (
                                    <div key={i} className="flex items-start gap-2 text-sm text-gray-600">
                                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1E2A5E]" />
                                        {f}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="rounded-2xl bg-[#1E2A5E] p-6 text-center">
                            <h3 className="text-base font-bold text-white">Tertarik dengan {data.shortCode}?</h3>
                            <p className="mt-2 text-sm text-indigo-200">
                                Hubungi kami untuk informasi pendaftaran dan jalur masuk.
                            </p>
                            <Link
                                href="/kontak"
                                className="mt-4 inline-block rounded-lg bg-yellow-400 px-6 py-2.5 text-sm font-semibold text-[#1E2A5E] transition hover:bg-yellow-300"
                            >
                                Hubungi Kami
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
