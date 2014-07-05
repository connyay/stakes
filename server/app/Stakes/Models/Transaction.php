<?php
namespace Stakes\Models;

class Transaction extends BaseModel {
    protected $fillable = ['account_id', 'amount', 'type'];

    public function account() {
        return $this->belongsTo('Stakes\Models\Account');

    }
}
