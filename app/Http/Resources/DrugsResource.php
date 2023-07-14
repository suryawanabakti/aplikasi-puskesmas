<?php

namespace App\Http\Resources;

use App\Models\ObatMasuk;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DrugsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $obatMasuk = ObatMasuk::where('obat_id', $this->id)->orderBy('created_at', 'desc')->first();
        !empty($obatMasuk) ? $expired30Days = $obatMasuk->tanggal_kadaluarsa <= Carbon::now()->addDay(30)->format('Y-m-d') : $expired30Days = $this->kadaluarsa <= Carbon::now()->addDay(30)->format('Y-m-d');

        return [
            "value" => $this->id,
            "label" => $this->kode . " - " . $this->nama,
            "harga_beli" => $this->harga_beli,
            'harga_jual' =>  $this->harga_jual,
            'kode' => $this->kode,
            'nama' => $this->nama,
            'golongan' => $this->golongan->nama,
            "stok" => $this->stok,
            "expired_at" => !empty($obatMasuk) ? $obatMasuk->tanggal_kadaluarsa : $this->kadaluarsa,
            '30Terakhir' => Carbon::now()->addDay(30)->format('Y-m-d'),
            'kadaluarsa30HariLagi' => $expired30Days,
        ];
    }
}
