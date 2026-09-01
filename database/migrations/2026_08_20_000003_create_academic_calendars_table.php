<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('academic_calendars', function (Blueprint $table) {
            $table->id();
            $table->string('title');                          // Nama kegiatan: "Ujian Tengah Semester", "Libur Nasional"
            $table->string('type')->default('event');         // Tipe: event, exam, holiday, schedule
            $table->date('start_date');                       // Tanggal mulai
            $table->date('end_date')->nullable();             // Tanggal selesai (nullable untuk event 1 hari)
            $table->string('academic_year')->nullable();      // Tahun ajaran: "2026/2027"
            $table->text('description')->nullable();          // Deskripsi kegiatan
            $table->string('attachment')->nullable();         // File lampiran (PDF jadwal, dll)
            $table->boolean('is_published')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('academic_calendars');
    }
};
