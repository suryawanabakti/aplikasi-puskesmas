<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\DrugsResource;
use App\Models\Golongan;
use App\Models\Obat;
use App\Models\ObatMasuk;
use App\Models\Supplier;
use Carbon\Carbon;
use Haruncpi\LaravelIdGenerator\IdGenerator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class DrugController extends Controller
{
    //
    public function index(Request $request)
    {
        $drugs = Obat::with('golongan')->orderBy('created_at', 'desc');

        if ($request->term) {
            $drugs->where('nama', 'LIKE', "%{$request->term}%")
                ->orWhere('kode', 'LIKE', "%{$request->term}%");
        }

        $drugsIn = ObatMasuk::with('obat', 'obat.golongan')->orderBy('created_at', 'desc');
        if ($request->term) {
            $drugsIn->where('invoice', 'LIKE', "%{$request->term}%");
        }
        if ($request->mulai && $request->sampai) {
            $drugsIn->whereBetween('tanggal_masuk', [$request->mulai, $request->sampai]);
        }

        return Inertia::render('Admin/Drugs/Index', [

            "drugs" =>  DrugsResource::collection($drugs->paginate($request->paginate ?? 5)),
            'term' => $request->term ?? null,
            'pageNumber' => $request->pageNumber ?? 1,
            'paginate' => $request->paginate ?? 5,
            'today' => Carbon::now()->format('Y-m-d')
        ]);
    }

    public function show(Obat $obat)
    {

        return Inertia::render('Admin/Drugs/Show', [
            "drug" => $obat
        ]);
    }

    public function edit(Obat $obat)
    {

        return Inertia::render('Admin/Drugs/Edit', [

            "drug" => $obat
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Drugs/Create');
    }

    public function destroy($obat)
    {
        Obat::where('kode', $obat)->delete();

        return back();
    }

    public function update(Request $request, Obat $obat)
    {
        $request->validate([
            'nama' => 'required|max:255',
            'kode' => 'required|max:255',
            'stok' => 'required|numeric',
            'hargaBeli' => 'required|numeric',
            'hargaJual' => 'required|numeric',
            'kadaluarsa' => 'required|date',
            'golongan' => 'required',
        ]);

        $obat->update([
            'nama' => $request->nama,
            'stok' => $request->stok ?? 0,
            'kode' => $request->kode,
            'harga_jual' => $request->hargaJual,
            'harga_beli' => $request->hargaBeli,
            'golongan' => $request->golongan,
            'kadaluarsa' => $request->kadaluarsa
        ]);

        return Redirect::to("/admin/master-data/drugs");
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required|max:255',
            'kode' => 'required|max:255',
            'stok' => 'required|numeric',
            'hargaBeli' => 'required|numeric',
            'hargaJual' => 'required|numeric',
            'kadaluarsa' => 'required|date',
            'golongan' => 'required',
        ]);

        $obat = Obat::create([
            'nama' => $request->nama,
            'stok' => $request->stok ?? 0,
            'kode' => $request->kode,
            'harga_jual' => $request->hargaJual,
            'harga_beli' => $request->hargaBeli,
            'golongan' => $request->golongan,
            'kadaluarsa' => $request->kadaluarsa
        ]);

        return Redirect::to("/admin/master-data/drugs");
    }
}
