<?php
/**
 * .
 *
 * (c) 2016 macbookpro
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
namespace App;
/**
 * Class FreeKassa
 *
 * @author Stringnick <wc3info@gmail.com>
 *
 *
 */
class FreeKassa
{
    private $baseUrl = 'http://www.free-kassa.ru/merchant/cash.php?';
    private $isTestMode = false;
    private $data;
    private $merchantId;
    private $secret1;
    private $secret2;
    /**
     * Class constructor.
     */
    public function __construct($merchantId,$secret1,$secret2,$isTestMode = false)
    {
        if ($isTestMode) abort(404);
        $this->secret1 = $secret1;
        $this->secret2 = $secret2;
        $this->merchantId = $merchantId;
        $this->isTestMode = $isTestMode;
    }

    /**
     * @param $id
     * @return $this
     */
    public function setInvoiceId($id)
    {
        $this->data['InvId'] = (int)$id;
        return $this;
    }

    /**
     * @param $summ
     * @return $this
     */
    public function setSum($summ)
    {
        $summ = number_format($summ, 2, '.', '');
        if ($summ > 0) {
            $this->data['OutSum'] = (int)$summ;
            return $this;
        } else {
            abort(403);
        }
    }
    /**
     * @param $description
     * @return $this
     */
    public function setDescription($description)
    {
        $this->data['InvDesc'] = (string) $description;
        return $this;
    }

    /**
     * @return string
     */
    public function getPaymentUrl()
    {
        $sign = md5($this->merchantId.':'.$this->data['OutSum'].':'.$this->secret1.':'.$this->data['InvId']);
        return $this->baseUrl.'m='.$this->merchantId.'&oa='.$this->data['OutSum'].'&o='.$this->data['InvId'].'&s='.$sign;
    }

    /**
     * @param $data
     * @return bool
     */
    public function validateResult($data)
    {
        $hash = md5($data['MERCHANT_ID'].':'.$data['AMOUNT'].':'.$this->secret2.':'.$data['MERCHANT_ORDER_ID']);
        if($hash === strtolower($data['sign'])){
            return true;
        }
        return false;
    }

    /**
     * @return mixed
     */
    public function getInvoiceId()
    {
        return $this->data['InvId'];
    }

    /**
     * @return string
     */
    public function getSuccessAnswer() {
        return 'OK' . $this->getInvoiceId() . "\n";
    }

}
