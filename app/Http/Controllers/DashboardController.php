<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use App\Models\User;
use App\Models\UserProgress;
use Automattic\WooCommerce\Client;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        $woocommerce = new Client(
            env('WOOCOMMERCE_URL'), // URL toko WooCommerce Anda
            env('WOOCOMMERCE_CONSUMER_KEY'), // Consumer Key
            env('WOOCOMMERCE_CONSUMER_SECRET'), // Consumer Secret
            [
                'version' => 'wc/v3',
            ]
        );

        $products = $woocommerce->get('products', [
            'per_page' => 10,
        ]);

        $userProgress = UserProgress::where('user_id', $user->id)->get();

        $topUsers = User::where('custom_rank', '<=', 10)->orderBy('custom_rank')->get();
        $userRank = $topUsers->where('id', $user->id)->first();
        $userRank = $userRank ? $userRank->custom_rank : null;
        $isPublish = Setting::where('key', 'announcement_publish')->first();

        $setting = Setting::where('key', 'end_competition')->first();
        $targetDate = $setting ? $setting->value : false;
        $isCompetitionEnded = false;

        if ($setting) {
            $endDate = Carbon::parse($setting->value); // Ambil tanggal dari pengaturan
            $today = Carbon::today();                 // Tanggal hari ini

            // Periksa apakah kompetisi sudah berakhir
            $isCompetitionEnded = $endDate->lt($today); // `lt` = less than
        }

        return Inertia::render('Dashboard', [
            'userProgress' => $userProgress,
            'products' => $products,
            'userRank' => $userRank,
            'isPublish' => $isPublish,
            'isCompetitionEnded' => $isCompetitionEnded,
            'targetDate' => $targetDate
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
