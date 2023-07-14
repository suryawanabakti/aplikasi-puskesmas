<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DrugsOutResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "invoice" => $this->invoice,
            "tanggal_keluar" => $this->tanggal_keluar,
            "kode" => $this->obat->kode,
            "nama_obat" => $this->obat->nama,
            "nama_pasien" => $this->pasien->nama,
            "jumlah_keluar" => $this->jumlah_keluar,
            "golongan" => $this->obat->golongan->nama,
        ];
    }
}
