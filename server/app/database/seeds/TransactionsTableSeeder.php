<?php

use Stakes\Models\Transaction;

class TransactionsTableSeeder extends Seeder {

	public function run()
	{
		DB::table('transactions')->truncate();

		Transaction::create([
			'account'=> 2,
			'amount'=> 10
		]);
	}

}