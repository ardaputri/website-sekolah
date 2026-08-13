import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import { to } from '@/lib/nav';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';

/* ── Ikon-ikon kecil ───────────────────────────── */
const UserIcon = (p) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a7.5 7.5 0 0115 0"
        />
    </svg>
);

const LockIcon = (p) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75M6 10.5h12a1.5 1.5 0 011.5 1.5v6A1.5 1.5 0 0118 19.5H6A1.5 1.5 0 014.5 18v-6A1.5 1.5 0 016 10.5z"
        />
    </svg>
);

const EyeIcon = (p) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
        />
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
    </svg>
);

const EyeOffIcon = (p) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.243 4.243L9.88 9.88"
        />
    </svg>
);

const GoogleIcon = (p) => (
    <svg {...p} viewBox="0 0 24 24">
        <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        />
        <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        />
        <path
            fill="#FBBC05"
            d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18A10.98 10.98 0 001 12c0 1.77.43 3.45 1.18 4.94l3.66-2.84z"
        />
        <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38z"
        />
    </svg>
);

const BookIcon = (p) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
        />
    </svg>
);

export default function Login({ status, canResetPassword }) {
    const { settings } = usePage().props;

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const [view, setView] = useState('form');
    const [showPassword, setShowPassword] = useState(false);
    const [googleNotice, setGoogleNotice] = useState(false);

    const siteName = settings?.site_name ?? 'SMKN 4 Bogor';
    const portalName = settings?.portal_subtitle ?? 'Sistem Informasi Akademik';
    const heroTitle = settings?.login_heading ?? 'Membangun Masa Depan Gemilang';

    const heroText =
        settings?.login_subtitle ??
        `Selamat datang di Portal Akademik Terpadu ${siteName}. Sistem informasi pendidikan berbasis integritas dan inovasi teknologi.`;

    const emailDomain =
        settings?.email?.split('@')[1] ?? 'smkn4bogor.sch.id';

    const demoAccounts = [
        {
            name: 'Operator Sekolah',
            email: `operator@${emailDomain}`,
        },
        {
            name: 'Admin Akademik',
            email: `akademik@${emailDomain}`,
        },
        {
            name: 'Tata Usaha',
            email: `tatausaha@${emailDomain}`,
        },
    ];

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    const footerLinks = [
        { label: 'Bantuan', href: '#' },
        { label: 'Panduan', href: '#' },
        { label: 'Pengguna', href: '#' },
        { label: 'Kontak Kami', href: to('kontak.index') ?? '#' },
    ];

    return (
        <>
            <Head title={`Masuk — ${siteName}`} />

            <div className="flex min-h-screen bg-[#FAF5EC]">

                {/* =====================================================
                    PANEL KIRI
                ====================================================== */}
                <div className="relative hidden w-1/2 overflow-hidden lg:block">

                    {/* GAMBAR BACKGROUND */}
                    <img
                        src="/images/login-bg.jpg"
                        alt={siteName}
                        className="absolute inset-0 h-full w-full object-cover"
                    />

                    {/* OVERLAY BIRU */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#1E2A5E]/70 via-[#26327C]/50 to-[#3A49A0]/60" />

                    {/* DEKORASI */}
                    <div className="absolute -left-16 -top-16 h-72 w-72 rounded-full bg-white/5" />

                    <div className="absolute bottom-10 right-10 h-40 w-40 rounded-full bg-white/5" />

                    {/* TEKS */}
                    <div className="relative flex h-full flex-col justify-center px-12 xl:px-16">

                        <h1 className="max-w-md text-4xl font-extrabold leading-tight text-white xl:text-5xl">
                            {heroTitle}
                        </h1>

                        <p className="mt-6 max-w-md text-base leading-relaxed text-indigo-100/90">
                            {heroText}
                        </p>

                    </div>
                </div>

                {/* =====================================================
                    PANEL KANAN
                ====================================================== */}
                <div className="flex w-full items-center justify-center px-6 py-10 lg:w-1/2">

                    <div className="w-full max-w-md">

                        {/* HEADER BRAND */}
                        <div className="flex items-center gap-3">

                            <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#1E2A5E] text-white">

                                {settings?.logo ? (
                                    <img
                                        src={`/storage/${settings.logo}`}
                                        alt=""
                                        className="h-7 w-7 object-contain"
                                    />
                                ) : (
                                    <BookIcon className="h-6 w-6" />
                                )}

                            </span>

                            <div>

                                <div className="text-xl font-extrabold leading-none text-[#1E2A5E]">
                                    {siteName}
                                </div>

                                <div className="mt-1 text-xs font-medium uppercase tracking-wide text-gray-500">
                                    {portalName}
                                </div>

                            </div>
                        </div>

                        {/* =====================================================
                            FORM LOGIN
                        ====================================================== */}
                        {view === 'form' && (
                            <div className="mt-8">

                                <h2 className="text-2xl font-bold text-gray-900">
                                    Portal Login
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    Masukkan kredensial Anda untuk mengakses.
                                </p>

                                {status && (
                                    <div className="mt-4 rounded-lg bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                                        {status}
                                    </div>
                                )}

                                <form
                                    onSubmit={submit}
                                    className="mt-6 space-y-5"
                                >

                                    {/* EMAIL */}
                                    <div>

                                        <label
                                            htmlFor="email"
                                            className="mb-1.5 block text-sm font-medium text-gray-700"
                                        >
                                            Email
                                        </label>

                                        <div className="relative">

                                            <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                                            <input
                                                id="email"
                                                type="email"
                                                name="email"
                                                value={data.email}
                                                autoComplete="username"
                                                autoFocus
                                                placeholder={`nama@${emailDomain}`}
                                                onChange={(e) =>
                                                    setData(
                                                        'email',
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-3 text-sm text-gray-900 shadow-sm outline-none transition focus:border-[#1E2A5E] focus:ring-2 focus:ring-[#1E2A5E]/20"
                                            />

                                        </div>

                                        <InputError
                                            message={errors.email}
                                            className="mt-1.5"
                                        />

                                    </div>

                                    {/* PASSWORD */}
                                    <div>

                                        <div className="mb-1.5 flex items-center justify-between">

                                            <label
                                                htmlFor="password"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Password
                                            </label>

                                            {canResetPassword && (
                                                <Link
                                                    href={route(
                                                        'password.request'
                                                    )}
                                                    className="text-xs font-medium text-[#1E2A5E] hover:underline"
                                                >
                                                    Lupa password?
                                                </Link>
                                            )}

                                        </div>

                                        <div className="relative">

                                            <LockIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                                            <input
                                                id="password"
                                                type={
                                                    showPassword
                                                        ? 'text'
                                                        : 'password'
                                                }
                                                name="password"
                                                value={data.password}
                                                autoComplete="current-password"
                                                placeholder="••••••••"
                                                onChange={(e) =>
                                                    setData(
                                                        'password',
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-10 text-sm text-gray-900 shadow-sm outline-none transition focus:border-[#1E2A5E] focus:ring-2 focus:ring-[#1E2A5E]/20"
                                            />

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setShowPassword(
                                                        (v) => !v
                                                    )
                                                }
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                                aria-label={
                                                    showPassword
                                                        ? 'Sembunyikan password'
                                                        : 'Tampilkan password'
                                                }
                                            >
                                                {showPassword ? (
                                                    <EyeOffIcon className="h-5 w-5" />
                                                ) : (
                                                    <EyeIcon className="h-5 w-5" />
                                                )}
                                            </button>

                                        </div>

                                        <InputError
                                            message={errors.password}
                                            className="mt-1.5"
                                        />

                                    </div>

                                    {/* REMEMBER ME */}
                                    <label className="flex cursor-pointer items-center gap-2">

                                        <Checkbox
                                            name="remember"
                                            checked={data.remember}
                                            onChange={(e) =>
                                                setData(
                                                    'remember',
                                                    e.target.checked
                                                )
                                            }
                                        />

                                        <span className="text-sm text-gray-600">
                                            Ingat saya di perangkat ini
                                        </span>

                                    </label>

                                    {/* BUTTON LOGIN */}
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full rounded-lg bg-[#1E2A5E] py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#18224d] focus:outline-none focus:ring-2 focus:ring-[#1E2A5E]/40 disabled:opacity-60"
                                    >
                                        {processing
                                            ? 'Memproses…'
                                            : 'Masuk ke Dashboard'}
                                    </button>

                                </form>

                                <Divider />

                                {/* GOOGLE LOGIN */}
                                <button
                                    type="button"
                                    onClick={() => {
                                        setGoogleNotice(false);
                                        setView('google');
                                    }}
                                    className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white py-3 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50"
                                >
                                    <GoogleIcon className="h-5 w-5" />

                                    Login with Google Education
                                </button>

                            </div>
                        )}

                        {/* =====================================================
                            PILIH AKUN GOOGLE
                        ====================================================== */}
                        {view === 'google' && (
                            <div className="mt-8">

                                <h2 className="text-2xl font-bold text-gray-900">
                                    Pilih Akun Google
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    Pilih akun Google Education untuk melanjutkan.
                                </p>

                                <div className="mt-6 divide-y divide-gray-100 overflow-hidden rounded-xl border border-gray-200 bg-white">

                                    {demoAccounts.map((acc) => (
                                        <button
                                            key={acc.email}
                                            type="button"
                                            onClick={() =>
                                                setGoogleNotice(true)
                                            }
                                            className="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-gray-50"
                                        >

                                            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#1E2A5E]/10 text-sm font-semibold text-[#1E2A5E]">
                                                {acc.name.charAt(0)}
                                            </span>

                                            <span className="min-w-0">

                                                <span className="block truncate text-sm font-medium text-gray-900">
                                                    {acc.name}
                                                </span>

                                                <span className="block truncate text-xs text-gray-500">
                                                    {acc.email}
                                                </span>

                                            </span>

                                        </button>
                                    ))}

                                </div>

                                {googleNotice && (
                                    <div className="mt-4 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800">
                                        Login Google Education belum diaktifkan.
                                        Silakan masuk dengan email &amp; password,
                                        atau hubungi operator sekolah.
                                    </div>
                                )}

                                <p className="mt-4 text-xs leading-relaxed text-gray-400">
                                    *Hanya akun Google Education milik {siteName}
                                    yang terdaftar sebagai operator yang dapat
                                    melanjutkan.
                                </p>

                                <Divider />

                                <button
                                    type="button"
                                    onClick={() => setView('form')}
                                    className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white py-3 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50"
                                >
                                    ← Kembali ke Portal Login
                                </button>

                            </div>
                        )}

                        {/* =====================================================
                            FOOTER
                        ====================================================== */}
                        <div className="mt-10 text-center">

                            <p className="text-sm text-gray-500">
                                Belum memiliki akun?{' '}

                                <a
                                    href={to('kontak.index') ?? '#'}
                                    className="font-medium text-[#1E2A5E] hover:underline"
                                >
                                    Hubungi Operator Sekolah
                                </a>
                            </p>

                            <div className="mt-3 flex items-center justify-center gap-4 text-xs text-gray-400">

                                {footerLinks.map((l, i) => (
                                    <span
                                        key={l.label}
                                        className="flex items-center gap-4"
                                    >

                                        {i > 0 && (
                                            <span className="text-gray-300">
                                                |
                                            </span>
                                        )}

                                        <a
                                            href={l.href}
                                            className="hover:text-[#1E2A5E]"
                                        >
                                            {l.label}
                                        </a>

                                    </span>
                                ))}

                            </div>

                        </div>

                    </div>
                </div>

            </div>
        </>
    );
}

/* ── Pembatas "ATAU MASUK DENGAN" ───────────────────────────── */
function Divider() {
    return (
        <div className="my-6 flex items-center gap-3">

            <span className="h-px flex-1 bg-gray-200" />

            <span className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                Atau masuk dengan
            </span>

            <span className="h-px flex-1 bg-gray-200" />

        </div>
    );
}