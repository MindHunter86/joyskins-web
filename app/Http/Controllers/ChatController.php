<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use LRedis;

class ChatController extends Controller
{
    const CHAT_CHANNEL = 'chat.message';

    public function __construct()
    {
        parent::__construct();
        $this->redis = LRedis::connection();
    }
    public function  __destruct()
    {
        $this->redis->disconnect();
    }

    public function chatMessage(Request $request)
    {
        $message = $this->_validateMessage($request);
        if(\Cache::has('ban_chat_'.$this->user->id))
            return response()->json(['Вы заблокированы в чате!']);
        if(\Cache::has('last_chat_message_' . $this->user->id))
            return response()->json(['Вы слишком часто отправляете сообщения!'], 422);
        \Cache::put('last_chat_message_' . $this->user->id, '', 0.1);               // 6 seconds

        $user = $this->user;
        $time = date('H:i:s', time());
        $value = view('includes.chatMessage', compact('message', 'time', 'user'))->render();
        $this->redis->publish(self::CHAT_CHANNEL, $value);
        return $value;
    }

    private function _validateMessage($request)
    {
        $val = \Validator::make($request->all(), [
            'message' => 'required|string|max:255'
        ],[
            'required' => 'Сообщение не может быть пустым!',
            'string' => 'Сообщение должно быть строкой!',
            'max' => 'Максимальный размер сообщения 255 символов.',
        ]);
        if($val->fails())
            $this->throwValidationException($request, $val);

        return $request->get('message');
    }
}
