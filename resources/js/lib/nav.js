/**
 * Helper navigasi & otorisasi untuk sisi React.
 */

/**
 * Cek apakah sebuah named route sudah terdaftar (via Ziggy).
 * Berguna agar menu bisa dibuat lebih dulu, dan otomatis aktif
 * begitu route fiturnya ditambahkan pada fase berikutnya.
 */
export function hasRoute(name) {
    try {
        return typeof route !== 'undefined' && route().has(name);
    } catch {
        return false;
    }
}

/**
 * Kembalikan URL named route bila ada, selain itu null.
 */
export function to(name, params = undefined) {
    return hasRoute(name) ? route(name, params) : null;
}

/**
 * Cek permission user (dari shared props auth.user.permissions).
 */
export function can(user, permission) {
    if (!user?.permissions) return false;
    return user.permissions.includes(permission);
}
