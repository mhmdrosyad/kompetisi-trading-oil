<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class DateRangeMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next,  $startDate, $endDate): Response
    {
        $currentDate = now()->format('Y-m-d');
        if ($currentDate < $startDate || $currentDate > $endDate) {
            return to_route('login');
        }
        return $next($request);
    }
}
