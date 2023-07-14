<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Obat extends Model
{
    use HasFactory;

    public $table = "obat";

    protected $guarded = ['id'];

    public function getRouteKeyName()
    {
        return 'kode';
    }

    public function golongan()
    {
        return $this->belongsTo(Golongan::class);
    }

    public function obatMasuk()
    {
        return $this->hasMany(ObatMasuk::class);
    }
}
