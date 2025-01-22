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
        Schema::table('users', function (Blueprint $table) {
            $table->boolean('is_disqualified')->default(false);
            $table->text('disqualification_reason')->nullable()->after('is_disqualified');
            $table->integer('is_corrected')->default(false)->after('disqualification_reason');
            $table->integer('custom_rank')->nullable()->after('is_corrected');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['is_disqualified', 'disqualification_reason','is_corrected', 'custom_rank']);
        });
    }
};
