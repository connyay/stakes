<?php

use Stakes\Models\Transaction;

class TransactionsTableSeeder extends Seeder {

    public function run() {
        DB::table('transactions')->truncate();

        Transaction::create([
                'account_id' => 2,
                'amount'     => 10,
                'type'       => '+'
            ]);
        Transaction::create([
                'account_id' => 1,
                'amount'     => 15,
                'type'       => '-'
            ]);
    }

}
