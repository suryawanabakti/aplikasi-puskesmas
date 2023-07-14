<?php

namespace App\Http\Controllers;

use App\Models\Obat;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ErrorController extends Controller
{
    public function hasNotData(Request $request)
    {

        return Inertia::render('Admin/Errors/HasNotData', [
            "message" => $request->message,
            "urlRoute" => $request->route,
        ]);
    }
}
