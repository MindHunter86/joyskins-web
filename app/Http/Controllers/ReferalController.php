<?php

namespace App\Http\Controllers;

use App\User;
use App\Promo;
use Auth;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;


class ReferalController extends Controller {
    public function accept(Request $request) {
        $code = $request->get('code');
        if(!$request->has('code')) {
            return response()->json(['success' => false, 'text' => 'Невозможно активировать данный промо код!']);
        }
        if(!empty(strlen(Auth::user()->promo))) {
            return response()->json(['success' => false, 'text' => 'Вы уже активировали промо код']);
        }
        $codes = Promo::where('code', $code)->first();
        if(is_null($codes)) {
            return response()->json(['success' => false, 'text' => 'Данный промо код не найден']);
        }
        if($codes->steamid64 == Auth::user()->steamid64) {
            return response()->json(['success' => false, 'text' => 'Вы не можете активировать свой промо код']);
        }
        Auth::user()->promo = $codes->code;
        Auth::user()->promo_owner = $codes->steamid64;
        Auth::user()->money = Auth::user()->money + $codes->money;
        Auth::user()->save();
        return response()->json(['success' => true, 'text' => 'Вы успешно активировали промо код']);
    }

    public function create(Request $request) {
        $code = $request->get('code');
        if(!$request->has('code')) {
            return response()->json(['success' => false, 'text' => 'Невозможно создать данный промо код!']);
        }
        $codes = Promo::where('code', $code)->first();
        if(!is_null($codes)) {
            return response()->json(['success' => false, 'text' => 'Данный промо код уже занят. Попробуйте придумать другой']);
        }
        $promo = Promo::where('steamid64', Auth::user()->steamid64)->first();
        if(is_null($promo)) {
            Promo::create([
                'steamid64' => Auth::user()->steamid64,
                'code' => $code,
                'money' => 15,
                'type' => 0
            ]);
        } else {
            $promo->code = $code;
            $promo->save();
        }
        return response()->json(['success' => true, 'text' => 'Промо код '.$code.' успешно создан. Поделитесь им с друзьями, чтобы они получили 15 рублей на свой баланс']);
    }    
}
