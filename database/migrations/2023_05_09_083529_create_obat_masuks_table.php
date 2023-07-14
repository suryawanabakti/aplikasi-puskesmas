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
        Schema::create('obat_masuk', function (Blueprint $table) {
            $table->id();
            $table->string('invoice');
            $table->unsignedBigInteger('supplier_id');
            $table->foreign('supplier_id')->references('id')->on('supplier')->cascadeOnDelete();
            $table->unsignedBigInteger('obat_id');
            $table->foreign('obat_id')->references('id')->on('obat')->cascadeOnDelete();
            $table->date('tanggal_masuk');
            $table->integer('jumlah_masuk');
            $table->bigInteger('jumlah_bayar'); // jumlah_masuk * harga_beli
            $table->text('keterangan')->nullable();
            $table->date('tanggal_kadaluarsa');
            $table->enum('status', ['terima', 'tolak']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('obat_masuks');
    }
};
