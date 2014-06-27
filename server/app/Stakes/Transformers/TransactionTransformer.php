<?php namespace Stakes\Transformers;

use League\Fractal;
use Stakes\Models\Transaction;
use Stakes\Transformers\AccountTransformer;

class TransactionTransformer extends Fractal\TransformerAbstract
{
    protected $availableIncludes = ['account'];

    public function transform( Transaction $transaction ) {
        $type = $transaction->type === '+' ? 'credit' : 'debit';
        return [
        'id'      => $transaction->transaction_id,
        'amount'   => (int) $transaction->amount,
        'type' => $type,
        'created'   => $transaction->created_at->toISO8601String()
        ];
    }

    public function includeAccount( Transaction $transaction ) {
        $account = $transaction->account;
        if ( is_null( $account ) ) {
            return;
        }
        return $this->item( $account, new AccountTransformer );
    }
}
