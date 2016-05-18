<div id="bet_{{ $bet->id }}" class="items-info">
  <div class="items-ava"><img data-profile="{{ $bet->user->steamid64 }}" src="{{ $bet->user->avatar }}" alt="" /></div>
  <div class="items-in">
    <div class="items-panel">
      <div class="left"><a style="color:#3faa5d;" class="username" data-profile="{{ $bet->user->steamid64 }}" href="#">{{ $bet->user->username }}</a> внес {{ $bet->itemsCount }} {{ trans_choice('lang.items', $bet->itemsCount) }} ({{ $bet->price }} руб) <b style="color:#ea8314;" class="chance_{{ $bet->user->steamid64 }}">({{ \App\Http\Controllers\GameController::_getUserChanceOfGame($bet->user, $bet->game) }} %)</b></div>
      <div class="right"><b>Билет от</b> #{{ $bet->from }} до #{{ $bet->to }}</div>
    </div>
    @foreach(json_decode($bet->items) as $i)
    <div class="myitem @if(!isset($i->img)){{ $i->rarity }} @else card @endif" data-toggle="tooltip" data-original-title="{{ $i->name }}">
      <div class="myitem_images">
      @if(!isset($i->img))
        <img src="https://steamcommunity-a.akamaihd.net/economy/image/class/{{ \App\Http\Controllers\GameController::APPID }}/{{ $i->classid }}/200fx200f" alt="" />
      @else
        <img src="{{ $i->img }}" alt="" />
      @endif
      </div>
      <div class="myitem_rub">{{ $i->price }} <span>руб</span></div>
    </div>
    @endforeach
  </div>
</div>
