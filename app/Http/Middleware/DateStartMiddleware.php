<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class DateStartMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, $startDate)
    {
        $currentDate = now()->format('Y-m-d');

        if ($currentDate < $startDate) {
            return to_route('dashboard');
        }

        return $next($request);
    }
}
