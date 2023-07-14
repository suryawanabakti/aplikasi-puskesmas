<?php

namespace App\Http\Middleware;

use App\Models\Obat;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class HasDrugMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */

    public function handle(Request $request, Closure $next)
    {
        $obat =  Obat::first();

        $message = "Maaf, anda tidak bisa membuat obat di karenakan anda
        belum memiliki data obat di sistem. Harap segera membuat minimal 1 obat.";
        $route = "admin.master-data.drugs.create";

        if (!$obat) {
            return redirect()->route('errors.hasNotData', compact('message', 'route'));
        }

        return $next($request);
    }
}
