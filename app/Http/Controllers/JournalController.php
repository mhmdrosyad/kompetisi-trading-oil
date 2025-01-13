<?php

namespace App\Http\Controllers;

use App\Models\Journal;
use App\Models\UserProgress;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class JournalController extends Controller
{
    public function index() {
        $user = Auth::user();
        $profile = $user->profile;
        $journals = Journal::with('layers')->where('user_id', Auth::id())->get();
        $finishJournal = UserProgress::where('user_id', Auth::id())->get()
            ->where('step', 'selesai_jurnal')
            ->first();
        return Inertia::render('Journal/Index', [
            'journals' => $journals,
            'finishJournal' => $finishJournal,
            'profile' => $profile
        ]);
    }

    public function store(Request $request)
    {
        // Validasi data
        $validated = $request->validate([
            'open_date' => 'required|date',
            'close_date' => 'required|date',
            'open_time' => 'required|string',
            'close_time' => 'required|string',
            'triggerSO' => 'required|string',
            'tipeOrder' => 'required|string',
            'jmlLayer' => 'required|integer',
            'note' => 'nullable|string',
            'tp' => 'required|string',
            'sl' => 'required|string',
            'averaging' => 'required|string',
            'totalProfitLoss' => 'required|numeric',
            'layers' => 'required|array',
            'layers.*.value' => 'required|numeric',
            'layers.*.lot' => 'required|numeric',
            'layers.*.close' => 'required|numeric',
        ]);

        // Menyimpan data jurnal
        $journal = new Journal([
            'user_id' => Auth::id(),
            'open_date' => $request->open_date,
            'close_date' => $request->close_date,
            'open_time' => $request->open_time,
            'close_time' => $request->close_time,
            'trigger_so' => $request->triggerSO,
            'tipe_order' => $request->tipeOrder,
            'jml_layer' => $request->jmlLayer,
            'note' => $validated['note'] ?? null,
            'tp' => $request->tp,
            'sl' => $request->sl,
            'profit_loss' => $request->totalProfitLoss,
            'averaging' => $request->averaging,
        ]);
        $journal->save();

        foreach ($request->layers as $layerData) {
            $journal->layers()->create($layerData);
        }

        return to_route('journal.index');
    }
}
