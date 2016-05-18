<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('username');
            $table->string('avatar');
            $table->string('steamid')->unique();
            $table->string('steamid64')->unique();
            $table->string('trade_link');
            $table->string('accessToken');
            $table->string('promo');
            $table->string('promo_owner');
            $table->integer('votes');
            $table->boolean('is_admin');
            $table->boolean('is_moderator');
            $table->boolean('is_vip');
            $table->rememberToken();
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
        Schema::drop('users');
    }
}
