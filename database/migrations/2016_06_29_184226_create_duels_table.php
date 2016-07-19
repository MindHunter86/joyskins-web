<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDuelsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('duels', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('winner_id')->unsigned()->nullable();
            $table->foreign('winner_id')->references('id')->on('users')->onDelete('cascade');
            $table->integer('status');
            $table->integer('items');
            $table->float('price');
            $table->timestamp('started_at');
            $table->timestamp('finished_at');
            $table->json('won_items');
            $table->integer('status_prize');
            $table->string('rand_number');
            $table->float('comission');
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
        Schema::drop('duels');
    }
}
