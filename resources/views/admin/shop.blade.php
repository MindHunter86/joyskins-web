@extends('admin_layout')

@section('content')
<section class="content">
<div class="row">	
  <div class="col-md-12">
      <!-- Horizontal Form -->
      <div class="box box-info">
        <div class="box-header with-border">
          <h3 class="box-title">Покупки в магазине</h3>
        </div><!-- /.box-header -->
        <!-- form start -->
          <div class="box-body">
            <table id="example1" class="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>ID Товара</th>
                    <th>Название</th>
                    <th>Стоимость</th>
                    <th>Покупатель (ID)</th>
                    <th>Дата покупки</th>
                    <th>Статус товара</th>
                  </tr>
                </thead>
                <tbody>

                  @forelse($shop as $sell)
                  <tr>
                    <td><a href="#" class="sendPrize" data-id="{{ $sell->id }}">{{ $sell->id }}</a></td>
                    <td>{{ $sell->name }}</td>
                    <td>{{ $sell->price }}</td>
                    <td>{{ $sell->username }} (<a href="{{ $sell->trade_link }}" target="_blank">{{ $sell->buyer_id }})</a></td>
                    <td>{{ $sell->buy_at }}</td>
                    @if($sell->status == 3)
                      <td><span class="badge bg-green">Отправлен</span></td>
                    @elseif($sell->status == 4)
                      <td><span class="badge bg-red">Ошибка</span></td>
                    @elseif($sell->status == 1)
                      <td><span class="badge bg-yellow">Отправка</span></td>
                    @elseif($sell->status == 5)
                      <td><span class="badge bg-yellow">Возвращен</span></td>
                    @elseif($sell->status == 2)
                      <td><span class="badge bg-red">Ошибка при отправке</span></td>
                    @endif
                  </tr>
                  @empty
                      <center><h1 style="color: #33BDA6;">Проданных товаров нет!</h1></center>
                  @endforelse
                </tbody>
            </table>
          </div><!-- /.box-body -->
      </div><!-- /.box -->
      <!-- general form elements disabled -->
      <!-- /.box -->
  </div>
</div>
</section>
@endsection