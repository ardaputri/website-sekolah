import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { hasRoute, to } from '@/lib/nav';

/**
 * Layout untuk semua halaman publik: Navbar + konten + Footer.
 * Menu otomatis menautkan ke route yang sudah ada.
 */
export default function PublicLayout({ children }) {
    const { settings, auth } = usePage().props;
    const [open, setOpen] = useState(false);

    const siteName = settings?.site_name ?? 'Website Sekolah';
    const user = auth?.user ?? null;
    const dashboardHref = to('admin.dashboard') ?? '/admin';

    // Menu publik
    const menu = [
        { label: 'Beranda', route: 'home' },
        { label: 'Profil', route: 'profil' },
        { label: 'Akademik', route: 'akademik.index' },
        { label: 'Kesiswaan', route: 'kesiswaan.index' },
        { label: 'Berita', route: 'berita.index' },
        { label: 'Produk', route: 'produk.index' },
        { label: 'Kontak', route: 'kontak.index' },
    ];

    const linkFor = (item) => to(item.route) ?? '#';
    const isActive = (item) =>
        hasRoute(item.route) && route().current(item.route);

    return (
        <div className="min-h-screen bg-white">
            {/* ===== Navbar ===== */}
            <header className="border-b border-gray-100 bg-white">
                <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">

                    {/* Logo + Nama Sekolah */}
                    <Link
                        href={to('home') ?? '/'}
                        className="flex items-center gap-2"
                    >
                        <img
                            src="/images/logo-smkn4.png"
                            alt="Logo SMKN 4 Bogor"
                            className="h-10 w-10 object-contain"
                        />

                        <span className="font-bold text-gray-900">
                            {siteName}
                        </span>
                    </Link>

                    {/* Desktop menu */}
                    <div className="hidden items-center gap-1 lg:flex">
                        {menu.map((item) => (
                            <Link
                                key={item.label}
                                href={linkFor(item)}
                                className={
                                    'rounded-md px-3 py-2 text-sm font-medium transition ' +
                                    (isActive(item)
                                        ? 'bg-indigo-50 text-indigo-700'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900')
                                }
                            >
                                {item.label}
                            </Link>
                        ))}

                        {user && (
                            <Link
                                href={dashboardHref}
                                className="ml-2 rounded-lg bg-[#1E2A5E] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#18224d]"
                            >
                                Dashboard
                            </Link>
                        )}
                    </div>

                    {/* Mobile toggle */}
                    <button
                        onClick={() => setOpen((v) => !v)}
                        className="rounded-md p-2 text-gray-500 hover:bg-gray-100 lg:hidden"
                        aria-label="Buka menu"
                    >
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d={
                                    open
                                        ? 'M6 18L18 6M6 6l12 12'
                                        : 'M4 6h16M4 12h16M4 18h16'
                                }
                            />
                        </svg>
                    </button>
                </nav>

                {/* Mobile menu */}
                {open && (
                    <div className="border-t border-gray-100 bg-white lg:hidden">
                        <div className="space-y-1 px-4 py-3">
                            {menu.map((item) => (
                                <Link
                                    key={item.label}
                                    href={linkFor(item)}
                                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                >
                                    {item.label}
                                </Link>
                            ))}

                            {user && (
                                <Link
                                    href={dashboardHref}
                                    className="block rounded-lg bg-[#1E2A5E] px-3 py-2 text-center text-base font-semibold text-white"
                                >
                                    Dashboard
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </header>

            {/* ===== Konten ===== */}
            <main className="flex-1">{children}</main>

            {/* ===== Footer ===== */}
            <footer className="mt-16 border-t border-gray-200 bg-gray-50">
                <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">

                    <div>
                        <h3 className="text-lg font-bold text-gray-900">
                            {siteName}
                        </h3>

                        {settings?.site_tagline && (
                            <p className="mt-2 text-sm text-gray-600">
                                {settings.site_tagline}
                            </p>
                        )}

                        {settings?.accreditation && (
                            <span className="mt-3 inline-block rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700">
                                {settings.accreditation}
                            </span>
                        )}
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                            Kontak
                        </h4>

                        <ul className="mt-3 space-y-2 text-sm text-gray-600">
                            {settings?.address && (
                                <li>{settings.address}</li>
                            )}

                            {settings?.phone && (
                                <li>Telp: {settings.phone}</li>
                            )}

                            {settings?.email && (
                                <li>Email: {settings.email}</li>
                            )}

                            {settings?.working_hours && (
                                <li>{settings.working_hours}</li>
                            )}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                            Ikuti Kami
                        </h4>

                        <ul className="mt-3 space-y-2 text-sm text-gray-600">
                            {settings?.social_instagram && (
                                <li>
                                    <a
                                        className="hover:text-indigo-600"
                                        href={settings.social_instagram}
                                    >
                                        Instagram
                                    </a>
                                </li>
                            )}

                            {settings?.social_facebook && (
                                <li>
                                    <a
                                        className="hover:text-indigo-600"
                                        href={settings.social_facebook}
                                    >
                                        Facebook
                                    </a>
                                </li>
                            )}

                            {settings?.social_youtube && (
                                <li>
                                    <a
                                        className="hover:text-indigo-600"
                                        href={settings.social_youtube}
                                    >
                                        YouTube
                                    </a>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-200 py-4 text-center text-sm text-gray-500">
                    &copy; {new Date().getFullYear()} {siteName}. Hak cipta dilindungi.
                </div>
            </footer>
        </div>
    );
}