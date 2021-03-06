<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateAccountsTable extends Migration {

    /**
	 * Run the migrations.
	 *
	 * @return void
	 */
    public function up() {
        Schema::create('accounts', function (Blueprint $table) {
                $table->increments('id');
                $table->string('account_id');
                $table->integer('user_id');
                $table->integer('balance');
                $table->integer('wins');
                $table->integer('losses');
                $table->timestamps();
                $table->softDeletes();
            });
    }

    /**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
    public function down() {
        Schema::drop('accounts');
    }

}
