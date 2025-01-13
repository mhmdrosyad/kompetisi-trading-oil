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
        Schema::create('journals', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->date('open_date');
            $table->date('close_date');
            $table->string('open_time');
            $table->string('close_time');
            $table->string('trigger_so');
            $table->string('tipe_order');
            $table->integer('jml_layer');
            $table->text('note')->nullable();
            $table->decimal('tp', 10, 2);
            $table->decimal('sl', 10, 2);
            $table->decimal('profit_loss', 10, 2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('journals');
    }
};
