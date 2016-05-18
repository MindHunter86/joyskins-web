<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateShopTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shop', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('classId');
            $table->string('inventoryId');
            $table->string('rarity')->nullable();
            $table->string('type')->nullable();
            $table->string('quality')->nullable();
            $table->integer('buyer_id')->unsigned()->nullable();
            $table->foreign('buyer_id')->references('id')->on('users')->onDelete('cascade');
            $table->integer('status');
            $table->float('steam_price');
            $table->float('price');
            $table->timestamp('buy_at');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('shop');
    }
}
