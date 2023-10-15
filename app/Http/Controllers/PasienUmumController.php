<?php

namespace App\Http\Controllers;

use App\Http\Resources\PasienResource;
use App\Models\Pasien;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PasienUmumController extends Controller
{
    public function index(Request $request)
    {

        $pasien = Pasien::orderBy('created_at', 'desc')->whereNull('no_rm');

        if ($request->term) {
            $pasien->where('nama', 'LIKE', "%{$request->term}%")
                ->orWhere('alamat', 'LIKE', "%{$request->term}%")
                ->orWhere('no_rm', 'LIKE', "%{$request->term}%")
                ->orWhere('jenis_kelamin', 'LIKE', "%{$request->term}%")
                ->orWhere('no_telepon', 'LIKE', "%{$request->term}%")
                ->orWhere('nik', 'LIKE', "%{$request->term}%");
        }

        $pasien->where('type', 'pasien');
        return Inertia::render("Admin/PasienUmum/Index", [
            "pasien" => PasienResource::collection($pasien->paginate($request->paginate ?? 5)),
            'term' => $request->term,
            'pageNumber' => $request->pageNumber ?? 1,
            'paginate' => $request->paginate ?? 5,
        ]);
    }

    public function show(Pasien $pasien)
    {
        return Inertia::render("Admin/PasienUmum/Show", [
            "pasien" => $pasien
        ]);
    }

    public function edit(Pasien $pasien)
    {
        return Inertia::render("Admin/PasienUmum/Edit", [
            "pasien" => $pasien
        ]);
    }

    public function update(Request $request, Pasien $pasien)
    {
        $request->validate([
            'nama' => 'required',

            'alamat' => 'required',
            'noTelepon' => 'required',
            'nik' => 'required|unique:pasien,nik,' . $pasien->id,
            'jenisKelamin' => 'required'
        ]);

        $pasien->update([
            'nik' => $request->nik,
            'nama' => $request->nama,

            'alamat' => $request->alamat,
            'no_telepon' => $request->noTelepon,
            'jenis_kelamin' => $request->jenisKelamin
        ]);

        return redirect()->route('admin.master-data.pasien-umum');
    }

    public function destroy(Pasien $pasien)
    {
        $pasien->delete();
        return redirect()->route('admin.master-data.pasien-umum');
    }

    public function create()
    {
        $pasien = Pasien::orderBy('created_at', 'desc')->whereNotNull('no_rm')->first();
        $noRM = 300001;
        if (!empty($pasien)) {
            $noRM = $pasien->no_rm + 1;
        }

        return Inertia::render("Admin/PasienUmum/Create", [
            "noRM" => $noRM
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required',

            'alamat' => 'required',
            'noTelepon' => 'required',
            'nik' => 'required|unique:pasien,nik',
            'jenisKelamin' => 'required'
        ]);

        Pasien::create([
            'type' => 'pasien',
            'nik' => $request->nik,
            'nama' => $request->nama,

            'alamat' => $request->alamat,
            'no_telepon' => $request->noTelepon,
            'jenis_kelamin' => $request->jenisKelamin
        ]);

        return redirect()->route('admin.master-data.pasien-umum');
    }
}
