<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Obat;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class SupplierController extends Controller
{
    public function index()
    {
        $suppliers = Supplier::orderBy('nama', 'asc')->paginate(10);
        $obat = Obat::all();
        return Inertia::render('Admin/Suppliers/Index', [
            "suppliers" => $suppliers,
            "obat" => $obat
        ]);
    }

    public function show(Supplier $supplier)
    {
        return Inertia::render('Admin/Suppliers/Show', [
            "supplier" => $supplier
        ]);
    }

    public function destroy(Supplier $supplier)
    {
        $supplier->delete();
        return Redirect::to('/admin/master-data/suppliers');
    }

    public function create()
    {
        return Inertia::render('Admin/Suppliers/Create');
    }

    public function store(Request $request)
    {
        $validatedData =  $request->validate([
            'nama' => 'required|max:255',
            'alamat' => 'required|max:255',
            'kode' => 'required|max:255'
        ]);

        Supplier::create($validatedData);

        return Redirect::to('/admin/master-data/suppliers');
    }
}
