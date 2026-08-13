import AdminLayout from '@/Layouts/AdminLayout';
import { can } from '@/lib/nav';
import { Head, usePage } from '@inertiajs/react';

/**
 * Dashboard admin (versi Fase 0).
 * Kartu statistik & aktivitas terbaru menyusul di Fase 2.
 * Sementara menampilkan sapaan + akses cepat sesuai permission.
 */
export default function Dashboard() {
    const { auth, settings } = usePage().props;
    const user = auth.user;
    const siteName = settings?.site_name ?? 'sekolah';

    // Akses cepat: hanya tampil jika user punya izin terkait.
    const quickLinks = [
        { label: 'Kelola Berita', perm: 'news.manage', desc: 'Tulis & publikasikan berita.' },
        { label: 'Akademik', perm: 'academic.manage', desc: 'Kompetensi keahlian & guru.' },
        { label: 'Kesiswaan', perm: 'kesiswaan.manage', desc: 'Ekstrakurikuler & prestasi.' },
        { label: 'Produk', perm: 'product.manage', desc: 'Produk unggulan sekolah.' },
        { label: 'Pesan Masuk', perm: 'message.manage', desc: 'Pesan dari pengunjung.' },
        { label: 'Pengaturan', perm: 'settings.manage', desc: 'Identitas & kontak situs.' },
        { label: 'Pengguna', perm: 'user.manage', desc: 'Akun admin & hak akses.' },
    ].filter((l) => can(user, l.perm));

    return (
        <AdminLayout header="Dashboard">
            <Head title="Dashboard" />

            <div className="mb-6 rounded-xl bg-white p-6 shadow-sm">
                <h1 className="text-2xl font-bold text-gray-900">
                    Halo, {user?.name} 👋
                </h1>
                <p className="mt-1 text-gray-500">
                    Selamat datang di panel admin {siteName}. Gunakan menu di
                    samping untuk mengelola konten website.
                </p>
            </div>

            {quickLinks.length > 0 && (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {quickLinks.map((l) => (
                        <div
                            key={l.label}
                            className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
                        >
                            <h3 className="font-semibold text-gray-900">{l.label}</h3>
                            <p className="mt-1 text-sm text-gray-500">{l.desc}</p>
                            <span className="mt-3 inline-block rounded bg-gray-100 px-2 py-0.5 text-[10px] font-semibold uppercase text-gray-400">
                                Segera
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </AdminLayout>
    );
}
