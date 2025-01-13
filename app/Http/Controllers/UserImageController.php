<?php

namespace App\Http\Controllers;

use App\Models\UserImage;
use App\Models\UserProgress;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class UserImageController extends Controller
{
    public function index() {
        $images = UserImage::where('user_id', Auth::id())->get();
        $finishUpload = UserProgress::where('user_id', Auth::id())->get()
            ->where('step', 'upload_bukti')
            ->first();
        return Inertia::render('Journal/UploadImage', ['images' => $images, 'finishUpload' => $finishUpload]);
    }
    public function upload(Request $request)
    {
        $request->validate([
            'images' => 'required|array',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048', // Validasi gambar
        ]);

        $user = Auth::user();  // Mendapatkan user yang sedang login

        // Membuat folder berdasarkan user_id jika belum ada
        $folderPath = 'gambar_bukti/' . $user->id;

        $uploadedImages = [];

        foreach ($request->file('images') as $image) {
            // Menyimpan gambar ke folder yang sesuai
            $imagePath = $image->store($folderPath, 'public');

            // Menyimpan informasi gambar di database
            $userImage = UserImage::create([
                'user_id' => $user->id,
                'image_path' => $imagePath,
            ]);

            $uploadedImages[] = $userImage;
        }

        return to_route('images.index');
    }
}
