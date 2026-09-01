<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('activity_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->string('action');                        // Aksi: 'create', 'update', 'delete', 'login', 'logout'
            $table->string('subject_type')->nullable();      // Model yang terpengaruh: 'App\\Models\\News'
            $table->unsignedBigInteger('subject_id')->nullable(); // ID record yang terpengaruh
            $table->text('description')->nullable();         // Deskripsi aktivitas
            $table->json('properties')->nullable();          // Data tambahan: {old: {}, new: {}} atau {ip, user_agent}
            $table->string('ip_address')->nullable();        // IP address admin
            $table->timestamps();

            // Index untuk query cepat
            $table->index(['subject_type', 'subject_id']);
            $table->index('action');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('activity_logs');
    }
};
