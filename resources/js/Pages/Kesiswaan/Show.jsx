import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link, usePage } from '@inertiajs/react';

/* Placeholder SVG */
const ph = (label, w = 400, h = 300) =>
    `data:image/svg+xml;utf8,${encodeURIComponent(
        `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}'><rect width='100%' height='100%' fill='#e5e7eb'/><text x='50%' y='50%' font-family='sans-serif' font-size='16' fill='#9ca3af' text-anchor='middle' dominant-baseline='middle'>${label}</text></svg>`,
    )}`;

export default function KesiswaanShow({ type, item, related = [] }) {
    const { settings } = usePage().props;
    const siteName = settings?.site_name ?? 'SMKN 4 Bogor';

    if (!item) {
        return (
            <PublicLayout>
                <Head title={`Tidak Ditemukan — ${siteName}`} />
                <div className="mx-auto max-w-7xl px-4 py-20 text-center">
                    <h1 className="text-2xl font-bold text-gray-900">Data Tidak Ditemukan</h1>
                    <p className="mt-2 text-gray-500">Item yang Anda cari tidak tersedia.</p>
                    <Link href="/kesiswaan" className="mt-6 inline-block rounded-lg bg-[#1E2A5E] px-6 py-3 text-sm font-semibold text-white hover:bg-[#18224d]">
                        Kembali ke Kesiswaan
                    </Link>
                </div>
            </PublicLayout>
        );
    }

    const fallbackTo = (label, w, h) => (e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = ph(label, w, h);
    };

    const isEskul = type === 'ekskul';
    const typeName = isEskul ? 'Ekstrakurikuler' : 'Organisasi';
    const backUrl = '/kesiswaan';

    const imageUrl = item.image
        ? (item.image.startsWith('http') || item.image.startsWith('/images/')
            ? item.image
            : `/storage/${item.image}`)
        : null;

    return (
        <PublicLayout>
            <Head title={`${item.name} — ${siteName}`} />

            {/* ===== HERO ===== */}
            <section className="relative overflow-hidden">
                <div className="relative h-[300px] w-full">
                    {imageUrl ? (
                        <img
                            src={imageUrl}
                            onError={fallbackTo(item.name, 1600, 600)}
                            alt={item.name}
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                    ) : (
                        <div className="absolute inset-0 bg-[#1E2A5E]" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#1E2A5E]/90 via-[#1E2A5E]/70 to-transparent" />
                    <div className="relative mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
                        <div>
                            <Link href={backUrl} className="inline-flex items-center gap-1 text-sm text-indigo-200 hover:text-white transition mb-4">
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                </svg>
                                Kembali ke Kesiswaan
                            </Link>
                            <span className="inline-block rounded-full bg-yellow-400 px-3 py-1 text-xs font-bold text-[#1E2A5E]">
                                {typeName}
                            </span>
                            <h1 className="mt-3 max-w-3xl text-2xl font-extrabold leading-tight text-white sm:text-3xl lg:text-4xl">
                                {item.name}
                            </h1>
                            {isEskul && item.schedule && (
                                <p className="mt-2 text-sm text-indigo-200">📅 {item.schedule}</p>
                            )}
                            {!isEskul && item.period && (
                                <p className="mt-2 text-sm text-indigo-200">Periode: {item.period}</p>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== KONTEN DETAIL ===== */}
            <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid gap-10 lg:grid-cols-3">
                    {/* Kolom Utama */}
                    <div className="space-y-8 lg:col-span-2">
                        {/* Deskripsi */}
                        {item.description && (
                            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                                <div className="flex items-center gap-3">
                                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#1E2A5E]/10 text-[#1E2A5E]">
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                        </svg>
                                    </div>
                                    <h2 className="text-lg font-bold text-gray-900">Tentang {item.name}</h2>
                                </div>
                                <p className="mt-4 text-sm leading-relaxed text-gray-600 whitespace-pre-line">
                                    {item.description}
                                </p>
                            </div>
                        )}

                        {/* Visi & Misi (untuk organisasi) */}
                        {!isEskul && (item.vision || item.mission) && (
                            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                                <div className="flex items-center gap-3">
                                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-yellow-400/20 text-yellow-600">
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <h2 className="text-lg font-bold text-gray-900">Visi & Misi</h2>
                                </div>
                                <div className="mt-4 space-y-4">
                                    {item.vision && (
                                        <div>
                                            <h3 className="text-sm font-bold text-[#1E2A5E]">Visi</h3>
                                            <p className="mt-1 text-sm leading-relaxed text-gray-600">{item.vision}</p>
                                        </div>
                                    )}
                                    {item.mission && (
                                        <div>
                                            <h3 className="text-sm font-bold text-[#1E2A5E]">Misi</h3>
                                            <p className="mt-1 text-sm leading-relaxed text-gray-600 whitespace-pre-line">{item.mission}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Struktur Kepengurusan (untuk organisasi) */}
                        {!isEskul && item.structure?.length > 0 && (
                            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                                <div className="flex items-center gap-3">
                                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-500/10 text-emerald-600">
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                                        </svg>
                                    </div>
                                    <h2 className="text-lg font-bold text-gray-900">Struktur Kepengurusan</h2>
                                </div>
                                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                                    {item.structure.map((s, i) => (
                                        <div key={i} className="flex items-center gap-3 rounded-lg border border-gray-100 p-3">
                                            <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-100">
                                                {s.photo ? (
                                                    <img src={`/storage/${s.photo}`} alt={s.name} className="h-full w-full object-cover" />
                                                ) : (
                                                    <div className="flex h-full w-full items-center justify-center text-[10px] font-bold text-gray-400">
                                                        {s.name?.charAt(0)}
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-gray-800">{s.name}</p>
                                                <p className="text-[10px] text-gray-500">{s.position}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Prestasi (untuk ekskul) */}
                        {isEskul && item.achievements?.length > 0 && (
                            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                                <div className="flex items-center gap-3">
                                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-yellow-400/20 text-yellow-600">
                                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102 1.106 4.637c.194.813.69 1.456 1.405 1.705 1.314.472 2.689.04 3.577-1.037l3.256-3.856 3.907.578c.848.125 1.615-.448 1.735-1.286l.372-2.61.762-2.233c.121-.349-.162-.72-.514-.825L11.868 2.884zM10.364 15.35l-3.856 3.45 1.21-4.456-3.42-2.974 4.488-.376 1.476-4.105 3.397 4.522-3.287 4.939z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <h2 className="text-lg font-bold text-gray-900">Prestasi</h2>
                                </div>
                                <div className="mt-4 space-y-2">
                                    {item.achievements.map((a, i) => (
                                        <div key={i} className="flex items-center gap-3 rounded-lg border border-gray-100 p-3">
                                            <span className="text-xs font-bold text-yellow-600">{a.year || '-'}</span>
                                            <div>
                                                <p className="text-sm font-semibold text-gray-800">{a.title}</p>
                                                {a.event && <p className="text-[10px] text-gray-500">{a.event}</p>}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Info Singkat */}
                        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                            <h3 className="text-sm font-bold text-gray-900">Informasi</h3>
                            <div className="mt-4 space-y-3 text-sm">
                                {isEskul && item.schedule && (
                                    <div className="flex items-start gap-2">
                                        <span className="shrink-0 text-gray-400">📅</span>
                                        <div>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase">Jadwal</p>
                                            <p className="font-semibold text-gray-800">{item.schedule}</p>
                                        </div>
                                    </div>
                                )}
                                {isEskul && item.coach_name && (
                                    <div className="flex items-start gap-2">
                                        <span className="shrink-0 text-gray-400">👤</span>
                                        <div>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase">Pembina</p>
                                            <p className="font-semibold text-gray-800">{item.coach_name}</p>
                                            {item.coach_phone && <p className="text-[10px] text-gray-500">📱 {item.coach_phone}</p>}
                                        </div>
                                    </div>
                                )}
                                {isEskul && item.location && (
                                    <div className="flex items-start gap-2">
                                        <span className="shrink-0 text-gray-400">📍</span>
                                        <div>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase">Tempat</p>
                                            <p className="font-semibold text-gray-800">{item.location}</p>
                                        </div>
                                    </div>
                                )}
                                {!isEskul && item.period && (
                                    <div className="flex items-start gap-2">
                                        <span className="shrink-0 text-gray-400">📆</span>
                                        <div>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase">Periode</p>
                                            <p className="font-semibold text-gray-800">{item.period}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="rounded-2xl bg-[#1E2A5E] p-6 text-center">
                            <h3 className="text-base font-bold text-white">Tertarik Bergabung?</h3>
                            <p className="mt-2 text-sm text-indigo-200">
                                Hubungi kami untuk informasi pendaftaran {typeName.toLowerCase()}.
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

                {/* Item Terkait */}
                {related.length > 0 && (
                    <div className="mt-14 border-t border-gray-200 pt-10">
                        <h2 className="text-xl font-bold text-gray-900">{typeName} Lainnya</h2>
                        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {related.map((r) => (
                                <Link
                                    key={r.id}
                                    href={`/kesiswaan/${type}/${r.slug}`}
                                    className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md"
                                >
                                    <div className="h-40 overflow-hidden bg-gray-100">
                                        {r.image ? (
                                            <img
                                                src={r.image.startsWith('http') || r.image.startsWith('/images/') ? r.image : `/storage/${r.image}`}
                                                onError={fallbackTo(r.name, 640, 400)}
                                                alt={r.name}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-gray-300">
                                                {r.name?.charAt(0)}
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-sm font-bold leading-snug text-gray-900 group-hover:text-[#1E2A5E]">
                                            {r.name}
                                        </h3>
                                        {r.description && (
                                            <p className="mt-1 text-xs text-gray-500 line-clamp-2">
                                                {r.description}
                                            </p>
                                        )}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </section>
        </PublicLayout>
    );
}
