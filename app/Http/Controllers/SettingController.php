<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingController extends Controller
{
    public function index()
    {
        $setting = Setting::where('key', 'end_competition')->first();
        return Inertia::render('Setting', ['endCompetition' => $setting]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'value' => 'required|date',
        ]);

        Setting::updateOrCreate(
            ['key' => 'end_competition'],
            ['value' => $request->value]
        );

        to_route('setting.index');
    }
}
