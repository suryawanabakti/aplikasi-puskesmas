<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Golongan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GolonganController extends Controller
{
    //
    public function index()
    {
        $golongan = Golongan::all();
        return Inertia::render('Admin/Golongan/Index', [
            "golongan" => $golongan
        ]);
    }

    public function show(Golongan $golongan)
    {
        return Inertia::render('Admin/Golongan/Index', [
            "golongan" => $golongan
        ]);
    }
}
