<?php

namespace App\Http\Controllers;

use App\Mail\WinnerNotificationMail;
use App\Models\Setting;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class WinnerEmailController extends Controller
{
    public function preview()
    {
        $user = User::find(6);
        Mail::to($user->email)->send(new WinnerNotificationMail($user, $user->custom_rank));
        return view('emails.winner-notification', [
            'user' => $user,
            'customRank' => 1,
        ]);
    }

    public function sendWinnerEmails()
    {
        // Ambil data pengguna pemenang
        // $winners = User::whereNotNull('custom_rank')
        //     ->where('is_disqualified', false)
        //     ->orderBy('custom_rank')
        //     ->where('custom_rank', '<=', 10)
        //     ->get();

        // foreach ($winners as $winner) {
        //     Mail::to($winner->email)->send(new WinnerNotificationMail($winner, $winner->custom_rank));
        // }

        $user = User::find(6);
        Mail::to($user->email)->send(new WinnerNotificationMail($user, $user->custom_rank));
        Setting::updateOrCreate(
            ['key' => 'email_winner_sent'], // Kunci
            ['value' => 'true']            // Nilai
        );
        return to_route('pengumuman.admin');
    }
}
