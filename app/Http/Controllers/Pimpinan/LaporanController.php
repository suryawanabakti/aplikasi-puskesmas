<?php

namespace App\Http\Controllers\Pimpinan;

use App\Http\Controllers\Controller;
use App\Http\Resources\DrugsInResource;
use App\Http\Resources\DrugsOutResource;
use App\Http\Resources\DrugsResource;
use App\Models\Obat;
use App\Models\ObatKeluar;
use App\Models\ObatMasuk;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;

class LaporanController extends Controller
{
    //
    public function obatMasuk(Request $request)
    {
        $drugsIn = ObatMasuk::with('obat', 'obat.golongan')->orderBy('created_at', 'desc');
        if ($request->term) {
            $drugsIn->where('invoice', 'LIKE', "%{$request->term}%");
        }
        if ($request->mulai && $request->sampai) {
            $drugsIn->whereBetween('tanggal_masuk', [$request->mulai, $request->sampai]);
        }
        return Inertia::render('Pimpinan/Laporan/ObatMasuk', [
            "drugsIn" => DrugsInResource::collection($drugsIn->paginate($request->paginate ?? 5)),
            'pageNumber' => $request->pageNumber ?? 1,
            'paginate' => $request->paginate ?? 5,
            "mulaiFilter" => $request->mulai ?? null,
            'term' => $request->term ?? null,
            "sampaiFilter" => $request->sampai ?? null,
        ]);
    }

    public function exportObatMasuk(Request $request)
    {

        $drugsIn = ObatMasuk::with('obat', 'supplier')->orderBy('created_at', 'desc');
        if ($request->mulai && $request->sampai) {
            $drugsIn->whereBetween('tanggal_masuk', [$request->mulai, $request->sampai]);
        }

        $pdf = Pdf::loadView('export.obatmasuk', [
            "drugsIn" => $drugsIn->get()
        ]);
        return $pdf->stream('obatmasuk.pdf');
    }

    public function obatKeluar(Request $request)
    {
        $drugsOut = ObatKeluar::with('obat', 'pasien')->orderBy('created_at', 'desc');
        if ($request->term) {
            $drugsOut->where('invoice', 'LIKE', "%{$request->term}%");
        }
        if ($request->mulai && $request->sampai) {
            $drugsOut->whereBetween('tanggal_keluar', [$request->mulai, $request->sampai]);
        }
        return Inertia::render('Pimpinan/Laporan/ObatKeluar', [
            "drugsOut" => DrugsOutResource::collection($drugsOut->paginate($request->paginate ?? 5)),
            "mulaiFilter" => $request->mulai ?? null,
            "sampaiFilter" => $request->sampai ?? null,
            'pageNumber' => $request->pageNumber ?? 1,
            'paginate' => $request->paginate ?? 5,
        ]);
    }

    public function exportObatKeluar(Request $request)
    {

        $drugsOut = ObatKeluar::with('obat', 'pasien')->orderBy('created_at', 'desc');
        if ($request->mulai && $request->sampai) {
            $drugsOut->whereBetween('tanggal_keluar', [$request->mulai, $request->sampai]);
        }

        $pdf = Pdf::loadView('export.obatkeluar', [
            "drugsOut" =>  $drugsOut->get()
        ]);
        return $pdf->stream('obatkeluar.pdf');
    }

    public function obatKadaluarsa(Request $request)
    {
        $obats = Obat::orderBy('created_at', 'desc')->get();
        $today = Carbon::now()->format('Y-m-d');
        return Inertia::render("Pimpinan/Laporan/ObatKadaluarsa", [
            "drugs" => DrugsResource::collection($obats),
            "today" => $today
        ]);
    }

    public function exportObatKadaluarsa(Request $request)
    {
        $obats = Obat::orderBy('created_at', 'desc')->get();
        $pdf = Pdf::loadView('export.obatkadaluarsa', [
            "drugs" => DrugsResource::collection($obats)
        ]);
        return $pdf->stream('obatkeluar.pdf');
    }
}
