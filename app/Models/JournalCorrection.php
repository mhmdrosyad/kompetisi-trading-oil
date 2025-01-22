<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JournalCorrection extends Model
{
    use HasFactory;

    protected $fillable = [
        'journal_id',
        'corrected_by',
        'is_valid',
        'correction_notes',
    ];


    public function journal()
    {
        return $this->belongsTo(Journal::class);
    }

    public function correctedBy()
    {
        return $this->belongsTo(User::class, 'corrected_by');
    }
}
