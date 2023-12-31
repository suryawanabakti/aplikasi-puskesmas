<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('obat_keluar', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')->cascadeOnDelete();
            $table->string('invoice');
            $table->unsignedBigInteger('obat_id');
            $table->foreign('obat_id')->references('id')->on('obat')->cascadeOnDelete();
            $table->unsignedBigInteger('pasien_id')->nullable();
            $table->foreign('pasien_id')->references('id')->on('pasien');
            $table->string('nama_pasien')->nullable();
            $table->date('tanggal_keluar');
            $table->integer('jumlah_keluar');
            $table->integer('jumlah_bayar'); // jumlah keluar * harga jual
            $table->text('keterangan')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('obat_keluars');
    }
};
