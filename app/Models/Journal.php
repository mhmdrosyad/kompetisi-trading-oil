<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Journal extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'open_date', 'close_date', 'open_time', 'close_time',
        'trigger_so', 'tipe_order', 'jml_layer', 'note', 'tp', 'sl', 'profit_loss', 'averaging'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function layers()
    {
        return $this->hasMany(Layer::class);
    }
}
