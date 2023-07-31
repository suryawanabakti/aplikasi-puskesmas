<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\PasienResource;
use App\Models\Pasien;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PosyanduController extends Controller
{
    //
    public function index(Request $request)
    {

        $pasien = Pasien::orderBy('created_at', 'desc');


        $pasien = $pasien->where(function ($query) use ($request) {
            if ($request->term) {
                $query->where('nama', 'LIKE', "%{$request->term}%")
                    ->orWhere('alamat', 'LIKE', "%{$request->term}%")
                    ->orWhere('no_rm', 'LIKE', "%{$request->term}%")
                    ->orWhere('jenis_kelamin', 'LIKE', "%{$request->term}%")
                    ->orWhere('no_telepon', 'LIKE', "%{$request->term}%")
                    ->orWhere('nik', 'LIKE', "%{$request->term}%");
            }
        })->where('type', 'posyandu');


        return Inertia::render("Admin/Posyandu/Index", [
            "pasien" => PasienResource::collection($pasien->paginate($request->paginate ?? 5)),
            'term' => $request->term,
            'pageNumber' => $request->pageNumber ?? 1,
            'paginate' => $request->paginate ?? 5,
        ]);
    }

    public function edit(Pasien $pasien)
    {
        return Inertia::render("Admin/Posyandu/Edit", [
            "pasien" => $pasien
        ]);
    }

    public function update(Request $request, Pasien $pasien)
    {
        $request->validate([
            'nama' => 'required',

            'alamat' => 'required',
            'noTelepon' => 'required',
        ]);

        $pasien->update([
            'nama' => $request->nama,
            'alamat' => $request->alamat,
            'no_telepon' => $request->noTelepon,
        ]);

        return redirect()->route('admin.master-data.posyandu');
    }

    public function show(Pasien $pasien)
    {
        return Inertia::render("Admin/Posyandu/Show", [
            "pasien" => $pasien
        ]);
    }

    public function destroy(Pasien $pasien)
    {
        $pasien->delete();
        return redirect()->route('admin.master-data.posyandu');
    }

    public function create()
    {
        return Inertia::render("Admin/Posyandu/Create");
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required',
            'alamat' => 'required',
            'noTelepon' => 'required',
        ]);

        Pasien::create([
            'type' => 'posyandu',
            'nama' => $request->nama,
            'alamat' => $request->alamat,
            'no_telepon' => $request->noTelepon,
        ]);

        return redirect()->route('admin.master-data.posyandu');
    }
}
