<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\Payment;
use App\Order;
use App\User;
use Config;

class DonateController extends Controller
{
    public function payment(Request $request)
    {
        dd($request);
        $payment = new Payment(
            Config::get('robokassa.login'), Config::get('robokassa.password1'), Config::get('robokassa.password2'), Config::get('robokassa.testmode')
        );
        $getarray = array(
            'OutSum' => $request->get('OutSum'),
            'InvId' => $request->get('InvId'),
            'SignatureValue' => $request->get('SignatureValue'),
            'PaymentMethod' => $request->get('PaymentMethod'),
            'IncSum' => $request->get('IncSum')
        );
        if ($payment->validateResult($getarray)) {
            $order = Order::find($payment->getInvoiceId());

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
        $payment = new Payment(
            Config::get('robokassa.login'), Config::get('robokassa.password1'), Config::get('robokassa.password2'), Config::get('robokassa.testmode')
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
        return redirect(Config::get('robokassa.url'));
    }
    public function fail() {
        return redirect(Config::get('robokassa.url'));
    }
}
