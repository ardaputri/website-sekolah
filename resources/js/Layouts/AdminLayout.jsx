import Dropdown from '@/Components/Dropdown';
import { can, hasRoute } from '@/lib/nav';
import { Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

/**
 * Layout panel admin: sidebar (permission-aware) + topbar + area konten.
 * Menu yang route-nya belum ada ditampilkan sebagai "Segera" (dibangun bertahap).
 */
export default function AdminLayout({ header, children }) {
    const { auth, flash } = usePage().props;
    const user = auth.user;
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showFlash, setShowFlash] = useState(true);

    useEffect(() => setShowFlash(true), [flash?.success, flash?.error]);

    // Definisi menu
    const menu = [
        { label: 'Dashboard', route: 'admin.dashboard', url: '/admin/dashboard', perm: null, icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
        { label: 'Berita', route: 'admin.news.index', url: '/admin/news', perm: null, icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z' },
        { label: 'Akademik', route: 'admin.academic-programs.index', url: '/admin/academic-programs', perm: 'academic.manage', icon: 'M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z' },
        { label: 'Kesiswaan', route: 'admin.extracurriculars.index', url: '/admin/extracurriculars', perm: 'kesiswaan.manage', icon: 'M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 100-8 4 4 0 000 8z' },
        { label: 'Produk', route: 'admin.products.index', url: '/admin/products', perm: 'product.manage', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
        { label: 'Beranda', route: 'admin.banners.index', url: '/admin/banners', perm: 'homepage.manage', icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z' },
        { label: 'Pesan Masuk', route: 'admin.messages.index', url: '/admin/messages', perm: 'message.manage', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
        { label: 'Pengaturan', route: 'admin.settings.edit', url: '/admin/settings', perm: 'settings.manage', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
        { label: 'Pengguna', route: 'admin.users.index', url: '/admin/users', perm: 'user.manage', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
    ];

    // Filter menu berdasarkan permission
    const visibleMenu = menu.filter((m) => m.perm === null || can(user, m.perm));

    const NavItem = ({ item }) => {
        // PERBAIKAN: Gunakan url langsung sebagai default jika route ziggy belum terbaca
        let targetHref = item.url;
        try {
            if (typeof route === 'function' && hasRoute(item.route)) {
                targetHref = route(item.route);
            }
        } catch (e) {
            targetHref = item.url;
        }

        // Pengecekan status aktif berdasarkan path URL browser saat ini
        const active = window.location.pathname.startsWith(item.url);

        const classes = 'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ';

        return (
            <Link
                href={targetHref}
                preserveState={false}
                className={
                    classes +
                    (active
                        ? 'bg-indigo-600 text-white'
                        : 'text-gray-300 hover:bg-gray-800 hover:text-white')
                }
            >
                <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                </svg>
                <span className="flex-1">{item.label}</span>
            </Link>
        );
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* ===== Sidebar ===== */}
            <aside
                className={
                    'fixed inset-y-0 left-0 z-50 flex w-64 transform flex-col bg-gray-900 transition-transform lg:translate-x-0 ' +
                    (sidebarOpen ? 'translate-x-0' : '-translate-x-full')
                }
            >
                <div className="flex h-16 items-center gap-2 border-b border-gray-800 px-6">
                    <span className="grid h-8 w-8 place-items-center rounded-lg bg-indigo-600 font-bold text-white">
                        A
                    </span>
                    <span className="font-semibold text-white">Panel Admin</span>
                </div>
                <nav className="flex-1 space-y-1 overflow-y-auto p-4">
                    {visibleMenu.map((item) => (
                        <NavItem key={item.label} item={item} />
                    ))}
                </nav>

                {/* Tombol Keluar (logout) */}
                <div className="border-t border-gray-800 p-4">
                    <Link
                        href={typeof route === 'function' && hasRoute('logout') ? route('logout') : '/logout'}
                        method="post"
                        as="button"
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-300 transition hover:bg-red-600 hover:text-white"
                    >
                        <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span className="flex-1 text-left">Keluar</span>
                    </Link>
                </div>
            </aside>

            {/* Overlay mobile */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* ===== Konten utama ===== */}
            <div className="lg:pl-64">
                {/* Topbar */}
                <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 sm:px-6">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="rounded-md p-2 text-gray-500 hover:bg-gray-100 lg:hidden"
                            aria-label="Buka menu"
                        >
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        <div className="text-lg font-semibold text-gray-800">
                            {header ?? 'Dashboard'}
                        </div>
                    </div>

                    <Dropdown>
                        <Dropdown.Trigger>
                            <button className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900">
                                <span className="grid h-8 w-8 place-items-center rounded-full bg-indigo-100 font-semibold text-indigo-700">
                                    {user?.name?.charAt(0) ?? 'U'}
                                </span>
                                <span className="hidden sm:block">{user?.name}</span>
                            </button>
                        </Dropdown.Trigger>
                        <Dropdown.Content>
                            <div className="border-b border-gray-100 px-4 py-2">
                                <div className="text-sm font-medium text-gray-900">{user?.name}</div>
                                <div className="text-xs text-gray-500">{user?.roles?.join(', ')}</div>
                            </div>
                            <Dropdown.Link href={typeof route === 'function' && hasRoute('profile.edit') ? route('profile.edit') : '/profile'}>Profil</Dropdown.Link>
                            <Dropdown.Link href={typeof route === 'function' && hasRoute('logout') ? route('logout') : '/logout'} method="post" as="button">
                                Keluar
                            </Dropdown.Link>
                        </Dropdown.Content>
                    </Dropdown>
                </header>

                {/* Flash messages */}
                {showFlash && (flash?.success || flash?.error) && (
                    <div className="px-4 pt-4 sm:px-6">
                        <div
                            className={
                                'flex items-center justify-between rounded-lg px-4 py-3 text-sm ' +
                                (flash.success
                                    ? 'bg-green-50 text-green-800'
                                    : 'bg-red-50 text-red-800')
                            }
                        >
                            <span>{flash.success ?? flash.error}</span>
                            <button onClick={() => setShowFlash(false)} className="ml-4 font-medium">
                                &times;
                            </button>
                        </div>
                    </div>
                )}

                <main className="p-4 sm:p-6">{children}</main>
            </div>
        </div>
    );
}