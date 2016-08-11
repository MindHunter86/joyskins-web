@extends('admin_layout')
@section('content')
    <style>
        .lotteryItem{
            display: inline-block;
            width: 45px;
            height: 45px;
        }
        .choosen {
            padding: 5px;
            background-color: #00a7d0;
        }
    </style>
    <script>
        $(document).on('ready',function() {
            $(document).on('click','.lotteryItem:not(.choosen)',function () {
                $(this).addClass('choosen');
            });
            $(document).on('click','.choosen',function () {
                $(this).removeClass('choosen');
            });
            $(document).on('click','#btn-add-bonus',function(){
                var items = [];
                $('.choosen').each(function(){
                    items.push({
                        classid:$(this).data('id'),
                        price: $(this).data('price'),
                        market_hash_name: $(this).data('market'),
                        name: $(this).data('name')
                    });
                });
                $.ajax({
                    url: '/admin/addBonus',
                    data: { items: items},
                    type: 'POST',
                    dataType: 'json',
                    success: function () {
                        alert('Добавили бонусы, обновите стр.!');
                    },
                    error: function () {
                        alert('Ошибка при добавлении');
                    }
                });
            });
            $(document).on('click','#newLottery',function(){
                $.ajax({
                    url: '/admin/newLottery',
                    type: 'GET',
                    dataType: 'json',
                    success: function(data){
                        alert('Успешно поставили новую лоттерею');
                        alert(data);
                    },
                    error: function(){
                        alert('Ошибка AJAX');
                    }
                });
            });
        });
    </script>
    <div id="bot_inventory">

        <form class="col-md-6">
            <h3>Текущая лотерея:</h3>
            <div class="form-group">
                <label for="exampleInputEmail1">ID</label>
                <input type="text" class="form-control" id="id" value="{{$lottery['id']}}">
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Статус лотереи:(0 - не началась,1 - статус идет, 2 - перед концом, 3 - закончилась, 4 - ошибка) </label>
                <input type="text" class="form-control" id="status" value="{{$lottery['status']}}">
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Предмет:</label>
                <?php $item = $lottery['items'];
                $item = json_decode($item,true);?>
                <img style="width: 25px;height: 25px;" src="https://steamcommunity-a.akamaihd.net/economy/image/class/730/{{ $item['classid'] }}/120fx100f" alt="" class="img-responsive">
                <label for="exampleInputPassword1">Цена:</label> <input type="text" class="form-control" id="item_price" value="{{$item['price']}}"><br>
                <label for="exampleInputPassword1">Имя:</label> <input type="text" class="form-control" id="item_name" value="{{$item['name']}}">
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Игроков {{$lottery['players']}}/{{$lottery['max']}}</label>
                <input type="text" class="form-control" id="max" value="{{$lottery['max']}}">
            </div>
            <button type="submit" class="btn btn-default">Сохранить</button><br>
            <button id="newLottery" class="btn btn-info btn-block">Поставить новую лоттерею из бонуса</button>
        </form>

        <table class="table">
            <caption>Доступные бонусы:</caption>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Название</th>
                    <th>Цена</th>
                    <th>Превью</th>
                </tr>
            </thead>
            <tbody>
            @foreach(\App\Bonus::get() as $bonus)
                <tr>
                    <th scope="row">{{$bonus->id}}</th>
                    <td>{{$bonus->market_hash_name}}</td>
                    <td>{{$bonus->price}}</td>
                    <td> <img style="width: 25px;height: 25px;" src="https://steamcommunity-a.akamaihd.net/economy/image/class/730/{{ $bonus->classid }}/120fx100f" alt="" class="img-responsive"></td>
                </tr>
            @endforeach
           </tbody>
        </table>
        <h1>Инвентарь бота(выберите предметы для добавления в бонусы):</h1>
       @foreach($items['rgDescriptions'] as $id=>$item)
            <img class="lotteryItem" data-id="{{$item['classid']}}" data-name="{{$item['name']}}" data-market="{{$item['market_hash_name']}}" data-price="{{$item['price']}}" src="https://steamcommunity-a.akamaihd.net/economy/image/class/730/{{ $item['classid'] }}/120fx100f" alt="" class="img-responsive">
           @endforeach
        <button style="margin-left: 10px; margin-right: 10px;" id="btn-add-bonus" class="btn btn-info btn-xs-3">Добавить</button>
    </div>
@endsection