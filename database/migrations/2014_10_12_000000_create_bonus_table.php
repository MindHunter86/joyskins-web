<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBonusTable extends Migration
{
    public function up()
    {
        Schema::create('bonus', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('classid');
            $table->string('name');
            $table->string('market_hash_name');
            $table->string('rarity');
            $table->float('price');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('bonus');
    }
}
