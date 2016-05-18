<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Админ Панель</title>
    <meta name="csrf-token" content="{!!  csrf_token()   !!}">
    <!-- Tell the browser to be responsive to screen width -->
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <!-- Bootstrap 3.3.5 -->
    <link rel="stylesheet" href="{{ asset('assets/admin/bootstrap/css/bootstrap.min.css') }}">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
    <!-- Ionicons -->
    <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
    <!-- Theme style -->
    <link rel="stylesheet" href="{{ asset('assets/admin/dist/css/AdminLTE.min.css') }}">
    <!-- AdminLTE Skins. Choose a skin from the css/skins
         folder instead of downloading all of them to reduce the load. -->
    <link rel="stylesheet" href="{{ asset('assets/admin/dist/css/skins/_all-skins.min.css') }}">
    <!-- iCheck -->
    <link rel="stylesheet" href="{{ asset('assets/admin/plugins/iCheck/flat/blue.css') }}">
    <!-- Morris chart -->
    <link rel="stylesheet" href="{{ asset('assets/admin/plugins/morris/morris.css') }}">

    <link rel="stylesheet" href="{{ asset('assets/admin/plugins/datatables/dataTables.bootstrap.css') }}">
    <!-- jvectormap -->
    <link rel="stylesheet" href="{{ asset('assets/admin/plugins/jvectormap/jquery-jvectormap-1.2.2.css') }}">
    <!-- Date Picker -->
    <link rel="stylesheet" href="{{ asset('assets/admin/plugins/datepicker/datepicker3.css') }}">
    <!-- Daterange picker -->
    <link rel="stylesheet" href="{{ asset('assets/admin/plugins/daterangepicker/daterangepicker-bs3.css') }}">
    <!-- bootstrap wysihtml5 - text editor -->
    <link rel="stylesheet" href="{{ asset('assets/admin/plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.min.css') }}">

    <script src="{{ asset('assets/admin/plugins/jQuery/jQuery-2.1.4.min.js') }}"></script>
    <script src="https://code.jquery.com/ui/1.11.4/jquery-ui.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/raphael/2.1.0/raphael-min.js"></script>
    <script src="{{ asset('assets/admin/plugins/datatables/jquery.dataTables.min.js') }}"></script>
    <script src="{{ asset('assets/admin/plugins/datatables/dataTables.bootstrap.min.js') }}"></script>
    <script src="{{ asset('assets/admin/plugins/morris/morris.min.js') }}"></script>
    <script src="{{ asset('assets/admin/bootstrap/js/bootstrap.min.js') }}"></script>
    <script src="{{ asset('assets/admin/dist/js/ajax.js') }}"></script>

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
        <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body class="hold-transition skin-blue sidebar-mini">
    <div class="wrapper">
        <header class="main-header">
        <!-- Logo -->
        <a href="/admin" class="logo">
          <!-- mini logo for sidebar mini 50x50 pixels -->
          <span class="logo-mini"><b>i</b>a</span>
          <!-- logo for regular state and mobile devices -->
          <span class="logo-lg"><b>itemup</b>admin</span>
        </a>
        <!-- Header Navbar: style can be found in header.less -->
        <nav class="navbar navbar-static-top" role="navigation">
          <!-- Sidebar toggle button-->
          <a href="/" class="sidebar-toggle" data-toggle="offcanvas" role="button">
            Перейти на главную
          </a>
          <div class="navbar-custom-menu">
            <ul class="nav navbar-nav">
              <!-- Messages: style can be found in dropdown.less-->
              
              <!-- Notifications: style can be found in dropdown.less -->
              
              <!-- Tasks: style can be found in dropdown.less -->
              
              <!-- User Account: style can be found in dropdown.less -->
              <li class="dropdown user user-menu">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                  <img src="{{ $u->avatar }}" class="user-image" alt="User Image">
                  <span class="hidden-xs">{{ $u->username }}</span>
                </a>
              </li>
              <!-- Control Sidebar Toggle Button -->
              
            </ul>
          </div>
        </nav>
      </header>
      <aside class="main-sidebar">
        <!-- sidebar: style can be found in sidebar.less -->
        <section class="sidebar" style="height: auto;">
          <!-- Sidebar user panel -->
          <div class="user-panel">
            <div class="pull-left image">
              <img src="{{ $u->avatar }}" class="img-circle" alt="User Image">
            </div>
            <div class="pull-left info">
              <p>{{ $u->username }}</p>
              <a href="#"><i class="fa fa-circle text-success"></i> Online</a>
            </div>
          </div>
          <!-- search form -->
          <div class="sidebar-form">
            <div class="input-group">
              <input type="text" class="form-control" placeholder="ID / steamid">
              <span class="input-group-btn">
                <button type="submit" name="search" id="profile-btn" class="btn btn-flat"><i class="fa fa-search"></i></button>
              </span>
            </div>
          </div>
          <!-- /.search form -->
          <!-- sidebar menu: : style can be found in sidebar.less -->
          <ul class="sidebar-menu">
            <li class="header">Сайт</li>
            <li>
              <a href="/admin">
                <i class="fa fa-th"></i> <span>Основная статистика</span>
              </a>
            </li>
            <li class="header">Магазин</li>
            <li>
              <a href="/admin/shop">
                <i class="fa fa-th"></i> <span>Основная статистика</span>
              </a>
            </li>
            <li class="header">Боты</li>
            <li>
              <a href="/admin/send">
                <i class="fa fa-share"></i> <span>Управление ботами</span>
              </a>
            </li>
            
            
            
            
            
            
            
            
            
            
          </ul>
        </section>
        <!-- /.sidebar -->
      </aside>
      <div class="content-wrapper" style="min-height: 921px;">
        @yield('content')
      </div>
    </div>
    <div class="modal fade bs-example-modal-lg" id='profile-modal'> 
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title">qweqw</h4>
          </div>
          <div class="modal-body">
            <div class="row">
                <div class="col-lg-5">
                    <div class="media">
                        <a class="pull-left" href="#">
                            <img class="media-object dp img-circle" src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/ce/ce26221ae546cdc10ca520e4429ab84e084831a6_full.jpg" style="width: 100px;height:100px;">
                        </a>
                        <div class="media-body">
                            <h4 class="media-heading">Hardik Sondagar <small> India</small></h4>
                            <h5>Software Developer at <a href="http://gridle.in">Gridle.in</a></h5>
                            <hr style="margin:8px auto">

                            <span class="label label-default">HTML5/CSS3</span>
                            <span class="label label-default">jQuery</span>
                            <span class="label label-info">CakePHP</span>
                            <span class="label label-default">Android</span>
                        </div>
                    </div>

                </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Закрыть</button>
          </div>
        </div><!-- /.modal-content -->
      </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
  </body>
</html>