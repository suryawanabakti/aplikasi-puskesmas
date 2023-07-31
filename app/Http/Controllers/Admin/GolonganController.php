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

    public function create()
    {
        return Inertia::render('Admin/Golongan/Create');
    }
    public function edit(Golongan $golongan)
    {
        return Inertia::render('Admin/Golongan/Edit', [
            "golongan" => $golongan
        ]);
    }
    public function destroy(Golongan $golongan)
    {
        $golongan->delete();
        return back();
    }

    public function update(Golongan $golongan, Request $request)
    {
        $request->validate([
            'nama' => 'required',
            'kode' => 'required'
        ]);
        $golongan->update([
            'nama' => $request->nama,
            'kode' => $request->kode,
        ]);
        return redirect()->route('admin.master-data.golongan');
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required',
            'kode' => 'required'
        ]);
        Golongan::create([
            'nama' => $request->nama,
            'kode' => $request->kode,
        ]);
        return redirect()->route('admin.master-data.golongan');
    }

    public function show(Golongan $golongan)
    {
        return Inertia::render('Admin/Golongan/Index', [
            "golongan" => $golongan
        ]);
    }
}
