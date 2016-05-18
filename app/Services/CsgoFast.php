<?php 
namespace App\Services;

use App\Http\Controllers\GameController;
use App\Http\Controllers\SteamController;
use Exception;

class CsgoFast {
	const DOLLAR = 66;

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
            if(isset($price))
                $this->price = round($price*self::DOLLAR, 2);
        }else{
            $this->_setToFalse();
        }
    }

    public function getItemPrice() {
        try{
		    $json = file_get_contents(__DIR__.'/fast.json');
		    $json = json_decode($json);
	        $items = $json;
	        if($items) 
	            return $items->{$this->market_hash_name};
	        else
	        	return false;
        }catch(Exception $e){
            return false;
        }
    }

    public function getItemRarity($info) {
        $type = $info['type'];
        $rarity = '';


        /*$arr = explode(',',$type);

        if (count($arr) == 2) $type = trim($arr[1]);
        if (count($arr) == 3) $type = trim($arr[2]);
        if (count($arr) && $arr[0] == 'Нож') $type = '★';*/
        $types = array("StatTrak™ "," Pistol", " SMG", " Rifle", " Shotgun", " Sniper Rifle", " Machinegun", " Container", " Knife", " Sticker", " Music Kit", " Key", " Pass", " Gift", " Tag", " Tool");
        $typesrep = array("", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "");
        $type = str_replace($types, $typesrep, $type);

        switch ($type) {
            case 'Mil-Spec Grade':      $rarity = 'milspec'; break;
            case 'Restricted':             $rarity = 'restricted'; break;
            case 'Classified':           $rarity = 'classified'; break;
            case 'Covert':                  $rarity = 'covert'; break;
            case 'Consumer Grade':               $rarity = 'common'; break;
            case 'Industrial Grade':   $rarity = 'common'; break;
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
