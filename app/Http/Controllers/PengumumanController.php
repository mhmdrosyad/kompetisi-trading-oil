<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PengumumanController extends Controller
{
    public function pengumuman()
    {
        $topRankedUsers = User::with(['profile'])
            ->whereHas('roles', function ($query) {
                $query->where('name', 'member');
            })
            ->leftJoin('journals', 'users.id', '=', 'journals.user_id')
            ->select('users.*', DB::raw('SUM(journals.profit_loss) as total_profit_loss'))
            ->groupBy('users.id')
            ->whereNotNull('custom_rank') // Hanya yang memiliki custom_rank
            ->where('is_disqualified', false) // Tidak diskualifikasi
            ->where('custom_rank', '<=', 10) // Ambil hingga rank ke-10
            ->orderBy('custom_rank') // Urutkan berdasarkan custom_rank
            ->get();

        $emailStatus = Setting::where('key', 'email_winner_sent')->first();
        $publishStatus = Setting::where('key', 'announcement_publish')->first();
        $publishStatus = $publishStatus->value;

        return inertia('Journal/Admin/Pengumuman', ['users' => $topRankedUsers, 'emailStatus' => $emailStatus, 'publishStatus' => $publishStatus]);
    }

    public function pengumumanUser()
    {
        $topRankedUsers = User::with(['profile'])
            ->whereHas('roles', function ($query) {
                $query->where('name', 'member');
            })
            ->leftJoin('journals', 'users.id', '=', 'journals.user_id')
            ->select('users.*', DB::raw('SUM(journals.profit_loss) as total_profit_loss'))
            ->groupBy('users.id')
            ->whereNotNull('custom_rank') // Hanya yang memiliki custom_rank
            ->where('is_disqualified', false) // Tidak diskualifikasi
            ->where('custom_rank', '<=', 10) // Ambil hingga rank ke-10
            ->orderBy('custom_rank') // Urutkan berdasarkan custom_rank
            ->get();

        $isPublish = Setting::where('key', 'announcement_publish')->first();

        return inertia('Pengumuman/Index', ['users' => $topRankedUsers, 'isPublish' => $isPublish]);
    }

    public function toggleAnnouncementPublish()
    {
        $setting = Setting::where('key', 'announcement_publish')->first();

        if ($setting) {
            $newValue = !$setting->value;
            $setting->update(['value' => $newValue]);
        } else {
            $newValue = true;
            Setting::create([
                'key' => 'announcement_publish',
                'value' => $newValue
            ]);
        }

        return to_route('pengumuman.admin');
    }


}
