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
        Schema::create('profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Relasi ke users
            $table->string('full_name'); // Nama lengkap
            $table->string('whatsapp_number')->nullable(); // Nomor WhatsApp
            $table->string('city_of_residence')->nullable(); // Kota domisili
            $table->text('address')->nullable(); // Alamat
            $table->string('mt4_account_name')->nullable(); // Nama akun MT4
            $table->string('mt4_login_number')->nullable(); // Nomor login MT4
            $table->string('investor_password')->nullable(); // Investor password
            $table->string('profile_picture')->nullable(); // Foto profil
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('profiles');
    }
};
