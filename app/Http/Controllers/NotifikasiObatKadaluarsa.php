<?php

namespace App\Http\Controllers;

use App\Http\Resources\DrugsInResource;
use App\Models\ObatMasuk;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NotifikasiObatKadaluarsa extends Controller
{
    //
    public function count()
    {
        return $drugsIn = ObatMasuk::where('tanggal_kadaluarsa', '<=', Carbon::now()->addDay(30)->format('Y-m-d'))->with('obat', 'obat.golongan')->orderBy('created_at', 'desc')->count();
    }
    public function index(Request $request)
    {

        $drugsIn = ObatMasuk::where('tanggal_kadaluarsa', '<=', Carbon::now()->addDay(30)->format('Y-m-d'))->with('obat', 'obat.golongan')->orderBy('created_at', 'desc');

        if ($request->term) {
            $drugsIn->where('invoice', 'LIKE', "%{$request->term}%");
        }
        if ($request->mulai && $request->sampai) {
            $drugsIn->whereBetween('tanggal_masuk', [$request->mulai, $request->sampai]);
        }
        return Inertia::render('Admin/Notifikasi/ObatKadaluarsa', [
            "drugsIn" => DrugsInResource::collection($drugsIn->paginate($request->paginate ?? 5)),
            'pageNumber' => $request->pageNumber ?? 1,
            'paginate' => $request->paginate ?? 5,
            "mulaiFilter" => $request->mulai ?? null,
            'term' => $request->term ?? null,
            "sampaiFilter" => $request->sampai ?? null,
            'today' => Carbon::now()->format('Y-m-d')
        ]);
    }
}
