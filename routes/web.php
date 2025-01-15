<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\JournalController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserImageController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;



Route::get('/dashboard', [DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');
Route::get('/syarat', [HomeController::class, 'syarat'])->name('syarat');
Route::get('/alur', [HomeController::class, 'alur'])->name('alur');
Route::get('/pemenang', [HomeController::class, 'pemenang'])->name('pemenang');
Route::get('/faqs', [HomeController::class, 'faq'])->name('faq');
Route::get('/contact', [HomeController::class, 'contact'])->name('contact');

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');

Route::middleware('auth')->group(function () {

    Route::resource('/permissions', PermissionController::class);
    Route::resource('roles', RoleController::class)->except('show');
    Route::resource('/users', UserController::class);
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/journal', [JournalController::class, 'index'])->name('journal.index')->middleware(['track.progress', 'date.start:2025-02-1']);
    Route::post('/journal', [JournalController::class, 'store'])->name('journal.store');

    Route::get('/upload-images', [UserImageController::class, 'index'])->name('images.index')->middleware('track.progress');
    Route::post('/upload-images', [UserImageController::class, 'upload'])->name('images.upload');

    Route::get('/finish', [DashboardController::class, 'finish'])->name('finish')->middleware('track.progress');

});

require __DIR__ . '/auth.php';
