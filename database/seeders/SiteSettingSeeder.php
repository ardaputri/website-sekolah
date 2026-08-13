<?php

namespace Database\Seeders;

use App\Models\SiteSetting;
use Illuminate\Database\Seeder;

class SiteSettingSeeder extends Seeder
{
    /**
     * Nilai awal pengaturan situs (PRD §6.5 Kontak & §6.1 Beranda).
     * Format: key => [value, group, type]
     */
    public const SETTINGS = [
        // Branding
        'site_name'        => ['SMKN 4 Bogor', 'branding', 'text'],
        'site_tagline'     => ['Unggul dalam Prestasi, Berkarakter, dan Kompeten', 'branding', 'text'],
        'logo'             => [null, 'branding', 'image'],
        'accreditation'    => ['Terakreditasi A', 'branding', 'text'],

        // Kontak
        'address'          => ['Jl. Raya Tajur, Bogor, Jawa Barat', 'contact', 'textarea'],
        'phone'            => ['(0251) 000000', 'contact', 'text'],
        'whatsapp'         => ['6280000000000', 'contact', 'text'],
        'email'            => ['info@smkn4bogor.sch.id', 'contact', 'text'],
        'working_hours'    => ['Senin - Jumat, 07.00 - 16.00 WIB', 'contact', 'textarea'],
        'maps_embed'       => [null, 'contact', 'textarea'],

        // Media sosial
        'social_instagram' => [null, 'social', 'text'],
        'social_facebook'  => [null, 'social', 'text'],
        'social_youtube'   => [null, 'social', 'text'],

        // Beranda (statistik)
        'stat_students'    => ['1200', 'homepage', 'text'],
        'stat_teachers'    => ['85', 'homepage', 'text'],
        'stat_achievements'=> ['150', 'homepage', 'text'],
        'stat_founded'     => ['1990', 'homepage', 'text'],

        // SEO global
        'seo_title'        => ['SMKN 4 Bogor - Website Resmi', 'seo', 'text'],
        'seo_description'  => ['Website resmi SMKN 4 Bogor: profil, akademik, kesiswaan, berita, dan produk.', 'seo', 'textarea'],
    ];

    public function run(): void
    {
        foreach (self::SETTINGS as $key => [$value, $group, $type]) {
            SiteSetting::firstOrCreate(
                ['key' => $key],
                ['value' => $value, 'group' => $group, 'type' => $type]
            );
        }
    }
}
