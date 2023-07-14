<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PasienResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'value' => $this->id,
            'label' => $this->nama,
            'id' => $this->id,
            'nama' => $this->nama,
            'alamat' => $this->alamat,
            'no_telepon' => $this->no_telepon,
            'jenis_kelamin' => $this->jenis_kelamin,
            'nik' => $this->nik,
            'no_rm' => $this->no_rm,
        ];
    }
}
