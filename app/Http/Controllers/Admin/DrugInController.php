<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\DrugsInResource;
use App\Http\Resources\DrugsResource;
use App\Http\Resources\SupplierResource;
use App\Models\Obat;
use App\Models\ObatMasuk;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Haruncpi\LaravelIdGenerator\IdGenerator;
use Illuminate\Http\RedirectResponse;

class DrugInController extends Controller
{
    //
    public function index(Request $request)
    {
        $drugsIn = ObatMasuk::with('obat', 'obat.golongan')->orderBy('created_at', 'desc');
        if ($request->term) {
            $drugsIn->where('invoice', 'LIKE', "%{$request->term}%");
        }
        if ($request->mulai && $request->sampai) {
            $drugsIn->whereBetween('tanggal_masuk', [$request->mulai, $request->sampai]);
        }
        return Inertia::render('Admin/DrugsIn/Index', [
            "drugsIn" => DrugsInResource::collection($drugsIn->paginate($request->paginate ?? 5)),
            'pageNumber' => $request->pageNumber ?? 1,
            'paginate' => $request->paginate ?? 5,
            "mulaiFilter" => $request->mulai ?? null,
            'term' => $request->term ?? null,
            "sampaiFilter" => $request->sampai ?? null,
        ]);
    }

    public function destroy(ObatMasuk $obatMasuk): RedirectResponse
    {
        $obat = Obat::find($obatMasuk->obat_id);
        Obat::where('id', $obatMasuk->obat_id)->update([
            'stok' => $obat->stok - $obatMasuk->jumlah_masuk
        ]);
        $obatMasuk->delete();

        return redirect()->route('admin.transaction.drugs-in');
    }

    public function create()
    {
        $drugs = DrugsResource::collection(Obat::orderBy('kode', 'asc')->get());
        $suppliers = SupplierResource::collection(Supplier::orderBy('created_at', 'asc')->get());
        return Inertia::render('Admin/DrugsIn/Create', [
            'drugs' => $drugs,
            'suppliers' => $suppliers
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'obat' => 'required',
            'supplier' => 'required',
            'tanggalMasuk' => 'required|date',
            'tanggalKadaluarsa' => 'required|date',
            'jumlahMasuk' => 'required'
        ]);

        $obat = Obat::find($request->obat);

        $invoice = IdGenerator::generate(['table' => 'obat_masuk', 'field' => 'invoice', 'length' => 12, 'prefix' => "TRNMSK-"]);

        Obat::where('id', $request->obat)->update([
            "stok" => $obat->stok + $request->jumlahMasuk
        ]);

        $jumlahBayar = $obat->harga_beli * $request->jumlahMasuk;

        ObatMasuk::create([
            'invoice' => $invoice,
            'obat_id' => $request->obat,
            'supplier_id' => $request->supplier,
            'tanggal_masuk' => $request->tanggalMasuk,
            'jumlah_masuk' => $request->jumlahMasuk,
            'jumlah_bayar' => $jumlahBayar,
            'tanggal_kadaluarsa' => $request->tanggalKadaluarsa,
        ]);

        return redirect()->route('admin.transaction.drugs-in');
    }
}
