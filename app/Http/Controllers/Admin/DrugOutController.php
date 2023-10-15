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
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;
use Haruncpi\LaravelIdGenerator\IdGenerator;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DrugOutController extends Controller
{
    //
    public function cetak(ObatKeluar $obatKeluar)
    {
        $data = ObatKeluar::with('pasien', 'user', 'keranjang.obat')->where('id', $obatKeluar->id)->first();
        $pdf = Pdf::loadView('export.cetakobat', compact('data'));
        return $pdf->stream();
    }
    public function index(Request $request)
    {
        $drugsOut = ObatKeluar::with('obat', 'pasien', 'keranjang.obat')->orderBy('created_at', 'desc');

        $drugsOut = $drugsOut->where('user_id', auth()->id());

        if ($request->term) {
            $drugsOut->where('invoice', 'LIKE', "%{$request->term}%")
                ->orWhereHas('pasien', function ($query) use ($request) {
                    $query->where('nama', 'LIKE', "%{$request->term}%");
                });
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
        $drugsOut = ObatKeluar::with('obat', 'pasien', 'keranjang.obat', 'user')->orderBy('created_at', 'desc');

        if (auth()->user()->id == 2) {
            $drugsOut = $drugsOut->whereNot('user_id', auth()->id());
        } else {
            $drugsOut = $drugsOut->where('user_id', auth()->id());
        }

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
            'keteranganObat' => 'required'
        ]);

        $total = 0;
        $obat = Obat::find($request->obat);

        if ($request->jumlah > $obat->stok) {
            $request->validate([
                'jumlah' => 'required|numeric|max:' . $obat->stok,
            ]);
        }
        Keranjang::create([
            'user_id' => auth()->id(),
            'obat_id' => $request->obat,
            'jumlah' => $request->jumlah,
            'keterangan' => $request->keteranganObat,
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
        $keranjang = Keranjang::where('user_id', auth()->id())->whereNull('obat_keluar_id')->get();
        $jumlahs = 0;
        foreach ($keranjang as $data) {
            $obat = Obat::find($data->obat_id);
            if ($obat->stok < $data->jumlah) {
                return response()->json([
                    'message' => 'Gagal stok obat ' . $obat->nama . ' kurang'
                ], 422);
            }
            $invoice = IdGenerator::generate(['table' => 'obat_keluar', 'field' => 'invoice', 'length' => 12, 'prefix' => "TRNKLR-"]);


            $obatMasuk =  ObatMasuk::where('tanggal_kadaluarsa', '>', Carbon::now()->format('Y-m-d'))->where('obat_id', $data->obat_id)->first();
            if ($obatMasuk->sisa < $data->jumlah) {
                return response()->json([
                    'message' => 'Gagal stok obat ' . $obat->nama . ' kurang'
                ], 422);
            }
            if (!empty($obatMasuk)) {
                $obatSisa = $obatMasuk->sisa - $data->jumlah;
                ObatMasuk::where('tanggal_kadaluarsa', '>', Carbon::now()->format('Y-m-d'))->where('obat_id', $data->obat_id)->update([
                    'sisa' => $obatSisa
                ]);
            }

            Obat::where('id', $data->obat_id)->update([
                "stok" => $obat->stok - $data->jumlah
            ]);

            $jumlahBayar = $obat->harga_jual * $data->jumlah;

            $jumlahs = $jumlahs + $jumlahBayar;
        }

        $obatKeluar = ObatKeluar::create([
            'user_id' => auth()->id(),
            'invoice' => $invoice,
            'obat_id' => $data->obat_id,
            'pasien_id' => $request->pasien,
            'tanggal_keluar' => $request->tanggalKeluar,
            'jumlah_keluar' => $data->jumlah,
            'jumlah_bayar' => $jumlahs,
            // 'keterangan' => $request->keterangan ?? null,
        ]);

        Keranjang::where('user_id', auth()->id())->whereNull('obat_keluar_id')->update([
            'obat_keluar_id' =>  $obatKeluar->id,
        ]);

        if (auth()->user()->id == 2) {
            return redirect()->route('admin.transaction.drugs-out')->with([
                'type' => 'success',
                'message' => 'Berhasil tambah obat keluar'
            ]);
        }
        return redirect()->route('admin.transaction.drugs-out.dokter')->with([
            'type' => 'success',
            'message' => 'Berhasil tambah obat keluar'
        ]);
    }

    public function store2(Request $request)
    {
        $request->validate([
            'pasien' => 'required',
            'tanggalKeluar' => 'required',
        ]);
        $keranjang = Keranjang::where('user_id', auth()->id())->whereNull('obat_keluar_id')->get();
        $jumlahs = 0;
        foreach ($keranjang as $data) {
            $obat = Obat::find($data->obat_id);
            if ($obat->stok < $data->jumlah) {
                return response()->json([
                    'message' => 'Gagal stok obat ' . $obat->nama . ' kurang'
                ], 422);
            }
            $invoice = IdGenerator::generate(['table' => 'obat_keluar', 'field' => 'invoice', 'length' => 12, 'prefix' => "TRNKLR-"]);


            $obatMasuk =  ObatMasuk::where('tanggal_kadaluarsa', '>', Carbon::now()->format('Y-m-d'))->where('obat_id', $data->obat_id)->first();
            if ($obatMasuk->sisa < $data->jumlah) {
                return response()->json([
                    'message' => 'Gagal stok obat ' . $obat->nama . ' kurang'
                ], 422);
            }
            if (!empty($obatMasuk)) {
                $obatSisa = $obatMasuk->sisa - $data->jumlah;
                ObatMasuk::where('tanggal_kadaluarsa', '>', Carbon::now()->format('Y-m-d'))->where('obat_id', $data->obat_id)->update([
                    'sisa' => $obatSisa
                ]);
            }

            Obat::where('id', $data->obat_id)->update([
                "stok" => $obat->stok - $data->jumlah
            ]);

            $jumlahBayar = $obat->harga_jual * $data->jumlah;

            $jumlahs = $jumlahs + $jumlahBayar;
        }

        $obatKeluar = ObatKeluar::create([
            'user_id' => auth()->id(),
            'invoice' => $invoice,
            'obat_id' => $data->obat_id,
            'nama_pasien' => $request->pasien,
            'tanggal_keluar' => $request->tanggalKeluar,
            'jumlah_keluar' => $data->jumlah,
            'jumlah_bayar' => $jumlahs,
            // 'keterangan' => $request->keterangan ?? null,
        ]);

        Keranjang::where('user_id', auth()->id())->whereNull('obat_keluar_id')->update([
            'obat_keluar_id' =>  $obatKeluar->id,
        ]);

        if (auth()->user()->id == 2) {
            return redirect()->route('admin.transaction.drugs-out')->with([
                'type' => 'success',
                'message' => 'Berhasil tambah obat keluar'
            ]);
        }
        return redirect()->route('admin.transaction.drugs-out.dokter')->with([
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
            "keranjang" => Keranjang::with('user', 'obat')->whereNull('obat_keluar_id')->where('user_id', auth()->id())->get(),
        ]);
    }
    public function createUmum()
    {
        $drugs = DrugsResource::collection(Obat::orderBy('kode', 'asc')->get());
        $pasien = PasienResource::collection(Pasien::orderBy('nama', 'desc')->get());
        return Inertia::render('Admin/DrugsOut/CreateUmum', [
            "drugs" =>  $drugs,
            "pasien" => $pasien,
            "keranjang" => Keranjang::with('user', 'obat')->whereNull('obat_keluar_id')->where('user_id', auth()->id())->get(),
        ]);
    }


    public function destroy(ObatKeluar $obatKeluar)
    {
        $obat = Obat::find($obatKeluar->obat_id);
        Obat::where('id', $obatKeluar->obat_id)->update([
            'stok' => $obat->stok + $obatKeluar->jumlah_keluar
        ]);
        $obatKeluar->delete();
        if (auth()->user()->id == 2) {
            return redirect()->route('admin.transaction.drugs-out');
        }
        return redirect()->route('admin.transaction.drugs-out.dokter');
    }
}
