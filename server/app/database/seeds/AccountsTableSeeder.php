<?php

use Stakes\Models\Account;

class AccountsTableSeeder extends Seeder {

	public function run()
	{
		DB::table('accounts')->truncate();

		Account::create([
			'owner'=> 1,
			'balance'=> 1000
		]);

		Account::create([
			'owner'=> 2,
			'balance'=> 300
		]);
	}

}