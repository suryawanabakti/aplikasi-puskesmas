<?php

namespace App\Http\Middleware;

use App\Models\Obat;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class HasDrug
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $obat =  Obat::first();

        if ($obat->isEmpty()) {
            return $next($request);
        }
    }
}
