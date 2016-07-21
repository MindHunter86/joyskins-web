@extends('admin_layout')

@section('content')
<section class="content">
<div class="row">
	<div class="col-md-6">
      <!-- Horizontal Form -->
      <div class="box box-info">
        <div class="box-header with-border">
          <h3 class="box-title">Повторная отправка выигрыша</h3>
        </div><!-- /.box-header -->
        <!-- form start -->
          <div class="box-body">
            <div class="form-group">
              <label for="sendid" class="col-sm-2 control-label">ID</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" id="sendid" placeholder="ID Игры">
              </div>
            </div>
          </div><!-- /.box-body -->
          <div class="box-footer">
            <button type="submit" class="btn btn-info pull-right sendTrade">Отправить</button>
          </div><!-- /.box-footer -->
      </div><!-- /.box -->
      <!-- general form elements disabled -->
      <!-- /.box -->
    </div>
    <div class="col-md-6">
      <!-- Horizontal Form -->
      <div class="box box-info">
        <div class="box-header with-border">
          <h3 class="box-title">Повторная отправка товара в магазине</h3>
        </div><!-- /.box-header -->
        <!-- form start -->
          <div class="box-body">
            <div class="form-group">
              <label for="sendidshop" class="col-sm-2 control-label">ID</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" id="sendidshop" placeholder="ID товара">
              </div>
            </div>
          </div><!-- /.box-body -->
          <div class="box-footer">
            <button type="submit" class="btn btn-info pull-right sendTradeShop">Отправить</button>
          </div><!-- /.box-footer -->
      </div><!-- /.box -->
      <!-- general form elements disabled -->
      <!-- /.box -->
    </div>
     <div class="col-md-6">
      <!-- Horizontal Form -->
      <div class="box box-info">
        <div class="box-header with-border">
          <h3 class="box-title">Перезагрузка бота: </h3>
        </div><!-- /.box-header -->
        <!-- form start -->
          <div class="box-footer">
            <button type="submit" class="btn btn-info pull-right refreshBot">Перезагрузить</button>
          </div><!-- /.box-footer -->
      </div><!-- /.box -->
      <!-- general form elements disabled -->
      <!-- /.box -->
    </div>
    <div class="col-md-6">
        <!-- Horizontal Form -->
        <div class="box box-info">
            <div class="box-header with-border">
                <h3 class="box-title">Отправить комиссию с бота</h3>
            </div><!-- /.box-header -->
            <!-- form start -->
            <div class="box-body">
                <div class="form-group">
                    <label for="sendidshop" class="col-sm-2 control-label">Tradeoffer:</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="tradeoffer" placeholder="Tradeoffer LINK">
                    </div>
                </div>
            </div><!-- /.box-body -->
            <div class="box-footer">
                <button type="submit" class="btn btn-info pull-right sendComissionItems">Отправить</button>
            </div><!-- /.box-footer -->
        </div><!-- /.box -->
        <!-- general form elements disabled -->
        <!-- /.box -->
    </div>
    <div class="col-md-6">
        <!-- Horizontal Form -->
        <div class="box box-info">
            <div class="box-header with-border">
                <h3 class="box-title">Переотправить офферы за последнюю неделю</h3>
            </div><!-- /.box-header -->
            <div class="box-footer">
                <button type="submit" class="btn btn-info pull-right sendWeekItems">Переотправить</button>
            </div><!-- /.box-footer -->
        </div><!-- /.box -->
        <!-- general form elements disabled -->
        <!-- /.box -->
    </div>
    <div class="col-md-6">
        <!-- Horizontal Form -->
        <div class="box box-info">
            <div class="box-header with-border">
                <h3 class="box-title">Переотправить офферы ДУЭЛЕЙ за последнюю неделю</h3>
            </div><!-- /.box-header -->
            <div class="box-footer">
                <button type="submit" class="btn btn-info pull-right sendWeekDuelItems">Переотправить</button>
            </div><!-- /.box-footer -->
        </div><!-- /.box -->
        <!-- general form elements disabled -->
        <!-- /.box -->
    </div>
</div>
</section>
@endsection