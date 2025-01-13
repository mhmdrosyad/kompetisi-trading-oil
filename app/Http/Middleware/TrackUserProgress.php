<?php

namespace App\Http\Middleware;

use App\Models\UserProgress;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class TrackUserProgress
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (Auth::check()) {
            $user = Auth::user();

            // Tentukan halaman yang ingin Anda pantau
            if ($request->is('journal*')) {
                // Update progress untuk step tertentu saat halaman journal diakses
                UserProgress::updateProgress($user->id, 'isi_jurnal', true);
            }

            if ($request->is('upload-images*')) {
                // Update progress untuk step selesai_jurnal saat halaman upload-images diakses
                UserProgress::updateProgress($user->id, 'selesai_jurnal', true);
            }

            if ($request->is('finish*')) {
                // Update progress untuk step selesai_jurnal saat halaman upload-images diakses
                UserProgress::updateProgress($user->id, 'upload_bukti', true);
            }
    

            // Anda bisa menambahkan kondisi lain untuk langkah-langkah selanjutnya
        }

        return $next($request);
    }
}
