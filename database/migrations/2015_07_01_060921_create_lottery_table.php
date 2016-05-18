<?php

use App\Lottery;
use App\Bonus;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateLotteryTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('lottery', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('winner_id')->unsigned()->nullable();
            $table->foreign('winner_id')->references('id')->on('users')->onDelete('cascade');
            $table->integer('status');
            $table->json('items');
            $table->float('price');
            $table->timestamp('started_at');
            $table->timestamp('finished_at');
            $table->integer('status_prize');
            $table->integer('players');
            $table->integer('max');
            $table->string('rand_number');
            $table->timestamps();
        });
        $rand_number = "0.".mt_rand(0,9).mt_rand(10000000,99999999).mt_rand(100000000,999999999);
        $newBet = Bonus::first();
        if(is_null($newBet)) {
            return true;
        }
        $betInsert[] = $newBet;
        $lottery = Lottery::create([
            'rand_number' => $rand_number,
            'items' => json_encode($newBet),
            'price' => $newBet['price'],
            'max' => round($newBet['price'] * 3)
        ]);
        $newBet->delete();
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('lottery');
    }
}
