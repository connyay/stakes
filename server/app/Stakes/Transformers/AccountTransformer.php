<?php namespace Stakes\Transformers;

use League\Fractal;
use Stakes\Models\Account;
use Stakes\Transformers\TransactionTransformer;

class AccountTransformer extends Fractal\TransformerAbstract
{
    protected $availableIncludes = ['transactions'];

    public function transform( Account $account ) {
        return [
        'id'      => (string) $account->account_id,
        'balance'   => (int) $account->balance,
        'wins'   => (int) $account->wins,
        'losses'   => (int) $account->losses,
        ];
    }

    public function includeTransactions( Account $account ) {
        $transactions = $account->transactions;

        return $this->collection( $transactions, new TransactionTransformer );
    }
}
