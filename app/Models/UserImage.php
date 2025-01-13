<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserImage extends Model
{
    use HasFactory;

    // Tentukan nama tabel jika tidak mengikuti konvensi
    protected $table = 'user_images';

    // Kolom yang bisa diisi mass-assignment
    protected $fillable = [
        'user_id',
        'image_path',
    ];

    // Relasi dengan model User (satu user bisa memiliki banyak gambar)
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
