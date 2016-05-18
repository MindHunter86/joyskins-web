<?php namespace App\Services\Unitpay;

use Config;
use Illuminate\Http\Request;

class UnitPay
{
    private $event;

    public function __construct(UnitPayEvent $event, Request $request)
    {
        $this->event = $event;
        $this->request = $request;
    }

    public function getResult()
    {
        $request = $this->request->all();

        if (empty($request['method'])
            || empty($request['params'])
            || !is_array($request['params'])
        )
        {
            return $this->getResponseError('Invalid request');
        }

        $method = $request['method'];
        $params = $request['params'];

        if ($params['sign'] != $this->getMd5Sign($params, Config::get('unitpay.secretkey')))
        {
            return $this->getResponseError('Incorrect digital signature');
        }

        $unitPayModel = UnitPayModel::getInstance();

        if ($method == 'check')
        {
            if ($unitPayModel->getPaymentByUnitpayId($params['unitpayId']))
            {
                // Платеж уже существует
                return $this->getResponseSuccess('Payment already exists');
            }

            if (!$unitPayModel->createPayment(
                $params['unitpayId'],
                $params['account'],
                $params['sum'],
                1
            ))
            {
                return $this->getResponseError('Unable to create payment database');
            }

            $checkResult = $this->event->check($params);
            if ($checkResult !== true)
            {
                return $this->getResponseError($checkResult);
            }

            return $this->getResponseSuccess('CHECK is successful');
        }

        if ($method == 'pay')
        {
            $payment = $unitPayModel->getPaymentByUnitpayId(
                $params['unitpayId']
            );

            if ($payment && $payment->status == 1)
            {
                return $this->getResponseSuccess('Payment has already been paid');
            }

            if (!$unitPayModel->confirmPaymentByUnitpayId($params['unitpayId']))
            {
                return $this->getResponseError('Unable to confirm payment database');
            }

            $this->event
                ->pay($params);

            return $this->getResponseSuccess('PAY is successful');
        }

	return $this->getResponseError($method.' not supported');
    }

    private function getResponseSuccess($message)
    {
        return response()->json(array(
            "jsonrpc" => "2.0",
            "result" => array(
                "message" => $message
            ),
            'id' => 1,
        ));
    }

    private function getResponseError($message)
    {
        return response()->json(array(
            "jsonrpc" => "2.0",
            "error" => array(
                "code" => -32000,
                "message" => $message
            ),
            'id' => 1
        ));
    }

    private function getMd5Sign($params, $secretKey)
    {
        ksort($params);
        unset($params['sign']);
        return md5(join(null, $params).$secretKey);
    }
}
