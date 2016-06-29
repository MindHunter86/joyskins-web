<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class DuelController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function currentDuels()
    {

        Referer::referer();
        $lottery = Lottery::where('status', 0)->orderBy('id', 'desc')->first();
        if(!is_null($lottery)) {
            $lottery->items = json_decode($lottery->items);
            $players = $lottery->players()->with(['user','lottery'])->get()->sortByDesc('created_at');
        }
        return view('pages.duels', compact('lottery', 'players'));
    }
}
