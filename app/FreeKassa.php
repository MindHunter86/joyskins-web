<?php

namespace App;

class FreeKassa
{
    private $baseUrl = 'http://www.free-kassa.ru/merchant/cash.php?';
    private $isTestMode = false;
    private $data;
    private $merchantId;
    private $secret1;
    private $secret2;



    public function __construct($merchantId,$secret1,$secret2,$isTestMode = false)
    {
        $this->secret1 = $secret1;
        $this->secret2 = $secret2;
        $this->merchantId = $merchantId;
        $this->isTestMode = $isTestMode;
    }
    public function setInvoceId()
    {
        $this->data['InvId'] = (int) $id;
        return $this;
    }
    public function setSum($summ)
    {
        $summ = number_format($summ, 2, '.', '');
        if ($summ > 0) {
            $this->data['OutSum'] = $summ;
            return $this;
        } else {
            abort(403);
        }
    }
    public function setDescription($description)
    {
        $this->data['InvDesc'] = (string) $description;
        return $this;
    }
    public function getPaymentUrl()
    {
        $sign = md5($this->merchantId.':'.$this->data['OutSum'].':'.$this->secret1.':'.$this->data['InvId']);
        return $this->baseUrl.'m='.$this->merchantId.'&oa='.$this->data['OutSum'].'&o='.$this->data['InvId'].'&s='.$sign;
    }
    public function validateResult($data)
    {
        $hash = md5($data['MERCHANT_ID'].':'.$data['AMOUNT'].':'.$this->secret2.':'.$data['MERCHANT_ORDER_ID']);
        if($hash === strtolower($data['sign'])){
            return true;
        }
        return false;
    }
    public function getInvoiceId()
    {
        return $this->data['InvId'];
    }
    
    public function getSuccessAnswer() {
        return 'OK' . $this->getInvoiceId() . "\n";
    }

}
