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
    public function alur()
    {
         return Inertia::render('AlurPage');
    }
    public function pemenang()
    {
         return Inertia::render('PemenangPage');
    }
    public function faq()
    {
         return Inertia::render('FaqPage');
    }
    public function contact()
    {
         return Inertia::render('ContactPage');
    }
}
