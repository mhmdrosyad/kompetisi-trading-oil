<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Support\Facades\DB;

class JuryController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware('permission:jury index', only: ['index']),
            new Middleware('permission:jury edit', only: ['edit']),
        ];
    }

    public function index()
    {
        $usersWithCustomRank = User::with(['profile'])
            ->whereHas('roles', function ($query) {
                $query->where('name', 'member');
            })
            ->leftJoin('journals', 'users.id', '=', 'journals.user_id')
            ->select('users.*', DB::raw('SUM(journals.profit_loss) as total_profit_loss'))
            ->groupBy('users.id')
            ->whereNotNull('custom_rank')
            ->where('is_disqualified', false)
            ->orderBy('custom_rank') // Urutkan berdasarkan custom_rank
            ->get();

        // Ambil pengguna yang tidak memiliki custom_rank
        $usersWithoutCustomRank = User::with(['profile'])
            ->whereHas('roles', function ($query) {
                $query->where('name', 'member');
            })
            ->leftJoin('journals', 'users.id', '=', 'journals.user_id')
            ->select('users.*', DB::raw('SUM(journals.profit_loss) as total_profit_loss'))
            ->groupBy('users.id')
            ->whereNull('custom_rank')
            ->where('is_disqualified', false)
            ->orderByDesc('total_profit_loss') // Urutkan berdasarkan total_profit_loss
            ->get();

        // Gabungkan pengguna dengan custom_rank dan tanpa custom_rank
        $combinedUsers = $usersWithCustomRank->merge($usersWithoutCustomRank);
        $usedRanks = $usersWithCustomRank->pluck('custom_rank')->toArray();
        // Urutkan berdasarkan custom_rank dan profit_loss
        // Tentukan urutan rank
        $rank = 1;
        $sortedUsers = $combinedUsers->map(function ($user) use (&$rank, $usedRanks) {
            // Jika user memiliki custom_rank, tetap pakai rank yang sudah ditentukan
            if ($user->custom_rank !== null) {
                $user->rank = $user->custom_rank;
            } else {
                // Jika tidak memiliki custom_rank, beri rank berdasarkan urutan
                // Cek apakah rank sudah dipakai
                while (in_array($rank, $usedRanks)) {
                    $rank++; // Skip rank yang sudah dipakai
                }
                $user->rank = $rank;
                $usedRanks[] = $rank; // Tambahkan rank yang digunakan ke daftar usedRanks
                $rank++; // Increment rank untuk pengguna selanjutnya
            }
            return $user;
        });


        // Sortir pengguna berdasarkan rank untuk mengisi peringkat yang kosong
        $sortedUsers = collect($sortedUsers)->sortBy('rank')->values();

        $disqualifiedUsers = User::with(['profile'])
            ->whereHas('roles', function ($query) {
                $query->where('name', 'member');
            })
            ->leftJoin('journals', 'users.id', '=', 'journals.user_id')
            ->select('users.*', DB::raw('SUM(journals.profit_loss) as total_profit_loss'))
            ->groupBy('users.id')
            ->where('is_disqualified', true) // Ambil pengguna yang diskualifikasi
            ->get();
        return inertia('Journal/Admin/Index', ['users' => $sortedUsers, 'disqualifiedUsers' => $disqualifiedUsers]);
    }

    public function edit($userId)
    {
        // Mengambil user berdasarkan ID
        $users = User::with([
            'profile',
            'journals',
            'journals.layers',
            'journals.journalCorrections',
            'images'
        ])
            ->whereHas('roles', function ($query) {
                $query->where('name', 'member');
            })
            ->get()
            ->map(function ($user) {
                // Menghitung total profit loss
                $user->total_profit_loss = $user->journals->sum('profit_loss');
                return $user;
            })
            ->sortByDesc('total_profit_loss')
            ->values() // Menjaga indeks collection dimulai dari 0 setelah di-sort
            ->map(function ($user, $index) {
                // Menambahkan peringkat berdasarkan urutan setelah di-sort
                $user->rank = $index + 1;
                return $user;
            });

        $usersWithCustomRank = User::with(['profile'])
            ->whereHas('roles', function ($query) {
                $query->where('name', 'member');
            })
            ->leftJoin('journals', 'users.id', '=', 'journals.user_id')
            ->select('users.*', DB::raw('SUM(journals.profit_loss) as total_profit_loss'))
            ->groupBy('users.id')
            ->whereNotNull('custom_rank')
            ->where('is_disqualified', false)
            ->orderBy('custom_rank') // Urutkan berdasarkan custom_rank
            ->get();

        // Ambil pengguna yang tidak memiliki custom_rank
        $usersWithoutCustomRank = User::with(['profile'])
            ->whereHas('roles', function ($query) {
                $query->where('name', 'member');
            })
            ->leftJoin('journals', 'users.id', '=', 'journals.user_id')
            ->select('users.*', DB::raw('SUM(journals.profit_loss) as total_profit_loss'))
            ->groupBy('users.id')
            ->whereNull('custom_rank')
            ->where('is_disqualified', false)
            ->orderByDesc('total_profit_loss') // Urutkan berdasarkan total_profit_loss
            ->get();

        // Gabungkan pengguna dengan custom_rank dan tanpa custom_rank
        $combinedUsers = $usersWithCustomRank->merge($usersWithoutCustomRank);
        $usedRanks = $usersWithCustomRank->pluck('custom_rank')->toArray();
        // Urutkan berdasarkan custom_rank dan profit_loss
        // Tentukan urutan rank
        $rank = 1;
        $sortedUsers = $combinedUsers->map(function ($user) use (&$rank, $usedRanks) {
            // Jika user memiliki custom_rank, tetap pakai rank yang sudah ditentukan
            if ($user->custom_rank !== null) {
                $user->rank = $user->custom_rank;
            } else {
                // Jika tidak memiliki custom_rank, beri rank berdasarkan urutan
                // Cek apakah rank sudah dipakai
                while (in_array($rank, $usedRanks)) {
                    $rank++; // Skip rank yang sudah dipakai
                }
                $user->rank = $rank;
                $usedRanks[] = $rank; // Tambahkan rank yang digunakan ke daftar usedRanks
                $rank++; // Increment rank untuk pengguna selanjutnya
            }
            return $user;
        });


        // Sortir pengguna berdasarkan rank untuk mengisi peringkat yang kosong
        $sortedUsers = collect($sortedUsers)->sortBy('rank')->values();

        // Cari peringkat user tertentu
        $user = $users->firstWhere('id', $userId);
        $currentIndex = $sortedUsers->search(function ($user) use ($userId) {
            return $user->id == $userId;
        });
        $prevUser = $currentIndex > 0 ? $sortedUsers[$currentIndex - 1]->id : null;
        $nextUser = $currentIndex < $sortedUsers->count() - 1 ? $sortedUsers[$currentIndex + 1]->id : null;
        $usedRanks = User::whereNotNull('custom_rank')->pluck('custom_rank')->toArray();
        
        // Mengembalikan data untuk halaman edit
        return inertia('Journal/Admin/Edit', [
            'user' => $user,
            'usedRanks' => $usedRanks,
            'prevUser' => $prevUser,
            'nextUser' => $nextUser,
        ]);
    }

    
}
