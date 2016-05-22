<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\FreeKassa;
use App\Order;
use App\User;
use Config;

class DonateController extends Controller
{
    public function payment(Request $request)
    {
        $payment = new FreeKassa(
            Config::get('FreeKassa.merchant_id'), Config::get('FreeKassa.secret1'), Config::get('FreeKassa.secret2'), Config::get('FreeKassa.testmode')
        );
        $getarray = array(
            'MERCHANT_ID' => $request->get('MERCHANT_ID'),
            'AMOUNT' => $request->get('AMOUNT'),
            'intid' => $request->get('intid'),
            'MERCHANT_ORDER_ID' => $request->get('MERCHANT_ORDER_ID'),
            'p_email' => $request->get('P_EMAIL'),
            'sign' => $request->get('SIGN')
        );
        
        if ($payment->validateResult($getarray)) {
            $order = Order::find($getarray['MERCHANT_ORDER_ID']);

            if (($payment->getSum() == $order->amount) && ($order->status == 0)) {
                $order->status = 1;
                $order->save();
                $user = User::find($order->user_id);
                $user->money = $user->money + $order->amount;
                $user->save();
                return $payment->getSuccessAnswer(); // "OK1254487\n"
            }
            return 'Error payment';
        }
        return 'Error validate Result';
    }
    public function merchant(Request $request) {
        $payment = new FreeKassa(
            Config::get('FreeKassa.merchant_id'), Config::get('FreeKassa.secret1'), Config::get('FreeKassa.secret2'), Config::get('FreeKassa.testmode')
        );
        $user = $this->user;
        if($request->get('sum') < 1) {
            return response()->json(['msg' =>'сумма не может быть меньше 0', 'status' => 'error']);
        }
        $order = Order::create([
            'user_id' => $user->id,
            'amount' => $request->get('sum'),
            'status' => 0
        ]);
        $payment
            ->setInvoiceId($order->id)
            ->setSum($order->amount)
            ->setDescription('Пополнение счета ItemUp.Ru. (ID: '.$order->user_id.')');
        return response()->json(['url' => $payment->getPaymentUrl(), 'status' => 'success']);
    } 
    public function success() {
        return redirect(Config::get('FreeKassa.url'));
    }
    public function fail() {
        return redirect(Config::get('FreeKassa.url'));
    }
}
