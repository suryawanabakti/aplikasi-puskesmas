<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DrugsInResource extends JsonResource
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
            "tanggal_masuk" => $this->tanggal_masuk,
            "kode" => $this->obat->kode,
            "nama" => $this->obat->nama,
            "jumlah_masuk" => $this->jumlah_masuk,
            "golongan" => $this->obat->golongan->nama,
        ];
    }
}
