<?php namespace App\Services;

use App\Http\Controllers\GameController;
use App\Http\Controllers\SteamController;
use Exception;

class SteamItem {

    const STEAM_PRICE_URL = 'http://steamcommunity.com/market/priceoverview/?appid=730&currency=5&market_hash_name=';
    //const STEAM_ITEM_URL = 'http://api.steampowered.com/ISteamEconomy/GetAssetClassInfo/v0001?key=%s&format=json&language=en&appid='.GameController::APPID.'&class_count=2&classid0=0&classid1=%s';

    public  $classid;
    public  $name;
    public  $market_hash_name;
    public  $price;
    public  $rarity;

    public function __construct($info)
    {
        $this->classid = !isset($info['classid']) ? $info['classId'] : $info['classid'];
        $this->name = $info['name'];
        $this->market_hash_name = $info['market_hash_name'];
        $this->rarity = isset($info['rarity']) ? $info['rarity'] : $this->getItemRarity($info);
        if ($price = $this->getItemPrice()) {
            if(isset($price->lowest_price))
                $this->price = floatval(str_replace(',', '.', substr($price->lowest_price, 0, -7)));
            else
                $this->price = floatval(str_replace(',', '.', substr($price->median_price, 0, -7)));
        }else{
            $this->_setToFalse();
        }
    }

    public function getItemPrice() {
        try{
            $json = file_get_contents(self::STEAM_PRICE_URL . urlencode($this->market_hash_name));
            $json = json_decode($json, true);
            if($json['success'])
                return (object) $json;
            else
                return false;
        }catch(Exception $e){
            return false;
        }
    }
/*
    public function getItemInfo() {
        $json = file_get_contents(sprintf(self::STEAM_ITEM_URL, SteamController::steamApiKey, $this->classid));
        $json = json_decode($json, true);
        if($json["result"]['success'])
            return (object) $json["result"][$this->classid];
        else
            return false;
    }
*/

    public function getItemRarity($info) {
        $type = $info['type'];
        $rarity = '';
        $arr = explode(',',$type);
        if (count($arr) == 2) $type = trim($arr[1]);
        if (count($arr) == 3) $type = trim($arr[2]);
        if (count($arr) && $arr[0] == 'Нож') $type = '★';
        switch ($type) {
            case 'Армейское качество':      $rarity = 'milspec'; break;
            case 'Запрещенное':             $rarity = 'restricted'; break;
            case 'Засекреченное':           $rarity = 'classified'; break;
            case 'Тайное':                  $rarity = 'covert'; break;
            case 'Ширпотреб':               $rarity = 'common'; break;
            case 'Промышленное качество':   $rarity = 'common'; break;
            case '★':                       $rarity = 'rare'; break;
        }

        return $rarity;
    }

    private function _setToFalse()
    {
        $this->name = false;
        $this->price = false;
        $this->rarity = false;
    }
}