<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserProgress extends Model
{
    protected $fillable = ['user_id', 'step', 'completed'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public static function updateProgress($userId, $step, $completed)
    {
        $progress = UserProgress::updateOrCreate(
            ['user_id' => $userId, 'step' => $step], // Cari berdasarkan user_id dan step
            ['completed' => $completed]              // Jika ditemukan, update 'completed'
        );

        return $progress; // Mengembalikan entri yang diperbarui atau dibuat
    }
}
