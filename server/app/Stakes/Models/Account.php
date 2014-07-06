<?php
namespace Stakes\Models;

use SoftDeletingTrait;
use Uuid;
use Watson\Validating\ValidatingTrait;

class Account extends BaseModel {

    use ValidatingTrait;
    use SoftDeletingTrait;

    protected $rules = ['user_id' => 'required'];

    protected $fillable = ['user_id', 'balance', 'wins', 'losses'];

    public static function boot() {
        parent::boot();

        Account::creating(function ($account) {
                return $account->account_id = Uuid::generate(4);
            });
    }

    public function user() {
        return $this->belongsTo('Stakes\Models\User');
    }

    public function transactions() {
        return $this->hasMany('Stakes\Models\Transaction');
    }
}
