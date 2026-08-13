import PublicLayout from '@/Layouts/PublicLayout';
import { Head, useForm, usePage } from '@inertiajs/react';

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

export default function Kontak() {
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
        </PublicLayout>
    );
}
