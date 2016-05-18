<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTicketsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tickets', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('img');
            $table->float('price');
        });
        \App\Ticket::create([
            'name' => 'Карточка на 25 руб',
            'img'  => '/new/images/carts-1.png',
            'price' => 25
        ]);
        \App\Ticket::create([
            'name' => 'Карточка на 50 руб',
            'img'  => '/new/images/carts-2.png',
            'price' => 50
        ]);
        \App\Ticket::create([
            'name' => 'Карточка на 150 руб',
            'img'  => '/new/images/carts-3.png',
            'price' => 150
        ]);
        \App\Ticket::create([
            'name' => 'Карточка на 300 руб',
            'img'  => '/new/images/carts-4.png',
            'price' => 300
        ]);
        \App\Ticket::create([
            'name' => 'Карточка на 1000 руб',
            'img'  => '/new/images/carts-5.png',
            'price' => 1000
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('tickets');
    }
}
