<?php

namespace App\Http\Controllers;

use App\Models\Journal;
use App\Models\JournalCorrection;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class JournalCorrectionController extends Controller
{
    public function storeOrUpdate(Request $request, $journalId)
    {
        // Validasi input
        $validated = $request->validate([
            'is_valid' => 'required|boolean',
            'correction_notes' => 'nullable|string|max:255',
        ]);

        // Mencari jurnal berdasarkan ID
        $journal = Journal::findOrFail($journalId);

        // Mengecek jika ada koreksi jurnal yang sudah ada untuk jurnal ini
        $journalCorrection = JournalCorrection::where('journal_id', $journalId)->first();

        if ($journalCorrection) {
            // Jika koreksi jurnal sudah ada, lakukan update
            $journalCorrection->update([
                'is_valid' => $validated['is_valid'],
                'correction_notes' => $validated['correction_notes'] ?? $journalCorrection->correction_notes,
                'corrected_by' => Auth::id(), // Menyimpan user yang mengoreksi
            ]);
        } else {
            // Jika belum ada, buat koreksi jurnal baru
            JournalCorrection::create([
                'journal_id' => $journalId,
                'is_valid' => $validated['is_valid'],
                'correction_notes' => $validated['correction_notes'] ?? null,
                'corrected_by' => Auth::id(), // Menyimpan user yang mengoreksi
            ]);
        }

        return to_route('juries.edit', $journal->user_id);
    }

    public function disqualify(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $request->validate([
            'reason' => 'required|string|max:255',
        ]);
        $user->is_disqualified = true;
        $user->disqualification_reason = $request->input('reason');
        $user->save();

        return to_route('juries.edit', $id);
    }

    public function undoDisqualification(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $user->is_disqualified = false;
        $user->disqualification_reason = null;
        $user->save();

        return to_route('juries.edit', $id);
    }

    public function updateRank(Request $request, $id)
    {
        $request->validate([
            'custom_rank' => 'required|integer|min:1',
        ]);

        $user = User::findOrFail($id);
        $user->custom_rank = $request->input('custom_rank');
        $user->is_corrected = true;
        $user->save();

        return to_route('juries.edit', $id);
    }
}
