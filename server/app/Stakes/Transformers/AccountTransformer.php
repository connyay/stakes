<?php
namespace Stakes\Transformers;

use League\Fractal;
use Stakes\Models\Account;
use Stakes\Transformers\TransactionTransformer;
use Stakes\Transformers\UserTransformer;

class AccountTransformer extends Fractal\TransformerAbstract {
    protected $availableIncludes = ['user', 'transactions'];

    public function transform(Account $account) {
        return ['id' => (string) $account->account_id, 'balance' => (int) $account->balance, 'wins' => (int) $account->wins, 'losses' => (int) $account->losses, 'created' => $account->created_at->toISO8601String()];
    }

    public function includeUser(Account $account) {
        $user = $account->user;

        return $this->item($user, new UserTransformer);
    }

    public function includeTransactions(Account $account) {
        $transactions = $account->transactions;

        return $this->collection($transactions, new TransactionTransformer);
    }
}
