<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\JournalController;
use App\Http\Controllers\JournalCorrectionController;
use App\Http\Controllers\JuryController;
use App\Http\Controllers\PengumumanController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserImageController;
use App\Http\Controllers\WinnerEmailController;
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

Route::get('/email-preview', [WinnerEmailController::class, 'preview']);


Route::middleware('auth')->group(function () {

    Route::resource('/permissions', PermissionController::class);
    Route::resource('roles', RoleController::class)->except('show');
    Route::resource('/users', UserController::class);
    Route::resource('/juries', JuryController::class);

    Route::get('/admin/pengumuman', [PengumumanController::class, 'pengumuman'])->name('pengumuman.admin')->middleware('permission:jury index');
    Route::get('/pengumuman', [PengumumanController::class, 'pengumumanUser'])->name('pengumuman.user')->middleware('role:member|admin|juri');
    Route::post('/admin/publish-pengumuman', [PengumumanController::class, 'toggleAnnouncementPublish'])->name('pengumuman.admin.publish')->middleware('permission:jury edit');
    
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/journal', [JournalController::class, 'index'])->name('journal.index')->middleware(['track.progress', 'date.start:2025-02-1']);
    Route::post('/journal', [JournalController::class, 'store'])->name('journal.store');

    Route::get('/upload-images', [UserImageController::class, 'index'])->name('images.index')->middleware('track.progress');
    Route::post('/upload-images', [UserImageController::class, 'upload'])->name('images.upload');

    Route::get('/finish', [DashboardController::class, 'finish'])->name('finish')->middleware('track.progress');

    Route::get('/admin/setting', [SettingController::class, 'index'])->name('setting.index')->middleware('permission:jury index');;
    Route::post('/admin/setting', [SettingController::class, 'store'])->name('setting.store')->middleware('permission:jury index');;

    
    Route::post('/journal/{journalId}/correction', [JournalCorrectionController::class, 'storeOrUpdate'])
        ->name('journal.correction.storeOrUpdate');
    Route::post('/journal/{id}/disqualify', [JournalCorrectionController::class, 'disqualify'])
        ->name('journal.correction.disqualify');
    Route::post('/journal/{id}/undo-disqualification', [JournalCorrectionController::class, 'undoDisqualification'])
        ->name('journal.correction.undoDisqualify');
    Route::post('/journal/{id}/update-rank', [JournalCorrectionController::class, 'updateRank'])
        ->name('journal.correction.updateRank');

    Route::post('/email/send-winner-email', [WinnerEmailController::class, 'sendWinnerEmails'])->name('send.email.winner');        

});

require __DIR__ . '/auth.php';
