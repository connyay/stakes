<?php namespace Stakes\Transformers;

use League\Fractal;
use Stakes\Models\Transaction;

class TransactionTransformer extends Fractal\TransformerAbstract
{
    public function transform( Transaction $transaction ) {
        $type = $transaction->type === '+' ? 'credit' : 'debit';
        return [
        'id'      => $transaction->transaction_id,
        'amount'   => (int) $transaction->amount,
        'type' => $type
        ];
    }
}
