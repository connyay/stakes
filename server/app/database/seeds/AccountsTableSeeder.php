<?php

use Stakes\Models\Account;

class AccountsTableSeeder extends Seeder {

	public function run() {
		DB::table( 'accounts' )->truncate();

		Account::create( [
			'user_id'=> 1,
			'account_id'=>Uuid::generate(),
			'balance'=> 1000,
			'wins'=> 11,
			'losses'=> 4
			] );

		Account::create( [
			'user_id'=> 2,
			'account_id'=>Uuid::generate(),
			'balance'=> 300,
			'wins' => 4,
			'losses'=> 2
			] );
	}

}
