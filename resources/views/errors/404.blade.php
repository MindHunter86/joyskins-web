<!DOCTYPE html>
<html>
<head>
    <title>404 not found.</title>

    <link href="//fonts.googleapis.com/css?family=Roboto:100" rel="stylesheet" type="text/css">

    <style>
        html, body {
            height: 100%;
        }

        body {
            margin: 0;
            padding: 0;
            width: 100%;
            font-family: 'Roboto', sans-serif;
            font-size:14px;
            background: #F9FAFB url({{ asset('assets/img/bg.png') }});
            color: #333;
            display: table;
            font-weight: 100;
        }

        .container {
            text-align: center;
            display: table-cell;
            vertical-align: middle;
        }

        .content {
            text-align: center;
            display: inline-block;
        }

        .title {
            font-size: 72px;
            margin-bottom: 40px;
        }
    </style>
</head>
<body>
<div class="container">
    <div class="content">
        <div class="title">Oops. Error 404.</div>
        <a class="btn btn-primary" href="{{ route('index') }}">На главную</a>
    </div>
</div>
</body>
</html>
