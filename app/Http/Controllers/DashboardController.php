<?php

namespace App\Http\Controllers;

use App\Models\UserProgress;
use Automattic\WooCommerce\Client;
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

        return Inertia::render('Dashboard', [
            'userProgress' => $userProgress,
            'products' => $products,
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
