@extends('layout')

@section('content')
    <script>
        $(function(){
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
            loadMyDuelInventory();
        });
    </script>
    <div class="inv-cash"></div>
    <div class="inv-table"></div>
@endsection