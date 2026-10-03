import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link, usePage } from '@inertiajs/react';

/* Placeholder SVG */
const ph = (label, w = 400, h = 300) =>
    `data:image/svg+xml;utf8,${encodeURIComponent(
        `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}'><rect width='100%' height='100%' fill='#e5e7eb'/><text x='50%' y='50%' font-family='sans-serif' font-size='16' fill='#9ca3af' text-anchor='middle' dominant-baseline='middle'>${label}</text></svg>`,
    )}`;

const statusLabel = {
    available: 'Tersedia',
    coming_soon: 'Segera Hadir',
    sold_out: 'Terjual',
};

const statusColor = {
    available: 'bg-emerald-100 text-emerald-700',
    coming_soon: 'bg-yellow-100 text-yellow-700',
    sold_out: 'bg-red-100 text-red-700',
};

export default function ProdukShow({ produk, produkLain = [] }) {
    const { settings } = usePage().props;
    const siteName = settings?.site_name ?? 'SMKN 4 Bogor';

    if (!produk) {
        return (
            <PublicLayout>
                <Head title={`Produk Tidak Ditemukan — ${siteName}`} />
                <div className="mx-auto max-w-7xl px-4 py-20 text-center">
                    <h1 className="text-2xl font-bold text-gray-900">Produk Tidak Ditemukan</h1>
                    <p className="mt-2 text-gray-500">Produk yang Anda cari tidak tersedia.</p>
                    <Link href="/produk" className="mt-6 inline-block rounded-lg bg-[#1E2A5E] px-6 py-3 text-sm font-semibold text-white hover:bg-[#18224d]">
                        Kembali ke Produk
                    </Link>
                </div>
            </PublicLayout>
        );
    }

    const fallbackTo = (label, w, h) => (e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = ph(label, w, h);
    };

    const getImageUrl = (img) => {
        if (!img) return ph('Produk', 800, 600);
        if (img.startsWith('http') || img.startsWith('/images/')) return img;
        return `/storage/${img}`;
    };

    const displayStatus = statusLabel[produk.status] || produk.status || 'Tersedia';
    const displayStatusColor = statusColor[produk.status] || 'bg-gray-200 text-gray-700';

    /* Galeri foto produk — gunakan array images atau fallback ke image tunggal */
    const gallery = produk.images?.length > 0
        ? produk.images
        : [produk.image];

    const whatsapp = settings?.whatsapp;
    const email = settings?.email ?? 'info@smkn4bogor.sch.id';

    return (
        <PublicLayout>
            <Head title={`${produk.name} — ${siteName}`} />

            {/* ===== HERO ===== */}
            <section className="bg-[#1E2A5E]">
                <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                    <Link href="/produk" className="inline-flex items-center gap-1 text-sm text-indigo-200 hover:text-white transition">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                        Kembali ke Produk
                    </Link>
                    <div className="mt-4">
                        <div className="flex flex-wrap items-center gap-3">
                            <span className={`rounded-full px-3 py-1 text-xs font-bold ${displayStatusColor}`}>
                                {displayStatus}
                            </span>
                            {produk.category && (
                                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/20">
                                    {produk.category}
                                </span>
                            )}
                        </div>
                        <h1 className="mt-3 max-w-4xl text-2xl font-extrabold leading-tight text-white sm:text-3xl lg:text-4xl">
                            {produk.name}
                        </h1>
                        {produk.maker && (
                            <p className="mt-3 text-sm text-indigo-200">
                                Dibuat oleh <span className="font-semibold text-white">{produk.maker}</span>
                            </p>
                        )}
                    </div>
                </div>
            </section>

            {/* ===== KONTEN PRODUK ===== */}
            <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
                <div className="grid gap-10 lg:grid-cols-5">
                    {/* Kolom Kiri: Galeri */}
                    <div className="lg:col-span-3">
                        <div className="overflow-hidden rounded-2xl">
                            <img
                                src={getImageUrl(gallery[0])}
                                onError={fallbackTo('Produk', 800, 600)}
                                alt={produk.name}
                                className="h-auto w-full object-cover"
                            />
                        </div>
                        {gallery.length > 1 && (
                            <div className="mt-4 grid grid-cols-4 gap-3">
                                {gallery.map((img, i) => (
                                    <div key={i} className="overflow-hidden rounded-xl border-2 border-gray-200 hover:border-[#1E2A5E] transition">
                                        <img
                                            src={getImageUrl(img)}
                                            onError={fallbackTo(`Gambar ${i + 1}`, 200, 150)}
                                            alt={`Gambar ${i + 1}`}
                                            className="h-20 w-full object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Kolom Kanan: Info Produk */}
                    <div className="lg:col-span-2">
                        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                            <h2 className="text-lg font-bold text-gray-900">Detail Produk</h2>
                            <div className="mt-4 space-y-4 text-sm">
                                {/* Status */}
                                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                                    <span className="text-gray-500">Status</span>
                                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${displayStatusColor}`}>
                                        {displayStatus}
                                    </span>
                                </div>

                                {/* Kategori */}
                                {produk.category && (
                                    <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                                        <span className="text-gray-500">Kategori</span>
                                        <span className="font-semibold text-gray-800">{produk.category}</span>
                                    </div>
                                )}

                                {/* Pembuat */}
                                {produk.maker && (
                                    <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                                        <span className="text-gray-500">Dibuat Oleh</span>
                                        <span className="font-semibold text-gray-800">{produk.maker}</span>
                                    </div>
                                )}

                                {/* Kompetensi Keahlian */}
                                {produk.kompetensi_keahlian && (
                                    <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                                        <span className="text-gray-500">Kompetensi Keahlian</span>
                                        <span className="font-semibold text-[#1E2A5E]">{produk.kompetensi_keahlian}</span>
                                    </div>
                                )}

                                {/* Harga */}
                                {produk.price && (
                                    <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                                        <span className="text-gray-500">Harga</span>
                                        <span className="text-lg font-extrabold text-[#1E2A5E]">
                                            Rp {Number(produk.price).toLocaleString('id-ID')}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Deskripsi */}
                            <div className="mt-6">
                                <h3 className="text-sm font-bold text-gray-900">Deskripsi</h3>
                                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                                    {produk.description || produk.short_description || ''}
                                </p>
                            </div>

                            {/* Tombol Kontak Pemesanan */}
                            <div className="mt-6 space-y-3">
                                {whatsapp && (
                                    <a
                                        href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(`Halo, saya tertarik dengan produk "${produk.name}". Apakah masih tersedia?`)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2 rounded-lg bg-green-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-600"
                                    >
                                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                        </svg>
                                        Hubungi via WhatsApp
                                    </a>
                                )}
                                <a
                                    href={`mailto:${email}?subject=${encodeURIComponent(`Pemesanan: ${produk.name}`)}&body=${encodeURIComponent(`Halo, saya tertarik dengan produk "${produk.name}".\n\nMohon informasi lebih lanjut.\n\nTerima kasih.`)}`}
                                    className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-6 py-3 text-sm font-semibold text-[#1E2A5E] transition hover:bg-gray-50"
                                >
                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                    </svg>
                                    Kirim Email
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Produk Lainnya */}
                {produkLain.length > 0 && (
                    <div className="mt-14 border-t border-gray-200 pt-10">
                        <h2 className="text-xl font-bold text-gray-900">Produk Lainnya</h2>
                        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {produkLain.map((item) => (
                                <Link
                                    key={item.id}
                                    href={`/produk/${item.id}`}
                                    className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md"
                                >
                                    <div className="h-40 overflow-hidden">
                                        <img
                                            src={getImageUrl(item.image)}
                                            onError={fallbackTo('Produk', 640, 400)}
                                            alt={item.name}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                    <div className="flex flex-1 flex-col p-4">
                                        <h3 className="text-sm font-bold leading-snug text-gray-900 group-hover:text-[#1E2A5E] line-clamp-2">
                                            {item.name}
                                        </h3>
                                        <div className="mt-2 flex items-center justify-between">
                                            <span className="text-xs text-gray-500">{item.maker || ''}</span>
                                            <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${statusColor[item.status] || 'bg-gray-100 text-gray-600'}`}>
                                                {statusLabel[item.status] || item.status || 'Tersedia'}
                                            </span>
                                        </div>
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
