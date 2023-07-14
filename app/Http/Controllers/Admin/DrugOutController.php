<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\DrugsResource;
use App\Http\Resources\PasienResource;
use App\Models\Obat;
use App\Models\ObatKeluar;
use App\Models\ObatMasuk;
use App\Models\Pasien;
use Haruncpi\LaravelIdGenerator\IdGenerator;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DrugOutController extends Controller
{
    //
    public function index(Request $request)
    {
        $drugsOut = ObatKeluar::with('obat', 'pasien')->orderBy('created_at', 'desc');
        if ($request->term) {
            $drugsOut->where('invoice', 'LIKE', "%{$request->term}%");
        }
        return Inertia::render('Admin/DrugsOut/Index', [
            "drugsOut" => $drugsOut->get()
        ]);
    }

    public function getPasien($term)
    {

        $pasien = Pasien::orderBy('nama', 'desc');

        $pasien->where('nama', 'LIKE', "%{$term}%");

        $pasien = $pasien->get();

        return PasienResource::collection($pasien);
    }

    public function store(Request $request)
    {
        $request->validate([
            'obat' => 'required',
            'pasien' => 'required',
            'tanggalKeluar' => 'required',
            'jumlahKeluar' => 'required'
        ]);
        $obat = Obat::find($request->obat);
        if ($request->jumlahKeluar > $obat->stok) {
            return back()->with([
                'type' => 'error',
                'message' => 'Gagal simpan , stok tidak mencukupi'
            ]);
        } else {
            $invoice = IdGenerator::generate(['table' => 'obat_keluar', 'field' => 'invoice', 'length' => 12, 'prefix' => "TRNKLR-"]);
            Obat::where('id', $request->obat)->update([
                "stok" => $obat->stok - $request->jumlahKeluar
            ]);
            $jumlahBayar = $obat->harga_jual * $request->jumlahKeluar;
            ObatKeluar::create([
                'invoice' => $invoice,
                'obat_id' => $request->obat,
                'pasien_id' => $request->pasien,
                'tanggal_keluar' => $request->tanggalKeluar,
                'jumlah_keluar' => $request->jumlahKeluar,
                'jumlah_bayar' => $jumlahBayar,
            ]);
            return redirect()->route('admin.transaction.drugs-out')->with([
                'type' => 'success',
                'message' => 'Berhasil tambah obat keluar'
            ]);
        }
    }

    public function create()
    {
        $drugs = DrugsResource::collection(Obat::orderBy('kode', 'asc')->get());
        $pasien = PasienResource::collection(Pasien::orderBy('nama', 'desc')->get());
        return Inertia::render('Admin/DrugsOut/Create', [
            "drugs" =>  $drugs,
            "pasien" => $pasien
        ]);
    }

    public function destroy(ObatKeluar $obatKeluar)
    {
        $obat = Obat::find($obatKeluar->obat_id);
        Obat::where('id', $obatKeluar->obat_id)->update([
            'stok' => $obat->stok + $obatKeluar->jumlah_keluar
        ]);
        $obatKeluar->delete();

        return redirect()->route('admin.transaction.drugs-out');
    }
}
