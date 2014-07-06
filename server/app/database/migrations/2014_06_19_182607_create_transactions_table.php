<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateTransactionsTable extends Migration {

    /**
	 * Run the migrations.
	 *
	 * @return void
	 */
    public function up() {
        Schema::create('transactions', function (Blueprint $table) {
                $table->increments('id');
                $table->string('transaction_id');
                $table->integer('account_id');
                $table->integer('amount');
                $table->char('type', 1);
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
        Schema::drop('transactions');
    }

}
