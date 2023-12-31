<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ObatKeluar extends Model
{
    use HasFactory;

    public $table = "obat_keluar";

    protected $guarded = ['id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function obat()
    {
        return $this->belongsTo(Obat::class, 'obat_id', 'id');
    }
    public function keranjang()
    {
        return $this->hasMany(Keranjang::class, 'obat_keluar_id', 'id');
    }

    public function pasien()
    {
        return $this->belongsTo(Pasien::class, 'pasien_id', 'id');
    }
}
