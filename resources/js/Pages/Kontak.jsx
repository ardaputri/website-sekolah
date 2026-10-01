import PublicLayout from '@/Layouts/PublicLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';

/* Kartu info kontak (ikon + judul + isi) */
function InfoCard({ icon, title, children, className = '' }) {
    return (
        <div className={'rounded-2xl border border-gray-100 bg-white p-6 shadow-sm ' + className}>
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#1E2A5E]/10 text-[#1E2A5E]">
                {icon}
            </div>
            <h3 className="mt-4 font-bold text-gray-900">{title}</h3>
            <div className="mt-1 text-sm leading-relaxed text-gray-600">{children}</div>
        </div>
    );
}

/* Ikon bintang (filled / outline) */
function Star({ filled, className = 'h-5 w-5' }) {
    return (
        <svg
            className={className}
            fill={filled ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.563.563 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
            />
        </svg>
    );
}

/* Rating binterang tampil (readonly) */
function StarRating({ value, className = 'h-4 w-4' }) {
    return (
        <div className="flex items-center gap-0.5 text-amber-400">
            {[1, 2, 3, 4, 5].map((n) => (
                <Star key={n} filled={n <= value} className={className} />
            ))}
        </div>
    );
}

export default function Kontak({ reviews = [], reviewStats = null }) {
    const { settings, flash } = usePage().props;

    const siteName = settings?.site_name ?? 'SMKN 4 Bogor';
    const address = settings?.address ?? 'Jl. Raya Tajur, Bogor, Jawa Barat';
    const phone = settings?.phone ?? '(0251) 000000';
    const whatsapp = settings?.whatsapp;
    const email = settings?.email ?? 'info@smkn4bogor.sch.id';
    const workingHours = settings?.working_hours ?? 'Senin - Jumat, 07.00 - 16.00 WIB';

    /* Sumber peta: pakai maps_embed bila diisi, jika tidak bangun dari alamat */
    const mapSrc = settings?.maps_embed
        ? settings.maps_embed
        : `https://maps.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('kontak.store'), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    /* ===== Form Rating & Komentar ===== */
    const {
        data: reviewData,
        setData: setReviewData,
        post: postReview,
        processing: processingReview,
        errors: reviewErrors,
        reset: resetReview,
    } = useForm({
        name: '',
        email: '',
        rating: 0,
        comment: '',
    });

    const [hoverRating, setHoverRating] = useState(0);

    const submitReview = (e) => {
        e.preventDefault();
        postReview(route('kontak.review'), {
            preserveScroll: true,
            onSuccess: () => resetReview(),
        });
    };

    const stats = reviewStats ?? { average: 0, total: 0, distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 } };
    const displayRating = hoverRating || reviewData.rating;

    const field =
        'w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#1E2A5E] focus:ring-2 focus:ring-[#1E2A5E]/20';

    return (
        <PublicLayout>
            <Head title={`Kontak — ${siteName}`} />

            {/* ===== HERO ===== */}
            <section className="bg-[#1E2A5E]">
                <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                    <h1 className="text-2xl font-extrabold text-white sm:text-3xl">
                        Hubungi {siteName}
                    </h1>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-indigo-200">
                        Kami siap membantu Anda. Silakan hubungi kami melalui saluran informasi di
                        bawah ini atau kunjungi kampus kami secara langsung.
                    </p>
                </div>
            </section>

            {/* ===== KARTU INFO ===== */}
            <section className="mx-auto -mt-6 max-w-4xl px-4 sm:px-6 lg:px-8">
                <div className="grid gap-6 sm:grid-cols-2">
                    <InfoCard
                        title="Alamat"
                        icon={
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                            </svg>
                        }
                    >
                        {address}
                    </InfoCard>

                    <InfoCard
                        title="Telepon"
                        icon={
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                            </svg>
                        }
                    >
                        {phone}
                        {whatsapp && <div className="mt-0.5">WA: +{whatsapp}</div>}
                    </InfoCard>

                    <InfoCard
                        className="sm:mt-2"
                        title="Jam Kerja"
                        icon={
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        }
                    >
                        {workingHours}
                    </InfoCard>

                    <InfoCard
                        className="sm:mt-2"
                        title="Email"
                        icon={
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                            </svg>
                        }
                    >
                        <a href={`mailto:${email}`} className="hover:text-[#1E2A5E]">{email}</a>
                    </InfoCard>
                </div>
            </section>

            {/* ===== KIRIM PESAN + PETA ===== */}
            <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
                <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                    <div className="grid md:grid-cols-2">
                        {/* Form */}
                        <div className="p-6 md:p-8">
                            <h2 className="text-xl font-bold text-gray-900">Kirim Pesan</h2>

                            {flash?.success && (
                                <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                                    {flash.success}
                                </div>
                            )}

                            <form onSubmit={submit} className="mt-5 space-y-4">
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div>
                                        <label className="mb-1 block text-sm font-semibold text-gray-700">Nama Lengkap</label>
                                        <input
                                            type="text"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            placeholder="Masukkan nama Anda"
                                            className={field}
                                        />
                                        {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
                                    </div>
                                    <div>
                                        <label className="mb-1 block text-sm font-semibold text-gray-700">Alamat Email</label>
                                        <input
                                            type="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            placeholder="email@contoh.com"
                                            className={field}
                                        />
                                        {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm font-semibold text-gray-700">Subjek</label>
                                    <input
                                        type="text"
                                        value={data.subject}
                                        onChange={(e) => setData('subject', e.target.value)}
                                        placeholder="Apa perihal pesan Anda?"
                                        className={field}
                                    />
                                    {errors.subject && <p className="mt-1 text-xs text-red-600">{errors.subject}</p>}
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm font-semibold text-gray-700">Pesan</label>
                                    <textarea
                                        rows={5}
                                        value={data.message}
                                        onChange={(e) => setData('message', e.target.value)}
                                        placeholder="Tuliskan pesan Anda di sini…"
                                        className={field + ' resize-none'}
                                    />
                                    {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message}</p>}
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full rounded-lg bg-[#1E2A5E] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#18224d] disabled:opacity-60"
                                >
                                    {processing ? 'Mengirim…' : 'Kirim Pesan'}
                                </button>
                            </form>
                        </div>

                        {/* Peta */}
                        <div className="min-h-[320px] bg-gray-100">
                            <iframe
                                title={`Lokasi ${siteName}`}
                                src={mapSrc}
                                className="h-full min-h-[320px] w-full border-0"
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                allowFullScreen
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== RATING & KOMENTAR ===== */}
            <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
                <div className="mb-8 text-center">
                    <span className="inline-block rounded-full bg-amber-100 px-4 py-1 text-xs font-bold uppercase tracking-wider text-amber-700">
                        Rating & Ulasan
                    </span>
                    <h2 className="mt-3 text-2xl font-extrabold text-gray-900 sm:text-3xl">
                        Apa Kata Mereka?
                    </h2>
                    <p className="mt-2 text-sm text-gray-500">
                        Berikan penilaian dan ulasan Anda tentang {siteName}.
                    </p>
                </div>

                <div className="grid gap-8 lg:grid-cols-3">
                    {/* ===== Ringkasan Rating ===== */}
                    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                        <div className="text-center">
                            <div className="text-5xl font-extrabold text-gray-900">{stats.average}</div>
                            <div className="mt-2 flex justify-center">
                                <StarRating value={Math.round(stats.average)} className="h-6 w-6" />
                            </div>
                            <p className="mt-2 text-sm text-gray-500">{stats.total} ulasan</p>
                        </div>

                        {/* Distribusi bintang */}
                        <div className="mt-6 space-y-2">
                            {[5, 4, 3, 2, 1].map((n) => {
                                const count = stats.distribution?.[n] ?? 0;
                                const pct = stats.total > 0 ? Math.round((count / stats.total) * 100) : 0;
                                return (
                                    <div key={n} className="flex items-center gap-2 text-xs">
                                        <span className="w-3 text-gray-500">{n}</span>
                                        <Star filled className="h-3.5 w-3.5 text-amber-400" />
                                        <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-100">
                                            <div
                                                className="h-full rounded-full bg-amber-400 transition-all"
                                                style={{ width: `${pct}%` }}
                                            />
                                        </div>
                                        <span className="w-6 text-right text-gray-400">{count}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* ===== Form Beri Rating ===== */}
                    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-2">
                        <h3 className="text-lg font-bold text-gray-900">Beri Penilaian</h3>

                        {flash?.reviewSuccess && (
                            <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                                {flash.reviewSuccess}
                            </div>
                        )}

                        <form onSubmit={submitReview} className="mt-4 space-y-4">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="mb-1 block text-sm font-semibold text-gray-700">Nama Anda</label>
                                    <input
                                        type="text"
                                        value={reviewData.name}
                                        onChange={(e) => setReviewData('name', e.target.value)}
                                        placeholder="Masukkan nama Anda"
                                        className={field}
                                    />
                                    {reviewErrors.name && <p className="mt-1 text-xs text-red-600">{reviewErrors.name}</p>}
                                </div>
                                <div>
                                    <label className="mb-1 block text-sm font-semibold text-gray-700">
                                        Email <span className="font-normal text-gray-400">(opsional)</span>
                                    </label>
                                    <input
                                        type="email"
                                        value={reviewData.email}
                                        onChange={(e) => setReviewData('email', e.target.value)}
                                        placeholder="email@contoh.com"
                                        className={field}
                                    />
                                    {reviewErrors.email && <p className="mt-1 text-xs text-red-600">{reviewErrors.email}</p>}
                                </div>
                            </div>

                            {/* Star picker */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">Rating</label>
                                <div className="flex items-center gap-1" onMouseLeave={() => setHoverRating(0)}>
                                    {[1, 2, 3, 4, 5].map((n) => (
                                        <button
                                            key={n}
                                            type="button"
                                            onClick={() => setReviewData('rating', n)}
                                            onMouseEnter={() => setHoverRating(n)}
                                            className={`transition-transform hover:scale-110 ${
                                                n <= displayRating ? 'text-amber-400' : 'text-gray-300'
                                            }`}
                                            aria-label={`Beri rating ${n} bintang`}
                                        >
                                            <Star filled={n <= displayRating} className="h-8 w-8" />
                                        </button>
                                    ))}
                                    {displayRating > 0 && (
                                        <span className="ml-2 text-sm font-medium text-gray-600">
                                            {displayRating}/5
                                        </span>
                                    )}
                                </div>
                                {reviewErrors.rating && <p className="mt-1 text-xs text-red-600">{reviewErrors.rating}</p>}
                            </div>

                            {/* Komentar */}
                            <div>
                                <label className="mb-1 block text-sm font-semibold text-gray-700">Komentar / Ulasan</label>
                                <textarea
                                    rows={4}
                                    value={reviewData.comment}
                                    onChange={(e) => setReviewData('comment', e.target.value)}
                                    placeholder="Tuliskan pengalaman atau pendapat Anda di sini…"
                                    className={field + ' resize-none'}
                                />
                                {reviewErrors.comment && <p className="mt-1 text-xs text-red-600">{reviewErrors.comment}</p>}
                            </div>

                            <button
                                type="submit"
                                disabled={processingReview}
                                className="w-full rounded-lg bg-[#1E2A5E] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#18224d] disabled:opacity-60 sm:w-auto"
                            >
                                {processingReview ? 'Mengirim…' : 'Kirim Ulasan'}
                            </button>
                        </form>
                    </div>
                </div>

                {/* ===== Daftar Komentar ===== */}
                {reviews.length > 0 && (
                    <div className="mt-10">
                        <h3 className="mb-4 text-lg font-bold text-gray-900">
                            Ulasan Terbaru ({reviews.length})
                        </h3>
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {reviews.map((review) => (
                                <div
                                    key={review.id}
                                    className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
                                >
                                    <div className="flex items-center gap-3">
                                        {/* Avatar inisial */}
                                        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#1E2A5E] text-sm font-bold text-white">
                                            {review.name?.charAt(0)?.toUpperCase() || '?'}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-bold text-gray-900">{review.name}</p>
                                            <p className="text-xs text-gray-400">{review.created_at}</p>
                                        </div>
                                    </div>
                                    <div className="mt-3">
                                        <StarRating value={review.rating} />
                                    </div>
                                    <p className="mt-2 text-sm leading-relaxed text-gray-600">{review.comment}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {reviews.length === 0 && (
                    <div className="mt-10 rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-10 text-center">
                        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-amber-100 text-amber-500">
                            <Star filled className="h-7 w-7" />
                        </div>
                        <p className="mt-4 text-sm font-semibold text-gray-700">Belum ada ulasan</p>
                        <p className="mt-1 text-sm text-gray-500">
                            Jadilah yang pertama memberikan penilaian dan komentar!
                        </p>
                    </div>
                )}
            </section>
        </PublicLayout>
    );
}
