<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\DrugsResource;
use App\Http\Resources\PasienResource;
use App\Models\Keranjang;
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

        $drugsOut = $drugsOut->where('user_id', auth()->id());

        if ($request->term) {
            $drugsOut->where('invoice', 'LIKE', "%{$request->term}%");
        }
        if ($request->filter) {
        }

        return Inertia::render('Admin/DrugsOut/Index', [
            "drugsOut" => $drugsOut->get(),
        ]);
    }

    //
    public function indexDokter(Request $request)
    {
        $drugsOut = ObatKeluar::with('obat', 'pasien', 'user')->orderBy('created_at', 'desc')->whereNot('user_id', auth()->id());

        if ($request->term) {
            $drugsOut->where('invoice', 'LIKE', "%{$request->term}%");
        }


        return Inertia::render('Admin/DrugsOut/IndexDokter', [
            "drugsOut" => $drugsOut->get(),
        ]);
    }


    public function deleteKeranjang(Keranjang $keranjang)
    {
        $keranjang->delete();
        return back();
    }
    public function addKeranjang(Request $request)
    {
        $request->validate([
            'obat' => 'required',
            'jumlah' => 'required',
        ]);

        $total = 0;

        Keranjang::create([
            'user_id' => auth()->id(),
            'obat_id' => $request->obat,
            'jumlah' => $request->jumlah,
            'total' => $total,
        ]);

        return back();
    }
    public function getPasien($term)
    {

        $pasien = Pasien::orderBy('nama', 'desc');

        $pasien->where('nama', 'LIKE', "%{$term}%")->orWhere('no_rm', 'LIKE', "%{$term}%");

        $pasien = $pasien->get();

        return PasienResource::collection($pasien);
    }

    public function store(Request $request)
    {
        $request->validate([
            'pasien' => 'required',
            'tanggalKeluar' => 'required',
        ]);
        $keranjang = Keranjang::where('user_id', auth()->id())->get();
        foreach ($keranjang as $data) {
            $obat = Obat::find($data->obat_id);
            if ($obat->stok < $data->jumlah) {
                return response()->json([
                    'message' => 'Gagal stok obat ' . $obat->nama . ' kurang'
                ], 422);
            }
            $invoice = IdGenerator::generate(['table' => 'obat_keluar', 'field' => 'invoice', 'length' => 12, 'prefix' => "TRNKLR-"]);
            Obat::where('id', $data->obat_id)->update([
                "stok" => $obat->stok - $data->jumlah
            ]);
            $jumlahBayar = $obat->harga_jual * $data->jumlah;
            ObatKeluar::create([
                'user_id' => auth()->id(),
                'invoice' => $invoice,
                'obat_id' => $data->obat_id,
                'pasien_id' => $request->pasien,
                'tanggal_keluar' => $request->tanggalKeluar,
                'jumlah_keluar' => $data->jumlah,
                'jumlah_bayar' => $jumlahBayar,
            ]);
        }

        Keranjang::where('user_id', auth()->id())->delete();

        return redirect()->route('admin.transaction.drugs-out')->with([
            'type' => 'success',
            'message' => 'Berhasil tambah obat keluar'
        ]);
    }

    public function create()
    {
        $drugs = DrugsResource::collection(Obat::orderBy('kode', 'asc')->get());
        $pasien = PasienResource::collection(Pasien::orderBy('nama', 'desc')->get());
        return Inertia::render('Admin/DrugsOut/Create', [
            "drugs" =>  $drugs,
            "pasien" => $pasien,
            "keranjang" => Keranjang::with('user', 'obat')->where('user_id', auth()->id())->get(),
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
