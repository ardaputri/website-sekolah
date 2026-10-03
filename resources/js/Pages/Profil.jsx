import PublicLayout from '@/Layouts/PublicLayout';
import { Head, usePage } from '@inertiajs/react';

/* Placeholder SVG (dipakai bila gambar asli belum diunggah) */
const ph = (label, w = 400, h = 300) =>
    `data:image/svg+xml;utf8,${encodeURIComponent(
        `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}'><rect width='100%' height='100%' fill='#e5e7eb'/><text x='50%' y='50%' font-family='sans-serif' font-size='16' fill='#9ca3af' text-anchor='middle' dominant-baseline='middle'>${label}</text></svg>`,
    )}`;

export default function Profil() {
    const { settings } = usePage().props;
    const siteName = settings?.site_name ?? 'SMKN 4 Bogor';
    const principal = settings?.principal_name ?? 'Kepala Sekolah';

    const fallbackTo = (label, w, h) => (e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = ph(label, w, h);
    };

    /* Visi & Misi (nanti bisa dijadikan dinamis dari pengaturan situs). */
    const visi =
        'Menjadi sekolah menengah kejuruan unggulan yang menghasilkan lulusan berkarakter, ' +
        'kompeten, dan berdaya saing di era global dengan berlandaskan iman dan takwa.';

    const misi = [
        'Menyelenggarakan pembelajaran yang berpusat pada siswa dan berbasis teknologi.',
        'Membentuk karakter siswa yang berakhlak mulia, disiplin, dan bertanggung jawab.',
        'Mengembangkan kompetensi keahlian yang relevan dengan kebutuhan dunia industri.',
        'Menjalin kemitraan dengan dunia usaha dan dunia industri (DUDI).',
        'Menumbuhkan jiwa kewirausahaan dan kemandirian pada setiap siswa.',
    ];

    /* Nilai / keunggulan sekolah. */
    const nilai = [
        {
            title: 'Berkarakter',
            desc: 'Menanamkan nilai budi pekerti, kedisiplinan, dan integritas dalam setiap kegiatan.',
            icon: (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            ),
        },
        {
            title: 'Kompeten',
            desc: 'Membekali siswa dengan keterampilan teknis sesuai standar dunia industri.',
            icon: (
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            ),
        },
        {
            title: 'Inovatif',
            desc: 'Mendorong kreativitas dan pemanfaatan teknologi dalam proses pembelajaran.',
            icon: (
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
            ),
        },
    ];

    /* Fasilitas unggulan. */
    const fasilitas = [
        'Laboratorium Komputer',
        'Perpustakaan Digital',
        'Bengkel Praktik',
        'Lapangan Olahraga',
        'Masjid Sekolah',
        'Ruang Kelas Ber-AC',
        'Aula Serbaguna',
        'Kantin Sehat',
    ];

    /* Statistik ringkas sekolah (angka contoh). */
    const statistik = [
        { value: '1.2K+', label: 'Siswa' },
        { value: '80+', label: 'Guru & Staf' },
        { value: '5', label: 'Konsentrasi Keahlian' },
        { value: 'A', label: 'Akreditasi' },
    ];

    return (
        <PublicLayout>
            <Head title={`Profil — ${siteName}`} />

            {/* ===== HERO ===== */}
            <section className="bg-[#1E2A5E]">
                <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
                    <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/20">
                        Profil Sekolah
                    </span>
                    <h1 className="mt-4 max-w-3xl text-3xl font-extrabold leading-tight text-white sm:text-4xl">
                        Mengenal Lebih Dekat <span className="text-yellow-400">{siteName}</span>
                    </h1>
                    <p className="mt-3 max-w-2xl leading-relaxed text-indigo-100">
                        Berkomitmen mencetak generasi yang berkarakter, kompeten, dan siap
                        menghadapi tantangan dunia kerja maupun pendidikan tinggi.
                    </p>
                </div>
            </section>

            {/* ===== STATISTIK ===== */}
            <section className="mx-auto -mt-8 max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    {statistik.map((s) => (
                        <div
                            key={s.label}
                            className="rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm"
                        >
                            <div className="text-3xl font-extrabold text-[#1E2A5E]">{s.value}</div>
                            <div className="mt-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
                                {s.label}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ===== SAMBUTAN KEPALA SEKOLAH ===== */}
            <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="grid items-center gap-10 md:grid-cols-5">
                    <div className="md:col-span-2">
                        <img
                            src="/images/kepala-sekolah.jpg"
                            onError={fallbackTo('Kepala Sekolah', 600, 700)}
                            alt={principal}
                            className="mx-auto h-80 w-full max-w-sm rounded-2xl object-cover shadow-lg"
                        />
                    </div>
                    <div className="md:col-span-3">
                        <h2 className="text-2xl font-bold text-gray-900">Sambutan Kepala Sekolah</h2>
                        <div className="mt-2 h-1 w-16 rounded-full bg-yellow-400" />
                        <p className="mt-5 leading-relaxed text-gray-600">
                            Assalamu&apos;alaikum warahmatullahi wabarakatuh. Selamat datang di website
                            resmi {siteName}. Kami mengucapkan terima kasih atas kunjungan Anda ke laman
                            kami.
                        </p>
                        <p className="mt-4 leading-relaxed text-gray-600">
                            Sebagai lembaga pendidikan kejuruan, kami berkomitmen untuk terus
                            meningkatkan mutu pembelajaran, membangun karakter siswa, serta
                            mempersiapkan lulusan yang unggul dan siap terjun ke dunia kerja maupun
                            melanjutkan ke jenjang pendidikan yang lebih tinggi. Semoga website ini
                            menjadi jembatan informasi yang bermanfaat bagi seluruh warga sekolah dan
                            masyarakat.
                        </p>
                        <div className="mt-6">
                            <div className="font-bold text-[#1E2A5E]">{principal}</div>
                            <div className="text-sm text-gray-500">Kepala {siteName}</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== VISI & MISI ===== */}
            <section className="bg-gray-50 py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-8 md:grid-cols-2">
                        {/* Visi */}
                        <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
                            <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#1E2A5E]/10 text-[#1E2A5E]">
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <h3 className="mt-4 text-xl font-bold text-gray-900">Visi</h3>
                            <div className="mt-2 h-0.5 w-10 rounded-full bg-yellow-400" />
                            <p className="mt-4 leading-relaxed text-gray-600">{visi}</p>
                        </div>

                        {/* Misi */}
                        <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
                            <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#1E2A5E]/10 text-[#1E2A5E]">
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
                                </svg>
                            </div>
                            <h3 className="mt-4 text-xl font-bold text-gray-900">Misi</h3>
                            <div className="mt-2 h-0.5 w-10 rounded-full bg-yellow-400" />
                            <ul className="mt-4 space-y-3">
                                {misi.map((m, i) => (
                                    <li key={i} className="flex gap-3 text-gray-600">
                                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-yellow-400 text-xs font-bold text-[#1E2A5E]">
                                            {i + 1}
                                        </span>
                                        <span className="text-sm leading-relaxed">{m}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== NILAI / KEUNGGULAN ===== */}
            <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900">Nilai &amp; Keunggulan</h2>
                    <div className="mx-auto mt-2 h-1 w-16 rounded-full bg-yellow-400" />
                    <p className="mx-auto mt-3 max-w-2xl text-gray-500">
                        Prinsip yang kami junjung dalam membentuk lulusan terbaik.
                    </p>
                </div>

                <div className="mt-10 grid gap-6 md:grid-cols-3">
                    {nilai.map((n) => (
                        <div
                            key={n.title}
                            className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm transition hover:shadow-md"
                        >
                            <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[#1E2A5E]/10 text-[#1E2A5E]">
                                <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                                    {n.icon}
                                </svg>
                            </div>
                            <h3 className="mt-4 text-lg font-bold text-[#1E2A5E]">{n.title}</h3>
                            <p className="mt-2 text-sm leading-relaxed text-gray-600">{n.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ===== SEJARAH SINGKAT ===== */}
            <section className="bg-gray-50 py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid items-center gap-10 md:grid-cols-2">
                        <div>
                            <img
                                src="/images/profil-sejarah.jpg"
                                onError={fallbackTo('Sejarah Sekolah', 800, 600)}
                                alt="Gedung sekolah"
                                className="h-72 w-full rounded-2xl object-cover shadow-lg"
                            />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">Sejarah Singkat</h2>
                            <div className="mt-2 h-1 w-16 rounded-full bg-yellow-400" />
                            <p className="mt-5 leading-relaxed text-gray-600">
                                {siteName} berdiri sebagai wujud komitmen dalam menyediakan pendidikan
                                kejuruan berkualitas bagi masyarakat. Sejak awal berdirinya, sekolah ini
                                terus berkembang baik dari sisi sarana prasarana, kompetensi tenaga
                                pendidik, maupun jumlah konsentrasi keahlian yang ditawarkan.
                            </p>
                            <p className="mt-4 leading-relaxed text-gray-600">
                                Kini, {siteName} telah menjadi salah satu sekolah kejuruan pilihan yang
                                dipercaya masyarakat, dengan berbagai prestasi di tingkat kota, provinsi,
                                hingga nasional, serta jalinan kemitraan yang erat dengan dunia industri.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== FASILITAS ===== */}
            <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900">Fasilitas Sekolah</h2>
                    <div className="mx-auto mt-2 h-1 w-16 rounded-full bg-yellow-400" />
                    <p className="mx-auto mt-3 max-w-2xl text-gray-500">
                        Sarana dan prasarana yang menunjang kegiatan belajar mengajar.
                    </p>
                </div>

                <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                    {fasilitas.map((f) => (
                        <div
                            key={f}
                            className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
                        >
                            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-yellow-400/20 text-[#1E2A5E]">
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                </svg>
                            </span>
                            <span className="text-sm font-medium text-gray-700">{f}</span>
                        </div>
                    ))}
                </div>
            </section>
        </PublicLayout>
    );
}
