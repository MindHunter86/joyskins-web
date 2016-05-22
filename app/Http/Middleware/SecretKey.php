<?php

namespace App\Http\Middleware;

use Closure; 

class SecretKey
{
    const SECRET_KEY = 'GDDrHk76e2n8kwcYtLrbht9ETg2yGC3L';
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if($request->get('secretKey') != self::SECRET_KEY) return response()->json('Invalid Secret Key');
        return $next($request);
    }
}
