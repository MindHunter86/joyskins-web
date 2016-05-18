<?php namespace App\Services\Unitpay;

use DB;
use App\User;

class UnitPayModel
{

    static function getInstance()
    {
        return new self();
    }

    function createPayment($unitpayId, $account, $sum, $itemsCount)
    {
        return DB::table('unitpay')->insert([
            'unitpayId' => $unitpayId,
            'account' => $account,
            'sum' => $sum,
            'itemsCount' => $itemsCount,
            'dateCreate' => time(),
            'status' => 0,
        ]);
    }

    function getPaymentByUnitpayId($unitpayId)
    {
        return DB::table('unitpay')->where('unitpayId',$unitpayId)->first();
    }

    function confirmPaymentByUnitpayId($unitpayId)
    {
        return DB::table('unitpay')->where('unitpayId',$unitpayId)->update([
            'status' => 1,
            'dateComplete' => time(),
        ]);
    }
    
    function getAccountByName($account)
    {
        return User::find($account);
    }
    
    function donateForAccount($account, $count)
    {
        $user = User::find($account);
        $user->money = $user->money + $count;
        $user->save();
    }
}