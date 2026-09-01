import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link, usePage } from '@inertiajs/react';

/* Placeholder SVG */
const ph = (label, w = 400, h = 300) =>
    `data:image/svg+xml;utf8,${encodeURIComponent(
        `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}'><rect width='100%' height='100%' fill='%23e5e7eb'/><text x='50%' y='50%' font-family='sans-serif' font-size='16' fill='%239ca3af' text-anchor='middle' dominant-baseline='middle'>${label}</text></svg>`,
    )}`;

const badgeColor = {
    Prestasi: 'bg-yellow-400 text-[#1E2A5E]',
    Kegiatan: 'bg-emerald-500 text-white',
    Pengumuman: 'bg-[#1E2A5E] text-white',
};

export default function BeritaShow({ berita, beritaLain = [] }) {
    const { settings } = usePage().props;
    const siteName = settings?.site_name ?? 'SMKN 4 Bogor';

    if (!berita) {
        return (
            <PublicLayout>
                <Head title={`Berita Tidak Ditemukan — ${siteName}`} />
                <div className="mx-auto max-w-7xl px-4 py-20 text-center">
                    <h1 className="text-2xl font-bold text-gray-900">Berita Tidak Ditemukan</h1>
                    <p className="mt-2 text-gray-500">Artikel yang Anda cari tidak tersedia.</p>
                    <Link href="/berita" className="mt-6 inline-block rounded-lg bg-[#1E2A5E] px-6 py-3 text-sm font-semibold text-white hover:bg-[#18224d]">
                        Kembali ke Berita
                    </Link>
                </div>
            </PublicLayout>
        );
    }

    const fallbackTo = (label, w, h) => (e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = ph(label, w, h);
    };

    const category = berita.category || berita.kategori || 'Kegiatan';
    const imageUrl = berita.image
        ? (berita.image.startsWith('http') || berita.image.startsWith('/images/')
            ? berita.image
            : `/storage/${berita.image}`)
        : ph('Berita', 1200, 600);

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        try {
            return new Date(dateString).toLocaleDateString('id-ID', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
            });
        } catch {
            return dateString;
        }
    };

    const authorName = berita.author?.name || 'Admin ' + siteName;

    /* Share URLs */
    const pageUrl = typeof window !== 'undefined' ? window.location.href : '';
    const shareText = encodeURIComponent(berita.title || '');
    const shareUrl = encodeURIComponent(pageUrl);

    return (
        <PublicLayout>
            <Head title={`${berita.title} — ${siteName}`} />

            {/* ===== HERO ===== */}
            <section className="bg-[#1E2A5E]">
                <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                    <Link href="/berita" className="inline-flex items-center gap-1 text-sm text-indigo-200 hover:text-white transition">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                        Kembali ke Berita
                    </Link>
                    <div className="mt-4">
                        <span className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${badgeColor[category] ?? 'bg-gray-200 text-gray-700'}`}>
                            {category}
                        </span>
                        <h1 className="mt-3 max-w-4xl text-2xl font-extrabold leading-tight text-white sm:text-3xl lg:text-4xl">
                            {berita.title}
                        </h1>
                        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-indigo-200">
                            <span className="flex items-center gap-1.5">
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0" />
                                </svg>
                                {authorName}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                                </svg>
                                {formatDate(berita.published_at || berita.created_at)}
                            </span>
                            {berita.views > 0 && (
                                <span className="flex items-center gap-1.5">
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    {berita.views} dilihat
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== KONTEN BERITA ===== */}
            <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
                {/* Gambar Utama */}
                <div className="overflow-hidden rounded-2xl">
                    <img
                        src={imageUrl}
                        onError={fallbackTo('Berita', 1200, 600)}
                        alt={berita.title}
                        className="h-auto w-full object-cover"
                    />
                </div>

                {/* Ringkasan / Excerpt */}
                {berita.excerpt && (
                    <div className="mt-8 rounded-xl border-l-4 border-yellow-400 bg-gray-50 p-5">
                        <p className="text-base font-medium leading-relaxed text-gray-700 italic">
                            {berita.excerpt}
                        </p>
                    </div>
                )}

                {/* Isi Konten */}
                <div
                    className="prose prose-lg prose-gray mt-8 max-w-none
                        prose-headings:text-gray-900 prose-headings:font-bold
                        prose-p:text-gray-700 prose-p:leading-relaxed
                        prose-a:text-[#1E2A5E] prose-a:no-underline hover:prose-a:underline
                        prose-img:rounded-xl prose-img:shadow-sm"
                    dangerouslySetInnerHTML={{ __html: berita.content }}
                />

                {/* Share Section */}
                <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-gray-200 pt-6">
                    <span className="text-sm font-semibold text-gray-700">Bagikan:</span>
                    <a
                        href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700 transition"
                    >
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                        Facebook
                    </a>
                    <a
                        href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg bg-sky-500 px-4 py-2 text-xs font-semibold text-white hover:bg-sky-600 transition"
                    >
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                        Twitter / X
                    </a>
                    <a
                        href={`https://wa.me/?text=${shareText}%20${shareUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg bg-green-500 px-4 py-2 text-xs font-semibold text-white hover:bg-green-600 transition"
                    >
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        WhatsApp
                    </a>
                </div>

                {/* Berita Lainnya */}
                {beritaLain.length > 0 && (
                    <div className="mt-14 border-t border-gray-200 pt-10">
                        <h2 className="text-xl font-bold text-gray-900">Berita Lainnya</h2>
                        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {beritaLain.map((item) => (
                                <Link
                                    key={item.id}
                                    href={`/berita/${item.slug}`}
                                    className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md"
                                >
                                    <div className="relative h-40 overflow-hidden">
                                        <img
                                            src={item.image ? (item.image.startsWith('http') || item.image.startsWith('/images/') ? item.image : `/storage/${item.image}`) : ph('Berita', 640, 400)}
                                            onError={fallbackTo('Berita', 640, 400)}
                                            alt={item.title}
                                            className="h-full w-full object-cover"
                                        />
                                        <span className={`absolute left-3 top-3 rounded-full px-2.5 py-0.5 text-[10px] font-bold ${badgeColor[item.category] ?? 'bg-gray-200 text-gray-700'}`}>
                                            {item.category || 'Kegiatan'}
                                        </span>
                                    </div>
                                    <div className="flex flex-1 flex-col p-4">
                                        <h3 className="text-sm font-bold leading-snug text-gray-900 group-hover:text-[#1E2A5E] line-clamp-2">
                                            {item.title}
                                        </h3>
                                        <p className="mt-1 text-xs text-gray-400">
                                            {formatDate(item.published_at || item.created_at)}
                                        </p>
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
