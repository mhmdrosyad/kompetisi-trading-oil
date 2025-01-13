<?php

namespace App\Http\Controllers;

use App\Models\UserProgress;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        $userProgress = UserProgress::where('user_id', $user->id)->get();

        return Inertia::render('Dashboard', [
            'userProgress' => $userProgress,
        ]);
    }

    public function finish()
    {
        $user = Auth::user();

        $userProgress = UserProgress::where('user_id', $user->id)->get();

        return Inertia::render('Finish', [
            'userProgress' => $userProgress,
        ]);
    }
}
