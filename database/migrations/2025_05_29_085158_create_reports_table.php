<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('reports', function (Blueprint $table) {
            $table->id();
            $table->string('kode_laporan')->unique();
            $table->string('name');
            $table->string('username')->nullable();
            $table->string('instansi');
            $table->string('location');
            $table->string('ruang')->nullable();      
            $table->text('message');                    
            $table->json('attachment')->nullable();
            $table->string('status')->default('Verifikasi');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reports');
    }
};
