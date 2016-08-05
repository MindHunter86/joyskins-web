<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class DelStartAndFinishAt extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('duels', function (Blueprint $table) {
            $table->dropColumn('started_at');
            $table->dropColumn('finished_at');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('duels', function (Blueprint $table) {
            $table->timestamp('started_at');
            $table->timestamp('finished_at');
        });
    }
}
