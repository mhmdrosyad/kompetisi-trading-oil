<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Layer extends Model
{
    use HasFactory;

    protected $fillable = ['journal_id', 'value', 'lot', 'close', 'order'];

    public function journal()
    {
        return $this->belongsTo(Journal::class);
    }
}
