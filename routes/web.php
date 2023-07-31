<?php

use App\Http\Controllers\Admin\DrugController;
use App\Http\Controllers\Admin\DrugInController;
use App\Http\Controllers\Admin\DrugOutController;
use App\Http\Controllers\Admin\GolonganController;
use App\Http\Controllers\Admin\PasienController;
use App\Http\Controllers\Admin\PosyanduController;
use App\Http\Controllers\Admin\SupplierController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\ErrorController;
use App\Http\Controllers\NotifikasiObatKadaluarsa;
use App\Http\Controllers\Pimpinan\LaporanController;
use App\Http\Controllers\ProfileController;
use App\Models\Obat;
use App\Models\ObatKeluar;
use App\Models\ObatMasuk;
use App\Models\Pasien;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redis;
use App\Models\User;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/coba', function () {
});
Route::get('/', function () {
    return Inertia::render('Auth/Login');
});




Route::get('/dashboard', function () {
    $data = [
        "totalPasien" => Pasien::where('type', 'pasien')->count(),
        "totalPosyandu" => Pasien::where('type', 'posyandu')->count(),
        "transaksi" => [
            "totalObatKeluar" => (int)ObatKeluar::sum('jumlah_keluar'),
            "totalObatMasuk" => (int)ObatMasuk::sum('jumlah_masuk'),
        ],
        "totalObat" => Obat::count(),
    ];

    return Inertia::render('Admin/Dashboard', $data);
})->middleware(['auth', 'verified'])->name('dashboard');




Route::middleware('auth')->group(function () {
    Route::group(['middleware' => ['role:admin|super-admin|dokter']], function () {
        Route::get('/admin/users-management', [UserController::class, 'index'])->name('admin.users-management');
        Route::post('/admin/users-management', [UserController::class, 'store'])->name('admin.users-management.store');
        Route::get('/admin/users-management/create', [UserController::class, 'create'])->name('admin.users-management.create');
        Route::delete('/admin/users-management/{user}', [UserController::class, 'destroy'])->name('admin.users-management.destroy');
        Route::get('/admin/users-management/{user}', [UserController::class, 'show'])->name('admin.users-management.show');
        Route::patch('/admin/users-management/{user}/update', [UserController::class, 'update'])->name('admin.users-management.update');
        Route::post('/admin/users-management/profile-update', [UserController::class, 'updateProfile'])->name('admin.users-management.update-profile');
        Route::patch('/admin/users-management/{user}/reset', [UserController::class, 'reset'])->name('admin.users-management.reset');
        Route::get('/admin/users-management/edit/{user}', [UserController::class, 'edit'])->name('admin.users-management.edit');

        Route::get('/admin/master-data/pasien', [PasienController::class, 'index'])->name('admin.master-data.pasien');
        Route::post('/admin/master-data/pasien', [PasienController::class, 'store'])->name('admin.master-data.pasien.store');
        Route::get('/admin/master-data/pasien/create', [PasienController::class, 'create'])->name('admin.master-data.pasien.create');
        Route::get('/admin/master-data/pasien/{pasien}/edit', [PasienController::class, 'edit'])->name('admin.master-data.pasien.edit');
        Route::put('/admin/master-data/pasien/{pasien}', [PasienController::class, 'update'])->name('admin.master-data.pasien.update');
        Route::delete('/admin/master-data/pasien/{pasien}', [PasienController::class, 'destroy'])->name('admin.master-data.pasien.destroy');
        Route::get('/admin/master-data/pasien/{pasien}', [PasienController::class, 'show'])->name('admin.master-data.pasien.show');
        Route::get('/admin/master-data/pasien/edit/{pasien}', [PasienController::class, 'edit'])->name('admin.master-data.pasien.edit');

        Route::get('/admin/master-data/posyandu', [PosyanduController::class, 'index'])->name('admin.master-data.posyandu');
        Route::post('/admin/master-data/posyandu', [PosyanduController::class, 'store'])->name('admin.master-data.posyandu.store');
        Route::post('/admin/master-data/posyandu/{pasien}/edit', [PosyanduController::class, 'store'])->name('admin.master-data.posyandu.edit');
        Route::put('/admin/master-data/posyandu/{pasien}', [PosyanduController::class, 'update'])->name('admin.master-data.posyandu.update');
        Route::get('/admin/master-data/posyandu/create', [PosyanduController::class, 'create'])->name('admin.master-data.posyandu.create');
        Route::delete('/admin/master-data/posyandu/{pasien}', [PosyanduController::class, 'destroy'])->name('admin.master-data.posyandu.destroy');
        Route::get('/admin/master-data/posyandu/{pasien}', [PosyanduController::class, 'show'])->name('admin.master-data.posyandu.show');
        Route::get('/admin/master-data/posyandu/edit/{pasien}', [PosyanduController::class, 'edit'])->name('admin.master-data.posyandu.edit');


        Route::get('/admin/master-data/drugs', [DrugController::class, 'index'])->name('admin.master-data.drugs');
        Route::get('/admin/master-data/drugs-in', [DrugInController::class, 'index'])->name('admin.master-data.drugs-in');
        Route::get('/admin/master-data/drugs-in/create', [DrugInController::class, 'create'])->name('admin.master-data.drugs-in.create');
        Route::get('/admin/master-data/drugs/create', [DrugController::class, 'create'])->name('admin.master-data.drugs.create');
        Route::get('/admin/master-data/drugs/{obat}', [DrugController::class, 'show'])->name('admin.master-data.drugs.show');
        Route::post('/admin/master-data/drugs', [DrugController::class, 'store'])->name('admin.master-data.drugs.store');
        Route::delete('/admin/master-data/drugs/{obat}', [DrugController::class, 'destroy'])->name('admin.master-data.drugs.destroy');
        Route::get('/admin/master-data/drugs/edit/{obat}', [DrugController::class, 'edit'])->name('admin.master-data.drugs.edit');
        Route::patch('/admin/master-data/drugs/{obat}', [DrugController::class, 'update'])->name('admin.master-data.drugs.update');

        Route::get('/admin/master-data/suppliers', [SupplierController::class, 'index'])->name('admin.master-data.suppliers');
        Route::post('/admin/master-data/suppliers', [SupplierController::class, 'store'])->name('admin.master-data.suppliers.store');
        Route::get('/admin/master-data/suppliers/create', [SupplierController::class, 'create'])->name('admin.master-data.suppliers.create');
        Route::delete('/admin/master-data/suppliers/{supplier}', [SupplierController::class, 'destroy'])->name('admin.master-data.suppliers.destroy');
        Route::get('/admin/master-data/suppliers/{user}', [SupplierController::class, 'show'])->name('admin.master-data.suppliers.show');
        Route::get('/admin/master-data/suppliers/edit/{supplier}', [SupplierController::class, 'edit'])->name('admin.master-data.suppliers.edit');

        Route::get('/admin/master-data/golongan', [GolonganController::class, 'index'])->name('admin.master-data.golongan');
        Route::post('/admin/master-data/golongan', [GolonganController::class, 'store'])->name('admin.master-data.golongan.store');
        Route::get('/admin/master-data/golongan/create', [GolonganController::class, 'create'])->name('admin.master-data.golongan.create');
        Route::delete('/admin/master-data/golongan/{golongan}', [GolonganController::class, 'destroy'])->name('admin.master-data.golongan.destroy');
        Route::get('/admin/master-data/golongan/{golongan}', [GolonganController::class, 'show'])->name('admin.master-data.golongan.show');
        Route::get('/admin/master-data/golongan/{golongan}/edit', [GolonganController::class, 'edit'])->name('admin.master-data.golongan.edit');
        Route::patch('/admin/master-data/golongan/{golongan}', [GolonganController::class, 'update'])->name('admin.master-data.golongan.update');

        Route::get('/admin/transaction/drugs-in', [DrugInController::class, 'index'])->name('admin.transaction.drugs-in');
        Route::post('/admin/transaction/drugs-in', [DrugInController::class, 'store'])->name('admin.transaction.drugs-in.store');
        Route::delete('/admin/transaction/drugs-in/{obatMasuk}', [DrugInController::class, 'destroy'])->name('admin.transaction.drugs-in.destroy');
        Route::get('/admin/transaction/drugs-in/create', [DrugInController::class, 'create'])->name('admin.transaction.drugs-in.create')->middleware('hasDrug');

        Route::get('/admin/transaction/drugs-out', [DrugOutController::class, 'index'])->name('admin.transaction.drugs-out');
        Route::get('/admin/transaction/drugs-out/dokter', [DrugOutController::class, 'indexDokter'])->name('admin.transaction.drugs-out.dokter');
        Route::get('/admin/transaction/drugs-out/pasien/{term}', [DrugOutController::class, 'getPasien'])->name('admin.transaction.drugs-out.getpasien');
        Route::post('/admin/transaction/drugs-out', [DrugOutController::class, 'store'])->name('admin.transaction.drugs-out.store');
        Route::post('/admin/transaction/drugs-out/addkeranjang', [DrugOutController::class, 'addKeranjang'])->name('admin.transaction.drugs-out.addkeranjang');
        Route::get('/admin/transaction/drugs-out/keranjang/delete/{keranjang}', [DrugOutController::class, 'deleteKeranjang'])->name('admin.transaction.drugs-out.deletekeranjang');
        Route::get('/admin/transaction/drugs-out/create', [DrugOutController::class, 'create'])->name('admin.transaction.drugs-out.create')->middleware('hasDrug');
        Route::delete('/admin/transaction/drugs-out/{obatKeluar}', [DrugOutController::class, 'destroy'])->name('admin.transaction.drugs-out.destroy');

        Route::get('/admin/laporan/drugs-expired', [LaporanController::class, 'obatKadaluarsa'])->name('admin.laporan.drugs-expired');
        Route::get('/admin/laporan/drugs-expired/export', [LaporanController::class, 'exportObatKadaluarsa'])->name('admin.laporan.drugs-expired.export');
        Route::get('/admin/laporan/drugs-in', [LaporanController::class, 'obatMasuk'])->name('admin.laporan.drugs-in');
        Route::get('/admin/laporan/drugs-in/export', [LaporanController::class, 'exportObatMasuk'])->name('admin.laporan.drugs-in.export');
        Route::get('/admin/laporan/drugs-out', [LaporanController::class, 'obatKeluar'])->name('admin.laporan.drugs-out');
        Route::get('/admin/laporan/drugs-out/export', [LaporanController::class, 'exportObatKeluar'])->name('admin.laporan.drugs-out.export');

        Route::get('/admin/notifikasi/obat-kadaluarsa', [NotifikasiObatKadaluarsa::class, 'index'])->name('admin.notifikasi.obat-kadaluarsa');
        Route::get('/admin/notifikasi/obat-kadaluarsa/count', [NotifikasiObatKadaluarsa::class, 'count'])->name('admin.notifikasi.obat-kadaluarsa.count');
    });

    Route::group(['middleware' => ['role:super-admin|pimpinan|admin']], function () {
        Route::get('/pimpinan/laporan/drugs-expired', [LaporanController::class, 'obatKadaluarsa'])->name('pimpinan.laporan.drugs-expired');
        Route::get('/pimpinan/laporan/drugs-expired/export', [LaporanController::class, 'exportObatKadaluarsa'])->name('pimpinan.laporan.drugs-expired.export');


        Route::get('/pimpinan/laporan/drugs-in', [LaporanController::class, 'obatMasuk'])->name('pimpinan.laporan.drugs-in');
        Route::get('/pimpinan/laporan/drugs-in/export', [LaporanController::class, 'exportObatMasuk'])->name('pimpinan.laporan.drugs-in.export');

        Route::get('/pimpinan/laporan/drugs-out', [LaporanController::class, 'obatKeluar'])->name('pimpinan.laporan.drugs-out');
        Route::get('/pimpinan/laporan/drugs-out/export', [LaporanController::class, 'exportObatKeluar'])->name('pimpinan.laporan.drugs-out.export');
    });



    Route::get('/admin/verification/drugs-in', [UserController::class, 'index'])->name('admin.verification.drugs-in');

    Route::get('/support', [UserController::class, 'support'])->name('support');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/errors/has-not-data', [ErrorController::class, 'hasNotData'])->name('errors.hasNotData');
});

require __DIR__ . '/auth.php';
