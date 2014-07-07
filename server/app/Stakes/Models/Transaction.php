<?php
namespace Stakes\Models;

use Log;
use SoftDeletingTrait;
use Uuid;

class Transaction extends BaseModel {
    use SoftDeletingTrait;
    protected $fillable = ['account_id', 'amount', 'type'];

    public function account() {
        return $this->belongsTo('Stakes\Models\Account');
    }

    public static function boot() {
        parent::boot();

        Transaction::creating(function ($transaction) {
                $transaction->transaction_id = Uuid::generate(4);
                Log::info('transaction created', ['transaction_id' => (string) $transaction->transaction_id]);
            });
        Transaction::deleting(function ($transaction) {
                Log::info('transaction deleted', ['transaction_id' => $account->transaction_id]);
            });
    }
}
