<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function syarat()
    {
         return Inertia::render('Syarat');
    }
}
