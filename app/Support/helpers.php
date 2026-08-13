<?php

use App\Models\SiteSetting;
use Illuminate\Support\Facades\Cache;

if (! function_exists('settings')) {
    /**
     * Ambil seluruh pengaturan situs sebagai array key => value (di-cache).
     *
     * @return array<string, mixed>
     */
    function settings(): array
    {
        return Cache::rememberForever('site_settings', function () {
            return SiteSetting::pluck('value', 'key')->toArray();
        });
    }
}

if (! function_exists('setting')) {
    /**
     * Ambil satu nilai pengaturan situs berdasarkan key.
     */
    function setting(string $key, mixed $default = null): mixed
    {
        return settings()[$key] ?? $default;
    }
}

if (! function_exists('forget_settings_cache')) {
    /**
     * Hapus cache pengaturan situs (panggil setelah update settings).
     */
    function forget_settings_cache(): void
    {
        Cache::forget('site_settings');
    }
}
