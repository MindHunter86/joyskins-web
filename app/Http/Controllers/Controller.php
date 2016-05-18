<?php

namespace App\Http\Controllers;

use Auth;
use App\Promo;
use App\Smile;
use LRedis;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;

abstract class Controller extends BaseController
{
    use DispatchesJobs, ValidatesRequests;

    public $user;
    public $redis;
    public $title;

    public function __construct()
    {
        $this->setTitle('Title not stated');
        $god = false;
        if(Auth::check())
        {
            $code = Promo::where('steamid64', Auth::user()->steamid64)->first();
            if(is_null($code)) {
                $code = '';
            } else {
                $code = $code->code;
            }
            $this->user = Auth::user();
            view()->share('u', $this->user);
            view()->share('code', $code);

            $god = $this->isGod();
            /*if($god) {
                $smile = Smile::get();
                view()->share('smiles', $smile);
            }*/
        }
        view()->share('god', $god);
        $this->redis = LRedis::connection();
        view()->share('steam_status', $this->getSteamStatus());
    }

    public function  __destruct()
    {
        $this->redis->disconnect();
    }

    public function setTitle($title)
    {
        $this->title = $title;
        view()->share('title', $this->title);
    }
    public function isGod() {
        if($this->user->is_admin || $this->user->is_moderator || $this->user->is_vip) {
            return true;
        }
        else {
            return false;
        }
    }
    public function getSteamStatus()
    {
        $inventoryStatus = $this->redis->get('steam.inventory.status');
        $communityStatus = $this->redis->get('steam.community.status');

        if($inventoryStatus == 'normal' && $communityStatus == 'normal') return 'good';
        if($inventoryStatus == 'normal' && $communityStatus == 'delayed') return 'normal';
        if($inventoryStatus == 'critical' || $communityStatus == 'critical') return 'bad';
        return 'good';
    }
}
