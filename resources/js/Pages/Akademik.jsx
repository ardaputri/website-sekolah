import PublicLayout from '@/Layouts/PublicLayout';
import { to } from '@/lib/nav';
import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

/* Placeholder SVG (dipakai bila gambar asli belum diunggah) */
const ph = (label, w = 400, h = 300) =>
    `data:image/svg+xml;utf8,${encodeURIComponent(
        `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}'><rect width='100%' height='100%' fill='%23e5e7eb'/><text x='50%' y='50%' font-family='sans-serif' font-size='16' fill='%239ca3af' text-anchor='middle' dominant-baseline='middle'>${label}</text></svg>`,
    )}`;

export default function Akademik({ academics = [] }) {
    const { settings } = usePage().props;
    const siteName = settings?.site_name ?? 'SMKN 4 Bogor';

    const fallbackTo = (label, w, h) => (e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = ph(label, w, h);
    };

    /* State & Data untuk Filter Jadwal Pelajaran */
    const [kelasSelected, setKelasSelected] = useState('XII');
    const [jurusanSelected, setJurusanSelected] = useState('PPLG');
    const [rombelSelected, setRombelSelected] = useState('1');

    const daftarTingkat = ['X', 'XI', 'XII'];
    const daftarJurusan = [
        { code: 'PPLG', name: 'Pengembangan Perangkat Lunak dan Gim' },
        { code: 'TJKT', name: 'Teknik Jaringan Komputer dan Telekomunikasi' },
        { code: 'TO', name: 'Teknik Otomotif' },
        { code: 'TP', name: 'Teknik Pengelasan' },
    ];
    const daftarRombel = ['1', '2'];

    /* Filtering Data Real dari Database berdasarkan Pilihan Admin/User */
    const currentJadwal = academics.filter((item) => {
        const itemKelas = String(item.kelas || '').trim().toUpperCase();
        const itemJurusan = String(item.jurusan || '').trim().toUpperCase();
        const itemRombel = String(item.rombel || '').trim();

        // Mencocokkan rombel (misal format "PPLG 1" atau hanya "1")
        const isRombelMatch =
            itemRombel === rombelSelected ||
            itemRombel === `${jurusanSelected} ${rombelSelected}`;

        return (
            itemKelas === kelasSelected &&
            itemJurusan === jurusanSelected &&
            isRombelMatch
        );
    });

    /* Konsentrasi keahlian */
    const keahlian = [
        {
            kode: 'PPLG',
            name: 'Pengembangan Perangkat Lunak dan Gim',
            desc: 'Membekali siswa dengan keterampilan pemrograman, pengembangan aplikasi web & mobile, serta pembuatan gim.',
            image: '/images/akademik-pplg.jpg',
        },
        {
            kode: 'TJKT',
            name: 'Teknik Jaringan Komputer dan Telekomunikasi',
            desc: 'Fokus pada instalasi jaringan, administrasi server, keamanan siber, dan sistem telekomunikasi.',
            image: '/images/akademik-tjkt.jpg',
        },
        {
            kode: 'TO',
            name: 'Teknik Otomotif',
            desc: 'Membekali siswa dengan keterampilan perawatan dan perbaikan kendaraan, sistem mesin, kelistrikan otomotif, dan teknologi kendaraan modern.',
            image: '/images/akademik-to.jpg',
        },
        {
            kode: 'TP',
            name: 'Teknik Pengelasan',
            desc: 'Fokus pada teknik pengelasan logam, fabrikasi, pembacaan gambar teknik, dan penerapan standar keselamatan kerja industri.',
            image: '/images/akademik-tp.jpg',
        },
    ];

    /* Pendekatan pembelajaran */
    const pendekatan = [
        {
            title: 'Teaching Factory',
            desc: 'Pembelajaran berbasis produksi nyata yang mensimulasikan suasana kerja industri.',
            icon: (
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
            ),
        },
        {
            title: 'Praktik Kerja Lapangan',
            desc: 'Magang di dunia usaha dan dunia industri (DUDI) untuk pengalaman kerja langsung.',
            icon: (
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
            ),
        },
        {
            title: 'Sertifikasi Kompetensi',
            desc: 'Uji kompetensi dan sertifikasi yang diakui industri sebagai bukti keahlian lulusan.',
            icon: (
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.504-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
            ),
        },
        {
            title: 'Kelas Industri',
            desc: 'Kurikulum yang diselaraskan dengan kebutuhan mitra industri untuk kesiapan kerja.',
            icon: (
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
            ),
        },
    ];

    /* Alur / tahapan kegiatan akademik */
    const alur = [
        { step: '01', title: 'Pembelajaran Adaptif & Normatif', desc: 'Penguatan dasar akademik, karakter, dan literasi di tahun pertama.' },
        { step: '02', title: 'Pembelajaran Produktif', desc: 'Pendalaman kompetensi keahlian sesuai konsentrasi yang dipilih.' },
        { step: '03', title: 'Praktik Kerja Lapangan (PKL)', desc: 'Magang langsung di dunia industri untuk pengalaman nyata.' },
        { step: '04', title: 'Uji Kompetensi & Kelulusan', desc: 'Sertifikasi keahlian dan persiapan menuju dunia kerja atau kuliah.' },
    ];

    return (
        <PublicLayout>
            <Head title={`Akademik — ${siteName}`} />

            {/* ===== HERO ===== */}
            <section className="bg-[#1E2A5E]">
                <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
                    <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/20">
                        Akademik
                    </span>
                    <h1 className="mt-4 max-w-3xl text-3xl font-extrabold leading-tight text-white sm:text-4xl">
                        Program &amp; Konsentrasi <span className="text-yellow-400">Keahlian</span>
                    </h1>
                    <p className="mt-3 max-w-2xl leading-relaxed text-indigo-100">
                        Beragam konsentrasi keahlian di {siteName} dirancang selaras dengan kebutuhan
                        dunia industri untuk mencetak lulusan yang kompeten dan siap kerja.
                    </p>
                </div>
            </section>

            {/* ===== KONSENTRASI KEAHLIAN ===== */}
            <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900">Konsentrasi Keahlian</h2>
                    <div className="mx-auto mt-2 h-1 w-16 rounded-full bg-yellow-400" />
                    <p className="mx-auto mt-3 max-w-2xl text-gray-500">
                        Pilih bidang keahlian sesuai minat dan bakatmu untuk masa depan yang cerah.
                    </p>
                </div>

                <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {keahlian.map((k) => (
                        <Link
                            key={k.kode}
                            href={`/akademik/${k.kode}`}
                            className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md"
                        >
                            <div className="relative">
                                <img
                                    src={k.image}
                                    onError={fallbackTo(k.kode, 640, 400)}
                                    alt={k.name}
                                    className="h-44 w-full object-cover"
                                />
                                <span className="absolute left-3 top-3 rounded-full bg-yellow-400 px-3 py-1 text-xs font-bold text-[#1E2A5E]">
                                    {k.kode}
                                </span>
                            </div>
                            <div className="flex flex-1 flex-col p-5">
                                <h3 className="font-bold leading-snug text-gray-900 group-hover:text-[#1E2A5E]">
                                    {k.name}
                                </h3>
                                <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">{k.desc}</p>
                                <span className="mt-4 text-sm font-semibold text-[#1E2A5E]">
                                    Lihat Detail →
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* ===== JADWAL PELAJARAN ===== */}
            <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
                    {/* Header Jadwal */}
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <h2 className="text-2xl font-bold text-gray-900">
                            Jadwal Pelajaran <span className="text-[#1E2A5E]">{kelasSelected} {jurusanSelected} {rombelSelected}</span>
                        </h2>
                        <span className="text-xs font-bold text-gray-500">
                            Tahun Ajaran 2026/2027
                        </span>
                    </div>
                    <div className="mt-2 h-0.5 w-full bg-gray-800" />

                    {/* Filter Tingkat Kelas, Jurusan, dan Rombel */}
                    <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex flex-wrap items-center gap-2">
                            {/* Filter Tingkat (X, XI, XII) */}
                            <div className="flex rounded-lg border border-gray-200 bg-gray-50 p-1">
                                {daftarTingkat.map((tk) => (
                                    <button
                                        key={tk}
                                        type="button"
                                        onClick={() => setKelasSelected(tk)}
                                        className={`rounded-md px-3 py-1 text-xs font-bold transition ${
                                            kelasSelected === tk
                                                ? 'bg-[#1E2A5E] text-white'
                                                : 'text-gray-600 hover:text-gray-900'
                                        }`}
                                    >
                                        {tk}
                                    </button>
                                ))}
                            </div>

                            {/* Filter Jurusan (PPLG, TJKT, TO, TP) */}
                            <div className="flex flex-wrap gap-1">
                                {daftarJurusan.map((j) => (
                                    <button
                                        key={j.code}
                                        type="button"
                                        onClick={() => setJurusanSelected(j.code)}
                                        className={`rounded-md border px-3 py-1.5 text-xs font-bold transition ${
                                            jurusanSelected === j.code
                                                ? 'border-[#1E2A5E] bg-[#1E2A5E] text-white'
                                                : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                                        }`}
                                    >
                                        {j.code}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Filter Kelas/Rombel (1 / 2) */}
                        <div className="flex items-center gap-2 text-xs font-semibold text-gray-600">
                            <span>Rombel:</span>
                            <select
                                value={rombelSelected}
                                onChange={(e) => setRombelSelected(e.target.value)}
                                className="rounded-md border border-gray-200 bg-white px-2.5 py-1 text-xs font-bold text-gray-800 outline-none focus:border-[#1E2A5E]"
                            >
                                {daftarRombel.map((r) => (
                                    <option key={r} value={r}>
                                        {jurusanSelected} {r}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Tabel Jadwal Real-time */}
                    <div className="mt-6 overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-300 text-xs font-extrabold uppercase text-gray-900">
                                    <th className="py-3 px-3 w-36">WAKTU</th>
                                    <th className="py-3 px-3">SENIN</th>
                                    <th className="py-3 px-3">SELASA</th>
                                    <th className="py-3 px-3">RABU</th>
                                    <th className="py-3 px-3">KAMIS</th>
                                    <th className="py-3 px-3">JUMAT</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 text-xs sm:text-sm font-medium text-gray-800">
                                {currentJadwal.length > 0 ? (
                                    currentJadwal.map((row) => (
                                        <tr key={row.id} className="hover:bg-gray-50/60">
                                            <td className="py-2.5 px-3 font-bold text-gray-900 whitespace-nowrap">{row.waktu}</td>
                                            <td className="py-2.5 px-3">{row.senin || '-'}</td>
                                            <td className="py-2.5 px-3">{row.selasa || '-'}</td>
                                            <td className="py-2.5 px-3">{row.rabu || '-'}</td>
                                            <td className="py-2.5 px-3">{row.kamis || '-'}</td>
                                            <td className="py-2.5 px-3">{row.jumat || '-'}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="py-10 text-center text-gray-500 font-normal">
                                            Belum ada jadwal pelajaran tersimpan untuk filter {kelasSelected} {jurusanSelected} {rombelSelected}.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* ===== PENDEKATAN PEMBELAJARAN ===== */}
            <section className="bg-gray-50 py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-900">Pendekatan Pembelajaran</h2>
                        <div className="mx-auto mt-2 h-1 w-16 rounded-full bg-yellow-400" />
                        <p className="mx-auto mt-3 max-w-2xl text-gray-500">
                            Metode belajar yang mendekatkan siswa pada suasana dan standar dunia kerja.
                        </p>
                    </div>

                    <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {pendekatan.map((p) => (
                            <div
                                key={p.title}
                                className="rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm transition hover:shadow-md"
                            >
                                <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[#1E2A5E]/10 text-[#1E2A5E]">
                                    <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                                        {p.icon}
                                    </svg>
                                </div>
                                <h3 className="mt-4 font-bold text-[#1E2A5E]">{p.title}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-gray-600">{p.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== ALUR PEMBELAJARAN ===== */}
            <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900">Alur Pembelajaran</h2>
                    <div className="mx-auto mt-2 h-1 w-16 rounded-full bg-yellow-400" />
                    <p className="mx-auto mt-3 max-w-2xl text-gray-500">
                        Tahapan pendidikan dari awal masuk hingga siap memasuki dunia kerja.
                    </p>
                </div>

                <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {alur.map((a) => (
                        <div
                            key={a.step}
                            className="relative rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
                        >
                            <div className="text-4xl font-extrabold text-yellow-400">{a.step}</div>
                            <h3 className="mt-2 font-bold text-[#1E2A5E]">{a.title}</h3>
                            <p className="mt-2 text-sm leading-relaxed text-gray-600">{a.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ===== CTA PPDB ===== */}
            <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
                <div className="overflow-hidden rounded-3xl bg-[#1E2A5E]">
                    <div className="grid items-center gap-8 p-8 md:grid-cols-2 md:p-12">
                        <div>
                            <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
                                Tertarik Bergabung Bersama Kami?
                            </h2>
                            <p className="mt-3 leading-relaxed text-indigo-100">
                                Temukan konsentrasi keahlian yang sesuai dengan minat dan bakatmu.
                                Hubungi kami untuk informasi pendaftaran peserta didik baru.
                            </p>
                            <div className="mt-6 flex flex-wrap gap-3">
                                <Link
                                    href={to('kontak.index') ?? '#'}
                                    className="rounded-lg bg-yellow-400 px-6 py-3 text-sm font-semibold text-[#1E2A5E] transition hover:bg-yellow-300"
                                >
                                    Hubungi Kami
                                </Link>
                                <Link
                                    href={to('produk.index') ?? '#'}
                                    className="rounded-lg bg-white/10 px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/20 transition hover:bg-white/20"
                                >
                                    Lihat Karya Siswa
                                </Link>
                            </div>
                        </div>
                        <div>
                            <img
                                src="/images/akademik-cta.jpg"
                                onError={fallbackTo('Kegiatan Belajar', 800, 600)}
                                alt="Kegiatan belajar mengajar"
                                className="h-56 w-full rounded-2xl object-cover shadow-lg md:h-64"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}