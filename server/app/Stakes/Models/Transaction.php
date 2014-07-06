<?php
namespace Stakes\Models;

use SoftDeletingTrait;

class Transaction extends BaseModel {
    use SoftDeletingTrait;
    protected $fillable = ['account_id', 'amount', 'type'];

    public function account() {
        return $this->belongsTo('Stakes\Models\Account');

    }
}
